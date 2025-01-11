import { fixGrammar } from '../core/fixGrammar'

const test = async () => {
  const result = await fixGrammar('Какой-та сломеный текст')
  console.log(result)
}

test()
