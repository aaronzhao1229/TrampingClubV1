import store from '../../../store'
import { fetchPhotosAsync, removePhotoAsync } from '../photosSlice'
import agentPrivate from '../../../app/apis/agentPrivate'
import agent from '../../../app/apis/agent'

jest.mock('../../../app/apis/agent')
jest.mock('../../../app/apis/agentPrivate')
jest.spyOn(console, 'error')

const mockPhotos = [
  { photoId: 1, photoName: 'Peak Hill', albumId: 1 },
  { photoId: 2, photoName: 'Goat Hill', albumId: 1 },
  { photoId: 3, photoName: 'Castle Hill', albumId: 2 },
]

beforeEach(() => {
  jest.clearAllMocks()
})

describe('photoSlice', () => {
  it('initial state', () => {
    const state = store.getState().photos
    expect(state.photos).toHaveLength(0)
    expect(state.status).toBe('idle')
    expect(state.photosLoaded).toBe(false)
  })

  it('fetch photo data', async () => {
    agent.album.getPhotosByAlbumId.mockImplementation(() =>
      Promise.resolve(mockPhotos)
    )
    const result = await store.dispatch(fetchPhotosAsync())
    const photos = result.payload

    expect(result.type).toBe('album/fetchPhotosAsync/fulfilled')
    expect(photos).toHaveLength(3)
    expect(photos[2].photoName).toBe('Castle Hill')
  })

  it('fetch photo data and error', async () => {
    agent.album.getPhotosByAlbumId.mockImplementation(() =>
      Promise.reject(new Error('Error fetching photos'))
    )
    console.error.mockImplementation(() => {})
    const result = await store.dispatch(fetchPhotosAsync())
    expect(result.type).toBe('album/fetchPhotosAsync/rejected')
    expect(console.error).toHaveBeenCalledWith({
      error: 'Error fetching photos',
    })
    const state = store.getState().photos
    expect(state.status).toBe('idle')
  })

  it('remove a photo', async () => {
    agentPrivate.album.deletePhotoByPhotoId.mockImplementation(() =>
      Promise.resolve()
    )
    const result = await store.dispatch(removePhotoAsync(1))
    expect(result.type).toBe('album/removePhotoAsync/fulfilled')

    const state = store.getState().photos
    expect(state.photos).toHaveLength(2)
    expect(state.photos[0].photoId).toBe(2)
  })

  it('remove a photo and error', async () => {
    agentPrivate.album.deletePhotoByPhotoId.mockImplementation(() =>
      Promise.reject(new Error('Error removing a photo'))
    )
    console.error.mockImplementation(() => {})

    const result = await store.dispatch(removePhotoAsync())
    expect(result.type).toBe('album/removePhotoAsync/rejected')
    expect(console.error).toHaveBeenCalledWith({
      error: 'Error removing a photo',
    })

    const state = store.getState().photos
    expect(state.status).toBe('idle')
  })
})
