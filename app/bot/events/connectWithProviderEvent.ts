import { execute } from '../../__generated'
import {
  clientSchema$,
  filledServiceAttributeListSchema$,
  informationObjectImageSchema$$,
  informationObjectListSchema$,
  orderSchema$,
  providerSchema$,
  query$,
  serviceAttributeSchema$,
  serviceSchema$,
  userSchema$,
} from '../../__generated/fetchers'
import { EServiceType } from '../../models/Service/types'
import { CallbackButton } from '../components'
import { bot } from '../index'
import { ECommonAction } from '../types/actions'
import {
  ICallProviderContext,
  IConnectUserToOrderChatContext,
  IPressInformationObjectContext,
} from '../types/context'
import { connectUserToOrderChat, sendInformationObject } from './helpers'
import { TEvent } from './types'

const FETCH_ORDER = query$.order(
  orderSchema$.id.chatId.status
    .provider(providerSchema$.id.user(userSchema$.id.name.avatar.telegramId.createdAt))
    .client(clientSchema$.id.user(userSchema$.id.name.avatar))
    .service(serviceSchema$.name.serviceType)
    .informationObject(
      informationObjectListSchema$.name.description.gallery(informationObjectImageSchema$$),
    )
    .filledServicesAttributes(
      filledServiceAttributeListSchema$.id.value.serviceAttribute(
        serviceAttributeSchema$.id.isRequired.notice.name,
      ),
    ),
)

export const connectWithProviderEvent: TEvent<ICallProviderContext> = async (context, query) => {
  const clientTelegramId = query.from.id
  await bot.sendChatAction(clientTelegramId, 'typing')
  const orderId = context.id
  const orderResponse = await execute(FETCH_ORDER, { variables: { id: orderId } })
  const { order } = orderResponse
  const { isUserConnected } = await connectUserToOrderChat({
    orderId,
    userTelegramId: clientTelegramId,
  })
  const providerChatId = order.provider.user.telegramId

  if (!isUserConnected) return

  const connectWithClientButton = CallbackButton<IConnectUserToOrderChatContext>('Войти в чат', {
    id: order.id,
    action: ECommonAction.CONNECT_USER_TO_ORDER_CHAT,
  })
  const newOrderTextForProvider = `
Вам поступила новая заявка по «${order.service.name}» от клиента «${order.client.user.name}»🥳

Я могу связать вас. Как только вы будете готовы, нажмите кнопку😎
      `

  switch (order.service.serviceType) {
    case EServiceType.FORM:
      await bot.sendMessage(
        providerChatId,
        `
${newOrderTextForProvider}

Пользователь заполнил все нужные атрибуты:
${order.filledServicesAttributes
  .map(({ serviceAttribute, value }) => `${serviceAttribute.name} — ${value}`)
  .join('\n')}
        `,
        {
          reply_markup: {
            inline_keyboard: [[connectWithClientButton]],
          },
        },
      )
      break
    case EServiceType.PORTFOLIO:
      await bot.sendMessage(
        providerChatId,
        `
${newOrderTextForProvider}

Пользователю понравился этот объект☺️
        `,
      )

      await sendInformationObject<IPressInformationObjectContext>({
        userTelegramId: providerChatId,
        informationObject: order.informationObject!,
        button: connectWithClientButton,
      })
      break
  }
}
