import { combineReducers } from "@reduxjs/toolkit";
import paymentReducer from "./slices/paymentSlice";
import productReducer from "./slices/productSlice";

const rootReducer = combineReducers({
  payment: paymentReducer,
  product: productReducer,
});

export default rootReducer;
