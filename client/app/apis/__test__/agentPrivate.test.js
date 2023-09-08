import agentPrivate from '../agentPrivate'
import nock from 'nock'
import store from '../../../store'
import agent from '../agent'

jest.mock('../agent')
jest.spyOn(Promise, 'reject')

agent.auth.refreshAuth.mockImplementation(() =>
  Promise.resolve({ accessToken: 'adfsadfsdfs' })
)

describe('album', () => {
  it('edit album', () => {
    const scope = nock('http://localhost')
      .patch('/api/v1/album/editAlbum/1')
      .reply(200, { id: 1, albumName: 'Peak Hill' })
    return agentPrivate.album.editAlbum({ albumId: 1 }).then((result) => {
      expect(result.albumName).toBe('Peak Hill')
      expect(scope.isDone()).toBe(true)
    })
  })
  it('create album', () => {
    const scope = nock('http://localhost')
      .post('/api/v1/album/uploadImage')
      .reply(200, { id: 1, albumName: 'Avalanche Peak' })
    return agentPrivate.album.createAlbum({ albumId: 1 }).then((result) => {
      expect(result.albumName).toBe('Avalanche Peak')
      expect(scope.isDone()).toBe(true)
    })
  })

  it('delete photo by photo Id', () => {
    const scope = nock('http://localhost')
      .delete('/api/v1/album/deletePhoto/1')
      .reply(200, 'photo deleted')
    return agentPrivate.album.deletePhotoByPhotoId(1).then((result) => {
      expect(result).toBe('photo deleted')
      expect(scope.isDone()).toBe(true)
    })
  })

  it('delete album by album Id', () => {
    const scope = nock('http://localhost')
      .delete('/api/v1/album/deleteAlbum/1')
      .reply(200, 'album deleted')
    return agentPrivate.album.deleteAlbumByAlbumId(1).then((result) => {
      expect(result).toBe('album deleted')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('programmes', () => {
  it('upload programme', () => {
    const scope = nock('http://localhost')
      .post('/api/v1/programme/updateProgramme')
      .reply(200, { id: 2, programmeName: 'walk' })
    return agentPrivate.programmes.uploadProgramme({ id: 1 }).then((result) => {
      expect(result.programmeName).toBe('walk')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('interceptor error', () => {
  it('response error 403', async () => {
    const scope = nock('http://localhost')
      .post('/api/v1/programme/updateProgramme')
      .reply(403)
      .post('/api/v1/programme/updateProgramme')
      .reply(200, { id: 2, programmeName: 'walk' })

    await agentPrivate.programmes.uploadProgramme({ id: 1 })
    const token = store.getState().auth.accessToken

    expect(token).toBe('adfsadfsdfs')
    expect(scope.isDone()).toBe(true)
  })
})
