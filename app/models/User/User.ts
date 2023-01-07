import { CrudOperations } from '../../db/models'
import { IUserModel } from './types'

export class User extends CrudOperations<IUserModel> {
  constructor() {
    super({ namespace: 'bot', modelName: 'user' })
  }
}
