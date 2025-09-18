import { configureStore } from '@reduxjs/toolkit'
import DialogReducer from "./slices/dialogSlice"
import ChatReducer from './slices/chatSlice';
const store = configureStore({
  reducer: {
    
    chat:ChatReducer
  },
})
export default store;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


