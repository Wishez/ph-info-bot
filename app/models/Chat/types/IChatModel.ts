import { IBaseCrudModel } from '../../../db/models/types'
import { IUserModel } from '../../User/types'
import { IChatMessage } from './IChatMessage'

export interface IChatModel extends IBaseCrudModel {
  clientTelegramId: IUserModel['telegramId']
  providerTelegramId: IUserModel['telegramId']
  messagesHistory: IChatMessage[]
}
