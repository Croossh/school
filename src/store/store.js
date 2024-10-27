import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../home/homeSilce.js";
import scheduleReducer from "../schedule/scheduleHomeSlice.js";
import paymentsReducer from "../payments/paymentsHomeSlice.js";

const store = configureStore({
  reducer: {
    homeReducer,
    scheduleReducer,
    paymentsReducer,
  },
});
export default store;
