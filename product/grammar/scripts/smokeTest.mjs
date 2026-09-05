import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import process from 'node:process'

const cases = [
  {
    name: 'Russian typo correction',
    input: 'Какой-та сломеный текст',
    expectedIncludes: ['Какой-то', 'сломанный'],
    unexpectedIncludes: ['broken'],
  },
  {
    name: 'Russian grammar correction',
    input: 'Я ходить в магазин вчера, и купил молоко.',
    expectedIncludes: ['ходил', 'купил молоко'],
    unexpectedIncludes: ['went', 'store', 'milk'],
  },
  {
    name: 'English grammar correction',
    input: 'I goes to the store yesterday and buy milk.',
    expectedIncludes: ['I went', 'bought milk'],
    unexpectedIncludes: ['Я'],
  },
]

const runGrammar = (input) =>
  new Promise((resolve, reject) => {
    const child = spawn(
      '/bin/sh',
      [
        '-c',
        [
          '. ./.envrc',
          `printf %s "$GRAMMAR_INPUT" | "${process.execPath}" dist/index.js`,
        ].join('; '),
      ],
      {
        cwd: new URL('..', import.meta.url),
        env: {
          GRAMMAR_INPUT: input,
          HOME: process.env.HOME,
          PATH: process.env.PATH,
        },
        stdio: ['pipe', 'pipe', 'pipe'],
      },
    )

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      stdout += chunk
    })

    child.stderr.on('data', (chunk) => {
      stderr += chunk
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout.trim())
      } else {
        reject(new Error(stderr || `Grammar process exited with code ${code}`))
      }
    })

    child.stdin.end(input)
  })

for (const testCase of cases) {
  const result = await runGrammar(testCase.input)

  for (const expected of testCase.expectedIncludes) {
    assert.ok(
      result.includes(expected),
      `${testCase.name} should include "${expected}". Received: ${result}`,
    )
  }

  for (const unexpected of testCase.unexpectedIncludes) {
    assert.ok(
      !result.toLocaleLowerCase().includes(unexpected.toLocaleLowerCase()),
      `${testCase.name} should not include "${unexpected}". Received: ${result}`,
    )
  }

  console.log(`${testCase.name}: ${result}`)
}
