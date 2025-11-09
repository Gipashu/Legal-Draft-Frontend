import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveForm, generateDocument, downloadFile } from "../../api/api";

// Initial state structure for each form type
const initialFormState = {
  formData: {},
  currentStep: 1,
  isDirty: false,
  isValid: false,
  errors: {},
  touched: {}
};


// 🔹 Async thunk (connects API + slice state)
export const submitLease = createAsyncThunk(
  "leases/submitLease",
  async ({ formType, formData, format = "pdf" }, { rejectWithValue }) => {
    try {
      await saveForm(formType, formData);
      const res = await generateDocument(formType, formData, format);
      downloadFile(res, `${formType}-document.${format}`, format);
      return { formType, formData };
    } catch (err) {
      const payload =
        (err && err.server) ? { message: err.message, server: err.server, status: err.status } :
        (err && err.message) ? { message: err.message } :
        { message: String(err) };
      return rejectWithValue(payload); 
    }
  }
);

const leasesSlice = createSlice({
  name: "leases",
  initialState: {
    activeForm: null,
    forms: {},   
    status: "idle", 
    error: null,
  },
  reducers: {
    // Initialize a new form
    initializeForm: (state, action) => {
      const { formType, initialData = {} } = action.payload;
      
      state.forms[formType] = {
        ...initialFormState,
        formData: initialData
      };
      state.activeForm = formType;
    },

    // Update a single field
    updateField: (state, action) => {
      const { formType, field, value } = action.payload;
      if (!state.forms[formType]) {
        // Initialize form if it doesn't exist
        state.forms[formType] = {
          ...initialFormState,
          formData: {}
        };
      }
      state.forms[formType].formData[field] = value;
      state.forms[formType].isDirty = true;
      state.forms[formType].touched[field] = true;
    },

    // Update multiple fields at once
    updateFormBulk: (state, action) => {
      const { formType, data } = action.payload;
      if (state.forms[formType]) {
        state.forms[formType].formData = {
          ...state.forms[formType].formData,
          ...data
        };
        state.forms[formType].isDirty = true;
      }
    },
    // Reset a specific form or all forms
    resetForm: (state, action) => {
      if (action.payload?.formType) {
        const { formType, initialData = {} } = action.payload;
        state.forms[formType] = {
          ...initialFormState,
          formData: initialData
        };
      }
      state.status = "idle";
      state.error = null;
    },

    // Set current step for multi-step forms
    setCurrentStep: (state, action) => {
      const { formType, step } = action.payload;
      if (state.forms[formType]) {
        state.forms[formType].currentStep = step;
      }
    },

    // Set form validation state
    setFormValidity: (state, action) => {
      const { formType, isValid, errors = {} } = action.payload;
      if (state.forms[formType]) {
        state.forms[formType].isValid = isValid;
        state.forms[formType].errors = errors;
      }
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

// Action 
export const { 
  initializeForm, 
  updateField, 
  updateFormBulk, 
  resetForm,
  setCurrentStep,
  setFormValidity
} = leasesSlice.actions;

// Selectors 
export const selectActiveForm = (state) => state.leases.activeForm;

export const selectFormData = (formType) => (state) => 
  state.leases.forms[formType]?.formData || {};

export const selectFormState = (formType) => (state) => 
  state.leases.forms[formType] || initialFormState;

export const selectFormStatus = (state) => state.leases.status;

export const selectFormError = (state) => state.leases.error;

export const selectFormField = (formType, fieldName) => (state) =>
  state.leases.forms[formType]?.formData?.[fieldName] || "";

export default leasesSlice.reducer;
