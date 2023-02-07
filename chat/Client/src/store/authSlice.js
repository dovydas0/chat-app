import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { status: false, user: ''},
  reducers: {
    login: (state, action) => {
      state = action.payload
      return state
    },
    logout: (state, action) => {
      state = action.payload
      return state
    },
    updateUser: (state, action) => {
      state.user = action.payload
      return state
    }
  }
})

// Exporting reducer functions
export const { login, logout, updateUser } = authSlice.actions

export default authSlice.reducer