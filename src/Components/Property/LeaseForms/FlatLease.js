import React, { useState } from "react";
import TextInputField from "../../FormComponents/TextInputField";
import NumberField from "../../FormComponents/NumberField";
import DateField from "../../FormComponents/DateField";
import TextAreaField from "../../FormComponents/TextAreaField";
import SectionWrapper from "../../FormComponents/SectionWrapper";
import LeasePreview from "../../FormComponents/LeasePreview";
import "../../CSS/FaltLease.css";
import { useDispatch } from "react-redux";
import { updateFormBulk } from "../../../redux/PropertySlices/leaseSlice";

const FlatLeaseForm = ({ formType }) => {
  const [formData, setFormData] = useState({
    // Agreement details
    agreementDay: "",
    agreementMonth: "",
    agreementYear: "",
    agreementPlace: "",

    // Owner (Lessor)
    ownerName: "",
    ownerAge: "",
    ownerOccupation: "",
    ownerAddress: "",
    ownerPan: "",

    // Tenant (Lessee)
    tenantName: "",
    tenantAge: "",
    tenantOccupation: "",
    tenantAddress: "",
    tenantPan: "",

    // Property / Flat Details
    flatNo: "",
    societyName: "",
    ctsNo: "",
    city: "",
    flatAdd:"",

    // Lease Terms
    leaseDuration: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
    rentWords: "",

    // Schedule I - Extended Property Details
    areaSqMtrs: "",
    district: "",
    subDivision: "",
    taluka: "",
    corporationLimits: "",
    plotNo: "",
    surveyNo: "",
    boundaryEast: "",
    boundaryWest: "",
    boundaryNorth: "",
    boundarySouth: "",

    // Schedule II
    furnitureDescription: "",

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
    <form className="lease-form" onSubmit={handlePreview}>
      <h1 className="form-header">Flat Lease Agreement </h1>

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

      {/* Lessor */}
      <SectionWrapper title="Lessor (Owner)">
        <TextInputField
          label="Full Name"
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
          required
        />
        <TextInputField
          label="Occupation"
          name="ownerOccupation"
          value={formData.ownerOccupation}
          onChange={handleChange("ownerOccupation")}
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
        />
      </SectionWrapper>

      {/* Lessee */}
      <SectionWrapper title="Lessee (Tenant)">
        <TextInputField
          label="Full Name"
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
          required
        />
        <TextInputField
          label="Occupation"
          name="tenantOccupation"
          value={formData.tenantOccupation}
          onChange={handleChange("tenantOccupation")}
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
        />
      </SectionWrapper>

      {/* Property Details */}
      <SectionWrapper title="Property / Flat Details">
        <TextInputField
          label="Flat No."
          name="flatNo"
          value={formData.flatNo}
          onChange={handleChange("flatNo")}
          required
        />
        <TextInputField
          label="Flat Address"
          name="flatAdd"
          value={formData.flatAdd}
          onChange={handleChange("flatAdd")}
          required
        />
        <TextInputField
          label="Society Name"
          name="societyName"
          value={formData.societyName}
          onChange={handleChange("societyName")}
          required
        />
        <TextInputField
          label="CTS No."
          name="ctsNo"
          value={formData.ctsNo}
          onChange={handleChange("ctsNo")}
          required
        />
        <TextInputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange("city")}
          required
        />
      </SectionWrapper>

      {/* Lease Terms */}
      <SectionWrapper title="Lease Terms">
        <NumberField
          label="Lease Duration (Years)"
          name="leaseDuration"
          value={formData.leaseDuration}
          onChange={handleChange("leaseDuration")}
          min={1}
          required
        />
        <DateField
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange("startDate")}
          disablePast
          required
        />
        <DateField
          label="End Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange("endDate")}
          min={formData.startDate}
          required
        />
        <NumberField
          label="Rent Amount (₹)"
          name="rentAmount"
          value={formData.rentAmount}
          onChange={handleChange("rentAmount")}
          min={500}
          currency
          required
        />
        <TextInputField
          label="Rent in Words"
          name="rentWords"
          value={formData.rentWords}
          onChange={handleChange("rentWords")}
          required
        />
      </SectionWrapper>

      {/* Schedule I */}
      <SectionWrapper title="Schedule I — Extended Property Details">
        <NumberField
          label="Area (Sq. mtrs.)"
          name="areaSqMtrs"
          value={formData.areaSqMtrs}
          onChange={handleChange("areaSqMtrs")}
          min={1}
        />
        <TextInputField
          label="District"
          name="district"
          value={formData.district}
          onChange={handleChange("district")}
          onlyLetters
        />
        <TextInputField
          label="Sub-Division"
          name="subDivision"
          value={formData.subDivision}
          onChange={handleChange("subDivision")}
        />
        <TextInputField
          label="Taluka"
          name="taluka"
          value={formData.taluka}
          onChange={handleChange("taluka")}
        />
        <TextInputField
          label="Corporation Limits"
          name="corporationLimits"
          value={formData.corporationLimits}
          onChange={handleChange("corporationLimits")}
        />
        <TextInputField
          label="Plot No."
          name="plotNo"
          value={formData.plotNo}
          onChange={handleChange("plotNo")}
        />
        <TextInputField
          label="Survey No."
          name="surveyNo"
          value={formData.surveyNo}
          onChange={handleChange("surveyNo")}
        />
        <div className="boundaries">
          <TextInputField
            label="East"
            name="boundaryEast"
            value={formData.boundaryEast}
            onChange={handleChange("boundaryEast")}
          />
          <TextInputField
            label="West"
            name="boundaryWest"
            value={formData.boundaryWest}
            onChange={handleChange("boundaryWest")}
          />
          <TextInputField
            label="North"
            name="boundaryNorth"
            value={formData.boundaryNorth}
            onChange={handleChange("boundaryNorth")}
          />
          <TextInputField
            label="South"
            name="boundarySouth"
            value={formData.boundarySouth}
            onChange={handleChange("boundarySouth")}
          />
        </div>
      </SectionWrapper>

      {/* Schedule II */}
      <SectionWrapper title="Schedule II — Furniture & Fixtures">
        <TextAreaField
          label="Furniture Description"
          name="furnitureDescription"
          value={formData.furnitureDescription}
          onChange={handleChange("furnitureDescription")}
          maxLength={500}
        />
      </SectionWrapper>

      {/* Witnesses */}
      <SectionWrapper title="Witnesses">
        <TextInputField
          label="Witness 1 Name"
          name="witness1Name"
          value={formData.witness1Name}
          onChange={handleChange("witness1Name")}
          required
        />
        <TextAreaField
          label="Witness 1 Details"
          name="witness1Details"
          value={formData.witness1Details}
          onChange={handleChange("witness1Details")}
          required
        />
        <TextInputField
          label="Witness 2 Name"
          name="witness2Name"
          value={formData.witness2Name}
          onChange={handleChange("witness2Name")}
          required
        />
        <TextAreaField
          label="Witness 2 Details"
          name="witness2Details"
          value={formData.witness2Details}
          onChange={handleChange("witness2Details")}
          required
        />
      </SectionWrapper>

      <button type="submit" className="submit-btn">
        Preview Flat Lease Agreement
      </button>
    </form>
  );
};

export default FlatLeaseForm;
