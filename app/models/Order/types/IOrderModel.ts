import { IBaseCrudModel } from '../../../db/models/types'
import { IChatModel } from '../../Chat/types'
import { IClientModel } from '../../Client/types'
import { IFilledServiceAttributeModel } from '../../FilledServiceAttribute/types'
import { IInformationObjectModel } from '../../InformationObject/types'
import { IProviderModel } from '../../Provider/types'
import { IServiceModel } from '../../Service/types'
import { EOrderStatus } from './EOrderStatus'

export interface IOrderModel extends IBaseCrudModel {
  status: EOrderStatus
  providerId: IProviderModel['id']
  clientId: IClientModel['id']
  serviceId: IServiceModel['id']
  filledServicesAttributesIds: IFilledServiceAttributeModel['id'][]
  informationObjectId?: IInformationObjectModel['id']
  chatId: IChatModel['id']
}
