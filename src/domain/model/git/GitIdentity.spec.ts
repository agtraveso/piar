import { GitIdendity } from './GitIdentity'

describe('Git Identity', () => {
  describe('hash generation', () => {
    it('when hash expect a unique hash', () => {
      expect(new GitIdendity('irrelevant-username').hash()).not.toBeNull()
    })
  })
})
