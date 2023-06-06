import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword, resetState } from "../auth/randomSlice";
import { Formik } from "formik";
import * as Yup from "yup";

function ForgotPasswordModel({ show, handleClose, handleShow }) {
  const {
    forgotPasswordState,
    forgotPasswordError,
    forgotPasswordSuccess,
    forgotPasswordLoading,
    forgotPasswordErrMsg,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(forgotPassword(values.email));
    setSubmitting(false);
  };

  useEffect(() => {
    if (forgotPasswordLoading) {
      toast.info("Loading...");
    } else if (forgotPasswordSuccess) {
      toast.success(forgotPasswordState?.message, { autoClose: 3000 });
      dispatch(resetState());
    } else if (forgotPasswordError) {
      toast.error(forgotPasswordErrMsg, { autoClose: 3000 });
      dispatch(resetState());
    }
  }, [forgotPasswordLoading, forgotPasswordError, forgotPasswordSuccess]);

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
            <Link to="/" onClick={handleClose}>
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
