import { execute } from '../../../__generated'
import { query$ } from '../../../__generated/fetchers'
import { IOrderModel } from '../../../models/Order/types'
import { CallbackButton } from '../../components'
import { ECommonAction } from '../../types/actions'
import { ICallProviderContext } from '../../types/context'

const IS_ALL_REQUIRED_ATTRIBUTES_FILLED = query$.isAllRequiredAttributesFilled()

interface ISendCallProviderActionIfUserCanOptions {
  orderId: IOrderModel['id']
}

export const getCallProviderActionIfOrderFilled = async (
  options: ISendCallProviderActionIfUserCanOptions,
) => {
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
