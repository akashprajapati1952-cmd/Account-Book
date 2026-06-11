import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import type { Customer, User } from "../models";
import axios from "axios";
import { BASE_URL } from "../Tools/baseUrls";
import { setCustomersAction } from "./customerSlice";


interface UserState {
    user: User;
    loading: boolean;
    error: string | null;
}

export const userSignup=createAsyncThunk('user/signup/send-otp', async(values: any,thunkAPI) => {
    try{
      const response = await axios.post(BASE_URL + '/signup/send-otp',values);
      return response.data ;
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to create user account');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
});

export const userVerify=createAsyncThunk('user/signup/verify-otp', async(values: any,thunkAPI) => {
    try{
      const response = await axios.post(BASE_URL + '/signup/verify',{otp: values, sessionToken: sessionStorage.getItem("sessionToken")});
      thunkAPI.dispatch(setCustomersAction(response.data.user.customers))
      return response.data ;
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to verify OTP');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
});

export const userLogin=createAsyncThunk('user/login', async(values: any,thunkAPI) => {
    try{
      const response = await axios.post(BASE_URL + '/login',values);
      thunkAPI.dispatch(setCustomersAction(response.data.user.customers))
      return response.data ;
    }catch(err){
        
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to login');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
});

export const userRelogin=createAsyncThunk('user/relogin',async(_,thunkAPI)=>{
    try{
        const response= await axios.get(BASE_URL+'/user/profile',{headers:{authorization: `Bearer ${localStorage.getItem("token")}`}})
        thunkAPI.dispatch(setCustomersAction(response.data.user.customers))
        return response.data
    
    }catch(error){
        if(axios.isAxiosError(error)){
            return thunkAPI.rejectWithValue(error.response?.data.message || "Failed to load user Detail")
        }
        return thunkAPI.rejectWithValue("Somthing went wrong")
    }
})

const setUser = (state: UserState, user: User & { customers: Record<string, Customer> } ) => {
    const { customers, ...newUser } = user;
    for (const key in newUser) {
      (state.user as any)[key] = (newUser as any)[key];
    }
}


const userSlice = createSlice({
    name: "user",
    initialState: {
        user:{
          email: '',
          mobile: '',
          gender: '',
          name: '',
          img:'',
          businessName: '',
          businessType: '',
          address: '',
          zipCode: '',
        } ,
        loading: false,
        error: null
    } as UserState,
    reducers: {
    },
    extraReducers: (builder) => {
        
        builder.addCase(userSignup.fulfilled, (state, action) => {
            sessionStorage.setItem('sessionToken', (action.payload.sessionToken));
            state.loading = false;
            setUser(state, action.payload.user);
        }).addCase(userVerify.fulfilled, (state, action) => {
            state.loading = false;
            setUser(state, action.payload.user);
        }).addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem('token',(action.payload.token));
            setUser(state, action.payload.user);
        }).addCase(userRelogin.fulfilled,(state,action)=>{
            state.loading= false;
            setUser(state, action.payload.user)
        }).addMatcher((action)=>action.type.endsWith('/pending'),(state) => {
            state.loading = true;
            state.error=null;
        }).addMatcher((action)=>action.type.endsWith('/rejected'),(state, action) => {
            state.loading = false;
            state.error = (action as any).error.message  || 'Some error occured';
        })
        ;
    }
})


export default userSlice.reducer;