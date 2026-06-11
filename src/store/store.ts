import { configureStore} from "@reduxjs/toolkit";

import UserReducer from "../reducers/userSlice";
import customersReducer from "../reducers/customerSlice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";


const store=configureStore({
    
    reducer:{
      user: UserReducer,
      customers: customersReducer
    },
    devTools: import.meta.env.DEV,
})

export type State= ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State>=useSelector;