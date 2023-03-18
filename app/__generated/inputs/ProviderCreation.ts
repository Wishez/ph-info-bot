/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ProviderCreation = {
  readonly serviceId: string
  readonly userId: string
  readonly description: string
}
