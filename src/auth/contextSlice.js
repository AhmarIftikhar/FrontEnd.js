import { createSlice } from "@reduxjs/toolkit";
import { storeProducts, detailProduct } from "../data";

const contextSlice = createSlice({
  name: "product",
  initialState: {
    products: storeProducts,
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  },
  reducers: {
    resetProduct: (state) => {
      state.products = storeProducts;
      state.detailProduct = detailProduct;
      state.cart = [];
      state.modalOpen = false;
      state.modalProduct = detailProduct;
      state.cartSubTotal = 0;
      state.cartTax = 0;
      state.cartTotal = 0;
    },
    handleDetail: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      state.detailProduct = product;
    },
    addToCart: (state, action) => {
      let tempProducts = [...state.products];
      const index = tempProducts.indexOf(
        state.products.find((item) => item.id === action.payload)
      );
      const product = tempProducts[index];
      product.inCart = true;
      product.count = 1;
      const price = product.price;
      product.total = price;

      state.cart.push(product);
      state.detailProduct = { ...product };

      addTotals(state);
    },
    openModal: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      state.modalProduct = product;
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
    increment: (state, action) => {
      const selectedProduct = state.cart.find(
        (item) => item.id === action.payload
      );
      const index = state.cart.indexOf(selectedProduct);
      const product = state.cart[index];
      product.count = product.count + 1;
      product.total = product.count * product.price;

      addTotals(state);
    },
    decrement: (state, action) => {
      const selectedProduct = state.cart.find(
        (item) => item.id === action.payload
      );
      const index = state.cart.indexOf(selectedProduct);
      const product = state.cart[index];
      product.count = product.count - 1;
      if (product.count === 0) {
        removeItem(state, action);
      } else {
        product.total = product.count * product.price;

        addTotals(state);
      }
    },
    removeItem: (state, action) => {
      let tempProducts = [...state.products];
      let tempCart = [...state.cart];

      const index = tempProducts.indexOf(
        tempProducts.find((item) => item.id === action.payload)
      );
      let removedProduct = tempProducts[index];
      removedProduct.inCart = false;
      removedProduct.count = 0;
      removedProduct.total = 0;

      tempCart = tempCart.filter((item) => item.id !== action.payload);

      state.cart = tempCart;
      state.products = tempProducts;

      addTotals(state);
    },
    clearCart: (state) => {
      state.cart = [];
      state.products = storeProducts;
      addTotals(state);
    },
  },
});

const { actions, reducer } = contextSlice;

export const {
  setProducts,
  handleDetail,
  addToCart,
  openModal,
  closeModal,
  increment,
  decrement,
  removeItem,
  clearCart,
  resetProduct,
} = actions;

export default reducer;

function addTotals(state) {
  let subTotal = 0;
  state.cart.forEach((item) => (subTotal += item.total));
  const tempTax = subTotal * 0.1;
  const tax = parseFloat(tempTax.toFixed(2));
  const total = subTotal + tax;
  state.cartSubTotal = subTotal;
  state.cartTax = tax;
  state.cartTotal = total;
}
