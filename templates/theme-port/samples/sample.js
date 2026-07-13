export class VioletSession {
  constructor(minutes = 90) {
    this.minutes = minutes
  }

  async focus() {
    const result = await Promise.resolve({ calm: true, contrast: 'durable' })

    return `${result.contrast}: ${this.minutes} minutes`
  }
}
