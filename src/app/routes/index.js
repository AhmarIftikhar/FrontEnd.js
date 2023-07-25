import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/app";

import LoginForm from "../containers/auth/login/LoginForm";
import RegisterForm from "../containers/auth/register/RegisterForm";
import Default from "../components/Default";

import { AuthRoute, ProtectedRoute } from "./routes";
import Modal from "../components/Modal";
import ForgotPasswordModel from "../containers/auth/forgotPassword/ForgotPasswordModel";
import ResetPasswordModal from "../containers/auth/resetPassword/ResetPasswordModal";
import Home from "../components/Section/Home";
import DashboardLayout from "../containers/section/dashboard/DashboardLayout";
import Dashboard from "../containers/section";
import ProductList from "../components/ProductList";
import Page404 from "../pages/Page404";
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
              <AppLayout>
                <LoginForm />
              </AppLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute isAuthenticated={isAuthenticated}>
              <AppLayout>
                <RegisterForm />
              </AppLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <AuthRoute isAuthenticated={isAuthenticated}>
              <AppLayout>
                <Home />
              </AppLayout>
            </AuthRoute>
          }
        />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Modal />
      <ForgotPasswordModel />
      <ResetPasswordModal />
    </BrowserRouter>
  );
};

export default AppRoutes;
