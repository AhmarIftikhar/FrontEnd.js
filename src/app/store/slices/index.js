import { combineReducers } from "@reduxjs/toolkit";
import login from "./login";
import contextSlice from "./contextSlice";

export default combineReducers({
  login,
  products: contextSlice,
});
