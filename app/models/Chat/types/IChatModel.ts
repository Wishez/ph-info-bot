import { IBaseCrudModel } from '../../../db/models/types'
import { IProviderModel } from '../../Provider/types'
import { IUserModel } from '../../User/types'
import { IChatMessage } from './IChatMessage'

export interface IChatModel extends IBaseCrudModel {
  clientTelegramId: IUserModel['telegramId']
  providerId: IProviderModel['id']
  messagesHistory: IChatMessage[]
}
