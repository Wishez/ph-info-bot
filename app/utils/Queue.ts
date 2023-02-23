export class Queue<GItem> {
  private items: GItem[] = []

  setItem(item: GItem) {
    this.items.push(item)
  }

  getItem(): GItem | undefined {
    return this.items.shift()
  }
}
