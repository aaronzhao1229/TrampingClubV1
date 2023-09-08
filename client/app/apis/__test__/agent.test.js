import agent from '../agent'
import nock from 'nock'

describe('getProgramme', () => {
  it('returns data from local api', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/programme')
      .reply(200, { id: 1, name: 'canterbury' })
    return agent.programmes.getProgrammes().then((result) => {
      expect(result.name).toContain('canterbury')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('auth', () => {
  it('login', () => {
    const scope = nock('http://localhost')
      .post('/api/v1/user/login')
      .reply(200, { id: 1, username: 'user1' })
    return agent.auth.login({ username: 'user2' }).then((result) => {
      expect(result.username).toBe('user1')
      expect(scope.isDone()).toBe(true)
    })
  })
})
