import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signup,login, checkAuth, logOut } from "./authApi";


const initialState = {
  status: "idle",
  isSuccess: false,
  error: null,
  userstatus: "idle",
  userChecked: null,
  userRole: null,
  verifyStatus: null,
  verifyUser: null
};

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signup(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      
      const response = await login(data);
      return response.data;
    } catch (error) {
      let err;
      if(error.response.data.message.message){
        err = error.response.data.message.message;
      }else{
        err = error.response.data.message;
      }
      return rejectWithValue(err);
    }
  }
);

export const authAsync = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const logOutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logOut();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    redirectToLogin: (state) => {
      state.isSuccess = false;
    },
    clearError: (state) =>{
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isSuccess = true;
        state.error = [];
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isSuccess = true;
        state.userChecked = action.payload.id;
        state.userRole = action.payload.role;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(authAsync.pending, (state) => {
        state.userstatus = "loading";
      })
      .addCase(authAsync.fulfilled, (state, action) => {
        state.userstatus = "idle";
        state.userChecked = action.payload.id;
        state.userRole = action.payload.role;
      })
      .addCase(authAsync.rejected, (state, action) => {
        state.userstatus = "rejected";
        state.error = action.payload;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userChecked = null;
        state.userRole = null;
      })
      .addCase(logOutAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const selectisSuccess = (state)=> state.auth.isSuccess;
export const selectError = (state) => state.auth.error;
export const selectUser = (state)=> state.auth.userChecked;
export const selectRole = (state)=> state.auth.userRole;
export const selectStatus = (state)=> state.auth.userstatus;
export const selectVerifyStatus = (state)=> state.auth.verifyStatus;
export const selectVerifyUser = (state)=> state.auth.verifyUser;
export const Status = (state)=> state.auth.status;

export const { redirectToLogin,clearError,clearMsg } = authSlice.actions;
export default authSlice.reducer;
