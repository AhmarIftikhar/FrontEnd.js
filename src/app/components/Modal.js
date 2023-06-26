import React, { useContext } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/slices/contextSlice";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";

const Modal = () => {
  const dispatch = useDispatch();

  const { modalOpen, modalProduct } = useSelector((state) => state.products);

  const { img, title, price } = modalProduct;

  if (!modalOpen) {
    return null;
  } else {
    return (
      <ModalContainer>
        <div className="container">
          <div className="row">
            <div
              id="modal"
              className="col-8 mx-auto col-md-6 col-lg-4 text-capitalize text-center p-5"
            >
              <h5>item added to the cart</h5>
              <img src={img} className="img-fluid" alt="product" />
              <h5>{title}</h5>
              <h5 className="text-muted">price : $ {price}</h5>
              <Link to="/productList">
                <ButtonContainer onClick={() => dispatch(closeModal())}>
                  continue shopiing
                </ButtonContainer>
              </Link>
              <Link to="/cart">
                <ButtonContainer cart onClick={() => dispatch(closeModal())}>
                  go to cart
                </ButtonContainer>
              </Link>
            </div>
          </div>
        </div>
      </ModalContainer>
    );
  }
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;

export default Modal;
