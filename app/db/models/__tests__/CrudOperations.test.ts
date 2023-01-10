import { dbClient } from '../../index'
import { EDbStatus } from '../../types'
import { CrudOperations } from '../CrudOperations'
import { IBaseCrudModel } from '../types'

const modelName = 'testEntity'
const namespace = 'testNamespace'

interface TestModel extends IBaseCrudModel {
  property: number
}

describe('crud operations class', () => {
  const crud = new CrudOperations<TestModel>({ namespace, modelName })
  test('initialization', () => {
    expect(crud.modelNamespace).toBe(`${namespace}.${modelName}.test`)
  })

  test('create', async () => {
    const { status } = await crud.create({ property: 42 })

    expect(status).toBe(EDbStatus.OK)
  })

  test('readAll', async () => {
    expect.assertions(1)
    const models = await crud.readAll()
    if (!models) return

    expect(Object.values(models)?.[0]?.property).toBe(42)
  })

  test('read', async () => {
    expect.assertions(2)
    const models = await crud.readAll()
    if (!models) return

    const id = Object.values(models)?.[0]?.id
    if (!id) return

    const model = await crud.read(id)

    if (!model) return

    expect(model.property).toBe(42)
    expect(typeof model.createdAt).toBe('string')
  })

  test('update', async () => {
    expect.assertions(3)
    const models = await crud.readAll()
    if (!models) return

    const id = Object.values(models)?.[0]?.id
    if (!id) return

    const status = await crud.update(id, { property: 322 })

    expect(status).toBe(EDbStatus.OK)

    const model = await crud.read(id)

    if (!model) return

    expect(model.property).toBe(322)
    expect(typeof model.updatedAt).toBe('string')
  })

  test('delete', async () => {
    expect.assertions(1)
    const models = await crud.readAll()
    if (!models) return

    const id = Object.values(models)?.[0]?.id
    if (!id) return

    const status = await crud.delete(id)

    expect(status).toBe(EDbStatus.OK)
  })
})

afterAll(() => {
  dbClient.deleteNamespace(`${namespace}.${modelName}.test`)
})
