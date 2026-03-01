import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import OpenAI from 'openai'
import { log } from '../utils/log'

export const voiceToMessage = async (input: string): Promise<string> => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const { choices } = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: [
            'You transform raw voice transcriptions into concise Slack messages.',
            'The input is dictated speech — expect rambling, repetition, filler words, thinking aloud, and false starts.',
            'Extract the core intent and key points from the transcription.',
            'Produce a short, clear, professional message ready to send.',
            'Fix transcription errors (misheard words, missing punctuation, wrong homophones).',
            'Remove all filler, repetition, and stream-of-consciousness artifacts.',
            'Preserve technical terms, names, and specific details accurately.',
            'Keep the tone natural and conversational but professional.',
            'The result should be significantly shorter than the input.',
            'Preserve the original language of the input.',
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
