import React, { useState, useEffect } from "react";
import "../LoginForms/RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
// import { logoutUser, resetUser } from "../auth/authSlice";
import { resetProduct } from "../auth/contextSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetState } from "../auth/randomSlice";
function MyNavbar() {
  const {
    logoutLoading,
    logoutState,
    logoutError,
    logoutSuccess,
    logoutErrMsg,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout(logoutState.id));
    await dispatch(resetState());
    await dispatch(resetProduct());
  };
  useEffect(() => {
    if (logoutLoading) {
      toast.info("Loading...");
    } else if (logoutSuccess) {
      toast.success(logoutState?.message, { autoClose: 3000 });
      navigate("/");
    } else if (logoutError) {
      toast.error(logoutErrMsg?.message, { autoClose: 3000 });
    }
  }, [logoutLoading, logoutError, logoutSuccess]);

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ paddingBottom: "10px" }}>
        <Container fluid>
          <Link to="/ProductList" className="nav-link">
            {" "}
            Product{" "}
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {" "}
              {/* add Nav component and ml-auto class */}
              {isAuthenticated && (
                <Link to="/cart" className="nav-link">
                  <ButtonContainer>
                    <i className="fas fa-cart-plus">my cart</i>
                  </ButtonContainer>
                </Link>
              )}
              {isAuthenticated && (
                <Button variant="outline-success" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
