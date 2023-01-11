import { IBaseCrudModel } from '../../../db/models/types'
import { IClientModel } from '../../Client/types'
import { IServiceAttributeModel } from '../../ServiceAttribute/types'

export interface IFilledServiceAttributeModel extends IBaseCrudModel {
  serviceAttributeId: IServiceAttributeModel['id']
  clientId: IClientModel['id']
  value: string
  orderId: string
}
