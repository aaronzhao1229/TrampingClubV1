import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: { username: null, accessToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { username, accessToken } = action.payload
      state.username = username
      state.accessToken = accessToken
    },
    logOut: (state, action) => {
      state.username = null
      state.accessToken = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUsername = (state) => state.auth.username
export const selectCurrentToken = (state) => state.auth.accessToken
