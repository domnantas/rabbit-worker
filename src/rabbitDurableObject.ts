export class RabbitDurableObject {
  hole: number = 0
  state: DurableObjectState

  constructor(state: DurableObjectState, env: Env) {
    this.state = state
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      const stored = await this.state.storage?.get<number>('hole')
      this.hole = stored || Math.floor(Math.random() * 100)
    })
  }

  async fetch() {
    // Saving this, because we need to return the hole and only _then_ increment it
    const currentHole = this.hole

    if (this.hole === 0) {
      this.hole++
    } else if (this.hole === 99) {
      this.hole--
    } else {
      Math.random() < 0.5 ? this.hole++ : this.hole--
    }
    await this.state.storage?.put('hole', this.hole)

    return new Response(currentHole.toString())
  }
}

interface Env {}
