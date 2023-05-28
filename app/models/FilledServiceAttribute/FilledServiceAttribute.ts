import pick from 'lodash/pick'
import uniq from 'lodash/uniq'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { Order } from '../Order/Order'
import { ServiceAttribute } from '../ServiceAttribute/ServiceAttribute'
import { IServiceAttributeModel } from '../ServiceAttribute/types'
import { IDetailedFilledServiceAttribute, IFilledServiceAttributeModel } from './types'

export class FilledServiceAttribute extends CrudOperations<IFilledServiceAttributeModel> {
  serviceAttribute = new ServiceAttribute()

  constructor() {
    super({ namespace: 'bot', modelName: 'filledServiceAttribute' })
  }

  static get order() {
    return new Order()
  }

  getAttribute = async (id: IFilledServiceAttributeModel['id']) => {
    const filledService = await this.read(id)
    if (!filledService) return EDbStatus.NOT_FOUND

    const attribute = await this.serviceAttribute.read(filledService.serviceAttributeId)
    if (!attribute) return EDbStatus.NOT_FOUND

    return attribute
  }

  getFilledAttributesByIds = async (
    filledAttributesIds: IFilledServiceAttributeModel['id'][],
  ): Promise<Record<string, IDetailedFilledServiceAttribute> | EDbStatus.NOT_FOUND> => {
    const filledAttributes = await this.readAll()
    const attributes = await this.serviceAttribute.readAll()
    if (!filledAttributes || !attributes) return EDbStatus.NOT_FOUND

    const isSomeFilledAttributeNotExists = filledAttributesIds.some(id => !filledAttributes[id])
    if (isSomeFilledAttributeNotExists) return EDbStatus.NOT_FOUND

    return Object.values(pick(filledAttributes, filledAttributesIds)).reduce(
      (result: Record<string, IDetailedFilledServiceAttribute>, filledAttribute) => {
        result[filledAttribute.id] = {
          ...filledAttribute,
          serviceAttribute: attributes[filledAttribute.serviceAttributeId]!,
        }

        return result
      },
      {},
    )
  }

  getAttributesByFilledAttributesIds = async (
    filledAttributesIds: IFilledServiceAttributeModel['id'][],
  ): Promise<Record<string, IServiceAttributeModel> | EDbStatus.NOT_FOUND> => {
    const filledAttributes = await this.readAll()
    if (!filledAttributes) return EDbStatus.NOT_FOUND

    const serviceAttributesIds: IServiceAttributeModel['id'][] = []
    const isSomeFilledAttributeNotExists = filledAttributesIds.some(id => {
      const serviceAttributeId = filledAttributes[id]?.serviceAttributeId

      if (!serviceAttributeId) return true
      serviceAttributesIds.push(serviceAttributeId)

      return false
    })
    if (isSomeFilledAttributeNotExists) return EDbStatus.NOT_FOUND

    const attributes = await this.serviceAttribute.readAll()
    if (!attributes) return EDbStatus.NOT_FOUND

    return pick(attributes, serviceAttributesIds)
  }

  getClient = async (id: IFilledServiceAttributeModel['id']) => {
    const filledAttributeOrder = await this.getOrder(id)

    if (!filledAttributeOrder || filledAttributeOrder === EDbStatus.NOT_FOUND) {
      return EDbStatus.NOT_FOUND
    }

    const client = await FilledServiceAttribute.order.getClient(filledAttributeOrder.id)
    if (!client) return EDbStatus.NOT_FOUND

    return client
  }

  create = async (model: Omit<IFilledServiceAttributeModel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const order = await FilledServiceAttribute.order.read(model.orderId)
    const serviceAttribute = await this.serviceAttribute.read(model.serviceAttributeId)

    if (!order || !serviceAttribute) {
      return {
        id: '',
        status: EDbStatus.ERROR,
      }
    }

    return await super.create(model)
  }

  getOrder = async (id: IFilledServiceAttributeModel['id']) => {
    const filledAttribute = await this.read(id)
    if (!filledAttribute) return EDbStatus.NOT_FOUND

    return await FilledServiceAttribute.order.read(filledAttribute.orderId)
  }

  addReplyMessageId = async (id: IFilledServiceAttributeModel['id'], replyMessageId: number) => {
    const filledAttribute = await this.read(id)
    if (!filledAttribute) return EDbStatus.NOT_FOUND

    return await this.update(id, {
      replyMessageIds: uniq([replyMessageId, ...(filledAttribute.replyMessageIds || [])]),
    })
  }
}
