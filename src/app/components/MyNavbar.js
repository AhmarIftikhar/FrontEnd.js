import React, { useState, useEffect } from "react";
import "../containers/auth/register/RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ButtonContainer } from "./Button";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { resetProduct } from "../store/slices/contextSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetState } from "../store/slices/randomSlice";
import { setLoginStateEmpty } from "../store/slices/login";

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
    await dispatch(setLoginStateEmpty());
  };
  useEffect(() => {
    if (logoutLoading) {
      toast.info("Loading...");
    } else if (logoutSuccess) {
      toast.success(logoutState?.message, { autoClose: 3000 });
      navigate("/login");
    } else if (logoutError) {
      toast.error(logoutErrMsg?.message, { autoClose: 3000 });
    }
  }, [logoutLoading, logoutError, logoutSuccess]);

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ paddingBottom: "10px" }}>
        <Container fluid>
          {isAuthenticated && (
            <Link to="/ProductList" className="nav-link">
              {" "}
              Product{" "}
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/createTableData" className="nav-link">
              {" "}
              CreateTable{" "}
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/tableData" className="nav-link">
              {" "}
              Table{" "}
            </Link>
          )}
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
