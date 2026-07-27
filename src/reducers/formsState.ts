import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initailState={
    addingReceived: false,
    addingGiven: false,
}

type InitialState = typeof initailState;
const formsStateSlice= createSlice({
    name: "formsState",
    initialState: initailState,
    reducers: {
        setAddingReceived: (state: InitialState, action: PayloadAction<boolean>) => {
            state.addingReceived = action.payload;
        },
        setAddingGiven: (state: InitialState, action: PayloadAction<boolean>) => {
            state.addingGiven = action.payload;
        }
    }
})

export const { setAddingReceived, setAddingGiven } = formsStateSlice.actions;

export default formsStateSlice.reducer;