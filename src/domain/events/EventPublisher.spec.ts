import { anEvent } from './__mothers__/EventMother'
import { EventPublisher, EventSubscriber } from './Exports'
import { isAssignableFrom, mockEventSubscriber } from './subscribers/__mothers__/EventSubscriberMother'

let aMockedEventSubscriber:EventSubscriber
let eventPublisher:EventPublisher

beforeEach(() => {
  eventPublisher = new EventPublisher()
  aMockedEventSubscriber = new mockEventSubscriber()
})

describe('Event Publisher', () => {
  describe('publish an event', () => {
    it('when no subscribers are configured expect nothing', () => {
      expect(aMockedEventSubscriber.isAssignableFrom).not.toHaveBeenCalled()
      expect(aMockedEventSubscriber.process).not.toHaveBeenCalled()
    })

    it('when event is assignable to a subscriber expect to be processed', () => {
      eventPublisher.add(aMockedEventSubscriber)
      eventPublisher.add(aMockedEventSubscriber)
      eventPublisher.publish(anEvent)

      expect(aMockedEventSubscriber.isAssignableFrom).toHaveBeenCalledTimes(2)
      expect(aMockedEventSubscriber.process).toHaveBeenCalledTimes(2)
    })

    it('when event is not assignable to a subscriber expect not to be processed', () => {
      isAssignableFrom.mockImplementation(() => false)

      eventPublisher = new EventPublisher()
      eventPublisher.add(aMockedEventSubscriber)
      eventPublisher.publish(anEvent)

      expect(aMockedEventSubscriber.isAssignableFrom).toHaveBeenCalled()
      expect(aMockedEventSubscriber.process).not.toHaveBeenCalled()
    })
  })
})
