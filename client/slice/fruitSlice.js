import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFruits } from '../apis/fruits'

const initialState = {
  status: 'idle',
  fruitsLoaded: false,
  fruits: [],
}

export const fetchFruitsAsync = createAsyncThunk(
  'fruits/fetchFruitsAsync',
  async (_, thunkAPI) => {
    try {
      const response = await getFruits()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const fruitSlice = createSlice({
  name: 'fruit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFruitsAsync.pending, (state) => {
      state.status = 'pendingFetchProducts'
    })
    builder.addCase(fetchFruitsAsync.fulfilled, (state, action) => {
      state.fruitsLoaded = true
      state.status = 'idle'
      state.fruits = action.payload
    })
    builder.addCase(fetchFruitsAsync.rejected, (state, action) => {
      state.status = 'idle'
      console.log(action.payload)
    })
  },
})
