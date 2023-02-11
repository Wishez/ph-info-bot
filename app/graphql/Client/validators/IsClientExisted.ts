import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { Client } from '../../../models/Client/Client'
import { IClientModel } from '../../../models/Client/types'

@ValidatorConstraint({ async: true })
export class IsClientExistedValidator implements ValidatorConstraintInterface {
  async validate(id: IClientModel['id']) {
    const client = new Client()
    const clientModel = await client.read(id)

    return Boolean(clientModel)
  }
}

export const IsClientExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsClientExistedValidator,
    })
  }
