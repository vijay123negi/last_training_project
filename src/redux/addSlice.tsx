import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'; 

interface AddAssociatePayload {
  partnerName: string;
  storeName: string;
  name: string;
  meetingsConducted: string;
  meetingsCancelled: string;
  meetings: string;
  availability: string;
  status: string;
}

interface DataRow {
    id: number;
    name: string;
  }

interface AgentState {
  data: DataRow[]; 
  loading: boolean;
  error: string | null;
}

const initialState: AgentState = {
  data: [],
  loading: false,
  error: null,
};

export const addAssociate = createAsyncThunk(
  'agent/addAssociate',
  async (payload: AddAssociatePayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://apistg.appnovahome.com/Agent/AddAgent", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }); 

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addSlice = createSlice({
  name: 'add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAssociate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAssociate.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data.push(action.payload); 
      })
      .addCase(addAssociate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      });
  },
});
export default addSlice;