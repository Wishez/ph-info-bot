import { v4 as uuidv4 } from 'uuid'
import { HashingService } from '../HashingService'

describe('HashingService', () => {
  const payload = {
    someId: uuidv4(),
    nextOneId: uuidv4(),
  }
  test('encodeToRabbit', () => {
    expect(typeof HashingService.encodeToRabbit(payload)).toBe('string')
  })

  test('decodeFromRabbit', () => {
    const hash = HashingService.encodeToRabbit(payload)
    expect(HashingService.decodeFromRabbit(hash)).toStrictEqual(payload)
  })

  test('SHA1', () => {
    const hash = HashingService.sha1(payload)

    expect(typeof hash).toBe('string')
    expect(hash.length === 40).toBeTruthy()
  })
})
