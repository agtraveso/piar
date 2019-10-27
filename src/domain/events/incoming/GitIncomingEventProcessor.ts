import { EventPublisher } from '../Exports'
import { GitIncomingEventReader } from './GitIncomingEventReader'

export class GitIncomingEventProcessor {
  protected eventPublisher: EventPublisher
  private readers: GitIncomingEventReader[] = []

  constructor(eventPublisher: EventPublisher) {
    this.eventPublisher = eventPublisher
  }

  public add(reader: GitIncomingEventReader): void {
    this.readers.push(reader)
  }

  public process(incomingEvent: any) {
    for (const reader of this.readers) {
      if (reader.isAssignableFrom(incomingEvent)) {
        this.eventPublisher.publish(reader.read(incomingEvent))
      }
    }
  }
}
