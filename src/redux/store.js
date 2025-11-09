import { configureStore } from "@reduxjs/toolkit";
import leasesReducer from "./PropertySlices/leaseSlice";

export const store = configureStore({
  reducer: {
    leases: leasesReducer,
  },
});
