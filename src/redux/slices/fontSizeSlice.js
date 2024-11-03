import  { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fontSizeScale:2,
}

const fontSizeSlice = createSlice({
    name: 'fontSizeScale',
    initialState,
    reducers:{
        changeFontScale: (state, action) => {
            state.fontSizeScale =Number(action.payload);
        }
    }
})

export const {changeFontScale} = fontSizeSlice.actions;
export default fontSizeSlice.reducer;
