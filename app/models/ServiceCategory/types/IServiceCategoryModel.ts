import { IBaseCrudModel } from '../../../db/models/types'

export interface IServiceCategoryModel extends IBaseCrudModel {
  description: string
  name: string
  subcategoriesIds?: IServiceCategoryModel['id'][]
}
