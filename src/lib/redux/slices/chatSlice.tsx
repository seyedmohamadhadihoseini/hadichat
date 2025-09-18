import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatId: ""
    },
    reducers: {
        changeChat: (state, action: PayloadAction<string>) => {
            state.chatId = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeChat } = chatSlice.actions

export default chatSlice.reducer