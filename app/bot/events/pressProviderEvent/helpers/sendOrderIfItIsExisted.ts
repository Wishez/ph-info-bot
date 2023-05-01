import { execute } from '../../../../__generated'
import { query$ } from '../../../../__generated/fetchers'
import { EOrderStatus } from '../../../../models/Order/types'
import { EServiceType } from '../../../../models/Service/types'
import { IUserModel } from '../../../../models/User/types'
import { bot } from '../../../index'
import { getCallProviderActionIfOrderFilled } from '../../helpers'
import { FETCH_ORDER } from '../fetchers'
import { TClientFetcherModel, TProviderFetcherModel } from '../fetchers/types'
import { sendInfoToUserDependsOnServiceType } from './sendInfoToUserDependsOnServiceType'

const CHECK_ORDER_EXISTENCE = query$.checkOrderExistence()

interface ISendOrderIfItIsExistedOptions {
  receiver: IUserModel['telegramId']
  provider: TProviderFetcherModel
  client: TClientFetcherModel
}
export const sendOrderIfItIsExisted = async (
  options: ISendOrderIfItIsExistedOptions,
): Promise<{ isOrderExisted: boolean }> => {
  const { receiver, provider, client } = options
  const existenceResponse = await execute(CHECK_ORDER_EXISTENCE, {
    variables: { providerId: provider.id, clientId: client.id },
  })
  const existedOrderId = existenceResponse.checkOrderExistence

  if (typeof existedOrderId === 'string') {
    const existedOrderResponse = await execute(FETCH_ORDER, { variables: { id: existedOrderId } })
    const { order } = existedOrderResponse

    if (order.status === EOrderStatus.IN_PROCESS) {
      const connectWithProviderButton = await getCallProviderActionIfOrderFilled({
        orderId: existedOrderId,
      })
      let fillingOrderMessage = ''
      let readyOrderMessage = ''
      switch (order.service.serviceType) {
        case EServiceType.FORM:
          fillingOrderMessage = 'Продолжим заполнение формы😊'
          readyOrderMessage = `
Я готов соединить вас с оператором🤓
Вы можете подкорректировать данные формы или связаться с ним сразу🌝
          `
          break
        case EServiceType.PORTFOLIO:
          fillingOrderMessage = 'Выберите понравившийся вам вариант😇'
          readyOrderMessage = `
Я готов соединить вас с оператором🤓
Вы выбрали «${order.informationObject?.name}».
Если вы хотите изменить выбор, просто выберите другой объект (c) КЭП
          `
          break
      }
      await bot.sendMessage(
        receiver,
        `
У вас уже есть заказ в процессе🫶🏼
${connectWithProviderButton ? readyOrderMessage : fillingOrderMessage}
        `,
        {
          reply_markup: {
            inline_keyboard: connectWithProviderButton ? [[connectWithProviderButton]] : [],
          },
        },
      )

      await sendInfoToUserDependsOnServiceType({
        receiver,
        order: existedOrderResponse.order,
        provider,
      })

      return { isOrderExisted: true }
    }
  }

  return { isOrderExisted: false }
}
