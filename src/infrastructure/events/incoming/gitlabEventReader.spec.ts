import { aGitlabEvent, aGitlabPullRequest, anEmptyRequest } from '../../../controllers/__mothers__/RequestMother'
import { PulledRequest, Unknown } from '../../../domain/events/Exports'
import { gitlabEventReader } from './gitlabEventReader'

describe('Gitlab event reader', () => {
  describe('read incoming event', () => {
    it('when event type is not recognized then return unknown', () => {
      expect(gitlabEventReader.read(aGitlabEvent)).toBeInstanceOf(Unknown)
    })
    it('when event type is a pull request then return a PulledRequest', () => {
      expect(gitlabEventReader.read(aGitlabPullRequest)).toBeInstanceOf(PulledRequest)
    })
  })
  describe('is incomming event assignable', () => {
    it('when header is not recognized then false', () => {
      expect(gitlabEventReader.isAssignableFrom(anEmptyRequest)).toBeFalsy()
    })
    it('when header is recognized then true', () => {
      expect(gitlabEventReader.read(aGitlabEvent)).toBeTruthy()
    })
  })
})
