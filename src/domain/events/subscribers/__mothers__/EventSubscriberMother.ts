import { EventSubscriber } from '../../Exports'

const isAssignableFrom = jest.fn(() => true)
const mockEventSubscriber = jest.fn<EventSubscriber, []>(() => ({
  isAssignableFrom,
  process: jest.fn(),
}))

export { mockEventSubscriber, isAssignableFrom }
