import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        loading: false,
        error: "",
        previewImage: ""
    },
    reducers: {

        SetLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        SetError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        SetPreviewImage: (state, action: PayloadAction<string>) => {
            state.previewImage = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { SetError, SetLoading, SetPreviewImage } = registerSlice.actions

export default registerSlice.reducer