import { IBaseCrudModel } from '../../../db/models/types'
import { IChatModel } from '../../Chat/types'
import { IProviderModel } from '../../Provider/types'

export interface IUserModel extends IBaseCrudModel {
  avatar?: string
  phone?: string
  email?: string
  username?: string
  currentChatId?: IChatModel['id']
  telegramId: number
  name: string
  providersIds?: IProviderModel['id'][]
}
