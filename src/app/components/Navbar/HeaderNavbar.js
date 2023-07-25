import React from "react";
import "../../containers/auth/register/RegisterForm.css";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

function HeaderNavbar() {
  return (
    <>
      <Navbar bg="light" expand="lg" style={{ paddingBottom: "10px" }}>
        <Container fluid>
          <Link to="/" className="nav-link">
            {" "}
            Mobile App{" "}
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Link to="/login" className="btn btn-outline-success">
                Create Account
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HeaderNavbar;
