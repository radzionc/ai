import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import OpenAI from 'openai'
import { log } from '../utils/log'

export const fixGrammar = async (input: string): Promise<string> => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const content = `Fix any grammar errors and improve the clarity of the following text while preserving its original meaning:\n\n${input}`

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
