import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/app";

import LoginForm from "../containers/auth/login/LoginForm";
import RegisterForm from "../containers/auth/register/RegisterForm";
import ProductList from "../components/ProductList";
import Details from "../components/Details";
import TableData from "../components/TableData/tableData";
import CreateTableData from "../components/TableData/createTableData";
import EditTableData from "../components/TableData/editTableData";
import Default from "../components/Default";
import Cart from "../components/Cart/Cart";

import { AuthRoute, ProtectedRoute } from "./routes";
import Modal from "../components/Modal";
import ForgotPasswordModel from "../containers/auth/forgotPassword/ForgotPasswordModel";
import ResetPasswordModal from "../containers/auth/resetPassword/ResetPasswordModal";
const AppRoutes = () => {
  const { isAuthenticated = false } = useSelector((state) => state.login);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <AuthRoute isAuthenticated={isAuthenticated}>
              <Default />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute isAuthenticated={isAuthenticated}>
              <LoginForm />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute isAuthenticated={isAuthenticated}>
              <RegisterForm />
            </AuthRoute>
          }
        />

        <Route
          path="/productList"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppLayout>
                <ProductList />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/details"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppLayout>
                <Details />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppLayout>
                <Cart />{" "}
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tableData"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppLayout>
                <TableData />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/createTableData"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppLayout>
                <CreateTableData />{" "}
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/editTableData/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppLayout>
                <EditTableData />{" "}
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Modal />
      <ForgotPasswordModel />
      <ResetPasswordModal />
    </BrowserRouter>
  );
};

export default AppRoutes;
