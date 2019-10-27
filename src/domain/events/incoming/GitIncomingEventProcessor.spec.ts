import { mockEventPublisher } from '../__mothers__/EventPublisherMother'
import { EventPublisher } from '../EventPublisher'
import { isAssignableFrom, mockGitIncomingEventReader } from './__mothers__/GitIncomingEventReaderMother'
import { GitIncomingEventProcessor } from './GitIncomingEventProcessor'


const aMockedGitIncomingEventReader = new mockGitIncomingEventReader()
const aMockedEventPublisher = new mockEventPublisher() as EventPublisher
let gitIncomingEventProcessor:GitIncomingEventProcessor

describe('Git incomming event processor', () => {
  describe('process an incoming event', () => {
    afterAll(() => {
      jest.resetAllMocks()
    })
    beforeEach(() => {
      jest.clearAllMocks()
      gitIncomingEventProcessor = new GitIncomingEventProcessor(aMockedEventPublisher)
    })

    it('when incoming event is assignable to a reader expect to be processed', () => {
      gitIncomingEventProcessor.add(aMockedGitIncomingEventReader)
      gitIncomingEventProcessor.add(aMockedGitIncomingEventReader)
      gitIncomingEventProcessor.process(new Object())

      expect(aMockedGitIncomingEventReader.isAssignableFrom).toHaveBeenCalledTimes(2)
      expect(aMockedGitIncomingEventReader.read).toHaveBeenCalledTimes(2)
    })

    it('when no readers are configured expect nothing', () => {
      expect(aMockedGitIncomingEventReader.isAssignableFrom).not.toHaveBeenCalled()
      expect(aMockedGitIncomingEventReader.read).not.toHaveBeenCalled()
    })

    it('when incomming event is not assignable to a reader expect nothing', () => {
      isAssignableFrom.mockImplementationOnce(() => false)
      gitIncomingEventProcessor.add(aMockedGitIncomingEventReader)
      gitIncomingEventProcessor.process(new Object())

      expect(aMockedGitIncomingEventReader.isAssignableFrom).toHaveBeenCalledTimes(1)
      expect(aMockedGitIncomingEventReader.read).not.toHaveBeenCalled()
    })
  })

  describe('publish git events', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      isAssignableFrom.mockImplementation(() => true)
      gitIncomingEventProcessor = new GitIncomingEventProcessor(aMockedEventPublisher)
    })
    it('when incoming event is read expect to be published', () => {
      gitIncomingEventProcessor.add(aMockedGitIncomingEventReader)
      gitIncomingEventProcessor.process(new Object())

      expect(aMockedGitIncomingEventReader.isAssignableFrom).toBeTruthy()
      expect(aMockedGitIncomingEventReader.read).toHaveBeenCalledTimes(1)
      expect(aMockedEventPublisher.publish).toHaveBeenCalled()
    })

    it('when incomming event is not read expect not to be published', () => {
      isAssignableFrom.mockImplementation(() => false)
      gitIncomingEventProcessor.add(aMockedGitIncomingEventReader)
      gitIncomingEventProcessor.process(new Object())

      expect(aMockedEventPublisher.publish).not.toHaveBeenCalled()
    })
  })
})
