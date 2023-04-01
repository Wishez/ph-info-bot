import { IBaseCrudModel } from '../../../db/models/types'
import { IProviderModel } from '../../Provider/types'
import { IInformationObjectImage } from './IInformationObjectImage'

export interface IInformationObjectModel extends IBaseCrudModel {
  description: string
  name: string
  providerId: IProviderModel['id']
  gallery: IInformationObjectImage[]
}
