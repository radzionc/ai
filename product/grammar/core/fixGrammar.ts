import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import OpenAI from 'openai'
import { log } from '../utils/log'

export const fixGrammar = async (input: string): Promise<string> => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const content = [
      `Fix any grammar errors and improve the clarity of the following text while preserving its original meaning. Keep common professional abbreviations like PR, UI, UX, API, TS, etc. as they are.`,
      `Preserve existing paragraph structure and keep greetings inline with content rather than on separate lines (Slack style, not email style):`,
      input,
    ].join('\n')

    const { choices } = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      temperature: 0.0,
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    })

    const [{ message }] = choices
    const result = shouldBePresent(message.content).trim()

    log({ input, result })
    return result
  } catch (error) {
    log({
      input,
      error,
    })
    throw error
  }
}
