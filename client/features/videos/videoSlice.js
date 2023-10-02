import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import agent from '../../app/apis/agent'
import agentPrivate from '../../app/apis/agentPrivate'

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

export const deleteVideoAsync = createAsyncThunk(
  'videos/deleteVideosAsync',
  async (videoId, thunkApi) => {
    try {
      const response = await agentPrivate.videos.deleteVideo(videoId)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message })
    }
  }
)

export const editVideoAsync = createAsyncThunk(
  'videos/editVideoAsync',
  async (editedVideo, thunkApi) => {
    try {
      const response = await agentPrivate.videos.editVideo(editedVideo)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message })
    }
  }
)

export const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state) => {
      state.videosLoaded = false
    },
  },
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
    builder.addCase(deleteVideoAsync.pending, (state, action) => {
      state.status = 'pendingDeleteVideo' + action.meta.arg
    })
    builder.addCase(deleteVideoAsync.fulfilled, (state, action) => {
      state.videos = [...state.videos].filter(
        (video) => video.videoId !== action.meta.arg
      )
      state.status = 'idle'
    })
    builder.addCase(deleteVideoAsync.rejected, (state, action) => {
      state.status = 'idle'
      console.error(action.payload)
    })
    builder.addCase(editVideoAsync.pending, (state, action) => {
      state.status = 'pendingEditVideo' + action.meta.arg.videoId
    })
    builder.addCase(editVideoAsync.fulfilled, (state, action) => {
      state.status = 'idle'
      state.videosLoaded = false
    })
    builder.addCase(editVideoAsync.rejected, (state, action) => {
      state.status = 'idle'
      console.error(action.payload)
    })
  },
})

export const { setVideos } = videoSlice.actions
