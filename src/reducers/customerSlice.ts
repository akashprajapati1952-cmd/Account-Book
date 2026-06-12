import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Customer, CustomersWithId } from "../models";
import { BASE_URL } from "../Tools/baseUrls";
import axios from "axios";
import { useParams } from "react-router-dom";


type CustomerState={ customers: Record<string, CustomersWithId>; loading: boolean, error: string | null}
const initialState: CustomerState = { customers: {}, loading: false, error: null };

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

export const addTaken=createAsyncThunk('customer/add-take',async(values: any, thunkAPI)=>{
    try{
        const id=useParams()["customerId"]
        const response= await axios.post(BASE_URL+'/customer/'+id+"add-take",values,{headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})
        return response.data
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to add entry');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
    }
})

export const addGiven=createAsyncThunk('customer/add-give',async(values: any, thunkAPI)=>{
    try{
        const id=useParams()["customerId"]
        const response= await axios.post(BASE_URL+'/customer/'+id+"add-give",values,{headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})
        return response.data
    }catch(err){
        if(axios.isAxiosError(err)){
          return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to add entry');
        }
        return thunkAPI.rejectWithValue('Something went wrong')
    }
})


const setCustomers=(state: CustomerState, action: PayloadAction<Record<string, Customer>>)=>{
    const customers=action.payload
    const customersWithId=Object.fromEntries(Object.entries(customers).map(([id,customer])=>([id,{customerId: id,...customer}])))
    Object.assign(state.customers, customersWithId);
}
const customerSlice=createSlice({
    name: 'customer',
    initialState,
    reducers: {
      setCustomers
    },
    extraReducers: (builder) => {
        builder.addCase(addCustomer.pending, (state) => {
            state.loading = true;
        }).addCase(addCustomer.fulfilled, (state, action) => {
            state.loading = false;
            const customer=action.payload
            customer.customer.customerId=customer.customerId
            state.customers[customer.customer.customerId]=customer.customer
        }).addCase(addCustomer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

const {actions, reducer: customerReducer}=customerSlice;
export const  {setCustomers: setCustomersAction}= actions;
export default customerReducer;