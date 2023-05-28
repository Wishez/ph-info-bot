import { ActionContext } from '../../models/ActionContext/ActionContext'
import { withCallbackQueryErrorLogger } from '../helpers/errors'
import { ECommonAction, EOrderAction } from '../types/actions'
import { TCallbackContext } from '../types/context'
import { pressProviderEvent } from './pressProviderEvent/pressProviderEvent'
import { cancelOrderEvent } from './cancelOrderEvent'
import { chooseAttributeValueEvent } from './chooseAttributeValueEvent'
import { connectUserToOrderChatEvent } from './connectUserToOrderChatEvent'
import { connectWithProviderEvent } from './connectWithProviderEvent'
import { pressCategoryEvent } from './pressCategoryEvent'
import { pressInformationObjectEvent } from './pressInformationObjectEvent'
import { pressServiceEvent } from './pressServiceEvent'

const actionContextInstance = new ActionContext()
export const onCallbackQueryEvent = withCallbackQueryErrorLogger('All Events', async query => {
  const action = query.data
  const msg = query.message
  if (!msg || !action) return

  const actionContext = await actionContextInstance.read<TCallbackContext>(action)
  if (!actionContext) return

  const { context } = actionContext

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
    case ECommonAction.CHOOSE_ATTRIBUTE_VALUE:
      await chooseAttributeValueEvent(context, query)
      break
    case EOrderAction.CANCEL_ORDER:
      await cancelOrderEvent(context, query)
      break
    default:
  }
})
