import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import charReducer from '../features/chars/charSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chars: charReducer,
  },
})
