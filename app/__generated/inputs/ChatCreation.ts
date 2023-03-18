/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ChatCreation = {
  readonly clientTelegramId: number
  readonly providerId: string
}
