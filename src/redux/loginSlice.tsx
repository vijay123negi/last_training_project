import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  username: string;
  password: string;
}

interface LoginState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  users: [],
  loading: false,
  error: null,
};

export const Users = createAsyncThunk(
  "Users",
  async (loginCredentials: { username: string; password: string }) => {
    try {
      const response = await axios.post(
        "https://apistg.appnovahome.com/Account/Authenticate",
        loginCredentials
      );
      const token = response.data.data[0].token;
      localStorage.setItem("token", token);
      console.log("loginCredentials: ", token);
      return response.data;
    } catch (error) {
      throw Error("Error fetching users");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Users.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Users.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(Users.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching users";
      });
  },
});

export default loginSlice;
