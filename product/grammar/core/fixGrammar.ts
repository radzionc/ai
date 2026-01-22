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
            'You are a professional editor for internal work messages.',
            'Rewrite the text to be clear, natural, and well-structured.',
            'Preserve the original meaning, intent, and factual content exactly.',
            'You MAY rephrase, reorder, split, or merge sentences if this improves clarity or flow.',
            'Remove awkward phrasing, redundancy, and unnatural sentence structure.',
            'Do NOT add new information, opinions, enthusiasm, or friendliness.',
            'Keep the tone neutral, concise, and professional.',
            'If the original text is already clear and well-written, make minimal or no changes.',
            'Preserve line breaks and spacing unless changing them clearly improves readability.',
            'Keep greetings inline (Slack style).',
            'Do NOT use markdown, explanations, or commentary.',
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
