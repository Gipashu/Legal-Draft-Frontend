import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Building2, 
  Users, 
  Calendar, 
  DollarSign, 
  MapPin,
  ClipboardList,
  Eye
} from "lucide-react";
import TextInputField from "../../FormComponents/TextInputField";
import NumberField from "../../FormComponents/NumberField";
import DateField from "../../FormComponents/DateField";
import TextAreaField from "../../FormComponents/TextAreaField";
import SectionWrapper from "../../FormComponents/SectionWrapper";
import SelectField from "../../FormComponents/SelectField";
import LeasePreview from "../../FormComponents/LeasePreview";
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
    restrictions: "",
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

  const sections = [
    {
      icon: FileText,
      title: "Agreement Details",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Party Information",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: Building2,
      title: "Property Details",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Calendar,
      title: "Lease Terms",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: DollarSign,
      title: "Financial Terms",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: MapPin,
      title: "Schedules",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-black py-12 px-4 pt-32 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full mb-6">
            <Building2 className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Commercial Property</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Commercial Lease Agreement
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Fill in the details below to generate your commercial lease agreement
          </p>

          {/* Progress Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${section.gradient} opacity-30`}
              />
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handlePreview}
          className="space-y-8"
        >
          {/* Agreement Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 bg-opacity-10">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Agreement Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
          </div>

          {/* Lessor & Lessee */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 bg-opacity-10">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Party Information</h2>
            </div>

            {/* Lessor */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></span>
                Lessor (Property Owner)
              </h3>
              <div className="space-y-4">
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
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-slate-500 bg-slate-900">And</span>
              </div>
            </div>

            {/* Lessee */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></span>
                Lessee (Tenant)
              </h3>
              <div className="space-y-4">
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
              </div>
            </div>
          </div>

          {/* Demised Premises */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 bg-opacity-10">
                <Building2 className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Property Details</h2>
            </div>

            <div className="space-y-4">
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
                placeholder="Optional: Additional property details"
              />
            </div>
          </div>

          {/* Lease Term */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 bg-opacity-10">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Lease Terms & Dates</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>

          {/* Rent & Payments */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 bg-opacity-10">
                <DollarSign className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Financial Terms</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  label="Payable by Day"
                  name="rentPayableByDayOfMonth"
                  value={formData.rentPayableByDayOfMonth}
                  onChange={handleChange("rentPayableByDayOfMonth")}
                  min={1}
                  max={31}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </div>

          {/* Schedule I */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 bg-opacity-10">
                <MapPin className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Schedule I — Property Details</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Boundaries */}
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-4">Property Boundaries</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              </div>
            </div>
          </div>

          {/* Schedule II */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 bg-opacity-10">
                <ClipboardList className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Schedule II — Furniture & Fixtures</h2>
            </div>

            <TextAreaField
              label="List of Furniture / Fixtures"
              name="scheduleIIFurnitureFixtures"
              value={formData.scheduleIIFurnitureFixtures}
              onChange={handleChange("scheduleIIFurnitureFixtures")}
              maxLength={500}
              placeholder="List all furniture and fixtures included with the property"
            />
          </div>

          {/* Witnesses */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 bg-opacity-10">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Witnesses</h2>
            </div>

            <div className="space-y-6">
              {/* Witness 1 */}
              <div>
                <h3 className="text-white font-semibold mb-4">Witness 1</h3>
                <div className="space-y-4">
                  <TextInputField
                    label="Name"
                    name="witness1Name"
                    value={formData.witness1Name}
                    onChange={handleChange("witness1Name")}
                    onlyLetters
                    required
                  />
                  <TextAreaField
                    label="Details"
                    name="witness1Details"
                    value={formData.witness1Details}
                    onChange={handleChange("witness1Details")}
                    minLength={10}
                    required
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
              </div>

              {/* Witness 2 */}
              <div>
                <h3 className="text-white font-semibold mb-4">Witness 2</h3>
                <div className="space-y-4">
                  <TextInputField
                    label="Name"
                    name="witness2Name"
                    value={formData.witness2Name}
                    onChange={handleChange("witness2Name")}
                    onlyLetters
                    required
                  />
                  <TextAreaField
                    label="Details"
                    name="witness2Details"
                    value={formData.witness2Details}
                    onChange={handleChange("witness2Details")}
                    minLength={10}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-3 text-lg"
          >
            <Eye className="w-5 h-5" />
            Preview Commercial Lease Agreement
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default CommercialLeaseForm;
