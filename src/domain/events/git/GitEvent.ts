import { Project } from '../../model/Exports'
import { Event } from '../Exports'

export abstract class GitEvent extends Event {
  public project: Project

  constructor(project: Project) {
    super()
    this.project = project
  }
}
