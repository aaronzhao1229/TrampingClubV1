import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteAlbumByAlbumId, getAlbum } from '../apis/albumApi'

const initialState = {
  status: 'idle',
  albumLoaded: false,
  album: [],
}

export const fetchAlbumAsync = createAsyncThunk(
  'album/fetchAlbumAsync',
  async (_, thunkAPI) => {
    try {
      const response = await getAlbum()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const removeAlbumAsync = createAsyncThunk(
  'ablum/removeAlbumAsync',
  async (albumId, thunkAPI) => {
    try {
      const response = await deleteAlbumByAlbumId(albumId)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setAlbum: (state) => {
      state.albumLoaded = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumAsync.pending, (state) => {
      state.status = 'pendingFetchAlbum'
    })
    builder.addCase(fetchAlbumAsync.fulfilled, (state, action) => {
      state.albumLoaded = true
      state.status = 'idle'
      state.album = action.payload
    })
    builder.addCase(fetchAlbumAsync.rejected, (state, action) => {
      state.status = 'idle'
      console.log(action.payload)
    })
    builder.addCase(removeAlbumAsync.pending, (state, action) => {
      state.status = 'pendingRemoveAlbum' + action.meta.arg
    })
    builder.addCase(removeAlbumAsync.fulfilled, (state, action) => {
      state.album = [...state.album].filter(
        (album) => album.albumId !== action.meta.arg
      )
      state.status = 'idle'
    })
    builder.addCase(removeAlbumAsync.rejected, (state, action) => {
      state.status = 'idle'
      console.log(action.payload)
    })
  },
})

export const { setAlbum } = albumSlice.actions
