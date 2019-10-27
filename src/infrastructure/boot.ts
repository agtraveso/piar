import { eventPublisher } from '../domain/events/Exports'
import { GitIncomingEventProcessor } from '../domain/events/incoming/Exports'
import { gitlabEventReader } from './events/incoming/gitlabEventReader'

const gitIncomingEventProcessor = new GitIncomingEventProcessor(eventPublisher)
gitIncomingEventProcessor.add(gitlabEventReader)

export { gitIncomingEventProcessor }
