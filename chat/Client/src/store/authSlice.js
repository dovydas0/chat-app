import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
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
    }
  }
})

// Action creators are generated for each case reducer function
const { login, logout } = authSlice.actions

export const { reducer } = authSlice

export const loginAsync = (data) => (dispatch) => {
  dispatch(login(data))
}

export const logoutAsync = (data) => (dispatch) => {
  dispatch(logout(data))
}

export default authSlice.reducer