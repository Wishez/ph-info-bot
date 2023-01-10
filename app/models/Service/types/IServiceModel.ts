import { IBaseCrudModel } from '../../../db/models/types'
import { IServiceAttributeModel } from '../../ServiceAttribute/types'
import { IServiceCategoryModel } from '../../ServiceCategory/types'

export interface IServiceModel extends IBaseCrudModel {
  name: string
  description: string
  categoryId: IServiceCategoryModel['id']
  image?: string
  attributesIds: IServiceAttributeModel['id'][]
}
