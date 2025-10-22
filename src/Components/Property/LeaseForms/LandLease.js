import React, { useState } from "react";
import DateField from "../../FormComponents/DateField";
import NumberField from "../../FormComponents/NumberField";
import TextInputField from "../../FormComponents/TextInputField";
import TextAreaField from "../../FormComponents/TextAreaField";
import SectionWrapper from "../../FormComponents/SectionWrapper";
import LeasePreview from "../../FormComponents/LeasePreview";
import "../../CSS/LandLease.css";
import { useDispatch } from "react-redux";
import { updateFormBulk } from "../../../redux/PropertySlices/leaseSlice";

const LandLease = ({ formType }) => {
  const [formData, setFormData] = useState({
    // Agreement Details
    agreementDay: "",
    agreementMonth: "",
    agreementYear: "",
    agreementPlace: "",

    // Lessor (Owner)
    ownerName: "",
    ownerAge: "",
    ownerOccupation: "",
    ownerAddress: "",
    ownerPan: "",

    // Lessee (Tenant)
    tenantName: "",
    tenantAge: "",
    tenantOccupation: "",
    tenantAddress: "",
    tenantPan: "",

    // Property Info
    plotNo: "",
    surveyNo: "",
    area: "",
    ctsNo: "",
    municipalCorp: "",
    taluka: "",

    // Lease Terms
    leaseDuration: "",
    premiumAmount: "",
    premiumChequeNo: "",
    premiumBank: "",
    premiumDate: "",
    leaseRent: "",
    dueDate: "",

    // Boundaries
    east: "",
    west: "",
    north: "",
    south: "",

    // Witnesses
    witness1Name: "",
    witness1Details: "",
    witness2Name: "",
    witness2Details: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const [previewMode, setPreviewMode] = useState(false);
  const dispatch = useDispatch();

  const handlePreview = (e) => {
    e.preventDefault();
    dispatch(updateFormBulk({ formType: formType, data: formData }));
    setTimeout(() => setPreviewMode(true), 0);
  };

  if (previewMode) {
    return (
      <LeasePreview formType={formType} onEdit={() => setPreviewMode(false)} />
    );
  }

  return (
    <form className="lease-land-form" onSubmit={handlePreview}>
      <div className="form-header"> Land Lease Agreement</div>

      {/* Agreement Details */}
      <SectionWrapper title="Agreement Details">
        <div className="inline-row">
          <NumberField
            label="Day"
            name="agreementDay"
            value={formData.agreementDay}
            onChange={handleChange("agreementDay")}
            min={1}
            max={31}
            required
          />
          <TextInputField
            label="Month"
            name="agreementMonth"
            value={formData.agreementMonth}
            onChange={handleChange("agreementMonth")}
            required
          />
          <NumberField
            label="Year"
            name="agreementYear"
            value={formData.agreementYear}
            onChange={handleChange("agreementYear")}
            min={2000}
            max={2100}
            required
          />
        </div>
        <TextInputField
          label="Place"
          name="agreementPlace"
          value={formData.agreementPlace}
          onChange={handleChange("agreementPlace")}
          required
        />
      </SectionWrapper>

      {/* Lessor Info */}
      <SectionWrapper title="Lessor (Owner) Details">
        <TextInputField
          label="Owner Name"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange("ownerName")}
          onlyLetters
          required
        />
        <NumberField
          label="Age"
          name="ownerAge"
          value={formData.ownerAge}
          onChange={handleChange("ownerAge")}
          min={18}
          max={100}
          required
        />
        <TextInputField
          label="Occupation"
          name="ownerOccupation"
          value={formData.ownerOccupation}
          onChange={handleChange("ownerOccupation")}
          required
        />
        <TextAreaField
          label="Residential Address"
          name="ownerAddress"
          value={formData.ownerAddress}
          onChange={handleChange("ownerAddress")}
          minLength={10}
          required
        />
        <TextInputField
          label="PAN"
          name="ownerPan"
          value={formData.ownerPan}
          onChange={handleChange("ownerPan")}
          required
          capitalize
          pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
          errorMessage="PAN must be in format: ABCDE1234F"
        />
      </SectionWrapper>

      {/* Lessee Info */}
      <SectionWrapper title="Lessee (Tenant) Details">
        <TextInputField
          label="Tenant Name"
          name="tenantName"
          value={formData.tenantName}
          onChange={handleChange("tenantName")}
          onlyLetters
          required
        />
        <NumberField
          label="Age"
          name="tenantAge"
          value={formData.tenantAge}
          onChange={handleChange("tenantAge")}
          min={18}
          max={100}
          required
        />
        <TextInputField
          label="Occupation"
          name="tenantOccupation"
          value={formData.tenantOccupation}
          onChange={handleChange("tenantOccupation")}
          required
        />
        <TextAreaField
          label="Residential Address"
          name="tenantAddress"
          value={formData.tenantAddress}
          onChange={handleChange("tenantAddress")}
          minLength={10}
          required
        />
        <TextInputField
          label="PAN"
          name="tenantPan"
          value={formData.tenantPan}
          onChange={handleChange("tenantPan")}
          required
          capitalize
          pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
          errorMessage="PAN must be in format: ABCDE1234F"
        />
      </SectionWrapper>

      {/* Property Info */}
      <SectionWrapper title="Property Details">
        <TextInputField
          label="Plot No."
          name="plotNo"
          value={formData.plotNo}
          onChange={handleChange("plotNo")}
          required
        />
        <TextInputField
          label="Survey No."
          name="surveyNo"
          value={formData.surveyNo}
          onChange={handleChange("surveyNo")}
          required
        />
        <NumberField
          label="Area (Sq. Mtrs)"
          name="area"
          value={formData.area}
          onChange={handleChange("area")}
          min={1}
          required
        />
        <TextInputField
          label="CTS No."
          name="ctsNo"
          value={formData.ctsNo}
          onChange={handleChange("ctsNo")}
          onlyNumbers
        />
        <TextInputField
          label="Municipal Corporation"
          name="municipalCorp"
          value={formData.municipalCorp}
          onChange={handleChange("municipalCorp")}
        />
        <TextInputField
          label="Taluka / Sub Division"
          name="taluka"
          value={formData.taluka}
          onChange={handleChange("taluka")}
        />
        <NumberField
          label="Lease Duration (Years)"
          name="leaseDuration"
          value={formData.leaseDuration}
          onChange={handleChange("leaseDuration")}
          min={1}
          required
        />
        <NumberField
          label="Premium Amount (₹)"
          name="premiumAmount"
          value={formData.premiumAmount}
          onChange={handleChange("premiumAmount")}
          min={0}
          currency
        />
        <TextInputField
          label="Premium Cheque No."
          name="premiumChequeNo"
          value={formData.premiumChequeNo}
          onChange={handleChange("premiumChequeNo")}
        />
        <TextInputField
          label="Premium Bank"
          name="premiumBank"
          value={formData.premiumBank}
          onChange={handleChange("premiumBank")}
        />
        <DateField
          label="Premium Payment Date"
          name="premiumDate"
          value={formData.premiumDate}
          onChange={handleChange("premiumDate")}
        />
        <NumberField
          label="Monthly Lease Rent (₹)"
          name="leaseRent"
          value={formData.leaseRent}
          onChange={handleChange("leaseRent")}
          min={1000}
          currency
          required
        />
        <DateField
          label="Rent Payment Due Date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange("dueDate")}
          disablePast
          required
        />
      </SectionWrapper>

      {/* Boundaries */}
      <SectionWrapper title="Property Boundaries">
        <TextInputField
          label="East"
          name="east"
          value={formData.east}
          onChange={handleChange("east")}
          onlyLetters
        />
        <TextInputField
          label="West"
          name="west"
          value={formData.west}
          onChange={handleChange("west")}
          onlyLetters
        />
        <TextInputField
          label="North"
          name="north"
          value={formData.north}
          onChange={handleChange("north")}
          onlyLetters
        />
        <TextInputField
          label="South"
          name="south"
          value={formData.south}
          onChange={handleChange("south")}
          onlyLetters
        />
      </SectionWrapper>

      {/* Witness Info */}
      <SectionWrapper title="Witness Details">
        <TextInputField
          label="Witness 1 Name"
          name="witness1Name"
          value={formData.witness1Name}
          onChange={handleChange("witness1Name")}
          onlyLetters
          required
        />
        <TextAreaField
          label="Witness 1 Details"
          name="witness1Details"
          value={formData.witness1Details}
          onChange={handleChange("witness1Details")}
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
          label="Witness 2 Details"
          name="witness2Details"
          value={formData.witness2Details}
          onChange={handleChange("witness2Details")}
          minLength={10}
          required
        />
      </SectionWrapper>

      <button type="submit" className="submit-btn">
        Preview Land Lease
      </button>
    </form>
  );
};

export default LandLease;
