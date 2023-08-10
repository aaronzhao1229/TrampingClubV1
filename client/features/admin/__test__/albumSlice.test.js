import store from '../../../store'
import {
  fetchAlbumAsync,
  setAlbum,
  removeAlbumAsync,
  editAlbumAsync,
} from '../albumSlice'
import agent from '../../../app/apis/agent'
import agentPrivate from '../../../app/apis/agentPrivate'

jest.mock('../../../app/apis/agent')
jest.mock('../../../app/apis/agentPrivate')
jest.spyOn(console, 'error')

const mockAlbum = [
  { albumId: 1, tripName: 'Peak Hill', date: '08-09-2022' },
  { albumId: 2, tripName: 'Avalanche Peak', date: '08-10-2022' },
]

beforeEach(() => {
  jest.clearAllMocks()
})

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
    expect(album[0].tripName).toBe(mockAlbum[0].tripName)

    const state = store.getState().album
    expect(state).toEqual({ album, albumLoaded: true, status: 'idle' })

    store.dispatch(setAlbum())
    const newState = store.getState().album
    expect(newState.albumLoaded).toBe(false)
  })

  it('fetch album data and error', async () => {
    agent.album.getAlbum.mockImplementation(() =>
      Promise.reject(new Error('Error fetching album'))
    )
    console.error.mockImplementation(() => {})

    const result = await store.dispatch(fetchAlbumAsync())

    expect(result.type).toBe('album/fetchAlbumAsync/rejected')
    expect(console.error).toHaveBeenCalledWith({
      error: 'Error fetching album',
    })
    const state = store.getState().album
    expect(state.status).toBe('idle')
  })

  it('remove album', async () => {
    agentPrivate.album.deleteAlbumByAlbumId.mockImplementation(() =>
      Promise.resolve({
        albumId: 2,
        tripName: 'Castle Hill Peak',
        date: '08-10-2022',
      })
    )
    const result = await store.dispatch(removeAlbumAsync(1))

    expect(result.type).toBe('album/removeAlbumAsync/fulfilled')

    const state = store.getState().album

    expect(state.album).toHaveLength(1)
    expect(state.album[0].albumId).toBe(2)
  })

  it('remove album  and error', async () => {
    agentPrivate.album.deleteAlbumByAlbumId.mockImplementation(() =>
      Promise.reject(new Error('Error removing album'))
    )
    console.error.mockImplementation(() => {})

    const result = await store.dispatch(removeAlbumAsync())

    expect(result.type).toBe('album/removeAlbumAsync/rejected')
    expect(console.error).toHaveBeenCalledWith({
      error: 'Error removing album',
    })
    const state = store.getState().album
    expect(state.status).toBe('idle')
  })

  it('edit album', async () => {
    agentPrivate.album.editAlbum.mockImplementation(() =>
      Promise.resolve({
        albumId: 2,
        tripName: 'Castle Hill Peak',
        date: '08-10-2022',
      })
    )
    const result = await store.dispatch(
      editAlbumAsync({
        albumId: 2,
        tripName: 'Castle Hill Peak',
        date: '08-10-2022',
      })
    )

    expect(result.type).toBe('album/editAlbumAsync/fulfilled')

    const state = store.getState().album

    expect(state.album).toHaveLength(1)
    expect(state.status).toBe('idle')
  })

  it('edit album  and error', async () => {
    agentPrivate.album.editAlbum.mockImplementation(() =>
      Promise.reject(new Error('Error editing album'))
    )
    console.error.mockImplementation(() => {})

    const result = await store.dispatch(
      editAlbumAsync({
        albumId: 2,
        tripName: 'Castle Hill Peak',
        date: '08-10-2022',
      })
    )

    expect(result.type).toBe('album/editAlbumAsync/rejected')
    expect(console.error).toHaveBeenCalledWith({
      error: 'Error editing album',
    })
    const state = store.getState().album
    expect(state.status).toBe('idle')
  })
})
