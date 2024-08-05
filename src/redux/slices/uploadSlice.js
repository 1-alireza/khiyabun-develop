import { createSlice } from '@reduxjs/toolkit';
import {uploadFile} from "../actions/uploadFileAction";

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        loading: false,
        success: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.loading = true;
                state.success = null;
                state.error = null;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default uploadSlice.reducer;