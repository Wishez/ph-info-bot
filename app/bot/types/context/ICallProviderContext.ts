import { IOrderModel } from '../../../models/Order/types'
import { ECommonAction } from '../actions'

export interface ICallProviderContext {
  action: ECommonAction.CALL_PROVIDER
  id: IOrderModel['id']
}
