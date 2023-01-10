import { ServiceCategory } from './ServiceCategory'
import { IServiceCategoryModel } from './types'

export const getServiceCategoryByName = async (
  serviceCategory: ServiceCategory,
  name: IServiceCategoryModel['name'],
) => {
  const models = await serviceCategory.readAll()
  if (!models) return

  return Object.values(models).find(model => model.name === name)
}
