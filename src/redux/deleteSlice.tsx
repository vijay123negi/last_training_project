import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface StoreListState {
  storeListID: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: StoreListState = {
  storeListID: null,
  loading: false,
  error: null,
};

export const deleteStoreList = createAsyncThunk<number, number>(
  "deleteStoreList",
  async (id: number) => {
    try {
      const response = await axios.post(
        "https://apistg.appnovahome.com/Agent/DeleteAgent",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return id;
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }
);

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(deleteStoreList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStoreList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.storeListID = action.payload;
      })
      .addCase(deleteStoreList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching users";
      });
  },
});

export default deleteSlice;
