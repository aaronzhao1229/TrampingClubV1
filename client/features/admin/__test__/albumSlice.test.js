import store from '../../../store'
import { fetchAlbumAsync, setAlbum } from '../albumSlice'
import agent from '../../../app/apis/agent'

jest.mock('../../../app/apis/agent')
const mockAlbum = { id: 1, tripName: 'Peak Hill', date: '08-09-2022' }

describe('ACTION TESTS', () => {
  it('initial state', async () => {
    const state = store.getState().album
    expect(state.album).toHaveLength(0)
  })

  it('fetch album data and set album', async () => {
    agent.album.getAlbum.mockImplementation(() => Promise.resolve(mockAlbum))
    const result = await store.dispatch(fetchAlbumAsync())
    const album = result.payload
    expect(result.type).toBe('album/fetchAlbumAsync/fulfilled')
    expect(album.tripName).toBe(mockAlbum.tripName)

    const state = store.getState().album
    expect(state).toEqual({ album, albumLoaded: true, status: 'idle' })

    store.dispatch(setAlbum())
    const newState = store.getState().album
    expect(newState.albumLoaded).toBe(false)
  })
})
