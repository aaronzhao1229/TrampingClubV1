import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import agent from '../../app/apis/agent'

const initialState = {
  status: 'idle',
  programmeLoaded: false,
  programmes: [],
}

export const fetchProgrammesAsync = createAsyncThunk(
  'programmes/fetchProgrammesAsync',
  async (_, thunkAPI) => {
    try {
      const response = await agent.programmes.getProgrammes()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

// export const updateProgrammeAsync = createAsyncThunk(
//   'programmes/updateProgrammeAsync',
//   async (newProgramme, thunkAPI) => {
//     try {
//       const response = await updateProgramme(newProgramme)
//       return response
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message })
//     }
//   }
// )

export const programmesSlice = createSlice({
  name: 'programmes',
  initialState,
  reducers: {
    setProgrammes: (state) => {
      state.programmeLoaded = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProgrammesAsync.pending, (state) => {
      state.status = 'pendingFetchProgrammes'
    })
    builder.addCase(fetchProgrammesAsync.fulfilled, (state, action) => {
      state.programmeLoaded = true
      state.status = 'idle'
      state.programmes = action.payload
    })
    builder.addCase(fetchProgrammesAsync.rejected, (state, action) => {
      state.status = 'idle'
      console.log(action.payload)
    })
  },
})

export const { setProgrammes } = programmesSlice.actions
