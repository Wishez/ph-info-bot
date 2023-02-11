import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { Chat } from '../../../models/Chat/Chat'
import { IChatModel } from '../../../models/Chat/types'

@ValidatorConstraint({ async: true })
export class IsChatExistedValidator implements ValidatorConstraintInterface {
  async validate(cahtId: IChatModel['id']) {
    const caht = new Chat()
    const cahtModel = await caht.read(cahtId)

    return Boolean(cahtModel)
  }
}

export const IsChatExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsChatExistedValidator,
    })
  }
