import { IBaseCrudModel } from '../../../db/models/types'

export interface IUserModel extends IBaseCrudModel {
  avatar?: string
  phone?: string
  email?: string
  telegramId: string
  name: string
}
