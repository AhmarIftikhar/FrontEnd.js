import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import "./MyModal.css";
import { ResetPassword } from "../../../services/index";
import show_Toast from "../../../helpers/toast.helper";
import { ResetPasswordScehma } from "../../../validation/resetpassword";
import { ServicesContext } from "../../../context/ServicesContext";
import { Formik } from "formik";

function ResetPasswordModal() {
  const context = useContext(ServicesContext);
  const { show1, handleClose1 } = context;

  const initialValues = {
    newPassword: "",
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const payload = {
        newPassword: values.newPassword,
        token: token,
      };
      const response = await ResetPassword(payload);
      if (response?.data?.success === true) {
        localStorage.removeItem("token");
        handleClose1();
      }
      show_Toast({
        status: true,
        message: response?.data?.message || "Success",
      });
      resetForm();
    } catch (error) {
      show_Toast({
        status: false,
        message: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
            validationSchema={ResetPasswordScehma}
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
            <Link to="/login" onClick={handleClose1}>
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
