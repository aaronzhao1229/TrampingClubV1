import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  deletePhotoByPhotoId,
  getPhotosByAlbumId,
} from '../../app/apis/albumApi'

const initialState = {
  status: 'idle',
  photosLoaded: false,
  photos: [],
}

export const fetchPhotosAsync = createAsyncThunk(
  'album/fetchPhotosAsync',
  async (albumId, thunkAPI) => {
    try {
      const response = await getPhotosByAlbumId(albumId)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const removePhotoAsync = createAsyncThunk(
  'ablum/removePhotoAsync',
  async (photoId, thunkAPI) => {
    try {
      const response = await deletePhotoByPhotoId(photoId)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotosAsync.pending, (state) => {
      state.status = 'pendingFetchPhotos'
    })
    builder.addCase(fetchPhotosAsync.fulfilled, (state, action) => {
      state.photosLoaded = true
      state.status = 'idle'
      state.photos = action.payload
    })
    builder.addCase(fetchPhotosAsync.rejected, (state, action) => {
      state.status = 'idle'
      console.log(action.payload)
    })
    builder.addCase(removePhotoAsync.pending, (state, action) => {
      state.status = 'pendingRemovePhoto' + action.meta.arg
    })
    builder.addCase(removePhotoAsync.fulfilled, (state, action) => {
      state.photos = [...state.photos].filter(
        (photo) => photo.photoId !== action.meta.arg
      )
      state.status = 'idle'
    })
    builder.addCase(removePhotoAsync.rejected, (state, action) => {
      state.status = 'idle'
      console.log(action.payload)
    })
  },
})

export const { removePhoto } = photosSlice.actions
