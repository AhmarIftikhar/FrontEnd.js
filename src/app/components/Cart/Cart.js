import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

const Store = (props) => {
  const { cart } = useSelector((state) => state.products);

  if (cart.length > 0) {
    return (
      <>
        <Helmet>
          <title> Dashboard | Cart </title>
        </Helmet>
        <section>
          <Title name="your" title="cart" />
          <CartColumns />
          <CartList cart={cart} />
          <CartTotals history={props.history} />
        </section>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title> Dashboard | Cart </title>
        </Helmet>
        <section>
          <EmptyCart />
        </section>
      </>
    );
  }
};

export default Store;
