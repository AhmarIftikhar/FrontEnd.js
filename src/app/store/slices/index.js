import { combineReducers } from "@reduxjs/toolkit";
import login from "./login";
import contextSlice from "./contextSlice";
import randomSlice from "./randomSlice";

export default combineReducers({
  login,
  products: contextSlice,
  auth: randomSlice,
});
