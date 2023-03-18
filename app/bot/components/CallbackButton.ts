import { InlineKeyboardButton, KeyboardButton } from 'node-telegram-bot-api'

export const CallbackButton = <GData extends {}>(
  text: string,
  callback_data: GData,
): InlineKeyboardButton | KeyboardButton => ({
  text,
  callback_data: JSON.stringify(callback_data),
})
