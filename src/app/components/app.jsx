import React, { Fragment, useContext } from "react";
import { ToastContainer } from "react-toastify";
import MyNavbar from "./MyNavbar";

const AppLayout = (props) => {
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="page-body-wrapper">
          <MyNavbar />
          <div className="page-body">{props.children}</div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default AppLayout;
