import  { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortBy: "createDate",
}

const NoteSortBy = createSlice({
    name: 'NoteSortBy',
    initialState,
    reducers:{
        changeNoteSortByState: (state, action) => {
            state.sortBy = action.payload;
        }
    }
})

export const {changeNoteSortByState} = NoteSortBy.actions;
export default NoteSortBy.reducer;
