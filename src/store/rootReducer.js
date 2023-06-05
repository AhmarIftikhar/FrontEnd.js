// import { combineReducers } from "redux";
// // import authReducer from "../auth/authSlice";
// import contextSlice from "../auth/contextSlice";
// import randomSlice from "../auth/randomSlice";

// const rootReducer = combineReducers({
//   // user: authReducer,
//   products: contextSlice,
//   auth: randomSlice,
// });

// export default rootReducer;

import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// slices
import contextSlice from "../auth/contextSlice";
import randomSlice from "../auth/randomSlice";

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["auth", "products"],
};

const rootReducer = combineReducers({
  // user: authReducer,
  products: contextSlice,
  auth: randomSlice,
});
export { rootPersistConfig, rootReducer };
