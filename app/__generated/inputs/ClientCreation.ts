/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ClientCreation = {
  readonly rank: string
  readonly userId: string
}
