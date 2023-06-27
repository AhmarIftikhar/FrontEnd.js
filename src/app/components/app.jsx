import React, { Fragment, useContext } from "react";
import { ToastContainer } from "react-toastify";
import HeaderNavbar from "./Navbar/HeaderNavbar";

const AppLayout = (props) => {
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="page-body-wrapper">
          <HeaderNavbar />
          <div className="page-body">{props.children}</div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default AppLayout;
