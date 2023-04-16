import { IOrderModel } from '../../../models/Order/types'
import { ECommonAction } from '../actions'

export interface IConnectUserToOrderChatContext {
  action: ECommonAction.CONNECT_USER_TO_ORDER_CHAT
  id: IOrderModel['id']
}
