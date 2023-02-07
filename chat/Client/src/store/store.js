import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./authSlice"
import selectedUserSlice from "./selectedUserSlice"

export default configureStore({
    reducer: {
        auth: authSlice,
        selected: selectedUserSlice
    }
})
