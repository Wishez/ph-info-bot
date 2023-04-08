import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { IServiceAttributeModel } from '../../ServiceAttribute/types'
import { getServiceAttributeByName } from '../../ServiceAttribute/utils'
import { IServiceCategoryModel } from '../../ServiceCategory/types'
import { getServiceCategoryByName } from '../../ServiceCategory/utils'
import { Service } from '../Service'
import { EServiceType, IServiceModel } from '../types'
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

  const serviceWithFormName: IServiceModel['name'] = uniqueId('serviceName')
  const serviceWithPortfolioName: IServiceModel['name'] = uniqueId('serviceName')
  const categoryName: IServiceCategoryModel['name'] = uniqueId('serviceCategoryName')
  const attributeName: IServiceAttributeModel['name'] = uniqueId('serviceAttributeName')
  const secondCategoryName: IServiceCategoryModel['name'] = uniqueId('serviceCategoryName')
  const description: IServiceModel['description'] = uniqueId('serviceDescription')
  const updatedDescription: IServiceModel['description'] = uniqueId('serviceDescription')
  test('create', async () => {
    expect.assertions(9)
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

    const { status: creationServiceWithFormStatus, id: serviceWithFormId } = await service.create({
      name: serviceWithFormName,
      description,
      categoryId: category.id,
      attributesIds: [],
      providersIds: [],
      serviceType: EServiceType.FORM,
    })
    const { status: creationServiceWithPortfolioStatus } = await service.create({
      name: serviceWithPortfolioName,
      description,
      categoryId: category.id,
      attributesIds: [],
      providersIds: [],
      serviceType: EServiceType.PORTFOLIO,
    })
    expect(creationServiceWithFormStatus).toBe(EDbStatus.OK)
    expect(creationServiceWithPortfolioStatus).toBe(EDbStatus.OK)

    const serviceModel = await service.read(serviceWithFormId)
    const categoryModel = await service.serviceCategory.read(category.id)
    if (!serviceModel || !categoryModel) return

    expect(serviceModel.serviceType).toBe(EServiceType.FORM)
    expect(serviceModel.categoryId).toBe(category.id)
    expect(categoryModel.servicesIds.includes(serviceWithFormId)).toBeTruthy()
  })

  test('read all', async () => {
    expect.assertions(2)
    const service = new Service()
    const models = await service.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(4)
    const service = new Service()

    const modelFromModels = await getServiceByName(service, serviceWithFormName)
    if (!modelFromModels?.id) return

    const serviceModel = await service.read(modelFromModels.id)
    if (!serviceModel) return

    const category = await service.serviceCategory.read(serviceModel.categoryId)
    if (!category) return

    expect(category.servicesIds.includes(serviceModel.id)).toBeTruthy()
    expect(serviceModel.name).toBe(serviceWithFormName)
    expect(serviceModel.description).toBe(description)
    expect(typeof serviceModel.createdAt).toBe('string')
  })

  test('update', async () => {
    expect.assertions(3)
    const service = new Service()
    const model = await getServiceByName(service, serviceWithFormName)
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
    expect.assertions(5)
    const service = new Service()
    const model = await getServiceByName(service, serviceWithFormName)
    if (!model?.id) return

    const { status: categoryCreationStatus } = await service.serviceCategory.create({
      name: secondCategoryName,
      description,
    })

    expect(categoryCreationStatus).toBe(EDbStatus.OK)

    const nextBindingCategory = await getServiceCategoryByName(
      service.serviceCategory,
      secondCategoryName,
    )
    if (!nextBindingCategory) return

    const status = await service.bindServiceCategory(model.id, nextBindingCategory.id)

    expect(status).toBe(EDbStatus.OK)

    const previousCategory = await service.serviceCategory.read(model.categoryId)
    const nextModel = await service.read(model.id)
    const nextCategoryModel = await service.serviceCategory.read(nextBindingCategory.id)
    if (!(nextModel && previousCategory && nextCategoryModel)) return

    expect(nextModel.categoryId).toBe(nextBindingCategory.id)
    expect(nextCategoryModel.servicesIds.includes(nextModel.id)).toBeTruthy()
    expect(previousCategory.servicesIds.includes(nextModel.id)).toBeFalsy()
  })

  test('bindServiceAttributes', async () => {
    expect.assertions(4)
    const service = new Service()
    const modelWithForm = await getServiceByName(service, serviceWithFormName)
    const modelWithPortfolio = await getServiceByName(service, serviceWithPortfolioName)
    if (!(modelWithForm?.id && modelWithPortfolio?.id)) return

    const attribute = await getServiceAttributeByName(service.serviceAttribute, attributeName)
    if (!attribute) return

    expect(attribute.name).toBe(attributeName)

    const bindingStatusOfServiceWithForm = await service.bindServiceAttributes(modelWithForm.id, [
      attribute.id,
    ])
    const bindingStatusOfServiceWithPortfolio = await service.bindServiceAttributes(
      modelWithPortfolio.id,
      [attribute.id],
    )

    expect(bindingStatusOfServiceWithForm).toBe(EDbStatus.OK)
    expect(bindingStatusOfServiceWithPortfolio).toBe(EDbStatus.ERROR)

    const nextModelWithForm = await service.read(modelWithForm.id)
    if (!nextModelWithForm) return

    expect(nextModelWithForm.attributesIds?.[0]).toBe(attribute.id)
  })

  test('getServiceAttributes', async () => {
    expect.assertions(3)
    const service = new Service()
    const model = await getServiceByName(service, serviceWithFormName)
    if (!model?.id) return

    const attribute = await getServiceAttributeByName(service.serviceAttribute, attributeName)
    if (!attribute) return

    expect(attribute.name).toBe(attributeName)

    const attributes = await service.getServiceAttributes(model.id)

    if (attributes === EDbStatus.NOT_FOUND) return

    expect(attributes[attribute.id]?.id).toBe(attribute.id)
    expect(Object.values(attributes).length).toBe(1)
  })

  test('update after binding attributes', async () => {
    expect.assertions(2)
    const service = new Service()
    const model = await getServiceByName(service, serviceWithFormName)
    if (!model?.id) return

    const status = await service.update(model.id, {
      description,
    })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await service.read(model.id)
    if (!nextModel) return

    expect(nextModel.attributesIds?.length).toBe(1)
  })

  test('deleteServiceAttributes', async () => {
    expect.assertions(4)
    const service = new Service()
    const modelWithForm = await getServiceByName(service, serviceWithFormName)
    const modelWithPortfolio = await getServiceByName(service, serviceWithPortfolioName)
    if (!(modelWithForm && modelWithPortfolio)) return

    const attribute = await getServiceAttributeByName(service.serviceAttribute, attributeName)
    if (!attribute) return

    expect(attribute.name).toBe(attributeName)

    const deletingStatusOfServiceWithForm = await service.deleteServiceAttributes(
      modelWithForm.id,
      [attribute.id],
    )
    const deletingStatusOfServiceWithPortfolio = await service.deleteServiceAttributes(
      modelWithPortfolio.id,
      [attribute.id],
    )

    expect(deletingStatusOfServiceWithForm).toBe(EDbStatus.OK)
    expect(deletingStatusOfServiceWithPortfolio).toBe(EDbStatus.ERROR)

    const nextModel = await service.read(modelWithForm.id)
    if (!nextModel) return

    expect(nextModel.attributesIds?.length).toBe(0)
  })

  test('getServiceCategory', async () => {
    expect.assertions(2)
    const service = new Service()
    const model = await getServiceByName(service, serviceWithFormName)
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
    const model = await getServiceByName(service, serviceWithFormName)
    if (!model?.id) return

    const services = await service.getServicesByIds([model.id])
    if (services === EDbStatus.NOT_FOUND) return

    expect(services[model.id]?.id).toBe(model.id)
  })

  test('delete', async () => {
    expect.assertions(1)
    const service = new Service()
    const model = await getServiceByName(service, serviceWithFormName)
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
