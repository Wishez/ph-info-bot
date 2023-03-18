/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type OrderAttributeUpdating = {
  readonly attributeId: string
  readonly value: string
}
