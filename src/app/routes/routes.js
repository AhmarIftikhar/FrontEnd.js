import { Navigate } from "react-router-dom";

const ProtectRedirectTo = "/login";

const AuthRedirectTo = "/productList";

// pages access before login
export const AuthRoute = ({
  children,
  isAuthenticated = false,
  comingFrom = "",
}) => {
  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to={comingFrom ? comingFrom : AuthRedirectTo} replace={true} />
  );
};

// pages access after login successfully
export const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={ProtectRedirectTo} replace={true} />
  );
};
