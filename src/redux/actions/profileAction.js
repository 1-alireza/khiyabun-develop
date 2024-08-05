import {createAsyncThunk} from "@reduxjs/toolkit";
import {getRequest} from "../../utils/sendRequest";


export const receiveProfileData = createAsyncThunk(
    "profile/setProfile",
    async (api ,thunkAPI) => {
        try{
            return await getRequest(api);
        }
        catch (e){
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)
