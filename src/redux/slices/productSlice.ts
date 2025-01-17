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
    name: "products",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            const existingproduct = state.products.find(
                (product) => product.id === action.payload.id
            );
            if (existingproduct) {
                existingproduct.quantity+= action.payload.quantity;
            } else {
                state.products.push(action.payload );
            }
        },
        removeProduct(state, action: PayloadAction<string>) {
            state.products = state.products.filter(
                (product) => product.id === action.payload
            );
        },
        clearProducts(state) {
            state.products = [];
        },
    },
}); 

export const { addProduct, removeProduct, clearProducts } = productSlice.actions;

export default productSlice.reducer;