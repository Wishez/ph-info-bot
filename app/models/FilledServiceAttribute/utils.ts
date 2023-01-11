import { FilledServiceAttribute } from './FilledServiceAttribute'
import { IFilledServiceAttributeModel } from './types'

export const getFilledServiceAttributeByValue = async (
  filledServiceAttribute: FilledServiceAttribute,
  value: IFilledServiceAttributeModel['value'],
) => {
  const models = await filledServiceAttribute.readAll()
  if (!models) return

  return Object.values(models).find(model => model.value === value)
}
