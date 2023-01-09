import { IBaseCrudModel } from '../../../db/models/types'

export interface IServiceAttributeModel extends IBaseCrudModel {
  notice: string
  isRequired: boolean
  name: string
  order: number // from 0 to 10000 step by 100
}
