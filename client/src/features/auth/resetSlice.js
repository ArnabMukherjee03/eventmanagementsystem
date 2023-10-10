import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetPassreq, resetPassres } from "./authApi";


const initialState = {
    status:"idle",
    error: null,
    success: false,
    successMsg: null
};

export const resetPassreqAsync = createAsyncThunk(
  "auth/resetpasswordreq",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassreq(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const resetPassresAsync = createAsyncThunk(
  "auth/resetpasswordres",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassres(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);



export const resetSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    redirectToLogin: (state) => {
        state.success = false;
    },
    clearError: (state) =>{
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassreqAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassreqAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.success = true;
        state.successMsg = action.payload;
      })
      .addCase(resetPassreqAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(resetPassresAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassresAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.success = true;
        state.successMsg = action.payload;
      })
      .addCase(resetPassresAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
  },
});


export const selectSucess = (state)=> state.resetPassword.success;
export const selectError = (state)=> state.resetPassword.error;
export const selectSucessmsg = (state)=> state.resetPassword.successMsg;
export const selectStatus = (state)=> state.resetPassword.status;

export const { redirectToLogin,clearError} = resetSlice.actions;
export default resetSlice.reducer;
