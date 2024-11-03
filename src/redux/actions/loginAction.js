import {createAsyncThunk} from "@reduxjs/toolkit";
import {postRequest} from "../../utils/sendRequest";


export const userLogin = createAsyncThunk(
    "loginAuth",
    async (loginData ,thunkAPI) => {
        try{
            return await postRequest(loginData.api,loginData.body,"");
        }
        catch (e){
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)
