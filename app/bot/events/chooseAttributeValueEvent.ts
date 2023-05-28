import TelegramBot from 'node-telegram-bot-api'
import { execute } from '../../__generated'
import {
  filledServiceAttributeSchema$,
  mutation$,
  serviceAttributeSchema$,
} from '../../__generated/fetchers'
import { bot } from '../index'
import { IChooseAttributeValueContext } from '../types/context'
import { editAttributeValueInChat } from './helpers'

const UPDATE_FILLED_ATTRIBUTE = mutation$.updateFilledServiceAttribute(
  filledServiceAttributeSchema$.id.replyMessageIds.serviceAttribute(
    serviceAttributeSchema$.name.notice.options,
  ),
)

export const chooseAttributeValueEvent = async (
  context: IChooseAttributeValueContext,
  query: TelegramBot.CallbackQuery,
) => {
  const userChatId = query.from?.id
  await bot.sendChatAction(userChatId, 'typing')
  await execute(UPDATE_FILLED_ATTRIBUTE, {
    variables: {
      id: context.filledAttributeId,
      filledServiceAttributeInfo: {
        value: context.value,
      },
    },
  })
  await editAttributeValueInChat({ userChatId, filledAttributeId: context.filledAttributeId })
}
