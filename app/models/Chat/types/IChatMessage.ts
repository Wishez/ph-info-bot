import { EChatMessageActor } from './EChatMessageActor'

export interface IChatMessage {
  id: string
  message: string
  sender: EChatMessageActor
  createdAt: string
  updatedAt?: string
}
