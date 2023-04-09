import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { InformationObject } from '../../../models/InformationObject/InformationObject'
import { IInformationObjectModel } from '../../../models/InformationObject/types'

@ValidatorConstraint({ async: true })
export class IsInformationObjectExistedValidator implements ValidatorConstraintInterface {
  async validate(informationObjectId: IInformationObjectModel['id']) {
    const informationObject = new InformationObject()
    const informationObjectModel = await informationObject.read(informationObjectId)

    return Boolean(informationObjectModel)
  }
}

export const IsInformationObjectExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsInformationObjectExistedValidator,
    })
  }
