/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ProviderUpdating = {
  readonly userId?: string
  readonly description?: string
}
