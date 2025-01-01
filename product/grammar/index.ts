import OpenAI from 'openai'

async function main() {
  try {
    const inputText = await readStdin()

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Prepare the conversation messages
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that fixes grammar errors in text.',
      },
      {
        role: 'user',
        content: `Please fix any grammar errors in the following text while retaining the original meaning:\n\n${inputText}`,
      },
    ]

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      max_tokens: 1024,
      temperature: 0.0,
    })

    // Extract and print the corrected text
    const fixedText = response.choices[0]?.message?.content?.trim() ?? inputText
    process.stdout.write(fixedText)
  } catch (error) {
    console.error('Error in grammar correction script:', error)
    process.exit(1)
  }
}

function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = ''
    process.stdin.setEncoding('utf8')

    process.stdin.on('data', (chunk) => {
      data += chunk
    })

    process.stdin.on('end', () => {
      resolve(data.trim())
    })
  })
}

main()
