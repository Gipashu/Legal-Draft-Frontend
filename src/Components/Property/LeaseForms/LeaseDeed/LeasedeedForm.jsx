import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText,Building2,Users,Calendar,DollarSign,MapPin,ClipboardList,Eye,Shield,Lock,Wrench,Scale,AlertCircle,Copy} from "lucide-react";
import TextInputField from "../../../FormComponents/TextInputField";
import NumberField from "../../../FormComponents/NumberField";
import DateField from "../../../FormComponents/DateField";
import TextAreaField from "../../../FormComponents/TextAreaField";
import SelectField from "../../../FormComponents/SelectField";
import LeasePreview from "../../../FormComponents/LeasePreview";
import { useDispatch } from "react-redux";
import { updateFormBulk } from "../../../../redux/PropertySlices/leaseSlice";
import DynamicDefaultClauseSection from "./Clause42Section";
import DynamicTerminationSection from "./Clause21Section";
import DynamicSecurityDepositSection from "./Clause72Section";
import DynamicAssignmentByLessorSection from "./Clause23Section";
import DynamicRightToMortgageSection from "./Clause26Section";
import DynamicCounterpartsSection from "./Clause30Section";


const CommercialLeaseForm = ({ formType }) => {
  const [formData, setFormData] = useState({
    // Agreement Details
    agreementPlace: "",
    agreementDate: "",

    // Lessor Details
    lessorName: "",
    lessorFatherName: "",
    lessorResidentAddress: "",
    lessorAadharNo: "",
    lessorPanCardNo: "",

    // Lessee Details
    lesseeName: "",
    lesseeFatherName: "",
    lesseeResidentAddress: "",
    lesseeAadharNo: "",
    lesseePanCardNo: "",

    // Property Details
    propertyMunicipalNo: "",
    propertySituatedAt: "",
    
    // Purpose
    leasePurpose: "",

    // Lease Rent Details
    rentAmount: "",
    rentPaymentDay: "",
    latePaymentInterestRate: "",
    annualRentIncreasePercent: "5",
    rentIncreaseNoticeDays: "",

    // NEW: Dynamic Default & Remedy Configuration (Clauses 4.3 & 4.4)
    clause43: "",
    clause44: "",

    // Lease Term
    leaseStartDate: "",
    leaseEndDate: "",
    renewalNoticeMonths: "",

    // Security Deposit
    securityDepositAmount: "",
    securityDepositClause72: "",
    securityDepositClause73: "",

    // Lock-in Period
    lockInPeriodStartDate: "",
    lockInDurationYears: "1",

    // Utilities & Maintenance
    maintenanceFeesAmount: "",
    maintenanceFrequency: "monthly",

    // Repairs
    majorRepairReimbursementDays: "",

    // Inspection
    inspectionNoticeHours: "",

    // Fixtures Provided
    fixturesAndFittingsList: "",

    // Default & Termination
    defaultRemedyDays: "",
    terminationClause201: "",
    terminationClause202: "",

    // Governing Law & Jurisdiction
    governingLawState: "",
    assignmentClause23: "",
    courtJurisdiction: "",

    mortgageClause26: "",
    
    // Notices
    noticeLanguage: "English",

    // Clause 30
    counterpartClause30: "",
    

    // Schedule I - Property Description
    buildingNo: "",
    propertyAreaSqMtrs: "",
    registrationDistrict: "",
    subDivisionTaluka: "",
    corporationLimits: "",
    plotNo: "",
    surveyNo: "",
    boundaryEast: "",
    boundarySouth: "",
    boundaryWest: "",
    boundaryNorth: "",

    // Schedule II
    furnitureFixturesDescription: "",

    // Witnesses
    witness1Name: "",
    witness1Address: "",
    witness2Name: "",
    witness2Address: "",
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
    { icon: FileText, title: "Agreement Details", gradient: "from-blue-500 to-cyan-500" },
    { icon: Users, title: "Party Information", gradient: "from-purple-500 to-indigo-500" },
    { icon: Building2, title: "Property Details", gradient: "from-green-500 to-emerald-500" },
    { icon: ClipboardList, title: "Purpose & Usage", gradient: "from-amber-500 to-orange-500" },
    { icon: DollarSign, title: "Rent & Payments", gradient: "from-pink-500 to-rose-500" },
    { icon: Calendar, title: "Lease Term", gradient: "from-orange-500 to-red-500" },
    { icon: Shield, title: "Security Deposit", gradient: "from-teal-500 to-cyan-500" },
    { icon: Lock, title: "Lock-in Period", gradient: "from-violet-500 to-purple-500" },
    { icon: Wrench, title: "Maintenance & Repairs", gradient: "from-yellow-500 to-amber-500" },
    { icon: AlertCircle, title: "Default & Termination", gradient: "from-red-500 to-pink-500" },
    { icon: Scale, title: "Legal Terms", gradient: "from-indigo-500 to-blue-500" },
    { icon: MapPin, title: "Schedules", gradient: "from-cyan-500 to-blue-500" }
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
            <span className="text-slate-400 text-sm">Commercial Property Lease</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Commercial Lease Deed
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Complete all sections to generate a legally compliant commercial lease agreement
          </p>

          {/* Progress Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-8 rounded-full bg-gradient-to-r ${section.gradient} opacity-30`}
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
          {/* 1. Agreement Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 bg-opacity-10">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Agreement Details</h2>
            </div>

            <div className="space-y-4">
              <TextInputField
                label="Place of Agreement"
                name="agreementPlace"
                placeholder="City / Location where deed is made"
                value={formData.agreementPlace}
                onChange={handleChange("agreementPlace")}
                onlyLetters
                required
              />
              <DateField
                label="Agreement Date"
                name="agreementDate"
                value={formData.agreementDate}
                onChange={handleChange("agreementDate")}
                required
              />
            </div>
          </div>

          {/* 2. Party Information */}
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
                  placeholder="Shri/Smt..."
                  value={formData.lessorName}
                  onChange={handleChange("lessorName")}
                  onlyLetters
                  required
                />
                <TextInputField
                  label="Father's Name"
                  name="lessorFatherName"
                  placeholder="Son/Daughter of..."
                  value={formData.lessorFatherName}
                  onChange={handleChange("lessorFatherName")}
                  onlyLetters
                  required
                />
                <TextAreaField
                  label="Lessor's Residential Address"
                  name="lessorResidentAddress"
                  placeholder="Complete residential address"
                  value={formData.lessorResidentAddress}
                  onChange={handleChange("lessorResidentAddress")}
                  required
                  minLength={10}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInputField
                    label="Aadhar Number"
                    name="lessorAadharNo"
                    placeholder="XXXX-XXXX-XXXX"
                    value={formData.lessorAadharNo}
                    onChange={handleChange("lessorAadharNo")}
                    maxLength={14}
                    required
                  />
                  <TextInputField
                    label="PAN Card Number"
                    name="lessorPanCardNo"
                    placeholder="ABCDE1234F"
                    value={formData.lessorPanCardNo}
                    onChange={handleChange("lessorPanCardNo")}
                    maxLength={10}
                    required
                  />
                </div>
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
                  placeholder="Shri/Smt..."
                  value={formData.lesseeName}
                  onChange={handleChange("lesseeName")}
                  onlyLetters
                  required
                />
                <TextInputField
                  label="Father's Name"
                  name="lesseeFatherName"
                  placeholder="Son/Daughter of..."
                  value={formData.lesseeFatherName}
                  onChange={handleChange("lesseeFatherName")}
                  onlyLetters
                  required
                />
                <TextAreaField
                  label="Lessee's Residential Address"
                  name="lesseeResidentAddress"
                  placeholder="Complete residential address"
                  value={formData.lesseeResidentAddress}
                  onChange={handleChange("lesseeResidentAddress")}
                  required
                  minLength={10}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInputField
                    label="Aadhar Number"
                    name="lesseeAadharNo"
                    placeholder="XXXX-XXXX-XXXX"
                    value={formData.lesseeAadharNo}
                    onChange={handleChange("lesseeAadharNo")}
                    maxLength={14}
                    required
                  />
                  <TextInputField
                    label="PAN Card Number"
                    name="lesseePanCardNo"
                    placeholder="ABCDE1234F"
                    value={formData.lesseePanCardNo}
                    onChange={handleChange("lesseePanCardNo")}
                    maxLength={10}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Property Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 bg-opacity-10">
                <Building2 className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Leased Premises Details</h2>
            </div>

            <div className="space-y-4">
              <TextInputField
                label="Property Municipal No."
                name="propertyMunicipalNo"
                placeholder="Municipal number"
                value={formData.propertyMunicipalNo}
                onChange={handleChange("propertyMunicipalNo")}
                required
              />
              <TextAreaField
                label="Property Situated At"
                name="propertySituatedAt"
                placeholder="Complete address where property is located"
                value={formData.propertySituatedAt}
                onChange={handleChange("propertySituatedAt")}
                required
                minLength={10}
              />
            </div>
          </div>

          {/* 4. Purpose & Usage */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 bg-opacity-10">
                <ClipboardList className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Purpose & Permitted Usage</h2>
            </div>

            <TextAreaField
              label="Purpose of Lease"
              name="leasePurpose"
              placeholder="e.g., Office use, Retail store, Restaurant, Warehouse, etc."
              value={formData.leasePurpose}
              onChange={handleChange("leasePurpose")}
              required
              minLength={10}
              helperText="Specify the commercial purpose for which the premises will be used"
            />
          </div>

          {/* 5. Rent & Payment Terms */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 bg-opacity-10">
                <DollarSign className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Rent & Payment Terms</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberField
                  label="Monthly Rent Amount (₹)"
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={handleChange("rentAmount")}
                  min={1000}
                  currency
                  required
                />
                <NumberField
                  label="Rent Payable by Day of Month"
                  name="rentPaymentDay"
                  value={formData.rentPaymentDay}
                  onChange={handleChange("rentPaymentDay")}
                  min={1}
                  max={31}
                  required
                  helperText="Day of month when rent is due"
                />
              </div>

              <DynamicDefaultClauseSection
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
              />

              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <h4 className="text-white font-semibold mb-3">Annual Rent Revision</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NumberField
                    label="Annual Increase Percentage (%)"
                    name="annualRentIncreasePercent"
                    value={formData.annualRentIncreasePercent}
                    onChange={handleChange("annualRentIncreasePercent")}
                    min={0}
                    max={20}
                    step={0.5}
                    required
                    helperText="Default: 5%"
                  />
                  <NumberField
                    label="Notice Period for Increase (Days)"
                    name="rentIncreaseNoticeDays"
                    value={formData.rentIncreaseNoticeDays}
                    onChange={handleChange("rentIncreaseNoticeDays")}
                    min={30}
                    max={180}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 6. Lease Term */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 bg-opacity-10">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Lease Term</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateField
                  label="Lease Start Date"
                  name="leaseStartDate"
                  value={formData.leaseStartDate}
                  onChange={handleChange("leaseStartDate")}
                  required
                />
                <DateField
                  label="Lease End Date"
                  name="leaseEndDate"
                  value={formData.leaseEndDate}
                  onChange={handleChange("leaseEndDate")}
                  min={formData.leaseStartDate}
                  required
                />
              </div>
              <NumberField
                label="Renewal Notice Period (Months)"
                name="renewalNoticeMonths"
                value={formData.renewalNoticeMonths}
                onChange={handleChange("renewalNoticeMonths")}
                min={1}
                max={12}
                required
                helperText="Months prior to lease expiry for renewal request"
              />
            </div>
          </div>

          {/* 7. Security Deposit */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 bg-opacity-10">
                <Shield className="w-6 h-6 text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Security Deposit</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <NumberField
                label="Security Deposit Amount (₹)"
                name="securityDepositAmount"
                value={formData.securityDepositAmount}
                onChange={handleChange("securityDepositAmount")}
                min={0}
                currency
                required
                helperText="Refundable, interest-free"
              />
              <DynamicSecurityDepositSection 
                formData={formData} 
                setFormData={setFormData} 
                handleChange={handleChange} 
              />
            </div>
          </div>

          {/* 8. Lock-in Period */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 bg-opacity-10">
                <Lock className="w-6 h-6 text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Lock-in Period</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateField
                label="Lock-in Period Start Date"
                name="lockInPeriodStartDate"
                value={formData.lockInPeriodStartDate}
                onChange={handleChange("lockInPeriodStartDate")}
                required
              />
              <NumberField
                label="Lock-in Duration (Years)"
                name="lockInDurationYears"
                value={formData.lockInDurationYears}
                onChange={handleChange("lockInDurationYears")}
                min={1}
                max={10}
                required
                helperText="Period during which lease cannot be terminated"
              />
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Neither party can terminate the lease during the lock-in period
            </p>
          </div>

          {/* 9. Maintenance & Utilities */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 bg-opacity-10">
                <Wrench className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Maintenance, Utilities & Repairs</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberField
                  label="Maintenance Fees Amount (₹)"
                  name="maintenanceFeesAmount"
                  value={formData.maintenanceFeesAmount}
                  onChange={handleChange("maintenanceFeesAmount")}
                  min={0}
                  currency
                  required
                />
                <SelectField
                  label="Maintenance Payment Frequency"
                  name="maintenanceFrequency"
                  value={formData.maintenanceFrequency}
                  onChange={handleChange("maintenanceFrequency")}
                  required
                  options={[
                    { value: "monthly", label: "Monthly" },
                    { value: "quarterly", label: "Quarterly" },
                    { value: "half-yearly", label: "Half-yearly" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                />
              </div>

              <NumberField
                label="Major Repair Reimbursement Period (Days)"
                name="majorRepairReimbursementDays"
                value={formData.majorRepairReimbursementDays}
                onChange={handleChange("majorRepairReimbursementDays")}
                min={7}
                max={90}
                required
                helperText="Days for lessor to reimburse lessee for urgent repairs"
              />

              <NumberField
                label="Inspection Notice Period (Hours)"
                name="inspectionNoticeHours"
                value={formData.inspectionNoticeHours}
                onChange={handleChange("inspectionNoticeHours")}
                min={12}
                max={168}
                required
                helperText="Advance notice required before property inspection"
              />

              <TextAreaField
                label="Fixtures & Fittings Provided"
                name="fixturesAndFittingsList"
                placeholder="List all fixtures and fittings to be maintained by lessee (e.g., AC units, electrical fittings, furniture, etc.)"
                value={formData.fixturesAndFittingsList}
                onChange={handleChange("fixturesAndFittingsList")}
                minLength={10}
              />
            </div>
          </div>

          {/* 10. Default & Termination */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 bg-opacity-10">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Default & Termination</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <NumberField
                label="Default Remedy Period (Days)"
                name="defaultRemedyDays"
                value={formData.defaultRemedyDays}
                onChange={handleChange("defaultRemedyDays")}
                min={7}
                max={90}
                required
                helperText="Days to remedy breach after notice"
              />
              <DynamicTerminationSection 
                formData={formData} 
                setFormData={setFormData} 
                handleChange={handleChange} 
              />
            </div>
          </div>

          {/* 11. Legal Terms */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 bg-opacity-10">
                <Scale className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Legal Terms</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1  gap-4">
                <TextInputField
                  label="Governing Law (State)"
                  name="governingLawState"
                  placeholder="e.g., Maharashtra, Karnataka"
                  value={formData.governingLawState}
                  onChange={handleChange("governingLawState")}
                  onlyLetters
                  required
                />
                <TextInputField
                  label="Court Jurisdiction (City)"
                  name="courtJurisdiction"
                  placeholder="e.g., Mumbai, Bangalore"
                  value={formData.courtJurisdiction}
                  onChange={handleChange("courtJurisdiction")}
                  onlyLetters
                  required
                />
              </div>
              <DynamicAssignmentByLessorSection 
                formData={formData} 
                setFormData={setFormData} 
                handleChange={handleChange} 
              />
               
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 bg-opacity-10">
                <MapPin className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Mortgage Priority Rights</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <DynamicRightToMortgageSection 
                  formData={formData} 
                  setFormData={setFormData} 
                  handleChange={handleChange} 
                />
                <SelectField
                label="Notice Language"
                name="noticeLanguage"
                value={formData.noticeLanguage}
                onChange={handleChange("noticeLanguage")}
                required
                options={[
                  { value: "English", label: "English" },
                  { value: "Hindi", label: "Hindi" },
                  { value: "English and Hindi", label: "English and Hindi" },
                ]}
              /> 
              </div>
            </div>
          </div>

           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 bg-opacity-10">
                <Copy className="w-6 h-6 text-cyan-900" />
              </div>
              <h2 className="text-2xl font-bold text-white">Counterparts</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <DynamicCounterpartsSection 
                  formData={formData} 
                  setFormData={setFormData}   
                  handleChange={handleChange} 
                />
                
              </div>
            </div>
          </div>

          {/* 12. Schedule I - Property Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 bg-opacity-10">
                <MapPin className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Schedule I — Property Description</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField
                  label="Building No."
                  name="buildingNo"
                  value={formData.buildingNo}
                  onChange={handleChange("buildingNo")}
                  required
                />
                <NumberField
                  label="Property Area (Sq. mtrs.)"
                  name="propertyAreaSqMtrs"
                  value={formData.propertyAreaSqMtrs}
                  onChange={handleChange("propertyAreaSqMtrs")}
                  min={1}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField
                  label="Registration District"
                  name="registrationDistrict"
                  placeholder="Registration division and district"
                  value={formData.registrationDistrict}
                  onChange={handleChange("registrationDistrict")}
                  required
                />
                <TextInputField
                  label="Sub-division / Taluka"
                  name="subDivisionTaluka"
                  value={formData.subDivisionTaluka}
                  onChange={handleChange("subDivisionTaluka")}
                />
              </div>

              <TextInputField
                label="Corporation Limits"
                name="corporationLimits"
                placeholder="Within the limits of..."
                value={formData.corporationLimits}
                onChange={handleChange("corporationLimits")}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              {/* Boundaries */}
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-4">Property Boundaries</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <TextInputField
                    label="East"
                    name="boundaryEast"
                    placeholder="On or towards East"
                    value={formData.boundaryEast}
                    onChange={handleChange("boundaryEast")}
                  />
                  <TextInputField
                    label="South"
                    name="boundarySouth"
                    placeholder="On or towards South"
                    value={formData.boundarySouth}
                    onChange={handleChange("boundarySouth")}
                  />
                  <TextInputField
                    label="West"
                    name="boundaryWest"
                    placeholder="On or towards West"
                    value={formData.boundaryWest}
                    onChange={handleChange("boundaryWest")}
                  />
                  <TextInputField
                    label="North"
                    name="boundaryNorth"
                    placeholder="On or towards North"
                    value={formData.boundaryNorth}
                    onChange={handleChange("boundaryNorth")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 13. Schedule II - Furniture & Fixtures */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 bg-opacity-10">
                <ClipboardList className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Schedule II — Furniture & Fixtures</h2>
            </div>

            <TextAreaField
              label="Description of Furniture and Fixtures"
              name="furnitureFixturesDescription"
              placeholder="List all furniture, fixtures, and fittings included with the property (e.g., 1. Air conditioner - 2 units, 2. Wooden desk - 3 units, etc.)"
              value={formData.furnitureFixturesDescription}
              onChange={handleChange("furnitureFixturesDescription")}
              minLength={10}
              maxLength={1000}
            />
          </div>

          {/* 14. Witnesses */}
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
                    label="Address & Details"
                    name="witness1Address"
                    placeholder="Complete address and contact details"
                    value={formData.witness1Address}
                    onChange={handleChange("witness1Address")}
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
                    label="Address & Details"
                    name="witness2Address"
                    placeholder="Complete address and contact details"
                    value={formData.witness2Address}
                    onChange={handleChange("witness2Address")}
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
            Preview Commercial Lease Deed
          </motion.button>

          <p className="text-center text-sm text-slate-500 mt-4">
            All information will be validated before generating the final lease agreement
          </p>
        </motion.form>
      </div>
    </div>
  );
};


export default CommercialLeaseForm;
