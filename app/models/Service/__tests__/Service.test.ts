import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { IServiceAttributeModel } from '../../ServiceAttribute/types'
import { getServiceAttributeByName } from '../../ServiceAttribute/utils'
import { IServiceCategoryModel } from '../../ServiceCategory/types'
import { getServiceCategoryByName } from '../../ServiceCategory/utils'
import { Service } from '../Service'
import { IServiceModel } from '../types'
import { getServiceByName } from '../utils'

describe('Service', () => {
  test('init', () => {
    const service = new Service()
    expect('read' in service).toBeTruthy()
    expect('readAll' in service).toBeTruthy()
    expect('create' in service).toBeTruthy()
    expect('update' in service).toBeTruthy()
    expect('delete' in service).toBeTruthy()
    expect(service.modelNamespace.startsWith('bot.service')).toBeTruthy()
  })

  const name: IServiceModel['name'] = uniqueId('serviceName')
  const categoryName: IServiceCategoryModel['name'] = uniqueId('serviceCategoryName')
  const attributeName: IServiceAttributeModel['name'] = uniqueId('serviceAttributeName')
  const secondCategoryName: IServiceCategoryModel['name'] = uniqueId('serviceCategoryName')
  const description: IServiceModel['description'] = uniqueId('serviceDescription')
  const updatedDescription: IServiceModel['description'] = uniqueId('serviceDescription')
  test('create', async () => {
    expect.assertions(5)
    const service = new Service()
    const { status: categoryCreationStatus } = await service.serviceCategory.create({
      name: categoryName,
      description,
    })

    expect(categoryCreationStatus).toBe(EDbStatus.OK)

    const category = await getServiceCategoryByName(service.serviceCategory, categoryName)

    if (!category) return

    expect(category.name).toBe(categoryName)

    const { status: attributeCreationStatus } = await service.serviceAttribute.create({
      name: attributeName,
      notice: description,
      isRequired: false,
      order: 0,
    })

    expect(attributeCreationStatus).toBe(EDbStatus.OK)

    const attribute = await getServiceAttributeByName(service.serviceAttribute, attributeName)

    if (!attribute) return

    expect(attribute.name).toBe(attributeName)

    const { status } = await service.create({
      name,
      description,
      categoryId: category.id,
      attributesIds: [],
    })

    expect(status).toBe(EDbStatus.OK)
  })

  test('read all', async () => {
    expect.assertions(2)
    const service = new Service()
    const models = await service.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(3)
    const service = new Service()

    const modelFromModels = await getServiceByName(service, name)
    if (!modelFromModels?.id) return

    const model = await service.read(modelFromModels.id)
    if (!model) return

    expect(model.name).toBe(name)
    expect(model.description).toBe(description)
    expect(typeof model.createdAt).toBe('string')
  })

  test('update', async () => {
    expect.assertions(3)
    const service = new Service()
    const model = await getServiceByName(service, name)
    if (!model?.id) return

    const status = await service.update(model.id, {
      description: updatedDescription,
    })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await service.read(model.id)
    if (!nextModel) return

    expect(typeof nextModel.updatedAt).toBe('string')
    expect(nextModel.description).toBe(updatedDescription)
  })

  test('bindServiceCategory', async () => {
    expect.assertions(3)
    const service = new Service()
    const model = await getServiceByName(service, name)
    if (!model?.id) return

    const { status: categoryCreationStatus } = await service.serviceCategory.create({
      name: secondCategoryName,
      description,
    })

    expect(categoryCreationStatus).toBe(EDbStatus.OK)
    const nextCategory = await getServiceCategoryByName(service.serviceCategory, secondCategoryName)
    if (!nextCategory) return

    const status = await service.bindServiceCategory(model.id, nextCategory.id)

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await service.read(model.id)
    if (!nextModel) return

    expect(nextModel.categoryId).toBe(nextCategory.id)
  })

  test('bindServiceAttributes', async () => {
    expect.assertions(3)
    const service = new Service()
    const model = await getServiceByName(service, name)
    if (!model?.id) return

    const attribute = await getServiceAttributeByName(service.serviceAttribute, attributeName)
    if (!attribute) return

    expect(attribute.name).toBe(attributeName)

    const status = await service.bindServiceAttributes(model.id, [attribute.id])

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await service.read(model.id)
    if (!nextModel) return

    expect(nextModel.attributesIds[0]).toBe(attribute.id)
  })

  test('getServiceAttributes', async () => {
    expect.assertions(3)
    const service = new Service()
    const model = await getServiceByName(service, name)
    if (!model?.id) return

    const attribute = await getServiceAttributeByName(service.serviceAttribute, attributeName)
    if (!attribute) return

    expect(attribute.name).toBe(attributeName)

    const attributes = await service.getServiceAttributes(model.id)

    if (attributes === EDbStatus.NOT_FOUND) return

    expect(attributes[attribute.id]?.id).toBe(attribute.id)
    expect(Object.values(attributes).length).toBe(1)
  })

  test('deleteServiceAttribute', async () => {
    expect.assertions(3)
    const service = new Service()
    const model = await getServiceByName(service, name)
    if (!model?.id) return

    const attribute = await getServiceAttributeByName(service.serviceAttribute, attributeName)
    if (!attribute) return

    expect(attribute.name).toBe(attributeName)

    const isDeleted = await service.deleteServiceAttribute(model.id, attribute.id)

    expect(isDeleted).toBeTruthy()

    const nextModel = await service.read(model.id)
    if (!nextModel) return

    expect(nextModel.attributesIds.length).toBe(0)
  })

  test('getServiceCategory', async () => {
    expect.assertions(2)
    const service = new Service()
    const model = await getServiceByName(service, name)
    if (!model?.id) return

    const category = await getServiceCategoryByName(service.serviceCategory, secondCategoryName)
    if (!category) return

    expect(category.name).toBe(secondCategoryName)

    const boundCategory = await service.getServiceCategory(model.id)

    if (boundCategory === EDbStatus.NOT_FOUND) return

    expect(boundCategory.id).toBe(category.id)
  })

  test('getServicesByIds', async () => {
    expect.assertions(1)
    const service = new Service()
    const model = await getServiceByName(service, name)
    if (!model?.id) return

    const services = await service.getServicesByIds([model.id])
    if (services === EDbStatus.NOT_FOUND) return

    expect(services[model.id]?.id).toBe(model.id)
  })

  test('delete', async () => {
    expect.assertions(1)
    const service = new Service()
    const model = await getServiceByName(service, name)
    if (!model?.id) return

    const status = await service.delete(model.id)

    expect(status).toBe(EDbStatus.OK)
  })

  afterAll(() => {
    const service = new Service()
    dbClient.deleteNamespace(service.modelNamespace)
    dbClient.deleteNamespace(service.serviceCategory.modelNamespace)
    dbClient.deleteNamespace(service.serviceAttribute.modelNamespace)
  })
})
