import { IProviderModel } from '../../../models/Provider/types'
import { ECommonAction } from '../actions'

export interface IPressProviderContext {
  action: ECommonAction.PRESS_PROVIDER
  id: IProviderModel['id']
}
