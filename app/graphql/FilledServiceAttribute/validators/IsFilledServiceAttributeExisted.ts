import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { FilledServiceAttribute } from '../../../models/FilledServiceAttribute/FilledServiceAttribute'
import { IFilledServiceAttributeModel } from '../../../models/FilledServiceAttribute/types'

@ValidatorConstraint({ async: true })
export class IsFilledServiceAttributeExistedValidator implements ValidatorConstraintInterface {
  async validate(filledServiceAttributeId: IFilledServiceAttributeModel['id']) {
    const filledServiceAttribute = new FilledServiceAttribute()
    const filledServiceAttributeModel = await filledServiceAttribute.read(filledServiceAttributeId)

    return Boolean(filledServiceAttributeModel)
  }
}

export const IsFilledServiceAttributeExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFilledServiceAttributeExistedValidator,
    })
  }
