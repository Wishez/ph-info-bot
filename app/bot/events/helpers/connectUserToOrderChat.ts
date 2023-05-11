import { execute } from '../../../__generated'
import {
  clientSchema$,
  mutation$,
  orderSchema$,
  providerSchema$,
  query$,
  userSchema$,
} from '../../../__generated/fetchers'
import { IOrderModel } from '../../../models/Order/types'
import { IUserModel } from '../../../models/User/types'
import { bot } from '../../index'

const FETCH_ORDER = query$.order(
  orderSchema$.chatId
    .provider(providerSchema$.id.user(userSchema$.name.telegramId.id.createdAt))
    .client(clientSchema$.id.user(userSchema$.name.telegramId.id.createdAt)),
)

const CONNECT_USER_TO_CHAT = mutation$.connectUserToChat()

interface IConnectionResult {
  isUserConnected: boolean
}

interface IConnectionOptions {
  orderId: IOrderModel['id']
  userTelegramId: IUserModel['telegramId']
}

export const connectUserToOrderChat = async ({
  orderId,
  userTelegramId,
}: IConnectionOptions): Promise<IConnectionResult> => {
  const orderResponse = await execute(FETCH_ORDER, { variables: { id: orderId } })
  const { order } = orderResponse
  let userId = ''
  let opponentUser: IUserModel | undefined = undefined
  switch (userTelegramId) {
    case order.provider.user.telegramId:
      opponentUser = order.client.user
      userId = order.provider.user.id
      break
    case order.client.user.telegramId:
      opponentUser = order.provider.user
      userId = order.client.user.id
      break
  }

  const userConnectionResponse = await execute(CONNECT_USER_TO_CHAT, {
    variables: { userId, chatId: order.chatId },
  })

  if (userConnectionResponse.connectUserToChat) {
    await bot.sendMessage(
      userTelegramId,
      `
Все сообщения мне от вас, получит «${opponentUser?.name}»😊

Я буду запоминать их, чтобы обезопасить процесс сделки🫡🫶🏼

Если вы захотите покинут чат, то запустите команду /leave_chat
Чтобы вернуться в чат с «${opponentUser?.name}», то выполните команду /choose_chat и выберите нужный чат  
    `,
    )

    return { isUserConnected: true }
  }

  await bot.sendMessage(
    userTelegramId,
    'Не удалось подключить вас к чату🥲 Попробуйте, пожалуйста, ещё раз',
  )

  return { isUserConnected: false }
}
