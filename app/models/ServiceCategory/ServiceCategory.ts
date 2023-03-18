import pick from 'lodash/pick'
import uniq from 'lodash/uniq'
import without from 'lodash/without'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { IServiceCategoryModel } from './types'

export class ServiceCategory extends CrudOperations<IServiceCategoryModel> {
  constructor() {
    super({ namespace: 'bot', modelName: 'serviceCategory' })
  }

  create = async (
    model: Omit<IServiceCategoryModel, 'id' | 'updatedAt' | 'createdAt' | 'servicesIds'>,
  ) => {
    return await super.create({
      ...model,
      servicesIds: [],
    })
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
    const updatingStatus = await this.update(categoryId, {
      subcategoriesIds: uniq([...existedSubCategoriesIds, ...subcategoriesIds]),
    })

    const settingParentStatuses = await Promise.all(
      subcategoriesIds.map(id => this.update(id, { parentId: categoryId })),
    )

    return updatingStatus === EDbStatus.OK &&
      settingParentStatuses.every(status => status === EDbStatus.OK)
      ? EDbStatus.OK
      : EDbStatus.ERROR
  }

  unmountSubCategories = async (
    categoryId: IServiceCategoryModel['id'],
    subcategoriesIds: IServiceCategoryModel['id'][],
  ) => {
    const category = await this.read(categoryId)
    const categories = await this.readAll()

    if (!categories) return EDbStatus.ERROR

    const isEveryCategoryExists = subcategoriesIds.every(id => Boolean(categories[id]))

    if (!isEveryCategoryExists) return EDbStatus.ERROR

    const existedSubCategoriesIds = category?.subcategoriesIds ? category?.subcategoriesIds : []
    const updatingStatus = await this.update(categoryId, {
      subcategoriesIds: without(existedSubCategoriesIds, ...subcategoriesIds),
    })
    const settingParentStatuses = await Promise.all(
      subcategoriesIds.map(id => this.update(id, { parentId: undefined })),
    )

    return updatingStatus === EDbStatus.OK &&
      settingParentStatuses.every(status => status === EDbStatus.OK)
      ? EDbStatus.OK
      : EDbStatus.ERROR
  }
}
