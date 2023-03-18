/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type FilledServiceAttributeCreation = {
  readonly orderId: string
  readonly value: string
  readonly serviceAttributeId: string
}
