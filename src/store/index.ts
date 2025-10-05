import { authReducer } from "@/features/auth";
import cartReducer from "@/features/cart/cartSlice";
import filterReducer from "@/features/filter/filterSlice";
import searchReducer from "@/features/search/searchSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    search: searchReducer,
    filter: filterReducer,
  },
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
