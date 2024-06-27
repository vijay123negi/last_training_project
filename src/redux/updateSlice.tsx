import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
  email: string;
  phoneNo: string;
  gender: string;
  partnerName: string;
  storeName: string;
  status: string;
}

interface AgentState {
  data: Item[]; 
  loading: boolean;
  error: string | null;
}

const initialState: AgentState = {
  data: [],
  loading: false,
  error: null,
};

export const updateItem = createAsyncThunk(
  'agent/updateItem',
  async (updatedItem: Item, { rejectWithValue }) => {
    try {
      console.log("updatedItem:",updatedItem)
      const response = await axios.post(
        "https://apistg.appnovahome.com/Agent/UpdateAgent", 
        updatedItem, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      );
      console.log("response", response);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        const index = state.data.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
          state.data[index] = updatedItem;
        } else {
          state.data.push(updatedItem);  
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default updateSlice;