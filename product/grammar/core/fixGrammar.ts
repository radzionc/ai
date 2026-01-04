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
      messages: [
        {
          role: 'system',
          content: [
            'You are a conservative grammar and clarity correction tool.',
            'Fix grammar, spelling, punctuation, and obvious grammatical ambiguity only.',
            'Do NOT change meaning, intent, or overall tone.',
            'Do NOT rephrase unless required for correctness, clarity, or basic politeness.',
            'If wording could sound rude or overly abrupt, apply the smallest possible polite adjustment.',
            'Do NOT add friendliness, enthusiasm, or extra context.',
            'If the text is already correct and polite, return it unchanged.',
            'Preserve formatting, line breaks, and spacing exactly.',
            'Keep greetings inline (Slack style).',
            'Do NOT use markdown, lists, labels, or explanations.',
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
