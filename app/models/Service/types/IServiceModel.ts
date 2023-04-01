import { IBaseCrudModel } from '../../../db/models/types'
import { IProviderModel } from '../../Provider/types'
import { IServiceAttributeModel } from '../../ServiceAttribute/types'
import { IServiceCategoryModel } from '../../ServiceCategory/types'
import { EServiceType } from './EServiceType'

export interface IServiceModel extends IBaseCrudModel {
  name: string
  description: string
  categoryId: IServiceCategoryModel['id']
  image?: string
  providersIds: IProviderModel['id'][]
  serviceType: EServiceType
  attributesIds?: IServiceAttributeModel['id'][]
}
