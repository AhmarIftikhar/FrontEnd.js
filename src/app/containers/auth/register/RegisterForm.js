import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import { RegisterUser } from "../../../services/index";
import show_Toast from "../../../helpers/toast.helper";
import { RegisterUserScehma } from "../../../validation/registerform";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Formik } from "formik";

function RegisterForm() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const response = await RegisterUser(values);
      if (response?.data?.success === true) {
        navigate("/login");
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
            validationSchema={RegisterUserScehma}
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
            <Link to="/login" style={{ color: "#393f81" }}>
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
