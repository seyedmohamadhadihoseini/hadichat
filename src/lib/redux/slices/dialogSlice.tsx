import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    open: false,
    content: <div></div>,
    title: "",
    description: ""
  },
  reducers: {
    setDialog:(state,action:PayloadAction<{
      open:boolean,content:React.ReactNode,title:string,description:string
    }>)=>{
      state.content =<>{action.payload.content}</>;
      state.open = action.payload.open;
      state.title = action.payload.title,
      state.description = action.payload.description;
    },
    openDialog: (state) => {
      state.open = true;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    closeDialog: (state) => {
      state.open = false;
    },
    setContent: (state, action: PayloadAction<React.ReactNode>) => {
      state.content = <>
        {action.payload}
      </>
    },
  },
})

// Action creators are generated for each case reducer function
export const { openDialog, closeDialog, setContent, setDescription, setTitle,setDialog } = dialogSlice.actions

export default dialogSlice.reducer