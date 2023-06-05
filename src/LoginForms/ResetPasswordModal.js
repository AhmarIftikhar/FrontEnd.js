import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import "./MyModal.css";
import { resetPassword, resetState } from "../auth/randomSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ResetPasswordModal({ show1, handleClose1, handleShow1 }) {
  const {
    resetPasswordState,
    resetPasswordError,
    resetPasswordSuccess,
    resetPasswordLoading,
    resetPasswordErrMsg,
  } = useSelector((state) => state.auth);
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const userData = {
      token,
      newPassword,
    };

    dispatch(resetPassword(userData));
  };
  useEffect(() => {
    if (resetPasswordLoading) {
      toast.info("Loading...");
    } else if (resetPasswordSuccess) {
      toast.success(resetPasswordState?.message, { autoClose: 3000 });
      dispatch(resetState());
    } else if (resetPasswordError) {
      toast.error(resetPasswordErrMsg, { autoClose: 3000 });
      dispatch(resetState());
    }
  }, [resetPasswordLoading, resetPasswordError, resetPasswordSuccess]);
  return (
    <>
      <Modal show={show1} onHide={handleClose1} backdrop="static">
        <Modal.Header className="bg-primary text-white">
          <Modal.Title>Password Reset</Modal.Title>
          <button className="close-button" onClick={handleClose1}>
            <AiOutlineClose className="close-icon" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <p className="py-2">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Reset password
            </button>
          </form>
          <div className="d-flex justify-content-between mt-4">
            <Link to="/" onClick={handleClose1}>
              Login
            </Link>
            <Link to="/register" onClick={handleClose1}>
              Register
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResetPasswordModal;
