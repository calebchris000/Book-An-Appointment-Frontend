import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk("signup/User", async (authData) => {
  try {
    const response = await fetch("http://127.0.0.1:3001/" + authData.endPoints, authData.method);
    
    const data = await response.json()
    if (authData.sign_in && data.status.code === 200) {
      const token = response.headers.get('Authorization');
      const userName = data.data.name;
      localStorage.setItem('authToken', token);
      localStorage.setItem('name', userName);
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('name');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    isLoading: false,
    error: null,
    successMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successMessage = payload.status.message;

      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default signupSlice.reducer;