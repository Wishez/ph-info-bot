import { IBaseCrudModel } from '../../../db/models/types'
import { IUserModel } from '../../User/types'
import { EClientRank } from './EClientRank'

export interface IClientModel extends IBaseCrudModel {
  rank: EClientRank
  userId: IUserModel['id']
}
