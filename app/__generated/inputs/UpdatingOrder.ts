/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type UpdatingOrder = {
  readonly informationObjectId?: string
  readonly netProfit?: number
  readonly cancelingReason?: string
}
