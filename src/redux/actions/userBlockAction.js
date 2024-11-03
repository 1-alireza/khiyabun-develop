import { createAsyncThunk } from "@reduxjs/toolkit";
import {getRequest, deleteRequest, putRequest} from "../../utils/sendRequest";

export const fetchBlockUsers = createAsyncThunk(
    "users/fetchBlockUsers",
    async (token, thunkAPI) => {
        try {
            return await getRequest("profile/block", {}, token);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const blockUser = createAsyncThunk(
    "users/blockUser",
    async (data, thunkAPI) => {
        try {
            return await putRequest(`profile/block`, data.body, data.token);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const unblockUser = createAsyncThunk(
    "users/unblockUser",
    async (data, thunkAPI) => {
        try {
            return await deleteRequest(`profile/block`, data.body, data.token);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

