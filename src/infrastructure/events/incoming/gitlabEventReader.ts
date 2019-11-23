import { Action, GitEvent, PulledRequest } from '../../../domain/events/Exports'
import { GitIncomingEventReader } from '../../../domain/events/incoming/GitIncomingEventReader'
import { GitIdendity, Project } from '../../../domain/model/Exports'
import Logger from '../../logging/Logger'


class GitlabEventReader extends GitIncomingEventReader {
  public isAssignableFrom(incomingEvent: any): boolean {
    return incomingEvent.headers['x-gitlab-event'] !== undefined
  }

  public read(incomingEvent: any): GitEvent {
    const eventType = incomingEvent.headers['x-gitlab-event']
    Logger.info(eventType)
    if (eventType === 'Merge Request Hook') {
      return this.readPullRequest(incomingEvent)
    }
    throw new Error(`unrecognized event type ${eventType}`)
  }

  private readPullRequest(incomingEvent: any): GitEvent {
    const { project, user } = incomingEvent.body
    const { url, state } = incomingEvent.body.object_attributes
    const gitProject = this.parseProject(project)
    const author = this.parseGitIdentity(user)

    return new PulledRequest(author, url, this.parseAction(state), gitProject)
  }

  private parseAction(action: any): Action {
    if (action === 'opened') {
      return Action.Created
    }
    if (action === 'updated') {
      return Action.Updated
    }
    if (action === 'closed') {
      return Action.Closed
    }
    if (action === 'reopened') {
      return Action.Reopened
    }
    throw new Error(`unrecognized pull-request action ${action}`)
  }

  private parseProject(project: any): Project {
    const { name, ssh_url } = project
    return new Project(name, ssh_url)
  }

  private parseGitIdentity(user: any): GitIdendity {
    const { username } = user
    return new GitIdendity(username)
  }
}

export const gitlabEventReader = new GitlabEventReader()
