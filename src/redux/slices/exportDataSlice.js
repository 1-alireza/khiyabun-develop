import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exportData: []
};

const exportDataSlice = createSlice({
    name: 'exportData',
    initialState,
    reducers: {
        setExportData: (state, action) => {
            // Here, we use the spread operator to combine the existing data with the new data
            state.exportData = [...state.exportData, ...action.payload];
        },
    },
});

export const { setExportData } = exportDataSlice.actions;

export default exportDataSlice.reducer;