import { IBaseCrudModel } from '../../../db/models/types'
import { IProviderModel } from '../../Provider/types'

export interface IUserModel extends IBaseCrudModel {
  avatar?: string
  phone?: string
  email?: string
  username?: string
  telegramId: number
  name: string
  providersIds?: IProviderModel['id'][]
}
