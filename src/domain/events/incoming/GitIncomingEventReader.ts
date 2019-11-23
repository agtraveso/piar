import { GitEvent } from '../git/Exports'

export abstract class GitIncomingEventReader {
  public abstract isAssignableFrom(incomingEvent: any): boolean
  public abstract read(incomingEvent: any): GitEvent
}
