import { IBaseCrudModel } from '../../../db/models/types'

export interface IActionContextModel<GContext = string | object> extends IBaseCrudModel {
  context: GContext
}
