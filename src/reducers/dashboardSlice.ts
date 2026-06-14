import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Tools_And_Data/baseUrls";

interface DashboardState {
  summary: any;
  recentTransactions: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  summary: null,
  recentTransactions: [],
  loading: false,
  error: null,
};

export const getRecentTransactions = createAsyncThunk(
  "dashboard/getRecentTransactions",
  async (_, { rejectWithValue }) => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/dashboard/recent-transactions`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      return response.data;

    } catch(error:any){

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch transactions"
      );

    }

  }
);

export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/dashboard/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Dashboard fetch failed"
      );
    }
  }
);


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.summary = action.payload;

      })
      .addCase(
        getRecentTransactions.fulfilled,(state,action)=>{
        state.recentTransactions = action.payload.transactions;
      })

      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

  },
});


export default dashboardSlice.reducer;