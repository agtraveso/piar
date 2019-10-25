import { Event, EventSubscriber } from './Exports'

export class EventPublisher {
  private subscribers: EventSubscriber[] = []

  public add(subscriber: EventSubscriber): void {
    this.subscribers.push(subscriber)
  }

  public publish(event: Event) {
    for (const subscriber of this.subscribers) {
      if (subscriber.isAssignableFrom(event)) {
        subscriber.process(event)
      }
    }
  }
}

const eventPublisher = new EventPublisher()
export { eventPublisher }
