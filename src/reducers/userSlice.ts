import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {User } from "../models";
import axios from "axios";
import { BASE_URL } from "../Tools_And_Data/baseUrls";
import { setCustomersAction } from "./customerSlice";



interface UserState {
    user: User;
    loading: boolean;
    error: {message: string | null; type: string | null}
}

export const uploadImg=createAsyncThunk('user/upload-image', async({file}: {file: File; message: string},thunkAPI) => {
    try{
      const formData= new FormData()
      formData.append("image",file)
      const response = await axios.put(BASE_URL + '/user/upload-image',formData,{headers:{authorization: `Bearer ${localStorage.getItem("token")}`,"Content-Type":"multipart/form-data"}});
      return response.data ;
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to send otp');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
});

export const getEmailChangeOtp=createAsyncThunk('user/change-email/send-otp', async({newEmail}:{newEmail: string; message: string},thunkAPI) => {
    try{
      const response = await axios.post(BASE_URL + '/user/change-email/send-otp',{newEmail},{headers:{authorization: `Bearer ${localStorage.getItem("token")}`}});
      return response.data.message ;
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to send otp');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
});

export const verifyEmailChangeOtp=createAsyncThunk('user/change-email/verify', async({values}:{values: any; message: string},thunkAPI) => {
    try{
      const response = await axios.post(BASE_URL + '/user/change-email/verify',values,{headers:{authorization: `Bearer ${localStorage.getItem("token")}`}});
      return response.data ;
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to verify otp');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
}); 

export const getForgetPasswordOtp=createAsyncThunk('user/forgot-password/send-otp', async({values}:{values: any;message: string},thunkAPI) => {
    try{
      const response = await axios.post(BASE_URL + '/forgot-password/send-otp',values,{headers:{authorization: `Bearer ${localStorage.getItem("token")}`}});
      return response.data.message ;
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to send otp');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
});

export const verifyForgetPasswordOtp=createAsyncThunk('user/forgot-password/verify', async({values}:{values: any;message: string},thunkAPI) => {
    try{
      const response = await axios.post(BASE_URL + '/forgot-password/verify',values,{headers:{authorization: `Bearer ${localStorage.getItem("token")}`}});
      return response.data.message ;
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to verify otp');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
}); 

export const updateUser=createAsyncThunk('user/update-profile', async({values}:{values: any;message: string},thunkAPI) => {
    try{
        console.log('thunk rendered')
      const response = await axios.put(BASE_URL + '/user/update-profile',values,{headers:{authorization: `Bearer ${localStorage.getItem("token")}`}});
      return response.data ;
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to update user account');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
});

export const userSignup=createAsyncThunk('user/signup/send-otp', async({values}:{values: any;message: string},thunkAPI) => {
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

export const userVerify=createAsyncThunk('user/signup/verify-otp', async({values}:{values: any;message: string},thunkAPI) => {
    try{
      const response = await axios.post(BASE_URL + '/signup/verify',{otp: values, sessionToken: sessionStorage.getItem("sessionToken")});
      localStorage.setItem('token',(response.data.token))
      const {customers,...user}=response.data.user
      thunkAPI.dispatch(setCustomersAction(customers))
      return {user,message: response.data.message} ;
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to verify OTP');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
});

export const userLogin=createAsyncThunk('user/login', async({values}:{values: any;message: string},thunkAPI) => {
    try{
      const response = await axios.post(BASE_URL + '/login',values);
      localStorage.setItem('token',(response.data.token));
      const {customers,...user}=response.data.user
      thunkAPI.dispatch(setCustomersAction(customers))
      return {user,message: response.data.message} 
    }catch(err){
        
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to login');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
        
    }
});

export const userRelogin=createAsyncThunk('user/relogin',async({}: {message: string},thunkAPI)=>{
    try{
        const response= await axios.get(BASE_URL+'/user/profile',{headers:{authorization: `Bearer ${localStorage.getItem("token")}`}})
        const {customers,...user}=response.data.user
        thunkAPI.dispatch(setCustomersAction(customers))
        return {user,message: response.data.message}
    
    }catch(error){
        if(axios.isAxiosError(error)){
            return thunkAPI.rejectWithValue(error.response?.data.message || "Failed to load user Detail")
        }
        return thunkAPI.rejectWithValue("Somthing went wrong")
    }
})

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async ({}: {message: string}, thunkAPI) => {
    try {
      const res = await axios.delete(BASE_URL+"/user/delete-account",{headers:{authorization: `Bearer ${localStorage.getItem("token")}`}});
      thunkAPI.dispatch(setCustomersAction({}))
      return res.data;
    } catch(error){
        if(axios.isAxiosError(error)){
            return thunkAPI.rejectWithValue(error.response?.data.message || "Failed to delete user account")
        }
        return thunkAPI.rejectWithValue("Somthing went wrong")
    }
})

const setUser = (state: UserState, user: User ) => {
    for (const key in user) {
      (state.user as any)[key] = (user as any)[key];
    }
}

const logout= (state: UserState)=>{
    localStorage.removeItem("token")
    setUser(state,userSlice.getInitialState().user)
}


const removeError=(state:UserState)=>{
    state.error={type: null, message:null}
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
        error: {message: "", type:''}
    } as UserState,
    reducers: {
        logout,
        removeError
    },
    extraReducers: (builder) => {
        
        builder.addCase(userSignup.fulfilled, (state, action) => {
            sessionStorage.setItem('sessionToken', (action.payload.sessionToken));
            state.loading = false;
            state.error={type:"success",message:action.payload.message}
        }).addCase(userVerify.fulfilled, (state, action) => {
            state.loading = false;
            state.error={type:"success",message:action.payload.message}
            setUser(state, action.payload.user);
        }).addCase(updateUser.fulfilled,(state,action)=>{
            state.loading=false
            state.error={type:"success",message:action.payload.message}
            setUser(state,action.payload.user)
        }).addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.error={type:"success",message:action.payload.message}
            setUser(state, action.payload.user);
        }).addCase(userRelogin.fulfilled,(state,action)=>{
            state.loading= false;
            state.error={type:"success",message:action.payload.message}
            setUser(state, action.payload.user)
        }).addCase(deleteAccount.fulfilled,(state,action)=>{
            state.loading=false
            const initialUser=userSlice.getInitialState().user
            state.error={type:"success",message:action.payload.message}
            setUser(state,initialUser)
        }).addCase(getForgetPasswordOtp.fulfilled,(state,action)=>{
            state.loading=false;
            state.error.message=action.payload
            state.error.type="success"
        }).addCase(verifyForgetPasswordOtp.fulfilled,(state,action)=>{
            state.loading=false;
            state.error.message=action.payload
            state.error.type="success"
        }).addCase(getEmailChangeOtp.fulfilled,(state,action)=>{
            state.loading=false;
            state.error.type="success"
            state.error.message=action.payload
        }).addCase(verifyEmailChangeOtp.fulfilled,(state,action)=>{
            state.loading=false;
            state.error.type="success"
            state.error.message=action.payload.message;
            setUser(state,action.payload.user)
        }).addCase(uploadImg.fulfilled,(state,action)=>{
            state.loading=false;
            state.error.type="success"
            state.error.message=action.payload.message;
            setUser(state,action.payload.user)
        }).addMatcher((action)=>action.type.startsWith("user/") && action.type.endsWith('/pending'),(state, action) => {
            state.loading = true;
            const message=(action as any).meta.arg.message
            state.error.message=message;
            state.error.type="warning"
        }).addMatcher((action)=>action.type.startsWith("user/") && action.type.endsWith('/rejected'),(state, action) => {
            state.loading = false;
            const message=(action as any).paylaod
            state.error.message=message || "Some error occured";
            state.error.type="error"
        })
        ;
    }
})

export  const {logout: logoutAction,removeError: removeUserErrorAction}=userSlice.actions
export default userSlice.reducer;