import { Event, PulledRequest, Unknown } from '../../../domain/events/Exports'
import { GitIncomingEventReader } from '../../../domain/events/incoming/GitIncomingEventReader'
import Logger from '../../logging/Logger'


class GitlabEventReader extends GitIncomingEventReader {
  public isAssignableFrom(incomingEvent: any): boolean {
    return incomingEvent.headers['x-gitlab-event'] !== undefined
  }

  public read(incomingEvent: any): Event {
    const eventType = incomingEvent.headers['x-gitlab-event']
    Logger.info(eventType)
    if (eventType === 'Merge Request Hook') {
      return new PulledRequest()
    }
    return new Unknown()
  }
}

export const gitlabEventReader = new GitlabEventReader()
