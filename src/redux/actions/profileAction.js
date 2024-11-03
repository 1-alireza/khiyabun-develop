import {createAsyncThunk} from "@reduxjs/toolkit";
import {deleteRequest, getRequest, postRequest} from "../../utils/sendRequest";

export const receiveProfileData = createAsyncThunk(
    "profile/setProfile",
    async (data, thunkAPI) => {
        try {
            return await getRequest(data.api, {}, data.token);

        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const fetchUserProfile = createAsyncThunk(
    "users/fetchUserProfile",
    async (data, thunkAPI) => {
        try {
            return await getRequest("profile",data.body,data.token);

        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (data,thunkAPI)=>{
        // console.log("data in register profile",data);
        try {
            return await postRequest("profile",data.userData,data.token);
        }
        catch (e){
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const updateUserProfile = createAsyncThunk(
    "users/updateUserProfile",
    async (data,thunkAPI)=>{
        try {
            return await postRequest("profile",data.userData,data.token);
        }
        catch (e){
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const deleteUserAccount = createAsyncThunk(
    "users/deleteUserAccount",
    async (data, thunkAPI) => {
        try {
            return await deleteRequest("profile",data.body,data.token);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
