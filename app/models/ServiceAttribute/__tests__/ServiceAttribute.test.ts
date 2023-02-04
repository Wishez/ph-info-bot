import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { ServiceAttribute } from '../ServiceAttribute'
import { IServiceAttributeModel } from '../types'
import { getServiceAttributeByName } from '../utils'

describe('ServiceAttribute', () => {
  test('init', () => {
    const serviceAttribute = new ServiceAttribute()
    expect('read' in serviceAttribute).toBeTruthy()
    expect('readAll' in serviceAttribute).toBeTruthy()
    expect('create' in serviceAttribute).toBeTruthy()
    expect('update' in serviceAttribute).toBeTruthy()
    expect('delete' in serviceAttribute).toBeTruthy()
    expect(serviceAttribute.modelNamespace.startsWith('bot.serviceAttribute')).toBeTruthy()
  })

  const name: IServiceAttributeModel['name'] = uniqueId('serviceAttributeName')
  const order: IServiceAttributeModel['order'] = 0
  const isRequired: IServiceAttributeModel['isRequired'] = true
  const updatedNotice: IServiceAttributeModel['notice'] = uniqueId('serviceAttributeNotice')
  const notice: IServiceAttributeModel['notice'] = uniqueId('serviceAttributeNotice')
  test('create', async () => {
    expect.assertions(1)
    const serviceAttribute = new ServiceAttribute()
    const { status } = await serviceAttribute.create({ name, notice, order, isRequired })

    expect(status).toBe(EDbStatus.OK)
  })

  test('read all', async () => {
    expect.assertions(2)
    const serviceAttribute = new ServiceAttribute()
    const models = await serviceAttribute.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(4)
    const serviceAttribute = new ServiceAttribute()

    const modelFromModels = await getServiceAttributeByName(serviceAttribute, name)
    if (!modelFromModels?.id) return

    const model = await serviceAttribute.read(modelFromModels?.id)
    if (!model) return

    expect(model.notice).toBe(notice)
    expect(model.isRequired).toBe(isRequired)
    expect(model.order).toBe(order)
    expect(model.name).toBe(name)
  })

  test('update', async () => {
    expect.assertions(4)
    const serviceAttribute = new ServiceAttribute()
    const model = await getServiceAttributeByName(serviceAttribute, name)
    if (!model?.id) return

    const status = await serviceAttribute.update(model.id, {
      notice: updatedNotice,
      isRequired: false,
    })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await serviceAttribute.read(model.id)
    if (!nextModel) return

    expect(typeof nextModel.updatedAt).toBe('string')
    expect(nextModel.isRequired).toBeFalsy()
    expect(nextModel.notice).toBe(updatedNotice)
  })

  test('delete', async () => {
    expect.assertions(1)
    const serviceAttribute = new ServiceAttribute()
    const model = await getServiceAttributeByName(serviceAttribute, name)
    if (!model?.id) return

    const status = await serviceAttribute.delete(model.id)

    expect(status).toBe(EDbStatus.OK)
  })

  afterAll(() => {
    const serviceAttribute = new ServiceAttribute()
    dbClient.deleteNamespace(serviceAttribute.modelNamespace)
  })
})
