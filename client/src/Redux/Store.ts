import { configureStore } from '@reduxjs/toolkit'
import RoleReducer from './Slice/RoleSlice'

export const store = configureStore({
  reducer: {
    Roles : RoleReducer
  },
})

// Types (pour TypeScript)
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch