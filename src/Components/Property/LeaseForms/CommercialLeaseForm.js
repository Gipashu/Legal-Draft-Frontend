import React, { useState } from "react";
import TextInputField from "../../FormComponents/TextInputField";
import NumberField from "../../FormComponents/NumberField";
import DateField from "../../FormComponents/DateField";
import TextAreaField from "../../FormComponents/TextAreaField";
import SectionWrapper from "../../FormComponents/SectionWrapper";
import SelectField from "../../FormComponents/SelectField";
import LeasePreview from "../../FormComponents/LeasePreview";
import "../../CSS/CommercialLeaseForm.css";
import { useDispatch } from "react-redux";
import { updateFormBulk } from "../../../redux/PropertySlices/leaseSlice";

const CommercialLeaseForm = ({ formType }) => {
  const [formData, setFormData] = useState({
    agreementDay: "",
    agreementMonth: "",
    agreementYear: "",
    agreementPlace: "",

    lessorName: "",
    lessorFatherName: "",
    lessorResidentAddress: "",

    lesseeName: "",
    lesseeFatherName: "",
    lesseeResidentAddress: "",

    buildingMunicipalNo: "",
    demisedPremisesAddress: "",
    demisedPremisesfulldescription: "",

    leaseTermYears: "",
    leaseCommencementDate: "",
    leaseDeterminationDate: "",

    rentFrequency: "monthly",
    rentAmount: "",
    rentPayableByDayOfMonth: "",

    securityDeposit: "",
    advanceRent: "",
    advanceRentAdjustment: "",

    minorRepairsCapPerYear: "",

    scheduleIbuildingNo: "",
    scheduleIareaSqMtrs: "",
    scheduleIdistrict: "",
    scheduleIsubDivision: "",
    scheduleItaluka: "",
    scheduleIcorporationLimits: "",
    scheduleIplotNo: "",
    scheduleIsurveyNo: "",

    boundaryEast: "",
    boundarySouth: "",
    boundaryWest: "",
    boundaryNorth: "",

    scheduleIIFurnitureFixtures: "",

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
      <h1 className="form-header">Commercial Lease Agreement</h1>

      {/* Agreement Details */}
      <SectionWrapper title="Agreement Details">
        <div className="inline-row">
          <NumberField
            label="Agreement Day"
            name="agreementDay"
            value={formData.agreementDay}
            onChange={handleChange("agreementDay")}
            min={1}
            max={31}
            required
          />
          <TextInputField
            label="Agreement Month"
            name="agreementMonth"
            value={formData.agreementMonth}
            onChange={handleChange("agreementMonth")}
            required
          />
          <NumberField
            label="Agreement Year"
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
          placeholder="City / Location"
          value={formData.agreementPlace}
          onChange={handleChange("agreementPlace")}
          onlyLetters
          required
        />
      </SectionWrapper>

      {/* Lessor */}
      <SectionWrapper title="Lessor (THE LESSOR)">
        <TextInputField
          label="Lessor's Full Name"
          name="lessorName"
          value={formData.lessorName}
          onChange={handleChange("lessorName")}
          onlyLetters
          required
        />
        <TextInputField
          label="Father's Name"
          name="lessorFatherName"
          value={formData.lessorFatherName}
          onChange={handleChange("lessorFatherName")}
          onlyLetters
          required
        />
        <TextAreaField
          label="Lessor's Residential Address"
          name="lessorResidentAddress"
          value={formData.lessorResidentAddress}
          onChange={handleChange("lessorResidentAddress")}
          required
          minLength={10}
        />
      </SectionWrapper>

      {/* Lessee */}
      <SectionWrapper title="Lessee (THE LESSEE)">
        <TextInputField
          label="Lessee's Full Name"
          name="lesseeName"
          value={formData.lesseeName}
          onChange={handleChange("lesseeName")}
          onlyLetters
          required
        />
        <TextInputField
          label="Father's Name"
          name="lesseeFatherName"
          value={formData.lesseeFatherName}
          onChange={handleChange("lesseeFatherName")}
          onlyLetters
          required
        />
        <TextAreaField
          label="Lessee's Residential Address"
          name="lesseeResidentAddress"
          value={formData.lesseeResidentAddress}
          onChange={handleChange("lesseeResidentAddress")}
          required
          minLength={10}
        />
      </SectionWrapper>

      {/* Demised Premises */}
      <SectionWrapper title="Demised Premises / Building Details">
        <TextInputField
          label="Building Municipal No."
          name="buildingMunicipalNo"
          value={formData.buildingMunicipalNo}
          onChange={handleChange("buildingMunicipalNo")}
          required
          onlyNumbers
        />
        <TextAreaField
          label="Demised Premises - Full Address"
          name="demisedPremisesAddress"
          value={formData.demisedPremisesAddress}
          onChange={handleChange("demisedPremisesAddress")}
          required
          minLength={10}
        />
        <TextAreaField
          label="Additional Description"
          name="demisedPremisesfulldescription"
          value={formData.demisedPremisesfulldescription}
          onChange={handleChange("demisedPremisesfulldescription")}
        />
      </SectionWrapper>

      {/* Lease Term */}
      <SectionWrapper title="Lease Term & Dates">
        <div className="inline-row">
          <NumberField
            label="Lease Term (Years)"
            name="leaseTermYears"
            value={formData.leaseTermYears}
            onChange={handleChange("leaseTermYears")}
            min={1}
            required
          />
          <DateField
            label="Commencement Date"
            name="leaseCommencementDate"
            value={formData.leaseCommencementDate}
            onChange={handleChange("leaseCommencementDate")}
            disablePast
            required
          />
          <DateField
            label="Determination Date"
            name="leaseDeterminationDate"
            value={formData.leaseDeterminationDate}
            onChange={handleChange("leaseDeterminationDate")}
            min={formData.leaseCommencementDate}
            required
          />
        </div>
      </SectionWrapper>

      {/* Rent & Payments */}
      <SectionWrapper title="Rent & Payment Terms">
        <div className="inline-row">
          <NumberField
            label="Rent Amount (₹)"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange("rentAmount")}
            min={1000}
            currency
            required
          />
          <SelectField
            label="Rent Frequency"
            name="rentFrequency"
            value={formData.rentFrequency}
            onChange={handleChange("rentFrequency")}
            required
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "quarterly", label: "Quarterly" },
              { value: "half-yearly", label: "Half-yearly" },
              { value: "yearly", label: "Yearly" },
            ]}
          />
          <NumberField
            label="Payable by Day of Month"
            name="rentPayableByDayOfMonth"
            value={formData.rentPayableByDayOfMonth}
            onChange={handleChange("rentPayableByDayOfMonth")}
            min={1}
            max={31}
            required
          />
        </div>

        <div className="two-col">
          <NumberField
            label="Security Deposit (₹)"
            name="securityDeposit"
            value={formData.securityDeposit}
            onChange={handleChange("securityDeposit")}
            min={0}
            currency
            required
          />
          <NumberField
            label="Advance Rent (₹)"
            name="advanceRent"
            value={formData.advanceRent}
            onChange={handleChange("advanceRent")}
            min={0}
            currency
          />
        </div>
        <TextInputField
          label="Advance Rent Adjustment"
          name="advanceRentAdjustment"
          placeholder="e.g. against last month"
          value={formData.advanceRentAdjustment}
          onChange={handleChange("advanceRentAdjustment")}
        />
      </SectionWrapper>

      {/* Repairs */}
      <SectionWrapper title="Repairs, Fixtures & Restrictions">
        <NumberField
          label="Minor Repairs Cap per Year (₹)"
          name="minorRepairsCapPerYear"
          value={formData.minorRepairsCapPerYear}
          onChange={handleChange("minorRepairsCapPerYear")}
          min={0}
          currency
        />
        <TextAreaField
          label="Restrictions / Permitted Uses"
          name="restrictions"
          placeholder="e.g. office use only, not to store inflammable goods"
          value={formData.restrictions}
          onChange={handleChange("restrictions")}
        />
      </SectionWrapper>

      {/* Schedule I */}
      <SectionWrapper title="Schedule I — Property Details">
        <div className="two-col">
          <TextInputField
            label="Building No."
            name="scheduleIbuildingNo"
            value={formData.scheduleIbuildingNo}
            onChange={handleChange("scheduleIbuildingNo")}
            required
          />
          <NumberField
            label="Area (Sq. mtrs.)"
            name="scheduleIareaSqMtrs"
            value={formData.scheduleIareaSqMtrs}
            onChange={handleChange("scheduleIareaSqMtrs")}
            min={1}
            required
          />
        </div>

        <div className="two-col">
          <TextInputField
            label="District"
            name="scheduleIdistrict"
            value={formData.scheduleIdistrict}
            onChange={handleChange("scheduleIdistrict")}
            onlyLetters
            required
          />
          <TextInputField
            label="Sub-division"
            name="scheduleIsubDivision"
            value={formData.scheduleIsubDivision}
            onChange={handleChange("scheduleIsubDivision")}
          />
        </div>

        <div className="two-col">
          <TextInputField
            label="Taluka"
            name="scheduleItaluka"
            value={formData.scheduleItaluka}
            onChange={handleChange("scheduleItaluka")}
          />
          <TextInputField
            label="Corporation Limits"
            name="scheduleIcorporationLimits"
            value={formData.scheduleIcorporationLimits}
            onChange={handleChange("scheduleIcorporationLimits")}
          />
        </div>

        <div className="two-col">
          <TextInputField
            label="Plot No."
            name="scheduleIplotNo"
            value={formData.scheduleIplotNo}
            onChange={handleChange("scheduleIplotNo")}
          />
          <TextInputField
            label="Survey No."
            name="scheduleIsurveyNo"
            value={formData.scheduleIsurveyNo}
            onChange={handleChange("scheduleIsurveyNo")}
          />
        </div>

        <div className="boundaries">
          <TextInputField
            label="East"
            name="boundaryEast"
            value={formData.boundaryEast}
            onChange={handleChange("boundaryEast")}
            onlyLetters
          />
          <TextInputField
            label="South"
            name="boundarySouth"
            value={formData.boundarySouth}
            onChange={handleChange("boundarySouth")}
            onlyLetters
          />
          <TextInputField
            label="West"
            name="boundaryWest"
            value={formData.boundaryWest}
            onChange={handleChange("boundaryWest")}
            onlyLetters
          />
          <TextInputField
            label="North"
            name="boundaryNorth"
            value={formData.boundaryNorth}
            onChange={handleChange("boundaryNorth")}
            onlyLetters
          />
        </div>
      </SectionWrapper>

      {/* Schedule II */}
      <SectionWrapper title="Schedule II — Furniture & Fixtures">
        <TextAreaField
          label="List of Furniture / Fixtures"
          name="scheduleIIFurnitureFixtures"
          value={formData.scheduleIIFurnitureFixtures}
          onChange={handleChange("scheduleIIFurnitureFixtures")}
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
        Preview Commercial Form
      </button>
    </form>
  );
};

export default CommercialLeaseForm;
