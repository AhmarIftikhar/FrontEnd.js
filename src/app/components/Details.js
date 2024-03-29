import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import { ButtonContainer } from "./Button";
import { addToCart, openModal } from "../store/slices/contextSlice";

const Details = () => {
  const dispatch = useDispatch();
  const { detailProduct } = useSelector((state) => state.products);

  const { id, company, img, info, price, title, inCart } = detailProduct;
  return (
    <>
      {" "}
      <Helmet>
        <title> Dashboard | Details </title>
      </Helmet>
      <div className="container py-5">
        {/*title*/}
        <div className="row>">
          <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
            <h1>{title}</h1>
          </div>
        </div>
        {/*end of title*/}
        {/*product info*/}
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <img src={img} className="img-fluid" alt="product" />
          </div>
          {/*product text*/}
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <h2>model:{title}</h2>
            <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
              made by: <span className="text-uppercase">{company}</span>
            </h4>
            <h4 className="text-blue">
              <strong>
                Price : <span>$</span>
                {price}
              </strong>
            </h4>
            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              some info about product
            </p>
            <p className="text-muted lead">{info}</p>
            {/*buttons*/}
            <div>
              <Link to="/dashboard/product">
                <ButtonContainer>back to products</ButtonContainer>
              </Link>
              <ButtonContainer
                cart
                disabled={inCart ? true : false}
                onClick={() => {
                  dispatch(addToCart(id));
                  dispatch(openModal(id));
                }}
              >
                {inCart ? "inCart" : "add to cart"}
              </ButtonContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
