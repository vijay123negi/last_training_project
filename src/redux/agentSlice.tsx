"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ApiData {
  partnerName: string;
  storeLocation: string;
  associateName: string;
  conducted: string;
  cancel: string;
  meetings: string;
  availability: string;
  status: string;
}

interface DataState {
  data: ApiData[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axios.get<ApiData[]>('https://apistg.appnovahome.com/Agent/GetAgents?FromDateTimeForCount&TimeZone=Asia/Calcutta&PageSize=10&Status=1&pageNumber=0', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
});

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("state.data",state.data)
      state.error = null;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to fetch data';
    });
  },
});

export default agentSlice;
