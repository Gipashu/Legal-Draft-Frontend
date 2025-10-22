import React, { useState } from "react";
import DateField from "../../FormComponents/DateField";
import NumberField from "../../FormComponents/NumberField";
import TextInputField from "../../FormComponents/TextInputField";
import TextAreaField from "../../FormComponents/TextAreaField";
import SelectField from "../../FormComponents/SelectField";
import SectionWrapper from "../../FormComponents/SectionWrapper";
import "../../CSS/IndustrialLease.css";
import LeasePreview from "../../FormComponents/LeasePreview";
import { useDispatch } from "react-redux";
import { updateFormBulk } from "../../../redux/PropertySlices/leaseSlice";

const IndustrialLease = ({ formType }) => {
  const [formData, setFormData] = useState({
    // 🔹 Agreement Details
    agreementDay: "",
    agreementMonth: "",
    agreementYear: "",
    agreementPlace: "",

    // 🔹 Lessor
    lessorName: "",
    lessorFather: "",
    lessorAddress: "",

    // 🔹 Lessee
    lesseeName: "",
    lesseeFather: "",
    lesseeAddress: "",

    // 🔹 Property
    municipalNo: "",
    propertyAddress: "",
    leaseTerm: "",
    startDate: "",
    endDate: "",

    // 🔹 Rent & Payments
    rentFrequency: "Monthly",
    rentAmount: "",
    rentDueDay: "",
    securityDeposit: "",
    advanceRent: "",
    advanceAdjustment: "", // ⬅️ Added

    // 🔹 Schedule I
    buildingNo: "",
    area: "",
    surveyNo: "",
    plotNo: "",
    district: "",
    taluka: "",
    municipalCorp: "",

    // 🔹 Repairs
    minorRepairsLimit: "", // ⬅️ Added

    // 🔹 Schedule II
    machineryList: "",

    // 🔹 Boundaries
    east: "",
    west: "",
    north: "",
    south: "",

    // 🔹 Signatures & Witnesses
    lessorSignatureName: "", // ⬅️ Added
    lesseeSignatureName: "", // ⬅️ Added
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
    <form className="lease-industrial-form" onSubmit={handlePreview}>
      <div className="form-header">Industrial Lease Agreement</div>

      {/* Agreement Info */}
      <SectionWrapper title="Agreement Details">
        <NumberField
          label="Day"
          name="agreementDay"
          value={formData.agreementDay}
          onChange={handleChange("agreementDay")}
          min={1}
          max={31}
          required
        />
        <SelectField
          label="Month"
          name="agreementMonth"
          value={formData.agreementMonth}
          onChange={handleChange("agreementMonth")}
          options={[
            { value: "January", label: "January" },
            { value: "February", label: "February" },
            { value: "March", label: "March" },
            { value: "April", label: "April" },
            { value: "May", label: "May" },
            { value: "June", label: "June" },
            { value: "July", label: "July" },
            { value: "August", label: "August" },
            { value: "September", label: "September" },
            { value: "October", label: "October" },
            { value: "November", label: "November" },
            { value: "December", label: "December" },
          ]}
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
        <TextInputField
          label="Place of Agreement"
          name="agreementPlace"
          value={formData.agreementPlace}
          onChange={handleChange("agreementPlace")}
          required
        />
      </SectionWrapper>

      {/* Lessor Info */}
      <SectionWrapper title="Lessor (Owner) Details">
        <TextInputField
          label="Lessor Name"
          name="lessorName"
          value={formData.lessorName}
          onChange={handleChange("lessorName")}
          onlyLetters
          required
        />
        <TextInputField
          label="Father's Name"
          name="lessorFather"
          value={formData.lessorFather}
          onChange={handleChange("lessorFather")}
          onlyLetters
          required
        />
        <TextAreaField
          label="Residential Address"
          name="lessorAddress"
          value={formData.lessorAddress}
          onChange={handleChange("lessorAddress")}
          minLength={10}
          required
        />
      </SectionWrapper>

      {/* Lessee Info */}
      <SectionWrapper title="Lessee (Tenant) Details">
        <TextInputField
          label="Lessee Name"
          name="lesseeName"
          value={formData.lesseeName}
          onChange={handleChange("lesseeName")}
          onlyLetters
          required
        />
        <TextInputField
          label="Father's Name"
          name="lesseeFather"
          value={formData.lesseeFather}
          onChange={handleChange("lesseeFather")}
          onlyLetters
          required
        />
        <TextAreaField
          label="Residential Address"
          name="lesseeAddress"
          value={formData.lesseeAddress}
          onChange={handleChange("lesseeAddress")}
          minLength={10}
          required
        />
      </SectionWrapper>

      {/* Property Info */}
      <SectionWrapper title="Property Details">
        <TextInputField
          label="Municipal No."
          name="municipalNo"
          value={formData.municipalNo}
          onChange={handleChange("municipalNo")}
          required
        />
        <TextAreaField
          label="Full Address"
          name="propertyAddress"
          value={formData.propertyAddress}
          onChange={handleChange("propertyAddress")}
          minLength={10}
          required
        />
        <NumberField
          label="Lease Term (Years)"
          name="leaseTerm"
          value={formData.leaseTerm}
          onChange={handleChange("leaseTerm")}
          min={1}
          required
        />
        <DateField
          label="Commencement Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange("startDate")}
          disablePast
          required
        />
        <DateField
          label="Expiry Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange("endDate")}
          min={formData.startDate}
          required
        />
      </SectionWrapper>

      {/* Rent & Payments */}
      <SectionWrapper title="Rent & Payment Terms">
        <SelectField
          label="Rent Frequency"
          name="rentFrequency"
          value={formData.rentFrequency}
          onChange={handleChange("rentFrequency")}
          required
          options={[
            { value: "Monthly", label: "Monthly" },
            { value: "Quarterly", label: "Quarterly" },
            { value: "Half-Yearly", label: "Half-Yearly" },
            { value: "Yearly", label: "Yearly" },
          ]}
        />
        <NumberField
          label="Rent Amount (₹)"
          name="rentAmount"
          value={formData.rentAmount}
          onChange={handleChange("rentAmount")}
          min={1000}
          currency
          required
        />
        <NumberField
          label="Rent Due Day"
          name="rentDueDay"
          value={formData.rentDueDay}
          onChange={handleChange("rentDueDay")}
          min={1}
          max={31}
          required
        />
        <NumberField
          label="Security Deposit (₹)"
          name="securityDeposit"
          value={formData.securityDeposit}
          onChange={handleChange("securityDeposit")}
          min={0}
          currency
        />
        <NumberField
          label="Advance Rent (₹)"
          name="advanceRent"
          value={formData.advanceRent}
          onChange={handleChange("advanceRent")}
          min={0}
          currency
        />
        <TextInputField
          label="Advance Rent Adjustment"
          name="advanceAdjustment"
          value={formData.advanceAdjustment}
          onChange={handleChange("advanceAdjustment")}
        />
      </SectionWrapper>

      {/* Repairs */}
      <SectionWrapper title="Repairs">
        <NumberField
          label="Minor Repairs Limit (₹ per year)"
          name="minorRepairsLimit"
          value={formData.minorRepairsLimit}
          onChange={handleChange("minorRepairsLimit")}
          min={0}
        />
      </SectionWrapper>

      {/* Schedule I */}
      <SectionWrapper title="Schedule I – Property Details">
        <TextInputField
          label="Building No."
          name="buildingNo"
          value={formData.buildingNo}
          onChange={handleChange("buildingNo")}
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
          label="Survey No."
          name="surveyNo"
          value={formData.surveyNo}
          onChange={handleChange("surveyNo")}
          required
        />
        <TextInputField
          label="Plot No."
          name="plotNo"
          value={formData.plotNo}
          onChange={handleChange("plotNo")}
          required
        />
        <TextInputField
          label="District"
          name="district"
          value={formData.district}
          onChange={handleChange("district")}
          onlyLetters
          required
        />
        <TextInputField
          label="Taluka / Sub Division"
          name="taluka"
          value={formData.taluka}
          onChange={handleChange("taluka")}
        />
        <TextInputField
          label="Municipal Corporation"
          name="municipalCorp"
          value={formData.municipalCorp}
          onChange={handleChange("municipalCorp")}
        />
      </SectionWrapper>

      {/* Schedule II */}
      <SectionWrapper title="Schedule II – Machinery & Equipments">
        <TextAreaField
          label="List of Machinery and Equipment"
          name="machineryList"
          value={formData.machineryList}
          onChange={handleChange("machineryList")}
          maxLength={500}
        />
      </SectionWrapper>

      {/* Boundaries */}
      <SectionWrapper title="Boundaries">
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

      {/* Signatures */}
      <SectionWrapper title="Signatures">
        <TextInputField
          label="Lessor Signature Name"
          name="lessorSignatureName"
          value={formData.lessorSignatureName}
          onChange={handleChange("lessorSignatureName")}
          required
        />
        <TextInputField
          label="Lessee Signature Name"
          name="lesseeSignatureName"
          value={formData.lesseeSignatureName}
          onChange={handleChange("lesseeSignatureName")}
          required
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
        Preview Industrial Lease
      </button>
    </form>
  );
};

export default IndustrialLease;
