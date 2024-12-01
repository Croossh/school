import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "pages/home/homeSilce.js";
import scheduleReducer from "pages/schedule/scheduleHomeSlice.js";
import paymentsReducer from "pages/payments/paymentsHomeSlice.js";

const store = configureStore({
  reducer: {
    homeReducer,
    scheduleReducer,
    paymentsReducer,
  },
});
export default store;
