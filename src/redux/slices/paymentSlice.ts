import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: string;
  amount: number;
  date: string;
}

interface PaymentState {
  transactions: Transaction[];
}

const initialState: PaymentState = {
  transactions: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
  },
});

export const { addTransaction } = paymentSlice.actions;

export default paymentSlice.reducer;
