/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InformationObjectCreation = {
  readonly description: string
  readonly name: string
  readonly providerId: string
}
