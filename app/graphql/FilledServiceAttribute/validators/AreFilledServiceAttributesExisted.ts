import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { FilledServiceAttribute } from '../../../models/FilledServiceAttribute/FilledServiceAttribute'
import { IFilledServiceAttributeModel } from '../../../models/FilledServiceAttribute/types'

@ValidatorConstraint({ async: true })
export class AreFilledServiceAttributesExistedValidator implements ValidatorConstraintInterface {
  async validate(filledServiceAttributesIds: IFilledServiceAttributeModel['id'][]) {
    const filledServiceAttribute = new FilledServiceAttribute()
    const entities = await filledServiceAttribute.readAll()

    if (!entities) return false

    return filledServiceAttributesIds.every(id => Boolean(entities[id]))
  }
}

export const AreFilledServiceAttributesExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AreFilledServiceAttributesExistedValidator,
    })
  }
