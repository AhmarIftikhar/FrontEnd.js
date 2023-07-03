import React from "react";
import "../../containers/auth/register/RegisterForm.css";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../Button";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { resetProduct } from "../../store/slices/contextSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStateEmpty } from "../../store/slices/login";
import show_Toast from "../../helpers/toast.helper";
import { Logout } from "../../services/index";

function HeaderNavbar() {
  const { isAuthenticated = false } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        userId: user._id,
      };
      const response = await Logout(payload);
      if (response?.data?.success === true) {
        dispatch(resetProduct());
        dispatch(setLoginStateEmpty());
        localStorage.removeItem("accessToken");
      }
      show_Toast({
        status: true,
        message: response?.data?.message || "Success",
      });
    } catch (error) {
      show_Toast({
        status: false,
        message: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ paddingBottom: "10px" }}>
        <Container fluid>
          {isAuthenticated ? (
            <Link to="/ProductList" className="nav-link">
              {" "}
              Product Shop{" "}
            </Link>
          ) : (
            <Link to="" className="nav-link">
              {" "}
              Mobile App{" "}
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/" className="nav-link">
              {" "}
              Home{" "}
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
              {isAuthenticated ? (
                <Button variant="outline-success" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Link to="/login" className="btn btn-outline-success">
                  Create Account
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HeaderNavbar;
