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

  it('register', () => {
    const scope = nock('http://localhost')
      .post('/api/v1/user/createUser')
      .reply(200, { id: 1, username: 'user1' })
    return agent.auth.register({ username: 'user2' }).then((result) => {
      expect(result.username).toBe('user1')
      expect(scope.isDone()).toBe(true)
    })
  })

  it('refresh auth', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/user/refresh')
      .reply(200, { id: 1, username: 'user1' })
    return agent.auth.refreshAuth().then((result) => {
      expect(result.username).toBe('user1')
      expect(scope.isDone()).toBe(true)
    })
  })

  it('forget Password', () => {
    const scope = nock('http://localhost')
      .post('/api/v1/user/forgetPassword')
      .reply(200, { password: 'password' })
    return agent.auth.forgetPassword('test@test.com').then((result) => {
      expect(result.password).toBe('password')
      expect(scope.isDone()).toBe(true)
    })
  })

  it('reset Password', () => {
    const scope = nock('http://localhost')
      .post('/api/v1/user/resetPassword')
      .reply(200, 'password reset')
    return agent.auth.resetPassword('test@test.com').then((result) => {
      expect(result).toBe('password reset')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('album', () => {
  it('getAlbum', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/album')
      .reply(200, [
        { id: 1, album: 'canterbury' },
        { id: 2, album: 'otago' },
      ])
    return agent.album.getAlbum().then((result) => {
      expect(result).toHaveLength(2)
      expect(result[0].album).toBe('canterbury')
      expect(scope.isDone()).toBe(true)
    })
  })

  it('getPhotosByAlbumId', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/album/getPhotos/1')
      .reply(200, { album: 'album1' })
    return agent.album.getPhotosByAlbumId(1).then((result) => {
      expect(result.album).toBe('album1')

      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('contact', () => {
  it('contact us', () => {
    const scope = nock('http://localhost')
      .post('/api/v1/ses/sendEmail')
      .reply(200, 'contact me')
    return agent.contact.contactUs('contact').then((result) => {
      expect(result).toBe('contact me')
      expect(scope.isDone()).toBe(true)
    })
  })
})
