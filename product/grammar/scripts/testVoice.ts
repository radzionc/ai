import { voiceToMessage } from '../core/voiceToMessage'

const ramblingTranscription = `
Um so I was thinking about the deploy thing and like we need to maybe
check with the team first before we do it because you know the staging
environment has been acting weird lately and I'm not sure if it's like
a good time to push. So yeah maybe we should just wait until tomorrow
or something when everyone's around. Let me know what you think.
`

const test = async () => {
  const result = await voiceToMessage(ramblingTranscription.trim())
  console.log('Input length:', ramblingTranscription.length)
  console.log('Output length:', result.length)
  console.log('---')
  console.log(result)
}

test()
