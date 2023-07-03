import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { ForgotPassword } from "../../../services/index";
import show_Toast from "../../../helpers/toast.helper";
import { ForgotPasswordScehma } from "../../../validation/forgotpassword";
import { ServicesContext } from "../../../context/ServicesContext";

import { Formik } from "formik";

function ForgotPasswordModel() {
  const context = useContext(ServicesContext);
  const { show, handleClose } = context;

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const response = await ForgotPassword(values);
      if (response?.data?.success === true) {
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        handleClose();
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
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header className="bg-primary text-white">
          <Modal.Title>Forgot password</Modal.Title>
          <button className="close-button" onClick={handleClose}>
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
            validationSchema={ForgotPasswordScehma}
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
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    size="lg"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  Forgot password
                </Button>
              </Form>
            )}
          </Formik>
          <div className="d-flex justify-content-between mt-4">
            <Link to="/login" onClick={handleClose}>
              Login
            </Link>
            <Link to="/register" onClick={handleClose}>
              Register
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ForgotPasswordModel;
