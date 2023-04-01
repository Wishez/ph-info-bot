import { InformationObject } from './InformationObject'
import { IInformationObjectModel } from './types'

export const getInformationObjectByName = async (
  name: IInformationObjectModel['name'],
  informationObject: InformationObject,
) => {
  const models = await informationObject.readAll()
  if (!models) return

  return Object.values(models).find(model => model.name === name)
}
