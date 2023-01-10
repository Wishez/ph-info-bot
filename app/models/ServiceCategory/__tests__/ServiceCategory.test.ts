import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { ServiceCategory } from '../ServiceCategory'
import { IServiceCategoryModel } from '../types'
import { getServiceCategoryByName } from '../utils'

describe('ServiceCategory', () => {
  test('init', () => {
    const serviceCategory = new ServiceCategory()
    expect('read' in serviceCategory).toBeTruthy()
    expect('readAll' in serviceCategory).toBeTruthy()
    expect('create' in serviceCategory).toBeTruthy()
    expect('update' in serviceCategory).toBeTruthy()
    expect('delete' in serviceCategory).toBeTruthy()
    expect(serviceCategory.modelNamespace).toBe('bot.serviceCategory.test')
  })

  const name: IServiceCategoryModel['name'] = uniqueId('serviceCategoryName')
  const secondName: IServiceCategoryModel['name'] = uniqueId('serviceCategoryName')
  const description: IServiceCategoryModel['description'] = uniqueId('serviceCategoryDescription')
  const updatedDescription: IServiceCategoryModel['description'] = uniqueId(
    'serviceCategoryDescription',
  )
  test('create', async () => {
    expect.assertions(1)
    const serviceCategory = new ServiceCategory()
    const { status } = await serviceCategory.create({ name, description })

    expect(status).toBe(EDbStatus.OK)
  })

  test('read all', async () => {
    expect.assertions(2)
    const serviceCategory = new ServiceCategory()
    const models = await serviceCategory.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(2)
    const serviceCategory = new ServiceCategory()

    const modelFromModels = await getServiceCategoryByName(serviceCategory, name)
    if (!modelFromModels?.id) return

    const model = await serviceCategory.read(modelFromModels?.id)

    expect(model?.description).toBe(description)
    expect(model?.name).toBe(name)
  })

  test('update', async () => {
    expect.assertions(3)
    const serviceCategory = new ServiceCategory()
    const model = await getServiceCategoryByName(serviceCategory, name)
    if (!model?.id) return

    const status = await serviceCategory.update(model.id, { description: updatedDescription })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await serviceCategory.read(model.id)

    expect(nextModel?.description).toBe(updatedDescription)
    expect(nextModel?.name).toBe(name)
  })

  test('bindSubCategory', async () => {
    expect.assertions(4)
    const serviceCategory = new ServiceCategory()
    const model = await getServiceCategoryByName(serviceCategory, name)
    if (!model?.id) return

    const { status: newCategoryCreationStatus } = await serviceCategory.create({
      description,
      name: secondName,
    })

    expect(newCategoryCreationStatus).toBe(EDbStatus.OK)

    const subCategory = await getServiceCategoryByName(serviceCategory, secondName)
    if (!subCategory) return

    const status = await serviceCategory.bindSubCategory(model.id, subCategory.id)

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await serviceCategory.read(model.id)

    if (!nextModel) return

    expect(nextModel.name).toBe(name)
    expect(nextModel.subcategoriesIds?.includes(subCategory.id)).toBeTruthy()
  })

  test('getSubCategories', async () => {
    expect.assertions(1)
    const serviceCategory = new ServiceCategory()
    const model = await getServiceCategoryByName(serviceCategory, name)
    if (!model?.id) return

    const subCategory = await getServiceCategoryByName(serviceCategory, secondName)
    if (!subCategory) return

    const subCategories = await serviceCategory.getSubCategories(model.id)

    if (!(subCategories instanceof Object)) return

    expect(subCategories[subCategory.id]?.id).toBe(subCategory.id)
  })

  test('delete', async () => {
    expect.assertions(2)
    const serviceCategory = new ServiceCategory()
    const category = await getServiceCategoryByName(serviceCategory, name)
    const subCategory = await getServiceCategoryByName(serviceCategory, secondName)
    if (!subCategory?.id || !category?.id) return

    const categoryStatus = await serviceCategory.delete(category.id)
    const subCategoryStatus = await serviceCategory.delete(subCategory.id)

    expect(categoryStatus).toBe(EDbStatus.OK)
    expect(subCategoryStatus).toBe(EDbStatus.OK)
  })

  afterAll(() => {
    const serviceCategory = new ServiceCategory()
    dbClient.deleteNamespace(serviceCategory.modelNamespace)
  })
})
