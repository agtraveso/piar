import { aGitlabEvent, aGitlabPullRequest, anEmptyRequest } from '../../../controllers/__mothers__/RequestMother'
import { PulledRequest } from '../../../domain/events/Exports'
import { gitlabEventReader } from './gitlabEventReader'

describe('Gitlab event reader', () => {
  describe('read incoming event', () => {
    it('when event type is not recognized expect an Error', () => {
      expect(() => gitlabEventReader.read(aGitlabEvent)).toThrow()
    })
    it('when event type is a pull request expect a PulledRequest', () => {
      expect(gitlabEventReader.read(aGitlabPullRequest)).toBeInstanceOf(PulledRequest)
    })
  })
  describe('read PulledRequest incoming event', () => {
    it('when pull request is received expect the project to be filled', () => {
      const pulledRequest = gitlabEventReader.read(aGitlabPullRequest) as PulledRequest
      expect(pulledRequest.project.name).not.toBeNull()
      expect(pulledRequest.project.sshUrl).not.toBeNull()
    })
    it('when pull request is received expect the author to be filled', () => {
      const pulledRequest = gitlabEventReader.read(aGitlabPullRequest) as PulledRequest
      expect(pulledRequest.author.username).not.toBeNull()
    })
    it('when pull request is received expect the url to be filled', () => {
      const pulledRequest = gitlabEventReader.read(aGitlabPullRequest) as PulledRequest
      expect(pulledRequest.url).not.toBeNull()
    })
    it('when pull request is received expect the action to be filled', () => {
      aGitlabPullRequest.body.object_attributes.state = 'opened'
      let pulledRequest = gitlabEventReader.read(aGitlabPullRequest) as PulledRequest
      expect(pulledRequest.action).not.toBeNull()

      aGitlabPullRequest.body.object_attributes.state = 'updated'
      pulledRequest = gitlabEventReader.read(aGitlabPullRequest) as PulledRequest
      expect(pulledRequest.action).not.toBeNull()

      aGitlabPullRequest.body.object_attributes.state = 'closed'
      pulledRequest = gitlabEventReader.read(aGitlabPullRequest) as PulledRequest
      expect(pulledRequest.action).not.toBeNull()

      aGitlabPullRequest.body.object_attributes.state = 'reopened'
      pulledRequest = gitlabEventReader.read(aGitlabPullRequest) as PulledRequest
      expect(pulledRequest.action).not.toBeNull()
    })
    it('when pull request action is unknown expect an Error', () => {
      aGitlabPullRequest.body.object_attributes.state = 'irrelevant_unknown'
      expect(() => gitlabEventReader.read(aGitlabPullRequest)).toThrow()
    })
  })
  describe('is incomming event assignable', () => {
    it('when header is not recognized expect to be falsy', () => {
      expect(gitlabEventReader.isAssignableFrom(anEmptyRequest)).toBeFalsy()
    })
    it('when header is recognized expect to be truthy', () => {
      expect(gitlabEventReader.isAssignableFrom(aGitlabEvent)).toBeTruthy()
    })
  })
})
