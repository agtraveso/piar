import { Identity } from '../Identity'

export class GitIdendity extends Identity {
  public username: string

  constructor(username: string) {
    super()
    this.username = username
  }

  public hash(): string {
    return this.username
  }
}
