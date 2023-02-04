import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { ServiceCategory } from '../../../models/ServiceCategory/ServiceCategory'
import { IServiceCategoryModel } from '../../../models/ServiceCategory/types'

@ValidatorConstraint({ async: true })
export class CategoryExistenceValidator implements ValidatorConstraintInterface {
  async validate(categoryId: IServiceCategoryModel['id']) {
    const serviceCategory = new ServiceCategory()
    const category = await serviceCategory.read(categoryId)

    return Boolean(category)
  }
}

export const IsCategoryExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CategoryExistenceValidator,
    })
  }
