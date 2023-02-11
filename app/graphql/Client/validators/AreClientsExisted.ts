import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { Client } from '../../../models/Client/Client'
import { IClientModel } from '../../../models/Client/types'

@ValidatorConstraint({ async: true })
export class AreClientsExistedValidator implements ValidatorConstraintInterface {
  async validate(clientsIds: IClientModel['id'][]) {
    const client = new Client()
    const entities = await client.readAll()

    if (!entities) return false

    return clientsIds.every(id => Boolean(entities[id]))
  }
}

export const AreClientsExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AreClientsExistedValidator,
    })
  }
