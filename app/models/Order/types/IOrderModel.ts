import { IBaseCrudModel } from '../../../db/models/types'
import { IClientModel } from '../../Client/types'
import { IFilledServiceAttributeModel } from '../../FilledServiceAttribute/types'
import { IProviderModel } from '../../Provider/types'
import { IServiceModel } from '../../Service/types'
import { EOrderStatus } from './EOrderStatus'

export interface IOrderModel extends IBaseCrudModel {
  status: EOrderStatus
  providerId: IProviderModel['id']
  clientId: IClientModel['id']
  serviceId: IServiceModel['id']
  filledServicesAttributesIds: IFilledServiceAttributeModel['id'][]

  // TODO добавить id чата
  chatId: string
}
