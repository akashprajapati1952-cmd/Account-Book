import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Customer, CustomersWithId } from "../models";
import { BASE_URL } from "../Tools_And_Data/baseUrls";
import axios from "axios";


type CustomerState={ customers: Record<string, CustomersWithId>; loading: boolean, error: string | null}
const initialState: CustomerState = { customers: {}, loading: false, error: null };

export const deleteCustomer=createAsyncThunk('customer/delete',async(customerId: string,thunkAPI)=>{
    try{
        await axios.delete(BASE_URL+"/customer/"+customerId,{headers:{authorization: `Bearer ${localStorage.getItem('token')}`}})
        return customerId
    }catch(error){
        if(axios.isAxiosError(error)){
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Some Error occured")
        }else{
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
})

export const addCustomer=createAsyncThunk('customer/add', async(values: any,thunkAPI) => {
    try{
      const response = await axios.post(BASE_URL + '/customer/save',{customer:values},{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
      return response.data;
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to add customer');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
    }
});

export const addTaken=createAsyncThunk('customer/add-take',async({ customerId, values }: { customerId: string; values: any }, thunkAPI)=>{
    try{

        const response= await axios.post(BASE_URL+'/customer/'+customerId+"/add-take",{...values,date: new Date().toISOString().split("T")[0]},{headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})
        return {data:response.data, customerId}
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to add entry');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
    }
})

export const addGiven=createAsyncThunk('customer/add-give',async({ customerId, values }: { customerId: string; values: any }, thunkAPI)=>{
    try{
       
        const response= await axios.post(BASE_URL+'/customer/'+customerId+"/add-give",{...values,date: new Date().toISOString().split("T")[0]},{headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})
        return {data:response.data, customerId}
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to add entry');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
    }
})


const setCustomers=(state: CustomerState, action: PayloadAction<Record<string, Customer>>)=>{
    const customers=action.payload
    state.customers = Object.fromEntries(
    Object.entries(customers).map(([id, customer]) => [
      id,
      { customerId: id, ...customer },
    ])
    )
}
const customerSlice=createSlice({
    name: 'customer',
    initialState,
    reducers: {
      setCustomers
    },
    extraReducers: (builder) => {
        builder.addCase(addCustomer.fulfilled, (state, action) => {
          state.loading = false;
          const customer=action.payload
          customer.customer.customerId=customer.customerId
          state.customers[customer.customer.customerId]=customer.customer
        }).addCase(addGiven.fulfilled,(state,action)=>{
          state.loading=false;
          const { customerId, data } = action.payload;
          const txId = data.txId;
          state.customers[customerId].moneyToGive![txId as string] = data.transaction;
          state.customers[customerId].totalGive = data.totalGive;
        }).addCase(addTaken.fulfilled,(state, action)=>{
          state.loading=false
          const { customerId, data } = action.payload;
          const txId = data.txId;
          state.customers[customerId].moneyToTake![txId as string] = data.transaction;
          state.customers[customerId].totalTake = data.totalTake;
        }).addCase(deleteCustomer.fulfilled,(state,action)=>{
            delete state.customers[action.payload]
        })
        builder.addMatcher((action)=>action.type.endsWith("/pending"), (state) => {
            state.loading = true;
            state.error=null;
        }).addMatcher((action)=>action.type.endsWith("/rejected"), (state, action) => {
            state.loading = false;
            state.error = (action as any).error.message as string;
        })
    }
})

const {actions, reducer: customerReducer}=customerSlice;
export const  {setCustomers: setCustomersAction}= actions;
export default customerReducer;