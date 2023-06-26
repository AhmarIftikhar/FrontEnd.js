import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  removeItem,
} from "../../store/slices/contextSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const { id, title, img, price, total, count } = item;
  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="product"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product : </span>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price : </span>
        {price}
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
        <div className="d-flex justify-content-center">
          <div>
            <span
              className="btn btn-black mx-1"
              onClick={() => dispatch(decrement(id))}
            >
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span
              className="btn btn-black mx-1"
              onClick={() => dispatch(increment(id))}
            >
              +
            </span>
          </div>
        </div>
      </div>
      {/**/}
      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={() => dispatch(removeItem(id))}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <strong>item total : $ {total}</strong>
      </div>
    </div>
  );
}
