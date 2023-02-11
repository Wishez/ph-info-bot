import { IServiceAttributeModel } from '../../ServiceAttribute/types'
import { IFilledServiceAttributeModel } from './IFilledServiceAttributeModel'

export interface IDetailedFilledServiceAttribute
  extends Omit<IFilledServiceAttributeModel, 'serviceAttributeId'> {
  serviceAttribute: IServiceAttributeModel
}
