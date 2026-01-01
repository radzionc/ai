import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import OpenAI from 'openai'
import { log } from '../utils/log'

export const fixGrammar = async (input: string): Promise<string> => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const { choices } = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      max_tokens: 128,
      messages: [
        {
          role: 'system',
          content: [
            'You are a grammar correction tool.',
            'Fix grammar, spelling, and punctuation only.',
            'Do NOT change meaning or tone.',
            'Do NOT rephrase unless grammar is incorrect.',
            'If the text is correct, return it unchanged.',
            'Preserve formatting and line breaks.',
            'Keep greetings inline (Slack style).',
            'Do NOT use markdown, lists, or explanations.',
          ].join(' '),
        },
        {
          role: 'user',
          content: [
            'Return ONLY the corrected text.',
            '<<<',
            input,
            '>>>',
          ].join('\n'),
        },
      ],
    })

    const result = shouldBePresent(choices[0]?.message?.content).trim()

    log({ input, result })
    return result
  } catch (error) {
    log({ input, error })
    throw error
  }
}
