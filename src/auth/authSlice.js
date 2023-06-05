import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const initialState = {
  user: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMsg: "",
  isAuthenticated: false,
  // logoutuser
  isLogoutLoading: false,
  logoutuser: "",
  isLogoutError: false,
  isLogoutSuccess: false,
  isLogouterrorMsg: "",
  // reg user
  regUserState: "",
  regError: false,
  regSuccess: false,
  regLoading: false,
  regErrMsg: "",
};

// registerUser user
export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (user, thunkAPI) => {
    try {
      return await authService.registerUser(user);
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// loginUser user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      return await authService.loginUser(user);
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);
// logout user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (user, thunkAPI) => {
    try {
      return await authService.logoutUser(user);
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = "";
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errorMsg = "";
      state.isAuthenticated = false;
      state.isLogoutLoading = false;
      state.logoutuser = "";
      state.isLogoutError = false;
      state.isLogoutSuccess = false;
      state.isLogouterrorMsg = "";
      state.regUserState = "";
      state.regError = false;
      state.regSuccess = false;
      state.regLoading = false;
      state.regErrMsg = "";
    },
    resetUserByPage404: (state) => {
      state.user = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.regLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.regLoading = false;
        state.regSuccess = true;
        state.regUserState = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.regLoading = false;
        state.regError = true;
        state.regSuccess = false;
        state.regErrMsg = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = action.payload;
        // state.user = null
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLogoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLogoutSuccess = true;
        state.isLogoutLoading = false;
        state.isAuthenticated = false;
        state.logoutuser = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLogoutLoading = false;
        state.isLogoutError = true;
        state.isLogoutSuccess = false;
        state.isLogouterrorMsg = action.payload;
      });
  },
});

export const { resetUserByPage404, resetUser } = authSlice.actions;
export default authSlice.reducer;
