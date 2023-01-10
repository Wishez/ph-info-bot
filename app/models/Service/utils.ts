import { Service } from './Service'
import { IServiceModel } from './types'

export const getServiceByName = async (service: Service, name: IServiceModel['name']) => {
  const models = await service.readAll()
  if (!models) return

  return Object.values(models).find(model => model.name === name)
}
