import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
const initialState = {
  isAuthenticated: false,
  // login
  loginState: "",
  loginError: false,
  loginSuccess: false,
  loginLoading: false,
  loginErrMsg: "",

  // logoutuser
  logoutLoading: false,
  logoutState: "",
  logoutError: false,
  logoutSuccess: false,
  logoutErrMsg: "",

  // reg user
  registerState: "",
  registerError: false,
  registerSuccess: false,
  registerLoading: false,
  registerErrMsg: "",

  // forgotPassword
  forgotPasswordState: "",
  forgotPasswordError: false,
  forgotPasswordSuccess: false,
  forgotPasswordLoading: false,
  forgotPasswordErrMsg: "",

  // resetPassword
  resetPasswordState: "",
  resetPasswordError: false,
  resetPasswordSuccess: false,
  resetPasswordLoading: false,
  resetPasswordErrMsg: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await client.post("/api/auth/register", {
        email,
        password,
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await client.post("/api/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("tokens", JSON.stringify(token));

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await client.post("/api/auth/logout", { userId });
      localStorage.removeItem("tokens");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const forgetresponse = await client.post("/api/auth/forgot-password", {
        email,
      });
      const { token, message } = forgetresponse.data;
      localStorage.setItem("token", token);
      return { token, message };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await client.post("/api/auth/reset-password", {
        token,
        newPassword,
      });
      localStorage.removeItem("token");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const randomSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: () => initialState,
    resetLoginState: (state) => {
      state.loginSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // register actions
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess = true;
        state.registerState = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = true;
        state.registerSuccess = false;
        state.registerErrMsg = action.payload;
      })
      // login actions
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = true;
        state.isAuthenticated = true;
        state.loginState = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = true;
        // state.loginSuccess = false;
        state.loginErrMsg = action.payload;
      })
      // logout actions
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.logoutSuccess = true;
        state.isAuthenticated = false;
        state.logoutState = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = true;
        // state.logoutSuccess = false;
        state.logoutErrMsg = action.payload;
      })
      // forgot password actions
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordSuccess = true;
        state.forgotPasswordState = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = true;
        // state.forgotPasswordSuccess = false;
        state.forgotPasswordErrMsg = action.payload;
      })
      // reset password actions
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordSuccess = true;
        state.resetPasswordState = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = true;
        // state.resetPasswordSuccess = false;
        state.resetPasswordErrMsg = action.payload;
      });
  },
});

export const { resetState, resetLoginState } = randomSlice.actions;

export default randomSlice.reducer;
