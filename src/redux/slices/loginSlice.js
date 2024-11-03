import {createSlice} from "@reduxjs/toolkit";
import {userLogin} from "../actions/loginAction";
import {errorHandling} from "../../utils/errorHandling";

const initialState = {
    is_login: false,
    is_loading: false,
    token: null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers : {
        signIn: (state,action)=>{
            state.is_login = true;
            state.token = action.payload;
        },
        signOut: (state) => {
            state.is_login = false;
            state.token = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.is_loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.is_loading = false;
                let response = action.payload;
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    state.is_login = true;
                    state.token = response.data.token;
                }
                else {
                    console.log("error in login page",response);
                }
            })
            .addCase(userLogin.rejected, (state) => {
                console.log("i have error");
                // errorHandling(response,"error");
                state.is_loading = false;
            })
    }
})

export const {signIn, signOut} = loginSlice.actions;
export default loginSlice.reducer;
