import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";
import paymentReducer from "./slices/paymentSlice";
import productReducer from "./slices/productSlice";


const secureStorage = createSecureStore();


const persistConfig = {
  key: "root",
  storage: secureStorage, 
};


const rootReducer = combineReducers({
  payment: paymentReducer,
  product: productReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;