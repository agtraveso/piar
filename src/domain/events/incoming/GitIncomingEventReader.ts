import { Event } from '../Exports'

export abstract class GitIncomingEventReader {
  public abstract isAssignableFrom(incomingEvent: any): boolean
  public abstract read(incomingEvent: any): Event
}
