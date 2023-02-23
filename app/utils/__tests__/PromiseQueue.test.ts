import { PromiseQueue } from '../PromiseQueue'

describe('PromiseQueue', () => {
  test('execute many actions', async () => {
    expect.assertions(2)
    const response = 'OK' as const

    const queue = new PromiseQueue()
    const actionsQuantity = 10
    Array(actionsQuantity)
      .fill(0)
      .forEach(() => {
        queue.add(
          () =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve(response)
              }, 100)
            }),
        )
      })

    const responses = await queue.isDone()

    expect(responses.length).toBe(actionsQuantity)
    expect(responses.every(status => status === response)).toBeTruthy()
  })
})
