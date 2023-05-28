import { IFilledServiceAttributeModel } from '../../../models/FilledServiceAttribute/types'
import { ECommonAction } from '../actions'

export interface IChooseAttributeValueContext {
  action: ECommonAction.CHOOSE_ATTRIBUTE_VALUE
  value: IFilledServiceAttributeModel['value']
  filledAttributeId: IFilledServiceAttributeModel['id']
}
