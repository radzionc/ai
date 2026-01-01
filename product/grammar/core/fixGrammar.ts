import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import OpenAI from 'openai'
import { log } from '../utils/log'

export const fixGrammar = async (input: string): Promise<string> => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const { choices } = await openai.chat.completions.create({
      model: 'gpt-5-nano',
      max_completion_tokens: 512,
      reasoning_effort: 'low',
      messages: [
        {
          role: 'system',
          content: [
            'You are a grammar correction tool.',
            '',
            'Your task:',
            '- Fix grammar, spelling, and punctuation.',
            '- Improve clarity ONLY where grammar errors reduce clarity.',
            '',
            'Rules:',
            '- Do NOT change meaning or tone.',
            '- Do NOT rephrase sentences unless required to fix grammar.',
            '- Do NOT add, remove, or reorder information.',
            '- If a sentence is grammatically correct, return it unchanged.',
            '- Preserve paragraph structure and line breaks.',
            '- Keep greetings inline with content (Slack style, not email style).',
            '- Do NOT use markdown, lists, or extra formatting.',
          ].join('\n'),
        },
        {
          role: 'user',
          content: [
            'Fix grammar in the following text.',
            '',
            'Constraints:',
            '- Keep common professional abbreviations exactly as written (PR, UI, UX, API, TS, etc.).',
            '- Preserve original spacing and formatting.',
            '',
            'Text:',
            input,
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
