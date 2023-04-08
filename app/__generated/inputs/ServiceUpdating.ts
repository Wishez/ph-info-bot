/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ServiceUpdating = {
  readonly name?: string
  readonly description?: string
  readonly categoryId?: string
  readonly image?: string
  readonly serviceType?: string
}
