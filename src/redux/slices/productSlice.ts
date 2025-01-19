import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}
interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      addProduct: (state, action: PayloadAction<Product>) => {
        const existingProduct = state.products.find(
          (product) => product.id === action.payload.id
        );
        if (existingProduct) {
          existingProduct.quantity += action.payload.quantity;
        } else {
          state.products.push(action.payload);
        }
      },
      removeProduct: (state, action: PayloadAction<string>) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      },
    },
  });
  
  export const { addProduct, removeProduct } = productSlice.actions;
  export default productSlice.reducer;