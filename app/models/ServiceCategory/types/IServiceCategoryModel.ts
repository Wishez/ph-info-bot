import { IBaseCrudModel } from '../../../db/models/types'
import { IServiceModel } from '../../Service/types'

export interface IServiceCategoryModel extends IBaseCrudModel {
  description: string
  name: string
  subcategoriesIds?: IServiceCategoryModel['id'][]
  parentId?: IServiceCategoryModel['id']
  servicesIds: IServiceModel['id'][]
}
