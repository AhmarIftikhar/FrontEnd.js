// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Modal, Form, Button } from "react-bootstrap";
// import { AiOutlineClose } from "react-icons/ai";
// import "./MyModal.css";
// import { forgotPassword, resetState } from "../auth/randomSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// function ForgotPasswordModel({ show, handleClose, handleShow }) {
//   const {
//     forgotPasswordState,
//     forgotPasswordError,
//     forgotPasswordSuccess,
//     forgotPasswordLoading,
//     forgotPasswordErrMsg,
//   } = useSelector((state) => state.auth);
//   const [email, setEmail] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(forgotPassword(email));
//   };
//   useEffect(() => {
//     if (forgotPasswordLoading) {
//       toast.info("Loading...");
//     } else if (forgotPasswordSuccess) {
//       toast.success(forgotPasswordState?.message, { autoClose: 3000 });
//       dispatch(resetState());
//     } else if (forgotPasswordError) {
//       toast.error(forgotPasswordErrMsg, { autoClose: 3000 });
//       dispatch(resetState());
//     }
//   }, [forgotPasswordLoading, forgotPasswordError, forgotPasswordSuccess]);

//   return (
//     <>
//       <Modal show={show} onHide={handleClose} backdrop="static">
//         <Modal.Header className="bg-primary text-white">
//           <Modal.Title> Forgot password</Modal.Title>
//           <button className="close-button" onClick={handleClose}>
//             <AiOutlineClose className="close-icon" />
//           </button>
//         </Modal.Header>
//         <Modal.Body>
//           <p className="py-2">
//             Enter your email address and we'll send you an email with
//             instructions to reset your password.
//           </p>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="email">Email address</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">
//               Forgot password
//             </button>
//           </form>
//           <div className="d-flex justify-content-between mt-4">
//             <Link to="/" onClick={handleClose}>
//               Login
//             </Link>
//             <Link to="/register" onClick={handleClose}>
//               Register
//             </Link>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default ForgotPasswordModel;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import "./MyModal.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword, resetState } from "../auth/randomSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

function ForgotPasswordModel({ show, handleClose, handleShow }) {
  const {
    forgotPasswordState,
    forgotPasswordError,
    forgotPasswordSuccess,
    forgotPasswordLoading,
    forgotPasswordErrMsg,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values.email));
    },
  });

  React.useEffect(() => {
    if (forgotPasswordLoading) {
      toast.info("Loading...");
    } else if (forgotPasswordSuccess) {
      toast.success(forgotPasswordState?.message, { autoClose: 3000 });
      dispatch(resetState());
    } else if (forgotPasswordError) {
      toast.error(forgotPasswordErrMsg, { autoClose: 3000 });
      dispatch(resetState());
    }
  }, [forgotPasswordLoading, forgotPasswordError, forgotPasswordSuccess]);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header className="bg-primary text-white">
          <Modal.Title> Forgot password</Modal.Title>
          <button className="close-button" onClick={handleClose}>
            <AiOutlineClose className="close-icon" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <p className="py-2">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...formik.getFieldProps("email")}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="btn btn-primary w-100">
              Forgot password
            </Button>
          </Form>
          <div className="d-flex justify-content-between mt-4">
            <Link to="/" onClick={handleClose}>
              Login
            </Link>
            <Link to="/register" onClick={handleClose}>
              Register
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ForgotPasswordModel;
