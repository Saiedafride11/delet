import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import adminReducer from "./features/auth/admin/adminSlice";
import dueListReducer from "./features/due/dueSlice";
import settingsReducer from "./features/settings/settingsSlice";
// import productsReducer from "./features/products/productsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    admin: adminReducer,
    settings: settingsReducer,
    dueList: dueListReducer,
    // products: productsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
