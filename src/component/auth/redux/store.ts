import { configureStore } from '@reduxjs/toolkit'
import RegisterReducer from "./slices/registerSlice"
const store = configureStore({
    reducer: {
        register: RegisterReducer
    },
})
export default store;
export type AuthState = ReturnType<typeof store.getState>
export type AuthDispatch = typeof store.dispatch