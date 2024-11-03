import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    workLogData: {
        productiveTime: "00:00:00",
        breakTime: "00:00:00",
        isResting: false,  // Include all initial properties
    },
};

const workLogSlice = createSlice({
    name: 'workLog',
    initialState,
    reducers: {
        setWorkLogData: (state, action) => {
            state.workLogData = {
                ...state.workLogData,
                ...action.payload,
            };
        },
        updateIsRestingInWorkLogData: (state, action) => {
            if (state.workLogData) {
                state.workLogData.isResting = action.payload;
            }
        },
        setBreakTime: (state, action) => {
            if (state.workLogData) {
                state.workLogData.breakTime = action.payload;
            }
        },
        setProductiveTime: (state, action) => {
            if (state.workLogData) {
                state.workLogData.productiveTime = action.payload;
            }
        },
    },
});
export const {
    setWorkLogData,
    updateIsRestingInWorkLogData,
    setBreakTime,
    setProductiveTime,
 } = workLogSlice.actions;

export default workLogSlice.reducer;