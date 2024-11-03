import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {deleteUserAccount, receiveProfileData, registerUser, updateUserProfile} from "../actions/profileAction"


// Initial state
const initialState = {
    profileData: {},
    loading: false,
    error: null
};

// Profile slice
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        set: (state, action) => {
            state.profileData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(receiveProfileData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(receiveProfileData.fulfilled, (state, action) => {
                state.loading = false;
                state.profileData = action.payload.data;
            })
            .addCase(receiveProfileData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to fetch data';
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to add data';
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profileData = action.payload.data;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to fetch data';
            })
            .addCase(deleteUserAccount.fulfilled, (state, action) => {
                //write delete account logic
            });
    },
});

export const { set } = profileSlice.actions;
export default profileSlice.reducer;
