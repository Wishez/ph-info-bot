import { CrudOperations } from '../../db/models'
import { IServiceAttributeModel } from './types'

export class ServiceAttribute extends CrudOperations<IServiceAttributeModel> {
  constructor() {
    super({ namespace: 'bot', modelName: 'serviceAttribute' })
  }
}
