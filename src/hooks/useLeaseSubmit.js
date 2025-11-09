import { useDispatch, useSelector } from "react-redux";
import { submitLease } from "../redux/PropertySlices/leaseSlice";

export const useLeaseSubmit = (formType) => {
  const dispatch = useDispatch();

  // form data and status from Redux
  const { formData, status, error } = useSelector((state) => ({
    formData: state.leases.forms[formType]?.formData || {},
    status: state.leases.status,
    error: state.leases.error
  }));

  const handleSubmit = async (format = "pdf") => {
    try {
      if (!formData || Object.keys(formData).length === 0) {
        throw new Error("Form data is empty. Please fill the form before submitting.");
      }
      
      await dispatch(submitLease({ 
        formType, 
        formData, 
        format 
      })).unwrap();
      
      return { success: true };
    } catch (error) {
      console.error("Submission error:", error);
      throw error; 
    }
  };

  return { 
    handleSubmit, 
    formData, 
    status, 
    error,
    isLoading: status === 'loading'
  };
};
