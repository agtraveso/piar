import { Event } from '../Exports'

class DummyEvent extends Event {}
class UnknownEvent extends Event {}

const anEvent = new DummyEvent()
const unknownEvent = new UnknownEvent()

export { anEvent, unknownEvent }
