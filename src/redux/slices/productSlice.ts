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
        const productIndex = state.products.findIndex(
          (product) => product.id === action.payload
        );

        if (productIndex !== -1) {
          const product = state.products[productIndex];
          if (product.quantity > 1) {
            product.quantity -= 1; // Disminuir la cantidad
          } else {
            state.products.splice(productIndex, 1); // Eliminar el producto si la cantidad es 1
          }
        }
      },
    },
  });
  
  export const { addProduct, removeProduct } = productSlice.actions;
  export default productSlice.reducer;