import  { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";
import {updateDirection} from "../../utils/directionHelper";

const initialState = {
    language: "fa",
    direction: "rtl"
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers:{
        changeLanguageState: (state, action) => {
            state.language = action.payload;
            state.direction = i18n.dir(action.payload);
            updateDirection(i18n.dir());
        }
    }
})

export const {changeLanguageState} = languageSlice.actions;
export default languageSlice.reducer;
