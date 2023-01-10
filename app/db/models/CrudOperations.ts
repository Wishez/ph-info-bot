import { v4 as uuid } from 'uuid'
import { dbClient } from '../index'
import { EDbStatus } from '../types'
import { IBaseCrudModel } from './types'

interface ICrudOperationsOptions {
  namespace: string
  modelName: string
}

export class CrudOperations<GModel extends IBaseCrudModel> {
  modelNamespace: string

  constructor(options: ICrudOperationsOptions) {
    const { namespace, modelName } = options
    const isTest = process.env.NODE_ENV === 'test'
    this.modelNamespace = `${namespace}.${modelName}${isTest ? '.test' : ''}`
  }

  readAll = async () => {
    return await dbClient.get<Record<string, GModel>>(this.modelNamespace)
  }

  read = async (id: GModel['id']) => {
    const models = await this.readAll()

    return models && models[id]
  }

  create = async (model: Omit<GModel, 'id' | 'createdAt'>) => {
    const models = await this.readAll()
    const id = uuid()
    const modelWithId = { ...model, id, createdAt: new Date().toISOString() } as GModel

    if (models) {
      models[id] = modelWithId

      return {
        id,
        status: dbClient.set(this.modelNamespace, models),
      }
    }

    return {
      id,
      status: dbClient.set(this.modelNamespace, { [id]: modelWithId }),
    }
  }

  update = async (
    id: GModel['id'],
    updatedModelProperties: Partial<Omit<GModel, 'id' | 'createdAt'>>,
  ) => {
    const models = await this.readAll()

    if (!models) return EDbStatus.ERROR

    models[id] = {
      ...models[id],
      ...updatedModelProperties,
      createdAt: models[id]?.createdAt,
      id,
      updatedAt: new Date().toISOString(),
    } as GModel

    return dbClient.set(this.modelNamespace, models)
  }

  delete = async (id: GModel['id']) => {
    const models = await this.readAll()

    if (!models) return EDbStatus.OK

    delete models[id]

    return dbClient.set(this.modelNamespace, models)
  }
}
