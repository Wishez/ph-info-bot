import log4js from 'log4js'
import TelegramBot from 'node-telegram-bot-api'
import './executor'
import { Env } from '../config/Env'
import { onReplyFilledAttribute } from './events/replyToFormAttribute'
import { ECommonAction } from './types/actions'
import { TCallbackContext } from './types/context'
import { useChooseChatCommand, useLeaveChatCommand, useStartCommand } from './commands'
import {
  connectUserToOrderChatEvent,
  connectWithProviderEvent,
  pressCategoryEvent,
  pressInformationObjectEvent,
  pressProviderEvent,
  pressServiceEvent,
} from './events'
import { useForwardingMessages } from './usersChat'

export const bot = new TelegramBot(Env.botToken, { polling: true })

const eventLogger = log4js.getLogger()

export const useBot = () => {
  useStartCommand()
  useLeaveChatCommand()
  useChooseChatCommand()
  useForwardingMessages()
  bot.on('message', onReplyFilledAttribute)

  bot.on('callback_query', async query => {
    const action = query.data
    const msg = query.message
    if (!msg || !action) return

    const context: TCallbackContext = JSON.parse(action)

    try {
      switch (context.action) {
        case ECommonAction.PRESS_CATEGORY:
          await pressCategoryEvent(context, query)
          break
        case ECommonAction.PRESS_SERVICE:
          await pressServiceEvent(context, query)
          break
        case ECommonAction.PRESS_PROVIDER:
          await pressProviderEvent(context, query)
          break
        case ECommonAction.PRESS_INFORMATION_OBJECT:
          await pressInformationObjectEvent(context, query)
          break
        case ECommonAction.CONNECT_WITH_PROVIDER:
          await connectWithProviderEvent(context, query)
          break
        case ECommonAction.CONNECT_USER_TO_ORDER_CHAT:
          await connectUserToOrderChatEvent(context, query)
          break
        default:
      }
    } catch (e) {
      console.log('Catch error. See in events-errors.log')
      eventLogger.error(typeof e === 'object' ? JSON.stringify(e) : e)
    }
  })
}
