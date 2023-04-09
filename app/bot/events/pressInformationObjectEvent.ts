import { CallbackQuery } from 'node-telegram-bot-api'
import { execute } from '../../__generated'
import {
  clientSchema$,
  informationObjectSchema$,
  mutation$,
  orderSchema$,
  providerSchema$,
  query$,
} from '../../__generated/fetchers'
import { bot } from '../index'
import { IPressInformationObjectContext } from '../types/context'
import { getCallProviderActionIfOrderFilled } from './helpers'

const FETCH_CLIENT = query$.client(clientSchema$.id)
const FETCH_INFORMATION_OBJECT = query$.informationObject(
  informationObjectSchema$.id.name.provider(providerSchema$.id),
)
const CHECK_ORDER_EXISTENCE = query$.checkOrderExistence()
const UPDATE_ORDER = mutation$.updateOrder(orderSchema$.id)

export const pressInformationObjectEvent = async (
  context: IPressInformationObjectContext,
  query: CallbackQuery,
) => {
  const receiver = query.from.id
  await bot.sendChatAction(receiver, 'typing')
  const informationObjectResponse = await execute(FETCH_INFORMATION_OBJECT, {
    variables: { id: context.id },
  })
  const clientResponse = await execute(FETCH_CLIENT, { variables: { telegramId: receiver } })
  const { client } = clientResponse
  const { informationObject } = informationObjectResponse
  const existenceResponse = await execute(CHECK_ORDER_EXISTENCE, {
    variables: { providerId: informationObject.provider.id, clientId: client.id },
  })
  const orderId = existenceResponse.checkOrderExistence

  if (typeof orderId === 'string') {
    await execute(UPDATE_ORDER, {
      variables: {
        id: orderId,
        orderInfo: { informationObjectId: informationObject.id },
      },
    })
    const button = await getCallProviderActionIfOrderFilled({ orderId })

    if (button) {
      await bot.sendMessage(
        receiver,
        `
Вы выбрали «${informationObject.name}» 
Я готов связать вас с оператором 
Нажмите кнопку, когда будете готовы😊
Либо выберите другой объект🦧
`,
        {
          reply_markup: {
            inline_keyboard: [[button]],
          },
        },
      )
    }
  }
}
