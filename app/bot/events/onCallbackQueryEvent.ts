import { withCallbackQueryErrorLogger } from '../helpers/errors'
import { ECommonAction } from '../types/actions'
import { TCallbackContext } from '../types/context'
import { pressProviderEvent } from './pressProviderEvent/pressProviderEvent'
import { connectUserToOrderChatEvent } from './connectUserToOrderChatEvent'
import { connectWithProviderEvent } from './connectWithProviderEvent'
import { pressCategoryEvent } from './pressCategoryEvent'
import { pressInformationObjectEvent } from './pressInformationObjectEvent'
import { pressServiceEvent } from './pressServiceEvent'

export const onCallbackQueryEvent = withCallbackQueryErrorLogger('All Events', async query => {
  const action = query.data
  const msg = query.message
  if (!msg || !action) return

  const context: TCallbackContext = JSON.parse(action)

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
})
