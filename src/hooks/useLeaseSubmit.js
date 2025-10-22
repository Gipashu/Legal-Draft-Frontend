import { useDispatch, useSelector } from "react-redux";
import { submitLease } from "../redux/PropertySlices/leaseSlice";

export const useLeaseSubmit = (formType) => {
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.leases.forms[formType]);
  const status = useSelector((state) => state.leases.status);
  const error = useSelector((state) => state.leases.error);
// 
  // const [formData, setFormData] =  useState(null);
  // const [loading, setLoading] =  useState(true);

  const handleSubmit = (format = "pdf") => {
    if (!formData || Object.keys(formData).length === 0) {
      alert("Form data is empty. Please fill the form before submitting.");
      return;
    }
    dispatch(submitLease({ formType, formData, format }));
  };

  return { handleSubmit, formData, status, error};
};
