import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  Row,
  Col,
  Image,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { LoginUser } from "../../../services/index";
import show_Toast from "../../../helpers/toast.helper";
import { LoginUserScehma } from "../../../validation/loginform";
import { setIsAuthenticated, setUser } from "../../../store/slices/login";
import { ServicesContext } from "../../../context/ServicesContext";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

function LoginForm() {
  const context = useContext(ServicesContext);
  const { handleShow, handleShow1 } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const response = await LoginUser(values);
      if (response?.data?.success === true) {
        dispatch(setUser(response?.data?.user));
        dispatch(setIsAuthenticated(true));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response?.data?.token)
        );
        navigate("/productList");
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
    <Container className="my-5">
      <Card>
        <Row className="g-0">
          <Col md="6">
            <Image
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="login form"
              className="rounded-start w-100"
            />
          </Col>
          <Col md="6">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <FontAwesomeIcon
                  icon={faCubes}
                  className="me-3"
                  style={{ color: "#ff6219" }}
                  size="3x"
                />
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Login into your account
              </h5>

              <Formik
                initialValues={initialValues}
                validationSchema={LoginUserScehma}
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
                      className="mb-4 px-5"
                      style={{ width: "100%" }}
                      variant="dark"
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
              <Link className="small text-muted" onClick={handleShow}>
                Forgot password?
              </Link>
              <Link className="small text-muted" onClick={handleShow1}>
                Reset Password
              </Link>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#393f81" }}>
                  Register here
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
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default LoginForm;
