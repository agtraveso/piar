export class Project {
  public name: string
  public sshUrl: string

  constructor(name: string, sshUrl: string) {
    this.name = name
    this.sshUrl = sshUrl
  }
}
