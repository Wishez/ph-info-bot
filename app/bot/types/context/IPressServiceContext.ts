import { IServiceModel } from '../../../models/Service/types'
import { ECommonAction } from '../actions'

export interface IPressServiceContext {
  action: ECommonAction.PRESS_SERVICE
  id: IServiceModel['id']
}
