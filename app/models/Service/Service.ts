import pick from 'lodash/pick'
import uniq from 'lodash/uniq'
import without from 'lodash/without'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { ServiceAttribute } from '../ServiceAttribute/ServiceAttribute'
import { IServiceAttributeModel } from '../ServiceAttribute/types'
import { ServiceCategory } from '../ServiceCategory/ServiceCategory'
import { EServiceType, IServiceModel } from './types'

export class Service extends CrudOperations<IServiceModel> {
  serviceCategory = new ServiceCategory()
  serviceAttribute = new ServiceAttribute()

  constructor() {
    super({ namespace: 'bot', modelName: 'service' })
  }

  getServicesByIds = async (
    servicesIds: Array<IServiceModel['id']>,
  ): Promise<Record<string, IServiceModel> | EDbStatus.NOT_FOUND> => {
    const services = await this.readAll()
    if (!services) return EDbStatus.NOT_FOUND

    const isSomeServiceNotInList = servicesIds.some(serviceId => !services[serviceId])
    if (isSomeServiceNotInList) return EDbStatus.NOT_FOUND

    return pick(services, servicesIds)
  }

  getServiceAttributes = async (
    id: IServiceModel['id'],
  ): Promise<Record<string, IServiceAttributeModel> | EDbStatus.NOT_FOUND> => {
    const service = await this.read(id)

    if (!service) return EDbStatus.NOT_FOUND

    const serviceAttributes = await this.serviceAttribute.readAll()

    if (!serviceAttributes) return EDbStatus.NOT_FOUND

    return pick(serviceAttributes, service.attributesIds || [])
  }

  getServiceCategory = async (id: IServiceModel['id']) => {
    const service = await this.read(id)

    if (!service) return EDbStatus.NOT_FOUND

    const serviceCategory = await this.serviceCategory.read(service.categoryId)

    if (!serviceCategory) return EDbStatus.NOT_FOUND

    return serviceCategory
  }

  create = async (model: Omit<IServiceModel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const creationState = await super.create(model)

    if (creationState.status === EDbStatus.OK) {
      const bindingCategoryStatus = await this.bindServiceCategory(
        creationState.id,
        model.categoryId,
      )

      return bindingCategoryStatus === EDbStatus.OK
        ? creationState
        : {
            id: creationState.id,
            status: EDbStatus.ERROR,
            message: "Can't bind category to service, but service was created",
          }
    }

    return creationState
  }

  update = async (
    id: IServiceModel['id'],
    model: Partial<Omit<IServiceModel, 'id' | 'createdAt' | 'updatedAt' | 'serviceType'>>,
  ) => {
    const service = await this.read(id)
    if (!service) return EDbStatus.ERROR

    if (model.attributesIds && service.serviceType === EServiceType.FORM) {
      return await super.update(id, model)
    }

    return await super.update(id, { ...model, attributesIds: [] })
  }

  bindServiceCategory = async (serviceId: IServiceModel['id'], categoryId: IServiceModel['id']) => {
    const category = await this.serviceCategory.read(categoryId)
    const service = await this.read(serviceId)
    if (!(category && service)) return EDbStatus.NOT_FOUND

    const previousCategory = await this.serviceCategory.read(service.categoryId)
    if (!previousCategory) return EDbStatus.NOT_FOUND

    const updatingPreviousCategoryStatus = await this.serviceCategory.update(service.categoryId, {
      servicesIds: without(previousCategory.servicesIds, serviceId),
    })
    const updatingServiceStatus = await this.update(serviceId, { categoryId })
    const updatingCategoryStatus = await this.serviceCategory.update(categoryId, {
      servicesIds: uniq([...(category.servicesIds || []), serviceId]),
    })

    return [updatingPreviousCategoryStatus, updatingCategoryStatus, updatingServiceStatus].every(
      status => status === EDbStatus.OK,
    )
      ? EDbStatus.OK
      : EDbStatus.ERROR
  }

  bindServiceAttributes = async (
    id: IServiceModel['id'],
    serviceAttributesIds: IServiceAttributeModel['id'][],
  ) => {
    const service = await this.read(id)

    if (!service) return EDbStatus.NOT_FOUND
    if (service.serviceType !== EServiceType.FORM) return EDbStatus.ERROR

    const serviceAttributes = await this.serviceAttribute.readAll()
    if (!serviceAttributes) return EDbStatus.ERROR

    const isSomeAttributeIdWrong = serviceAttributesIds.some(
      attributeId => !serviceAttributes[attributeId],
    )
    if (isSomeAttributeIdWrong) return EDbStatus.ERROR

    const updatingStatus = await this.update(id, {
      attributesIds: uniq([...serviceAttributesIds, ...(service.attributesIds || [])]),
    })

    const attributesUpdatingStatues = await Promise.all(
      serviceAttributesIds.map(attributeId =>
        this.serviceAttribute.update(attributeId, { serviceId: id }),
      ),
    )

    return updatingStatus !== EDbStatus.OK ||
      attributesUpdatingStatues.some(status => status !== EDbStatus.OK)
      ? EDbStatus.ERROR
      : EDbStatus.OK
  }

  deleteServiceAttributes = async (
    serviceId: IServiceModel['id'],
    attributesIds: IServiceAttributeModel['id'][],
  ) => {
    const service = await this.read(serviceId)

    if (!service) return EDbStatus.NOT_FOUND
    if (service.serviceType !== EServiceType.FORM) return EDbStatus.ERROR

    const allAttributes = await this.serviceAttribute.readAll()
    if (!allAttributes) return EDbStatus.ERROR

    const deletingServiceAttributes = Object.values(pick(allAttributes, attributesIds))

    const updatingStatus = await this.update(serviceId, {
      attributesIds: without(service.attributesIds, ...attributesIds),
    })
    const updatingAttributesStatuses = await Promise.all(
      deletingServiceAttributes.map(attribute =>
        this.serviceAttribute.update(attribute.id, {
          serviceId: undefined,
        }),
      ),
    )

    return updatingAttributesStatuses.some(status => status !== EDbStatus.ERROR) &&
      updatingStatus === EDbStatus.OK
      ? EDbStatus.OK
      : EDbStatus.ERROR
  }
}
