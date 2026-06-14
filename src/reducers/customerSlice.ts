import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Customer, CustomersWithId } from "../models";
import { BASE_URL } from "../Tools_And_Data/baseUrls";
import axios from "axios";


type CustomerState={
 customers: Record<string, CustomersWithId>;
 searchResults: Record<string, CustomersWithId>;
 loading:boolean;
 error:{message: string | null; type: string | null};
 seaching: boolean
}
const initialState: CustomerState={
 customers:{},
 searchResults:{},
 loading:false,
 error:{
  message:null,
  type:null
 },
 seaching: false
}

export const deleteCustomer=createAsyncThunk('customer/delete',async({customerId}:{customerId: string; message: string},thunkAPI)=>{
    try{
        const response=await axios.delete(BASE_URL+"/customer/"+customerId,{headers:{authorization: `Bearer ${localStorage.getItem('token')}`}})
        return {customerId,data: response.data}
    }catch(error){
        if(axios.isAxiosError(error)){
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Some Error occured")
        }else{
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
})

export const addCustomer=createAsyncThunk('customer/add', async({values}:{values: any; message: string},thunkAPI) => {
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

export const searchCustomer = createAsyncThunk("customer/search",async({query}:{query:string},thunkAPI)=>{

    try{

      const response = await axios.get(
        `${BASE_URL}/customer/search?q=${query}`,
        {
          headers:{
            Authorization:
            `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      return response.data;

    }catch(error){

      if(axios.isAxiosError(error)){
        return thunkAPI.rejectWithValue(
          error.response?.data.message ||
          "Search failed"
        );
      }

      return thunkAPI.rejectWithValue(
        "Something went wrong"
      );

    }

  }
);

export const addTaken=createAsyncThunk('customer/add-take',async({ customerId, values }: { customerId: string; values: any ,message:string}, thunkAPI)=>{
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

export const addGiven=createAsyncThunk('customer/add-give',async({ customerId, values }: { customerId: string; values: any, message: string }, thunkAPI)=>{
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
const openCustomerLoading=(state: CustomerState, action: PayloadAction<boolean>)=>{
  state.seaching=action.payload
}

const removeError=(state: CustomerState)=>{
    state.error={message: null,type: null}
}
const customerSlice=createSlice({
    name: 'customer',
    initialState,
    reducers: {
      setCustomers,
      removeError,
      openCustomerLoading
    },
    extraReducers: (builder) => {
        builder.addCase(addCustomer.fulfilled, (state, action) => {
          state.loading = false;
          const customer=action.payload
          customer.customer.customerId=customer.customerId
          state.customers[customer.customer.customerId]=customer.customer
          state.error={type:"success", message:action.payload.message}
        }).addCase(addGiven.fulfilled,(state,action)=>{
          state.loading=false;
          const { customerId, data } = action.payload;
          const txId = data.txId;
          state.customers[customerId].moneyToGive![txId as string] = data.transaction;
          state.customers[customerId].totalGive = data.totalGive;
          state.error={type:"success", message:data.message}
        }).addCase(addTaken.fulfilled,(state, action)=>{
          state.loading=false
          const { customerId, data } = action.payload;
          const txId = data.txId;
          state.customers[customerId].moneyToTake![txId as string] = data.transaction;
          state.customers[customerId].totalTake = data.totalTake;
          state.error=data.message
        }).addCase(deleteCustomer.fulfilled,(state,action)=>{
            delete state.customers[action.payload.customerId]
            state.error={type:"success",message: action.payload.data.message}
        }).addCase(searchCustomer.fulfilled,(state,action)=>{
          state.loading=false
          state.searchResults =action.payload.customers
          state.seaching=false
       })
        builder.addMatcher((action)=>action.type.startsWith("customer/") && action.type.endsWith("/pending"), (state,action) => {
            state.loading = true;
            const message=(action as any).meta.arg.message
            state.error={type:"warning",message};
        }).addMatcher((action)=>action.type.startsWith("customer/") && action.type.endsWith("/rejected"), (state, action) => {
            state.loading = false;
            const message=(action as any).payload
            state.error={type:"error",message};
        })
    }
})

const {actions, reducer: customerReducer}=customerSlice;
export const  {setCustomers: setCustomersAction, removeError:removeCustomerErrorAction, openCustomerLoading: onCustomerLoading}= actions;
export default customerReducer;