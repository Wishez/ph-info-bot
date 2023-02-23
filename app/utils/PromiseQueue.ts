import { Queue } from './Queue'

export class PromiseQueue<GResponse = unknown> extends Queue<{
  action: () => Promise<GResponse>
  resolve: (value: GResponse) => void
  reject: (e: unknown) => void
}> {
  private done?: (value: GResponse[]) => void
  private responses: GResponse[] = []
  private isPromisePending = false

  constructor() {
    super()
  }

  add(action: () => Promise<GResponse>): Promise<GResponse> {
    return new Promise((resolve, reject) => {
      this.setItem({ action, resolve, reject })
      this.run()
    })
  }

  isDone(): Promise<GResponse[]> {
    return new Promise(resove => {
      this.done = resove
    })
  }

  async run() {
    if (this.isPromisePending) return false
    const item = this.getItem()

    if (!item) {
      if (this.done) this.done(this.responses)

      return false
    }

    try {
      this.isPromisePending = true
      const payload = await item.action()
      this.isPromisePending = false
      this.responses.push(payload)
      item.resolve(payload)
    } catch (e) {
      this.isPromisePending = false
      item.reject(e)
    } finally {
      this.run()
    }

    return true
  }
}
