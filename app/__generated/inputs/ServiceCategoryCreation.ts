/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ServiceCategoryCreation = {
  readonly name: string
  readonly description: string
}
