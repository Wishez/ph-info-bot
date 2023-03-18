import type { CallbackQuery } from 'node-telegram-bot-api'
import { execute } from '../../__generated'
import {
  clientSchema$,
  filledServiceAttributeListSchema$,
  filledServiceAttributeSchema$,
  mutation$,
  orderSchema$,
  providerSchema$,
  query$,
  QueryFetcher,
  serviceAttributeListSchema$,
  serviceAttributeSchema$,
  serviceSchema$,
} from '../../__generated/fetchers'
import { EOrderStatus, IOrderModel } from '../../models/Order/types'
import { IUserModel } from '../../models/User/types'
import { CallbackButton } from '../components'
import { bot } from '../index'
import { ECommonAction } from '../types/actions'
import type { ICallProviderContext, IPressProviderContext } from '../types/context'

const CREATE_ORDER = mutation$.createOrder()
const UPDATE_ATTRIBUTE = mutation$.updateFilledServiceAttribute(
  filledServiceAttributeSchema$.value.id,
)

type TExtractFetcherModel<GType> = GType extends QueryFetcher<infer GModel, any> ? GModel : never

const FETCH_ORDER = query$.order(
  orderSchema$.id.chatId.status.filledServicesAttributes(
    filledServiceAttributeListSchema$.id.value.serviceAttribute(
      serviceAttributeListSchema$.id.isRequired.notice.name,
    ),
  ),
)
const CHECK_ORDER_EXISTENCE = query$.checkOrderExistence()
const IS_ALL_REQUIRED_ATTRIBUTES_FILLED = query$.isAllRequiredAttributesFilled()
const FETCH_PROVIDER = query$.provider(
  providerSchema$.id.service(
    serviceSchema$.id.name.attributes(serviceAttributeSchema$.name.isRequired.notice),
  ),
)
const FETCH_CLIENT = query$.client(clientSchema$.id)
interface ISendOrderFormOptions {
  order: TExtractFetcherModel<typeof FETCH_ORDER>['order']
  receiver: IUserModel['telegramId']
}
const sendOrderForm = async (options: ISendOrderFormOptions) => {
  const { order, receiver } = options
  await bot.sendMessage(
    receiver,
    `
Некоторая информация мне обязательна, а какая-то по желанию🙂

Чтобы заполнить информацию, просто ответьте на сообщение

Повторным ответом, вы сможете отредактировать информацию
  `,
  )
  order.filledServicesAttributes.forEach(async ({ id, serviceAttribute, value }) => {
    const message = await bot.sendMessage(
      receiver,
      `
${serviceAttribute.name} — ${!value && serviceAttribute.isRequired ? 'Обязательно' : value}

${value ? '' : serviceAttribute.notice}
    `,
    )
    bot.onReplyToMessage(receiver, message.message_id, async replyedMessage => {
      const filledAttributeResponse = await execute(UPDATE_ATTRIBUTE, {
        variables: {
          filledServiceAttributeId: id,
          filledServiceAttributeInfo: { value: replyedMessage.text },
        },
      })
      const filledAttribute = filledAttributeResponse.updateFilledServiceAttribute

      await bot.editMessageText(`${serviceAttribute.name} — ${filledAttribute.value}`, {
        message_id: message.message_id,
        chat_id: message.chat.id,
      })

      const connectWithProviderButton = await getCallProviderActionIfUserCan({
        orderId: order.id,
      })

      if (connectWithProviderButton) {
        await bot.sendMessage(receiver, 'Вы заполнили все необходимые поля', {
          reply_markup: {
            inline_keyboard: [[connectWithProviderButton]],
          },
        })
      }
    })
  })
}
interface ISendCallProviderActionIfUserCanOptions {
  orderId: IOrderModel['id']
}
const getCallProviderActionIfUserCan = async (options: ISendCallProviderActionIfUserCanOptions) => {
  const { orderId } = options
  const response = await execute(IS_ALL_REQUIRED_ATTRIBUTES_FILLED, {
    variables: { id: orderId },
  })

  if (response.isAllRequiredAttributesFilled) {
    return CallbackButton<ICallProviderContext>('Связаться с оператором', {
      id: orderId,
      action: ECommonAction.CALL_PROVIDER,
    })
  }
}

export const pressProviderEvent = async (context: IPressProviderContext, query: CallbackQuery) => {
  const receiver = query.from.id
  /*
   * 1. Проверяю, есть ли активный заказ
   * 2. Если есть, запрашиваю (этот момент можно автоматизировать — проверять заказ и возвращать найденный заказ)
   * 3.
   * */
  await bot.sendChatAction(receiver, 'typing')
  const providerResponse = await execute(FETCH_PROVIDER, { variables: { id: context.id } })
  const provider = providerResponse.provider
  const clientResponse = await execute(FETCH_CLIENT, { variables: { telegramId: receiver } })
  const client = clientResponse.client
  // TODO заменить этот метот на FETCH_ORDER с обработкой ошибки
  const existenceResponse = await execute(CHECK_ORDER_EXISTENCE, {
    variables: { providerId: provider.id, clientId: client.id },
  })
  const existedOrderId = existenceResponse.checkOrderExistence

  if (typeof existedOrderId === 'string') {
    const existedOrderResponse = await execute(FETCH_ORDER, { variables: { id: existedOrderId } })

    if (existedOrderResponse.order.status === EOrderStatus.IN_PROCESS) {
      const connectWithProviderButton = await getCallProviderActionIfUserCan({
        orderId: existedOrderId,
      })
      await bot.sendMessage(
        receiver,
        `У вас уже есть заказ в процессе с выбранным оператором. ${
          connectWithProviderButton ? 'Я готов соединить вас' : 'Продожим работать'
        }😊`,
        {
          reply_markup: {
            inline_keyboard: connectWithProviderButton ? [[connectWithProviderButton]] : [],
          },
        },
      )

      await sendOrderForm({ order: existedOrderResponse.order, receiver })

      return
    }
  }

  await bot.sendMessage(
    receiver,
    'В несколько шагов, мы с вами заполним заявку, я расскажу оператору о вашем желание и свяжу вас с ним',
  )
  await bot.sendChatAction(receiver, 'typing')

  const creationOrderResponse = await execute(CREATE_ORDER, {
    variables: {
      orderInfo: {
        providerId: provider.id,
        clientId: client.id,
        serviceId: provider.service.id,
      },
    },
  })
  const orderId = creationOrderResponse.createOrder
  const orderResponse = await execute(FETCH_ORDER, { variables: { id: orderId } })
  const order = orderResponse.order

  await sendOrderForm({ order, receiver })
}
