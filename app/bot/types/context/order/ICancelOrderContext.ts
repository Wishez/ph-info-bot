import { IOrderModel } from '../../../../models/Order/types'
import { EOrderAction } from '../../actions'

export interface ICancelOrderContext {
  action: EOrderAction.CANCEL_ORDER
  orderId: IOrderModel['id']
}
