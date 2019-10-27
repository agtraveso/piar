import { EventPublisher } from '../Exports'

const mockEventPublisher = jest.fn<Partial<EventPublisher>, []>(() => ({
  publish: jest.fn(),
}))

export { mockEventPublisher }
