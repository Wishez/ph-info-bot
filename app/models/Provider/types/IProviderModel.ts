import { IBaseCrudModel } from '../../../db/models/types'
import { IInformationObjectModel } from '../../InformationObject/types'
import { IServiceModel } from '../../Service/types'
import { IUserModel } from '../../User/types'

export interface IProviderModel extends IBaseCrudModel {
  description: string
  userId: IUserModel['id']
  serviceId: IServiceModel['id']
  informationObjectsIds?: IInformationObjectModel['id'][]
}
