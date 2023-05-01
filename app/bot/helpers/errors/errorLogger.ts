import log4js from 'log4js'
import TelegramBot from 'node-telegram-bot-api'

const eventLogger = log4js.getLogger()

type TMessageHandler = (message: TelegramBot.Message) => void

const logError = (eventName: string, e: unknown) => {
  console.log('An error was caught. Look at it in events-errors.log')
  eventLogger.error(`
${eventName}:
${typeof e === 'object' ? JSON.stringify(e, null, 2) : e}
`)
}

export const withMessageErrorLogger = (
  eventName: string,
  callback: TMessageHandler,
): TMessageHandler => {
  return async message => {
    try {
      await callback(message)
    } catch (error) {
      logError(eventName, error)
    }
  }
}

type TCallbackQueryHandler = (query: TelegramBot.CallbackQuery) => void
export const withCallbackQueryErrorLogger = (
  eventName: string,
  callback: TCallbackQueryHandler,
): TCallbackQueryHandler => {
  return message => {
    try {
      callback(message)
    } catch (error) {
      logError(eventName, error)
    }
  }
}
