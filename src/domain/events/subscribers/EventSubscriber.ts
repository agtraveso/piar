import { Event } from '../Exports'

export abstract class EventSubscriber {
  public abstract process(event: Event): void
  public abstract isAssignableFrom(event: Event): boolean
}
