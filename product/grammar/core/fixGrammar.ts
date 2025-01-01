import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import OpenAI from 'openai'

export const fixGrammar = async (input: string): Promise<string> => {
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

  return shouldBePresent(message.content).trim()
}
