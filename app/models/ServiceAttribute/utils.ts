import { ServiceAttribute } from './ServiceAttribute'
import { IServiceAttributeModel } from './types'

export const getServiceAttributeByName = async (
  serviceAttribute: ServiceAttribute,
  name: IServiceAttributeModel['name'],
) => {
  const models = await serviceAttribute.readAll()
  if (!models) return

  return Object.values(models).find(model => model.name === name)
}
