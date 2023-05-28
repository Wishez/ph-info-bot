import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { HashingService } from '../../services/HashingService/HashingService'
import { IActionContextModel } from './types'

export class ActionContext extends CrudOperations<IActionContextModel> {
  constructor() {
    super({ namespace: 'bot', modelName: 'actionContext' })
  }

  async read<GContext extends object>(
    id: IActionContextModel['id'],
  ): Promise<IActionContextModel<GContext> | null> {
    const actionContextModel = await super.read(id)
    if (!actionContextModel) return null

    const { context } = actionContextModel

    return {
      ...actionContextModel,
      context: typeof context === 'string' ? JSON.parse(context) : context,
    }
  }

  async create<GContext extends object>(
    context: GContext,
  ): Promise<{ id: string; status: EDbStatus }> {
    const serializedContext = JSON.stringify(context)

    return super.create({ context: serializedContext }, HashingService.sha1(serializedContext))
  }

  async update(): Promise<EDbStatus.ERROR> {
    return EDbStatus.ERROR
  }
}
