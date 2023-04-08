/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InformationObjectUpdating = {
  readonly description: string
  readonly name: string
}
