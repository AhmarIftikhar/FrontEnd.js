import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthenticated: false,
  permissions: [],
};

const loginReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, ...action.payload })
      );
      state.user = { ...state.user, ...action.payload };
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setPermissions: (state, action) => {
      const permissions = action?.payload || [];
      if (permissions.length) {
        state.permissions = permissions?.map((item) => item.name);
      }
    },
    setLoginStateEmpty: (state, action) => {
      state.user = {};
      state.permissions = [];
      state.isAuthenticated = false;
    },
    setUserRole: (state, { payload: { roleName, role } }) => {
      state.user = { ...state.user, ...role };
    },
  },
});
export const {
  user,
  setUser,
  setIsAuthenticated,
  setLoginStateEmpty,
  setUserRole,
  setPermissions,
} = loginReducer.actions;
export default loginReducer.reducer;
