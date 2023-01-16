import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { IUserModel } from '../User/types'
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

  getClientByUserTelegramId = async (
    telegramId: IUserModel['telegramId'],
  ): Promise<EDbStatus.NOT_FOUND | IClientModel> => {
    const userModel = await this.user.getUserByTelegramId(telegramId)
    if (!userModel) return EDbStatus.NOT_FOUND

    const clients = await this.readAll()
    if (!clients) return EDbStatus.NOT_FOUND

    const client = Object.values(clients).find(model => model.userId === userModel.id)

    if (!client) return EDbStatus.NOT_FOUND

    return client
  }
}
