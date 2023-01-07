import { IUserModel } from '../../User/types'
import { EClientRank } from './EClientRank'

export interface IClientModel {
  id: string
  rank: EClientRank
  userId: IUserModel['id']
}
