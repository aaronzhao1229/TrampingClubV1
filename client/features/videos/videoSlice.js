import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import agent from '../../app/apis/agent'

const initialState = {
  status: 'idle',
  videosLoaded: false,
  videos: [],
}

export const fetchVideosAsync = createAsyncThunk(
  'videos/fetchVideosAsync',
  async (_, thunkApi) => {
    try {
      const response = await agent.videos.getVideos()
      return response
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message })
    }
  }
)

export const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideosAsync.pending, (state) => {
      state.status = 'pendingFetchVideos'
    })
    builder.addCase(fetchVideosAsync.fulfilled, (state, action) => {
      state.videosLoaded = true
      state.status = 'idle'
      state.videos = action.payload
    })
    builder.addCase(fetchVideosAsync.rejected, (state, action) => {
      state.status = 'idle'
      console.error(action.payload)
    })
  },
})
