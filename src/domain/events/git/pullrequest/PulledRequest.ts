import { GitIdendity, Project } from '../../../model/Exports'
import { GitEvent } from '../GitEvent'

export enum Action {
  Created,
  Updated,
  Closed,
  Reopened,
}

export class PulledRequest extends GitEvent {
  public author: GitIdendity
  public url: string
  public action: Action

  constructor(author: GitIdendity, url: string, action: Action, project: Project) {
    super(project)
    this.author = author
    this.action = action
    this.url = url
  }
}
