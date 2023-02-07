import { createSlice } from '@reduxjs/toolkit'

const selectedUserSlice = createSlice({
    name: 'selectedUser',
    initialState: { selectedUser: '' },
    reducers: {
        selectUser: (state, action) => {
            state.selectedUser = action.payload
            return state
        },
        deselectUser: (state) => {
            state.selectedUser = ''
            return state
        }
    }
})

export const { selectUser, deselectUser } = selectedUserSlice.actions

export default selectedUserSlice.reducer