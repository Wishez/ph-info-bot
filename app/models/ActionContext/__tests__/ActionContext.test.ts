import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { HashingService } from '../../../services/HashingService/HashingService'
import { ActionContext } from '../ActionContext'

describe('ActionContext', () => {
  test('init', () => {
    const actionContext = new ActionContext()
    expect('read' in actionContext).toBeTruthy()
    expect('readAll' in actionContext).toBeTruthy()
    expect('create' in actionContext).toBeTruthy()
    expect('update' in actionContext).toBeTruthy()
    expect('delete' in actionContext).toBeTruthy()
    expect(actionContext.modelNamespace.startsWith('bot.actionContext')).toBeTruthy()
  })
  const TEXT_CONTEXT = {
    firstId: uniqueId('id'),
    secondId: uniqueId('id'),
  }

  test('create', async () => {
    expect.assertions(2)

    const actionContext = new ActionContext()
    const { id, status } = await actionContext.create(TEXT_CONTEXT)

    expect(status).toBe(EDbStatus.OK)
    expect(id).toBe(HashingService.sha1(TEXT_CONTEXT))
  })

  test('read all', async () => {
    expect.assertions(2)
    const actionContext = new ActionContext()
    const models = await actionContext.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(2)
    const actionContext = new ActionContext()
    const id = HashingService.sha1(TEXT_CONTEXT)
    const model = await actionContext.read<typeof TEXT_CONTEXT>(id)

    expect(model?.id).toBe(id)
    expect(model?.context).toStrictEqual(TEXT_CONTEXT)
  })

  test('update', async () => {
    expect.assertions(1)
    const actionContext = new ActionContext()
    const status = await actionContext.update()

    expect(status).toBe(EDbStatus.ERROR)
  })

  test('delete', async () => {
    expect.assertions(1)
    const actionContext = new ActionContext()
    const id = HashingService.sha1(TEXT_CONTEXT)
    const status = await actionContext.delete(id)

    expect(status).toBe(EDbStatus.OK)
  })

  afterAll(() => {
    const actionContext = new ActionContext()
    dbClient.deleteNamespace(actionContext.modelNamespace)
  })
})
