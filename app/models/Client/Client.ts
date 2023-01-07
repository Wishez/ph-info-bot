import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { User } from '../User/User'
import { IClientModel } from './types'

export class Client extends CrudOperations<IClientModel> {
  user: User

  constructor() {
    super({ namespace: 'bot', modelName: 'client' })
    this.user = new User()
  }

  getUser = async (id: IClientModel['id']) => {
    const clientModel = await this.read(id)
    if (!clientModel) return EDbStatus.NOT_FOUND

    const userModel = await this.user.read(clientModel.userId)
    if (!userModel) return EDbStatus.NOT_FOUND

    return userModel
  }
}
