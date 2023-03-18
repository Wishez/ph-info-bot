/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type UserUpdating = {
  readonly avatar?: string
  readonly phone?: string
  readonly email?: string
  readonly name?: string
  readonly username?: string
}
