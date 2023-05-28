/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ServiceAttributeCreation = {
  readonly notice: string
  readonly isRequired: boolean
  readonly name: string
  readonly order: number
  readonly options?: ReadonlyArray<string>
}
