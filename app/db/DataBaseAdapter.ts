import Redis from 'ioredis'
import { Env } from '../config/Env'
import { EDbStatus } from './types'

export class DataBaseAdapter {
  static client = new Redis({ host: 'db', port: 6379, password: Env.dbPassword })

  set = <GValue>(key: string, value: GValue): EDbStatus => {
    const resultValue = typeof value === 'object' ? JSON.stringify(value) : value

    if (typeof resultValue !== 'string' && typeof resultValue !== 'number') {
      return EDbStatus.ERROR
    }

    DataBaseAdapter.client.set(key, resultValue)

    return EDbStatus.OK
  }

  get = async <GValue>(key: string): Promise<GValue | null> => {
    try {
      const value = await DataBaseAdapter.client.get(key).catch(() => null)

      return value && JSON.parse(value)
    } catch {
      const value = await DataBaseAdapter.client.get(key)

      return value as GValue
    }
  }

  deleteNamespace = (key: string) => {
    DataBaseAdapter.client.del(key)
  }
}
