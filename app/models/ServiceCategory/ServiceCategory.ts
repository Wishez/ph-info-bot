import pick from 'lodash/pick'
import uniq from 'lodash/uniq'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { IServiceCategoryModel } from './types'

export class ServiceCategory extends CrudOperations<IServiceCategoryModel> {
  constructor() {
    super({ namespace: 'bot', modelName: 'serviceCategory' })
  }

  getSubCategories = async (
    id: IServiceCategoryModel['id'],
  ): Promise<EDbStatus.NOT_FOUND | Record<string, IServiceCategoryModel>> => {
    const category = await this.read(id)
    const categories = await this.readAll()

    if (!category || !categories || !category.subcategoriesIds) return EDbStatus.NOT_FOUND

    return pick(categories, category.subcategoriesIds)
  }

  bindSubCategories = async (
    categoryId: IServiceCategoryModel['id'],
    subcategoriesIds: IServiceCategoryModel['id'][],
  ) => {
    const category = await this.read(categoryId)
    const categories = await this.readAll()

    if (!categories) return EDbStatus.ERROR

    const isEveryCategoryExists = subcategoriesIds.every(id => Boolean(categories[id]))

    if (!isEveryCategoryExists) return EDbStatus.ERROR

    const existedSubCategoriesIds = category?.subcategoriesIds ? category?.subcategoriesIds : []

    return await this.update(categoryId, {
      subcategoriesIds: uniq([...existedSubCategoriesIds, ...subcategoriesIds]),
    })
  }
}
