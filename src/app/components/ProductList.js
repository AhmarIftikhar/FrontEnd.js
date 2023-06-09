import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import Title from "./Title";

const ProductList = () => {
  const { products } = useSelector((state) => state.products);
  return (
    <React.Fragment>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            {products.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
