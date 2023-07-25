import React from "react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title">
          <h1>Your cart is currently empty</h1>
        </div>
      </div>
      <div className="col-10 mx-auto text-center">
        <Link to="/dashboard/product" className="btn btn-outline-success">
          Back To Product
        </Link>
      </div>
    </div>
  );
}
