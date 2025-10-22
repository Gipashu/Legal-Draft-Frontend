import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveForm, generateDocument, downloadFile } from "../../api/api";

// 🔹 Async thunk (connects API + slice state)
export const submitLease = createAsyncThunk(
  "leases/submitLease",
  async ({ formType, formData, format = "pdf" }, { rejectWithValue }) => {
    try {
      await saveForm(formType, formData);
      const res = await generateDocument(formType, formData, format); // now throws readable Error on non-2xx
      downloadFile(res, `${formType}-document.${format}`, format);
      return { formType, formData };
    } catch (err) {
      // err can be:
      // - an Error with err.message
      // - or the custom Error we threw in generateDocument with .server and .status
      const payload =
        (err && err.server) ? { message: err.message, server: err.server, status: err.status } :
        (err && err.message) ? { message: err.message } :
        { message: String(err) };
      return rejectWithValue(payload); // serializable object
    }
  }
);


const leasesSlice = createSlice({
  name: "leases",
  initialState: {
    forms: {},   // all form data keyed by type
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    resetForm: (state) => {
      state.status = "idle";
      state.error = null;
    },
    updateFormBulk: (state, action) => {
      const { formType, data } = action.payload;
      state.forms[formType] = { ...data };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLease.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitLease.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.formType) {
          state.forms[action.payload.formType] = action.payload.formData;
        }
      })
      .addCase(submitLease.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error?.message || "Unknown error";
      });
  },
});

export const { resetForm, updateFormBulk } = leasesSlice.actions;
export default leasesSlice.reducer;
