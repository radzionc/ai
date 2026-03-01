import { fixGrammar } from './core/fixGrammar'
import { voiceToMessage } from './core/voiceToMessage'
import { readStdin } from './utils/readStdin'

async function main() {
  const mode = process.argv[2] || 'grammar'
  const input = await readStdin()

  const output =
    mode === 'voice' ? await voiceToMessage(input) : await fixGrammar(input)

  process.stdout.write(output)
}

main()
