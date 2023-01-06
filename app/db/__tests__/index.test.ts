import { dbClient } from '..'

const namespace = 'test1'
it('set and get methods', async () => {
  const answer = 42
  dbClient.set(namespace, { answer })
  const value = await dbClient.get<{ answer: 42 }>(namespace)

  expect(value?.answer).toBe(answer)
})

afterAll(() => {
  dbClient.deleteNamespace(namespace)
})
