import { GitIncomingEventReader } from '../GitIncomingEventReader'

const isAssignableFrom = jest.fn(() => true)
const mockGitIncomingEventReader = jest.fn<GitIncomingEventReader, []>(() => ({
  isAssignableFrom,
  read: jest.fn(),
}))

export { mockGitIncomingEventReader, isAssignableFrom }
