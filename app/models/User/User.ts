import { CrudOperations } from '../../db/models'
import { IUserModel } from './types'

export class User extends CrudOperations<IUserModel> {
  constructor() {
    super({ namespace: 'bot', modelName: 'user' })
  }

  getUserByTelegramId = async (telegramId: IUserModel['telegramId']) => {
    const models = await this.readAll()
    if (!models) return

    return Object.values(models).find(model => model.telegramId === telegramId)
  }
}
