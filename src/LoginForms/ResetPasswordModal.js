import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import "./MyModal.css";
import { resetPassword, resetState } from "../auth/randomSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";

function ResetPasswordModal({ show1, handleClose1, handleShow1 }) {
  const {
    resetPasswordState,
    resetPasswordError,
    resetPasswordSuccess,
    resetPasswordLoading,
    resetPasswordErrMsg,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    newPassword: "",
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "New Password must be at least 8 characters long"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // const token = localStorage.getItem("token");
    const token = JSON.parse(localStorage.getItem("token"));
    const userData = {
      token,
      newPassword: values.newPassword,
    };
    dispatch(resetPassword(userData));
    setSubmitting(false);
  };

  useEffect(() => {
    if (resetPasswordLoading) {
      toast.info("Loading...");
    } else if (resetPasswordSuccess) {
      toast.success(resetPasswordState?.message, { autoClose: 3000 });
      dispatch(resetState());
      handleClose1();
    } else if (resetPasswordError) {
      toast.error(resetPasswordErrMsg, { autoClose: 3000 });
      dispatch(resetState());
    }
  }, [resetPasswordLoading, resetPasswordError, resetPasswordSuccess]);

  return (
    <>
      <Modal show={show1} onHide={handleClose1} backdrop="static">
        <Modal.Header className="bg-primary text-white">
          <Modal.Title>Password Reset</Modal.Title>
          <button className="close-button" onClick={handleClose1}>
            <AiOutlineClose className="close-icon" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <p className="py-2">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    size="lg"
                    name="newPassword"
                    placeholder="New Password"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.newPassword && !!errors.newPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  Reset Password
                </Button>
              </Form>
            )}
          </Formik>
          <div className="d-flex justify-content-between mt-4">
            <Link to="/" onClick={handleClose1}>
              Login
            </Link>
            <Link to="/register" onClick={handleClose1}>
              Register
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResetPasswordModal;
