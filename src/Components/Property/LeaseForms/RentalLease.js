import React, { useState } from "react";
import DateField from "../../FormComponents/DateField";
import NumberField from "../../FormComponents/NumberField";
import TextInputField from "../../FormComponents/TextInputField";
import TextAreaField from "../../FormComponents/TextAreaField";
import SelectField from "../../FormComponents/SelectField";
import SectionWrapper from "../../FormComponents/SectionWrapper";
import "../../CSS/RentalLease.css";
import LeasePreview from "../../FormComponents/LeasePreview"
import { useDispatch } from "react-redux";
import { updateFormBulk } from "../../../redux/PropertySlices/leaseSlice";
const LeaseAgreementForm = ({formType}) => {
  const [formData, setFormData] = useState({
    place: "",
    agreementDate: "",

    ownerName: "",
    ownerFatherName: "",
    ownerAddress: "",

    tenantName: "",
    tenantFatherName: "",
    tenantWorkAddress: "",
    tenantAddress: "",

    propertyAddress: "",
    bedrooms: "",
    fans: "",
    cflLights: "",
    geysers: "",
    mirrors: "",

    startDate: "",
    expiryDate: "",
    rentAmount: "",
    maintenanceAmount: "",
    securityDeposit: "",
    paymentMethod: "Cash",

    witness1Name: "",
    witness1Address: "",
    witness2Name: "",
    witness2Address: "",

    courtCity: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const [previewMode, setPreviewMode] = useState(false);
   const dispatch = useDispatch();
    const handlePreview = (e) => {
      e.preventDefault();
      // Push form data into Redux
      dispatch(updateFormBulk({ formType: formType, data: formData }));
      // Switch to preview
       setTimeout(() => setPreviewMode(true), 0);
    };
  if (previewMode) {
    return <LeasePreview formType={formType} onEdit={() => setPreviewMode(false)} />;
  }

  return (
    <form className="lease-agreement-form" onSubmit={handlePreview}>
      <div className="form-header"> Rental Lease Agreement</div>

      {/* Agreement Info */}
      <SectionWrapper title="Agreement Information">
        <TextInputField
          label="Place of Execution"
          name="place"
          value={formData.place}
          onChange={handleChange("place")}
          onlyLetters
          required
        />
        <DateField
          label="Agreement Date"
          name="agreementDate"
          value={formData.agreementDate}
          onChange={handleChange("agreementDate")}
          disablePast
          required
        />
      </SectionWrapper>

      {/* Owner Details */}
      <SectionWrapper title="Owner Details">
        <TextInputField
          label="Owner Name"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange("ownerName")}
          onlyLetters
          required
        />
        <TextInputField
          label="Father’s / Guardian Name"
          name="ownerFatherName"
          value={formData.ownerFatherName}
          onChange={handleChange("ownerFatherName")}
          onlyLetters
          required
        />
        <TextAreaField
          label="Owner Permanent Address"
          name="ownerAddress"
          value={formData.ownerAddress}
          onChange={handleChange("ownerAddress")}
          minLength={10}
          required
        />
      </SectionWrapper>

      {/* Tenant Details */}
      <SectionWrapper title="Tenant Details">
        <TextInputField
          label="Tenant Name"
          name="tenantName"
          value={formData.tenantName}
          onChange={handleChange("tenantName")}
          onlyLetters
          required
        />
        <TextInputField
          label="Father’s / Guardian Name"
          name="tenantFatherName"
          value={formData.tenantFatherName}
          onChange={handleChange("tenantFatherName")}
          onlyLetters
          required
        />
        <TextInputField
          label="Work / Institution Address"
          name="tenantWorkAddress"
          value={formData.tenantWorkAddress}
          onChange={handleChange("tenantWorkAddress")}
          required
        />
        <TextAreaField
          label="Tenant Permanent Address"
          name="tenantAddress"
          value={formData.tenantAddress}
          onChange={handleChange("tenantAddress")}
          minLength={10}
          required
        />
      </SectionWrapper>

      {/* Property Details */}
      <SectionWrapper title="Property Details">
        <TextAreaField
          label="Complete Address of Rented Property"
          name="propertyAddress"
          value={formData.propertyAddress}
          onChange={handleChange("propertyAddress")}
          minLength={10}
          required
        />
        <NumberField
          label="Number of Bedrooms"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange("bedrooms")}
          min={0}
        />
        <NumberField
          label="Number of Fans"
          name="fans"
          value={formData.fans}
          onChange={handleChange("fans")}
          min={0}
        />
        <NumberField
          label="Number of CFL Lights"
          name="cflLights"
          value={formData.cflLights}
          onChange={handleChange("cflLights")}
          min={0}
        />
        <NumberField
          label="Number of Geysers"
          name="geysers"
          value={formData.geysers}
          onChange={handleChange("geysers")}
          min={0}
        />
        <NumberField
          label="Number of Mirrors"
          name="mirrors"
          value={formData.mirrors}
          onChange={handleChange("mirrors")}
          min={0}
        />
      </SectionWrapper>

      {/* Rental & Payment Info */}
      <SectionWrapper title="Rental & Payment Information">
        <DateField
          label="Start Date of Agreement"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange("startDate")}
          disablePast
          required
        />
        <DateField
          label="Expiry Date of Agreement"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange("expiryDate")}
          min={formData.startDate}
          required
        />
        <NumberField
          label="Monthly Rent (₹)"
          name="rentAmount"
          value={formData.rentAmount}
          onChange={handleChange("rentAmount")}
          min={1000}
          currency
          required
        />
        <NumberField
          label="Monthly Maintenance (₹)"
          name="maintenanceAmount"
          value={formData.maintenanceAmount}
          onChange={handleChange("maintenanceAmount")}
          min={0}
          currency
        />
        <NumberField
          label="Security Deposit (₹)"
          name="securityDeposit"
          value={formData.securityDeposit}
          onChange={handleChange("securityDeposit")}
          min={0}
          currency
        />
        <SelectField
          label="Payment Method"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange("paymentMethod")}
          options={[
            { value: "Cash", label: "Cash" },
            { value: "Cheque", label: "Cheque" },
            { value: "UPI", label: "UPI" },
            { value: "Bank Transfer", label: "Bank Transfer" },
          ]}
          required
        />
      </SectionWrapper>

      {/* Witness Details */}
      <SectionWrapper title="Witness Information">
        <TextInputField
          label="Witness 1 Name"
          name="witness1Name"
          value={formData.witness1Name}
          onChange={handleChange("witness1Name")}
          onlyLetters
          required
        />
        <TextAreaField
          label="Witness 1 Address"
          name="witness1Address"
          value={formData.witness1Address}
          onChange={handleChange("witness1Address")}
          minLength={10}
          required
        />
        <TextInputField
          label="Witness 2 Name"
          name="witness2Name"
          value={formData.witness2Name}
          onChange={handleChange("witness2Name")}
          onlyLetters
          required
        />
        <TextAreaField
          label="Witness 2 Address"
          name="witness2Address"
          value={formData.witness2Address}
          onChange={handleChange("witness2Address")}
          minLength={10}
          required
        />
      </SectionWrapper>

      {/* Court / Registration Info */}
      <SectionWrapper title="Legal Information">
        <TextInputField
          label="City Civil Court Jurisdiction"
          name="courtCity"
          value={formData.courtCity}
          onChange={handleChange("courtCity")}
          onlyLetters
          required
        />
      </SectionWrapper>

      <button type="submit" className="submit-btn">
        Preview Rental Agreement
      </button>
    </form>
  );
};

export default LeaseAgreementForm;
