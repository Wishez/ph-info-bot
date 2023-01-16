import pick from 'lodash/pick'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { Client } from '../Client/Client'
import { ServiceAttribute } from '../ServiceAttribute/ServiceAttribute'
import { IServiceAttributeModel } from '../ServiceAttribute/types'
import { IFilledServiceAttributeModel } from './types'

export class FilledServiceAttribute extends CrudOperations<IFilledServiceAttributeModel> {
  client = new Client()
  serviceAttribute = new ServiceAttribute()

  constructor() {
    super({ namespace: 'bot', modelName: 'filledServiceAttribute' })
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
  ): Promise<Record<string, IFilledServiceAttributeModel> | EDbStatus.NOT_FOUND> => {
    const filledAttributes = await this.readAll()
    if (!filledAttributes) return EDbStatus.NOT_FOUND

    const isSomeFilledAttributeNotExists = filledAttributesIds.some(id => !filledAttributes[id])
    if (isSomeFilledAttributeNotExists) return EDbStatus.NOT_FOUND

    return pick(filledAttributes, filledAttributesIds)
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
    const filledService = await this.read(id)
    if (!filledService) return EDbStatus.NOT_FOUND

    const client = await this.client.read(filledService.clientId)
    if (!client) return EDbStatus.NOT_FOUND

    return client
  }

  create = async (model: Omit<IFilledServiceAttributeModel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const client = await this.client.read(model.clientId)
    const serviceAttribute = await this.serviceAttribute.read(model.serviceAttributeId)
    const id = this.getFilledAttributeId(model)

    if (!client || !serviceAttribute) {
      return {
        id,
        status: EDbStatus.ERROR,
      }
    }

    return await super.create(model, id)
  }

  private getFilledAttributeId = ({
    clientId,
    serviceAttributeId,
  }: Pick<IFilledServiceAttributeModel, 'orderId' | 'clientId' | 'serviceAttributeId'>) =>
    `${clientId}_${serviceAttributeId}`

  // TODO добавить метод getOrder и заменить получение клиента (getClient) через orderId заполненного атрибута
  // добавить в айди orderId взамен clientId
  getOrder = async () => {
    return
  }
}
