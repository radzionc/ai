import { readStdin } from './utils/readStdin'
import { fixGrammar } from './core/fixGrammar'

async function main() {
  const input = await readStdin()

  const output = await fixGrammar(input)

  process.stdout.write(output)
}

main()
