import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest } from '../../utils/sendRequest';

// Async action to fetch profile data
export const profileData = createAsyncThunk(
    'profile/setProfile',
    async (api, thunkAPI) => {
        try {
            return await getRequest(api);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

// Initial state
const initialState = {
    profileData: {},
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
            .addCase(profileData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(profileData.fulfilled, (state, action) => {
                state.loading = false;
                state.profileData = action.payload;
            })
            .addCase(profileData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to fetch data';
            });
    },
});

export const { set } = profileSlice.actions;
export default profileSlice.reducer;