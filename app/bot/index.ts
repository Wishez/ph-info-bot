import TelegramBot from 'node-telegram-bot-api'
import './executor'
import { Env } from '../config/Env'
import { onCallbackQueryEvent } from './events/onCallbackQueryEvent'
import { onReplyFilledAttribute } from './events/replyToFormAttribute'
import { onChooseCategoriesCommand, onChooseChatCommand, onLeaveChatCommand } from './commands'
import { useMessagesForwarding } from './usersChat'

export const bot = new TelegramBot(Env.botToken, { polling: true })

export const useBot = () => {
  bot.onText(/\/start/, onChooseCategoriesCommand)
  bot.onText(/\/leave_chat/, onLeaveChatCommand)
  bot.onText(/\/choose_chat/, onChooseChatCommand)
  bot.on('message', useMessagesForwarding)
  bot.on('message', onReplyFilledAttribute)
  bot.on('callback_query', onCallbackQueryEvent)
}
