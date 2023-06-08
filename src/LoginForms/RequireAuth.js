import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RequireAuth = ({ children }) => {
  // const state = JSON.parse(localStorage.getItem("persist:root"));
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  // console.log(tokens);
  // const user = JSON.parse(state?.auth);
  if (!tokens) {
    toast.error("Please Login To Open The Product App", { autoClose: 3000 });
    return <Navigate to="/" />;
  }
  return children;
};
