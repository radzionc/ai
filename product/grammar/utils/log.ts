import { getErrorMessage } from '@lib/utils/getErrorMessage'
import * as fs from 'fs'
import * as path from 'path'

const MAX_LOGS = 10

type LogInput =
  | {
      input: string
      result: string
    }
  | {
      input: string
      error: unknown
    }

export const log = (input: LogInput) => {
  const logPath = path.join(process.env.HOME || '', 'grammar-fix.log')
  const timestamp = new Date().toISOString()

  const entry = [
    timestamp,
    `Input: ${input.input}`,
    'error' in input
      ? `Error: ${getErrorMessage(input.error)}`
      : `Result: ${input.result}`,
  ].join('\n')

  try {
    const existingLogs = fs.existsSync(logPath)
      ? fs.readFileSync(logPath, 'utf-8')
      : ''

    const logEntries = existingLogs
      .split('\n\n')
      .filter((entry) => entry.trim())
      .slice(-(MAX_LOGS - 1))

    logEntries.unshift(entry)

    fs.writeFileSync(logPath, logEntries.join('\n\n') + '\n\n')
  } catch {
    fs.appendFileSync(logPath, entry + '\n\n')
  }
}
