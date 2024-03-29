import { IOrderModel } from '../../../models/Order/types'
import { ECommonAction } from '../actions'

export interface ICallProviderContext {
  action: ECommonAction.CONNECT_WITH_PROVIDER
  id: IOrderModel['id']
}
