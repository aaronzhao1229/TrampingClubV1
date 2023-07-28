import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: { username: null, accessToken: null, userRoles: null },
  reducers: {
    setCredentials: (state, action) => {
      const { username, accessToken, userRoles } = action.payload
      state.username = username
      state.accessToken = accessToken
      state.userRoles = userRoles
    },
    logOut: (state, action) => {
      state.username = null
      state.accessToken = null
      state.userRoles = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUsername = (state) => state.auth.username
export const selectCurrentToken = (state) => state.auth.accessToken
