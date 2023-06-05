import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RequireAuth = ({ children }) => {
  // const state = JSON.parse(localStorage.getItem("persist:root"));
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);
  // const user = JSON.parse(state?.auth);
  if (!token) {
    toast.error("Please Login To Open The Product App", { autoClose: 3000 });
    return <Navigate to="/" />;
  }
  return children;
};
