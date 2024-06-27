import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface AssociateState {
    labelValue: string;
    personCount: number;
    loading: boolean;
    error: string | null;
}

const initialState: AssociateState = {
    labelValue: 'Associate',
    personCount: 0,
    loading: false,
    error: null
};

export const fetchAgentCount = createAsyncThunk(
  'associate/fetchAgentCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://apistg.appnovahome.com/Agent/GetAgentCount?Status=1', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      return response.data.data[0].totalAgents;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const associateSlice = createSlice({
  name: 'associate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgentCount.fulfilled, (state, action) => {
        state.personCount = action.payload;
        state.loading = false;
      })
      .addCase(fetchAgentCount.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default associateSlice;