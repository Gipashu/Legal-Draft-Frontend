import { configureStore } from "@reduxjs/toolkit";
import leasesReducer from "../redux/PropertySlices/leaseSlice";

export const store = configureStore({
  reducer: {
    leases: leasesReducer,
  },
});
