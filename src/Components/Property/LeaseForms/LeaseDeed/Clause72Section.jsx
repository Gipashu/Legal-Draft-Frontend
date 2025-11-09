import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { 
  Shield,
  Info,
  CheckCircle,
  XCircle,
  DollarSign
} from "lucide-react";
import NumberField from "../../../FormComponents/NumberField";
import TextAreaField from "../../../FormComponents/TextAreaField";
import CheckboxField from "../../../FormComponents/CheckboxField";
import SelectField from "../../../FormComponents/SelectField";
import {
  selectFormData,
  updateField,
  updateFormBulk
} from "../../../../redux/PropertySlices/leaseSlice";


const DynamicSecurityDepositSection = () => {
  const dispatch = useDispatch();
  const formType = "deed";
  const formData = useSelector((state) => selectFormData(formType)(state));
  
  const handleChange = (field) => (e) => {
    const value = e.target?.value !== undefined ? e.target.value : e;
    dispatch(updateField({ formType, field, value }));
  };
  
  const showSettlementFields = formData.enableSettlementPeriod;
  const showTransferClause = formData.enableTransferClause;
  const showCustomSettlement = formData.settlementClauseType === "custom";
  const showCustomTransfer = formData.transferClauseType === "custom";

  // Update form data with generated clauses whenever they change
  useEffect(() => {
    const clause72 = generateClause72Preview();
    const clause73 = formData.enableTransferClause ? generateClause73Preview() : '';
    
    dispatch(updateFormBulk({ 
      formType,
      data: {
        securityDepositClause72: clause72,
        securityDepositClause73: clause73,
        clause72: clause72, 
        clause73: clause73  
      }
    }));
  }, [
    formData.securityDepositRefundDays,
    formData.enableSettlementPeriod,
    formData.settlementClauseType,
    formData.deductionTypes,
    formData.customSettlementClause,
    formData.enableTransferClause,
    formData.transferClauseType,
    formData.customTransferClause,
    formData.transferLiabilityOption
  ]);

  
  const generateClause72Preview = () => {
    let baseText = "7.2. The security deposit will be returned without interest at the same time as the Lessee delivers possession of the Leased Premises back to the Lessor upon the conclusion of the Lease Period or the earlier termination of this Lease Deed in accordance with the stipulated terms, provided that there are no outstanding dues owed by the Lessee.";

    // Deduction clause
    let deductionText = "";
    switch (formData.settlementClauseType) {
      case "standard":
        deductionText = " The Lessor reserves the right to deduct any exceptional amounts related to rent, interest, or other charges owed by the Lessee, as well as any costs incurred for repairing damages inflicted on the Leased Premises by the Lessee, from the security deposit prior to its refund to the Lessee.";
        break;
      
      case "detailed":
        const deductionsList = formData.deductionTypes || [];
        const deductions = deductionsList.length > 0 
          ? deductionsList.join(", ") 
          : "rent arrears, maintenance charges, utility bills, repair costs, cleaning expenses, or other charges";
        deductionText = ` The Lessor reserves the right to deduct from the security deposit: ${deductions}, prior to its refund to the Lessee.`;
        break;
      
      case "no_deduction":
        deductionText = " The Lessor shall return the full security deposit without any deductions, subject to proper handover of the premises.";
        break;
      
      case "custom":
        deductionText = formData.customSettlementClause 
          ? ` ${formData.customSettlementClause}` 
          : " [Your custom deduction clause will appear here]";
        break;
      
      default:
        deductionText = " [Select settlement type]";
    }

    // Settlement period clause
    const days = formData.securityDepositRefundDays || "___";
    let settlementText = "";
    
    if (formData.enableSettlementPeriod && formData.settlementClauseType !== "no_deduction") {
      settlementText = ` Should the security deposit be insufficient to cover the amounts owed to the Lessor, the Lessee will be responsible for settling all such outstanding amounts within ${days} days of receiving a written demand from the Lessor.`;
    }

    return baseText + deductionText + settlementText;
  };

 
  const generateClause73Preview = () => {
    if (!formData.enableTransferClause) {
      return null;
    }

    switch (formData.transferClauseType) {
      case "standard":
        return `If the Lessor sells the Leased Premises or assigns all rights under this Lease Deed to a third party ("New Lessor"), the security deposit shall also be transferred to the New Lessor, and the Lessor shall thereafter not have any liability towards the return of the security deposit to the Lessee.`;
      
      case "with_notice":
        const noticeDays = formData.transferNoticeDays || "30";
        return `If the Lessor sells the Leased Premises or assigns all rights under this Lease Deed to a third party ("New Lessor"), the Lessor shall provide written notice to the Lessee within ${noticeDays} days. The security deposit shall be transferred to the New Lessor, and the Lessor shall thereafter not have any liability towards the return of the security deposit to the Lessee.`;
      
      case "lessor_liable":
        return `If the Lessor sells the Leased Premises or assigns all rights under this Lease Deed to a third party ("New Lessor"), the security deposit may be transferred to the New Lessor. However, the original Lessor shall remain jointly liable with the New Lessor for the return of the security deposit to the Lessee.`;
      
      case "lessee_consent":
        return `If the Lessor intends to sell the Leased Premises or assign all rights under this Lease Deed to a third party ("New Lessor"), such transfer shall require the prior written consent of the Lessee. Upon consent, the security deposit shall be transferred to the New Lessor, and the Lessor shall be relieved of liability for its return.`;
      
      case "custom":
        return formData.customTransferClause 
          ? `${formData.customTransferClause}` 
          : "[Your custom transfer clause will appear here]";
      
      default:
        return "[Select transfer clause type]";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 bg-opacity-10">
          <Shield className="w-6 h-6 text-teal-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Security Deposit Configuration</h2>
          <p className="text-sm text-slate-400 mt-1">Customize refund and transfer conditions </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-teal-200">
          <p className="font-semibold mb-1">Security Deposit Management</p>
          <p>Configure refund conditions, deduction rights, and transfer provisions. These clauses ensure clear understanding of security deposit handling.</p>
        </div>
      </div>

      {/* Section 1: Refund & Settlement (Clause 7.2) */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"></span>
          Refund & Deduction Terms
        </h3>

        <SelectField
          label="Deduction Rights Type"
          name="settlementClauseType"
          value={formData.settlementClauseType}
          onChange={handleChange("settlementClauseType")}
          required
          options={[
            { 
              value: "standard", 
              label: "Standard Deduction Rights (Rent, Damages, Charges)" 
            },
            { 
              value: "detailed", 
              label: "Detailed Deduction List (Specify Items)" 
            },
            { 
              value: "no_deduction", 
              label: "No Deductions (Full Refund)" 
            },
            { 
              value: "custom", 
              label: "Custom Deduction Clause" 
            },
          ]}
          helperText="Define what can be deducted from security deposit"
        />

        {/* Conditional Fields Based on Settlement Type */}
        <AnimatePresence>
          {formData.settlementClauseType === "detailed" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 border-l-2 border-teal-500/30"
            >
              <div className="space-y-3">
                <label className="text-slate-200 text-sm font-medium mb-2 block">Select Deductible Items:</label>
                <div className="space-y-2 pl-1">
                  {[
                    "Outstanding rent arrears",
                    "Unpaid maintenance charges",
                    "Utility bill arrears",
                    "Repair costs for damages",
                    "Cleaning and restoration expenses",
                    "Late payment interest",
                    "Legal fees for breach"
                  ].map((item, idx) => (
                    <div key={idx} className="deduction-item flex items-start">
                      <CheckboxField
                        label={item}
                        name={`deduction_${idx}`}
                        className="mb-0"
                        checked={(formData.deductionTypes || []).includes(item)}
                        onChange={(e) => {
                          const current = formData.deductionTypes || [];
                          const updated = e.target.checked
                            ? [...current, item]
                            : current.filter(i => i !== item);
                          handleChange("deductionTypes")({ target: { value: updated }});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {showCustomSettlement && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 border-l-2 border-teal-500/30"
            >
              <TextAreaField
                label="Custom Deduction Clause"
                name="customSettlementClause"
                value={formData.customSettlementClause}
                onChange={handleChange("customSettlementClause")}
                placeholder="Write your custom deduction rights clause here. This will replace the standard deduction text."
                minLength={30}
                maxLength={800}
                required
                helperText="Specify exactly what can be deducted from the security deposit"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settlement Period Toggle */}
        {formData.settlementClauseType !== "no_deduction" && (
          <>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <label className="text-white text-sm font-medium">Enable Insufficient Deposit Clause?</label>
                <p className="text-xs text-slate-400 mt-1">
                  If deposit doesn't cover dues, lessee must pay balance
                </p>
              </div>
              <CheckboxField
                label=""
                name="enableSettlementPeriod"
                checked={formData.enableSettlementPeriod}
                onChange={(e) => handleChange("enableSettlementPeriod")({ target: { value: e.target.checked }})}
              />
            </div>

            <AnimatePresence>
              {showSettlementFields && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-4 border-l-2 border-teal-500/30"
                >
                  <NumberField
                    label="Days to Settle Outstanding Balance After Demand"
                    name="securityDepositRefundDays"
                    value={formData.securityDepositRefundDays}
                    onChange={handleChange("securityDepositRefundDays")}
                    min={7}
                    max={90}
                    required
                    helperText="Grace period for lessee to pay any shortfall"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Section 2: Transfer Clause (Clause 7.3) */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></span>
              Ownership Transfer Provisions (Clause 7.3)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              What happens to security deposit if property is sold/assigned
            </p>
          </div>
          
          <CheckboxField
            label=""
            name="enableTransferClause"
            checked={formData.enableTransferClause}
            onChange={(e) => handleChange("enableTransferClause")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showTransferClause && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SelectField
                label="Transfer Clause Type"
                name="transferClauseType"
                value={formData.transferClauseType}
                onChange={handleChange("transferClauseType")}
                required
                options={[
                  { 
                    value: "standard", 
                    label: "Standard Transfer (No Lessor Liability)" 
                  },
                  { 
                    value: "with_notice", 
                    label: "Transfer With Notice to Lessee" 
                  },
                  { 
                    value: "lessor_liable", 
                    label: "Lessor Remains Jointly Liable" 
                  },
                  { 
                    value: "lessee_consent", 
                    label: "Requires Lessee Consent" 
                  },
                  { 
                    value: "custom", 
                    label: "Custom Transfer Clause" 
                  },
                ]}
                helperText="Define conditions for security deposit transfer on sale"
              />

              {/* Conditional: Notice Period */}
              {formData.transferClauseType === "with_notice" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="pl-4 border-l-2 border-amber-500/30"
                >
                  <NumberField
                    label="Notice Period to Lessee (Days)"
                    name="transferNoticeDays"
                    value={formData.transferNoticeDays}
                    onChange={handleChange("transferNoticeDays")}
                    min={7}
                    max={90}
                    required
                    helperText="Days within which lessee must be notified of transfer"
                  />
                </motion.div>
              )}

              {/* Conditional: Custom Clause */}
              {showCustomTransfer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="pl-4 border-l-2 border-amber-500/30"
                >
                  <TextAreaField
                    label="Custom Transfer Clause"
                    name="customTransferClause"
                    value={formData.customTransferClause}
                    onChange={handleChange("customTransferClause")}
                    placeholder="Write your custom clause for security deposit transfer on sale/assignment..."
                    minLength={30}
                    maxLength={800}
                    required
                    helperText="Define what happens to security deposit when property ownership changes"
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {!showTransferClause && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3"
            >
              <XCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-200">
                <p className="font-semibold">Transfer Clause Disabled</p>
                <p>Clause 7.3 will be omitted. No provisions for property sale/assignment scenarios.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live Preview Section */}
      <div className="mt-6 p-5 bg-slate-950/50 border border-slate-700 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <h4 className="text-white font-semibold">Live Preview</h4>
        </div>
        
        <div className="space-y-4">
          {/* Clause 7.2 Preview */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-400 mb-2 font-mono">CLAUSE 7.2 - SECURITY DEPOSIT REFUND</p>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {generateClause72Preview()}
            </p>
          </div>

          {/* Clause 7.3 Preview */}
          {formData.enableTransferClause && (
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <p className="text-xs text-slate-400 mb-2 font-mono">CLAUSE 7.3 - TRANSFER ON SALE</p>
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {generateClause73Preview()}
              </p>
            </div>
          )}

          {!formData.enableTransferClause && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm text-amber-200">
                 Clause 7.3 will be omitted as transfer provisions are disabled
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Info */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <DollarSign className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-200">
            <p className="font-semibold mb-1">Current Configuration:</p>
            <ul className="space-y-1 text-xs">
              <li>✓ Deduction Rights: <span className="font-medium">{formData.settlementClauseType || "Not selected"}</span></li>
              <li>✓ Settlement Period: <span className="font-medium">{formData.enableSettlementPeriod ? `${formData.securityDepositRefundDays || "___"} days` : "Disabled"}</span></li>
              <li>✓ Transfer Clause: <span className="font-medium">{formData.enableTransferClause ? formData.transferClauseType || "Enabled" : "Disabled"}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicSecurityDepositSection;