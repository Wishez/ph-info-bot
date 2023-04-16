import { CallbackQuery } from 'node-telegram-bot-api'
import { TCallbackContext } from '../../types/context'

export type TEvent<GContext extends TCallbackContext = TCallbackContext> = (
  context: GContext,
  query: CallbackQuery,
) => Promise<void>
