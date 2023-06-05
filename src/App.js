import React, { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import RegisterForm from "./LoginForms/RegisterForm";
import LoginForm from "./LoginForms/LoginForm";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Modal from "./components/Modal";
import { ToastContainer, toast } from "react-toastify";
import { RequireAuth } from "./LoginForms/RequireAuth";
import ForgotPasswordModel from "./LoginForms/ForgotPasswordModel";
import ResetPasswordModal from "./LoginForms/ResetPasswordModal";
const App = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  return (
    <>
      <ToastContainer />
      <MyNavbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LoginForm handleShow={handleShow} handleShow1={handleShow1} />
          }
        />
        <Route exact path="/register" element={<RegisterForm />} />

        <Route
          exact
          path="/productList"
          element={
            <RequireAuth>
              <ProductList />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/details"
          element={
            <RequireAuth>
              <Details />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route exact path="*" element={<Default />} />
      </Routes>
      <Modal />
      <ForgotPasswordModel
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
      <ResetPasswordModal
        handleClose1={handleClose1}
        handleShow1={handleShow1}
        show1={show1}
      />
    </>
  );
};

export default App;
