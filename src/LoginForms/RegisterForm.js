import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterForm.css";
import { register, resetState } from "../auth/randomSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

function RegisterForm() {
  const {
    registerState,
    registerError,
    registerSuccess,
    registerLoading,
    registerErrMsg,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    await dispatch(register(userData));
    setSubmitting(false);
  };
  useEffect(() => {
    if (registerLoading) {
      toast.info("Loading...");
    } else if (registerSuccess) {
      toast.success(registerState?.message, { autoClose: 3000 });
      dispatch(resetState());

      navigate("/");
    } else if (registerError) {
      toast.error(registerErrMsg, { autoClose: 3000 });
      dispatch(resetState());
    }
  }, [registerLoading, registerError, registerSuccess]);
  return (
    <Container fluid>
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
          height: "300px",
        }}
      ></div>
      <Card
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: "-100px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <Card.Body className="p-5 text-center">
          <h2 className="fw-bold mb-5">Register now</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    size="lg"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  className="mb-4 px-5 w-100"
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Register"}
                </Button>
              </Form>
            )}
          </Formik>
          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
            Already have an account?{" "}
            <Link to="/" style={{ color: "#393f81" }}>
              Back to Login
            </Link>
          </p>
          <div className="d-flex flex-row justify-content-start">
            <Link to="#!" className="small text-muted me-1">
              Terms of use.
            </Link>
            <Link to="#!" className="small text-muted">
              Privacy policy
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterForm;
