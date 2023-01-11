import pick from 'lodash/pick'
import uniq from 'lodash/uniq'
import without from 'lodash/without'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { ServiceAttribute } from '../ServiceAttribute/ServiceAttribute'
import { IServiceAttributeModel } from '../ServiceAttribute/types'
import { ServiceCategory } from '../ServiceCategory/ServiceCategory'
import { IServiceModel } from './types'

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

  bindServiceCategory = async (serviceId: IServiceModel['id'], categoryId: IServiceModel['id']) => {
    const category = await this.serviceCategory.read(categoryId)
    if (!category) return EDbStatus.NOT_FOUND

    return await this.update(serviceId, { categoryId })
  }

  bindServiceAttributes = async (
    id: IServiceModel['id'],
    serviceAttributesIds: IServiceModel['attributesIds'],
  ) => {
    const service = await this.read(id)

    if (!service) return EDbStatus.NOT_FOUND

    const serviceAttributes = await this.serviceAttribute.readAll()
    if (!serviceAttributes) return EDbStatus.ERROR

    const isSomeAttributeIdWrong = serviceAttributesIds.some(
      attributeId => !serviceAttributes[attributeId],
    )
    if (isSomeAttributeIdWrong) return EDbStatus.ERROR

    return await this.update(id, {
      attributesIds: uniq([...serviceAttributesIds, ...(service.attributesIds || [])]),
    })
  }

  removeServiceAttribute = async (
    serviceId: IServiceModel['id'],
    serviceAttributeId: IServiceAttributeModel['id'],
  ) => {
    const service = await this.read(serviceId)

    if (!service) return EDbStatus.NOT_FOUND

    const serviceAttribute = await this.serviceAttribute.read(serviceAttributeId)
    if (!serviceAttribute) return EDbStatus.NOT_FOUND

    return await this.update(serviceId, {
      attributesIds: without(service.attributesIds, serviceAttributeId),
    })
  }
}
