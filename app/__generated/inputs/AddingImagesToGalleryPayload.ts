/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type AddingImagesToGalleryPayload = {
  readonly urls: ReadonlyArray<string>
}
