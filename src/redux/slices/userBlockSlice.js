import {createSlice} from "@reduxjs/toolkit";
import {blockUser, fetchBlockUsers, unblockUser} from "../actions/userBlockAction";

const initialState = {
    blockedUsers: [],
    loading: false,
    error: null,
};
const userBlockSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setBlockedUsers: (state, action) => {
            state.blockedUsers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlockUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlockUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.blockedUsers = action.payload;
            })
            .addCase(fetchBlockUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(blockUser.fulfilled, (state, action) => {
                const userId = action.payload;
                const user = state.users.find(user => user.id === userId);
                if (user) {
                    state.blockedUsers.push(user);
                    state.users = state.users.filter(user => user.id !== userId);
                }
            })
            .addCase(unblockUser.fulfilled, (state, action) => {
                const userId = action.payload;
                const user = state.blockedUsers.find(user => user.id === userId);
                if (user) {
                    state.users.push(user);
                    state.blockedUsers = state.blockedUsers.filter(user => user.id !== userId);
                }
            });
    },
});

export const { setBlockedUsers } = userBlockSlice.actions;
export default userBlockSlice.reducer;
