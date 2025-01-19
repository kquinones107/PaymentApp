import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { encryptData, decryptData  } from "@/utils/encryption";

interface PaymentState {
  transactions: string[];
}

const initialState: PaymentState = {
  transactions: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    saveTransaction: (state, action: PayloadAction<string>) => {
      encryptData(action.payload).then((encrypted) => {
        state.transactions.push(encrypted);
      });
    },
    retrieveTransactions: (state) => {
      state.transactions = state.transactions.map(decryptData);
    },
  },
});

export const { saveTransaction, retrieveTransactions } = paymentSlice.actions;

export default paymentSlice.reducer;
