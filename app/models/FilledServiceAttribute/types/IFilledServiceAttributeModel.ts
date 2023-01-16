import { IBaseCrudModel } from '../../../db/models/types'
import { IServiceAttributeModel } from '../../ServiceAttribute/types'

export interface IFilledServiceAttributeModel extends IBaseCrudModel {
  serviceAttributeId: IServiceAttributeModel['id']
  value: string
  orderId: string
}
