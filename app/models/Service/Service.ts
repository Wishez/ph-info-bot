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

    if (!service) return false

    const allAttributes = await this.serviceAttribute.readAll()
    if (!allAttributes) return false

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

    return (
      updatingAttributesStatuses.some(status => status !== EDbStatus.ERROR) &&
      updatingStatus === EDbStatus.OK
    )
  }
}
