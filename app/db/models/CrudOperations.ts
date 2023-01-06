import { v4 as uuid } from 'uuid'
import { dbClient } from '../index'
import { EDbStatus } from '../types'

interface ICrudOperationsOptions {
  namespace: string
  modelName: string
}

export class CrudOperations<GModel extends { id: string }> {
  modelNamespace: string

  constructor(options: ICrudOperationsOptions) {
    const { namespace, modelName } = options
    this.modelNamespace = `${namespace}.${modelName}`
  }

  readAll = async () => {
    return await dbClient.get<Record<string, GModel>>(this.modelNamespace)
  }

  read = async (id: GModel['id']) => {
    const models = await this.readAll()

    return models && models[id]
  }

  create = async (model: Omit<GModel, 'id'>) => {
    const models = await this.readAll()
    const id = uuid()
    const modelWithId = { ...model, id } as GModel

    if (models) {
      models[id] = modelWithId

      return dbClient.set(this.modelNamespace, models)
    }

    return dbClient.set(this.modelNamespace, { [id]: modelWithId })
  }

  update = async (id: GModel['id'], updatedModelProperties: Partial<Omit<GModel, 'id'>>) => {
    const models = await this.readAll()

    if (!models) return EDbStatus.ERROR

    models[id] = { ...models[id], ...updatedModelProperties } as GModel

    return dbClient.set(this.modelNamespace, models)
  }

  delete = async (id: GModel['id']) => {
    const models = await this.readAll()

    if (!models) return EDbStatus.OK

    delete models[id]

    return dbClient.set(this.modelNamespace, models)
  }
}
