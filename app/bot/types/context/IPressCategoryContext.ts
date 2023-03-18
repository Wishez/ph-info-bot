import { IServiceCategoryModel } from '../../../models/ServiceCategory/types'
import { ECommonAction } from '../actions'

export interface IPressCategoryContext {
  action: ECommonAction.PRESS_CATEGORY
  id: IServiceCategoryModel['id']
}
