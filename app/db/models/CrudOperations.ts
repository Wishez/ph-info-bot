import { v4 as uuid } from 'uuid'
import { PromiseQueue } from '../../utils/PromiseQueue'
import { dbClient } from '../index'
import { EDbStatus } from '../types'
import { IBaseCrudModel } from './types'

interface ICrudOperationsOptions {
  namespace: string
  modelName: string
}

export class CrudOperations<GModel extends IBaseCrudModel> {
  modelNamespace: string
  private queue = new PromiseQueue<{ id: string; status: EDbStatus } | EDbStatus>()

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

  async create(model: Omit<GModel, 'id' | 'createdAt' | 'updatedAt'>, customId?: string) {
    return (await this.queue.add(async () => {
      const models = await this.readAll()
      const id = customId || uuid()
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
    })) as { id: string; status: EDbStatus }
  }

  async update(
    id: GModel['id'],
    updatedModelProperties: Partial<Omit<GModel, 'id' | 'createdAt' | 'updatedAt'>>,
  ) {
    return (await this.queue.add(async () => {
      const models = await this.readAll()

      if (!models) return EDbStatus.ERROR

      models[id] = {
        ...models[id],
        ...updatedModelProperties,
        id,
        updatedAt: new Date().toISOString(),
      } as GModel

      return dbClient.set(this.modelNamespace, models)
    })) as EDbStatus
  }

  async delete(id: GModel['id']) {
    return (await this.queue.add(async () => {
      const models = await this.readAll()
      if (!models || !models[id]) return EDbStatus.NOT_FOUND

      delete models[id]

      return dbClient.set(this.modelNamespace, models)
    })) as EDbStatus
  }
}
