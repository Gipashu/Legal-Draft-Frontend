import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertCircle, 
  Info,
  CheckCircle,
  XCircle
} from "lucide-react";
import SelectField from "../../../FormComponents/SelectField";
import NumberField from "../../../FormComponents/NumberField";
import TextAreaField from "../../../FormComponents/TextAreaField";
import CheckboxField from "../../../FormComponents/CheckboxField";


const DynamicDefaultClauseSection = ({ formData, setFormData, handleChange }) => {
  // Helper function to show/hide conditional fields
  const showLateFeeFields = formData.defaultPenaltyType === "late_fee_penalty" || 
                            formData.defaultPenaltyType === "multiple_penalties";
  
  const showInterestField = formData.defaultPenaltyType === "interest_accumulation" || 
                           formData.defaultPenaltyType === "multiple_penalties";
  
  const showCustomField = formData.defaultPenaltyType === "custom";
  
  const showRemedyFields = formData.enableRemedyPeriod;

  // Update form data with generated clauses whenever they change
  useEffect(() => {
    const clause43 = generateClause43Preview();
    const clause44 = formData.enableRemedyPeriod ? generateClause44Preview() : '';
    
    setFormData(prev => ({
      ...prev,
      clause43,
      clause44
    }));
  }, [
    formData.defaultConsecutiveMonths,
    formData.defaultPenaltyType,
    formData.lateFeeAmount,
    formData.lateFeeCurrency,
    formData.penaltyInterestRate,
    formData.customPenaltyClause,
    formData.additionalPenaltyRights,
    formData.enableRemedyPeriod,
    formData.noticePeriodDays,
    formData.remedyPeriodAction,
    formData.customRemedyClause
  ]);


  const generateClause43Preview = () => {
    const months = formData.defaultConsecutiveMonths || "___";
    let penaltyText = "";

    switch (formData.defaultPenaltyType) {
      case "terminate_and_reclaim":
        penaltyText = "to terminate the lease granted under this Lease Deed at its sole discretion and reclaim possession of the Leased Premises as the complete and absolute owner, irrespective of the time that has passed";
        break;
      
      case "late_fee_penalty":
        const feeAmount = formData.lateFeeAmount || "___";
        const feeType = formData.lateFeeCurrency === "percentage" 
          ? `${feeAmount}% of the monthly rent` 
          : `₹${feeAmount}`;
        penaltyText = `to impose a late fee penalty of ${feeType} for each month of default, in addition to the overdue rent amount`;
        break;
      
      case "interest_accumulation":
        const rate = formData.penaltyInterestRate || "___";
        penaltyText = `to charge interest at the rate of ${rate}% per month on the overdue rent amount, compounded monthly, until full payment is received`;
        break;
      
      case "legal_action":
        penaltyText = "to initiate legal proceedings for recovery of dues and possession of the Leased Premises, in addition to claiming damages for breach of contract";
        break;
      
      case "multiple_penalties":
        const penalties = [];
        if (formData.lateFeeAmount) {
          const feeType = formData.lateFeeCurrency === "percentage" 
            ? `${formData.lateFeeAmount}% of monthly rent` 
            : `₹${formData.lateFeeAmount}`;
          penalties.push(`impose a late fee of ${feeType}`);
        }
        if (formData.penaltyInterestRate) {
          penalties.push(`charge ${formData.penaltyInterestRate}% interest per month`);
        }
        penalties.push("terminate the lease and reclaim possession");
        penaltyText = `to ${penalties.join(", and/or ")}`;
        break;
      
      case "custom":
        penaltyText = formData.customPenaltyClause || "[Your custom penalty clause will appear here]";
        break;
      
      default:
        penaltyText = "[Select penalty type]";
    }

    const additionalRights = formData.additionalPenaltyRights 
      ? `, ${formData.additionalPenaltyRights}` 
      : "";

    return `It is hereby stipulated that if the Lessee defaults in the payment of rent for a period of ${months} consecutive months, the Lessor shall have the right, in addition to other rights and remedies available under this Lease Deed and applicable laws, ${penaltyText}${additionalRights}.`;
  };


  const generateClause44Preview = () => {
    if (!formData.enableRemedyPeriod) {
      return null;
    }

    const days = formData.noticePeriodDays || "___";
    let actionText = "";

    switch (formData.remedyPeriodAction) {
      case "auto_terminate":
        actionText = "the lease shall be deemed automatically terminated, with no further actions required from the Lessor";
        break;
      case "lessor_action":
        actionText = "the Lessor may proceed to take the actions specified in clause 4.3 above";
        break;
      case "escalate_penalty":
        actionText = "the penalty shall escalate, and the Lessor may invoke additional remedies";
        break;
      default:
        actionText = "[Select action]";
    }

    if (formData.customRemedyClause) {
      return `${formData.customRemedyClause}`;
    }

    return `However, the Lessor must provide written notice to the Lessee of its intention to enforce the penalty specified in clause 4.3. If the Lessee settles the overdue rent within ${days} days from the issuance of the notice by the Lessor, the Lessor shall not have the right to enforce the penalty. Conversely, if the Lessee fails to pay the overdue rent within ${days} days from the date of the notice issued by the Lessor, ${actionText}.`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 bg-opacity-10">
          
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Default & Remedy Configuration</h2>
          
        </div>
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-200">
          <p className="font-semibold mb-1">Flexible Penalty System</p>
          <p>Configure how default situations are handled. These clauses are fully customizable to match your requirements.</p>
        </div>
      </div>

      {/* Section 1: Default Configuration (Clause 4.3) */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500"></span>
          Default Penalty 
        </h3>

        <NumberField
          label="Default After Consecutive Months"
          name="defaultConsecutiveMonths"
          value={formData.defaultConsecutiveMonths}
          onChange={handleChange("defaultConsecutiveMonths")}
          min={1}
          max={12}
          required
          helperText="Number of consecutive months of non-payment before penalty applies"
        />

        <SelectField
          label="Type of Penalty on Default"
          name="defaultPenaltyType"
          value={formData.defaultPenaltyType}
          onChange={handleChange("defaultPenaltyType")}
          required
          options={[
            { 
              value: "terminate_and_reclaim", 
              label: "Terminate Lease & Reclaim Possession (Standard)" 
            },
            { 
              value: "late_fee_penalty", 
              label: "Late Fee Penalty" 
            },
            { 
              value: "interest_accumulation", 
              label: "Interest on Overdue Amount" 
            },
            { 
              value: "legal_action", 
              label: "Legal Action for Recovery" 
            },
            { 
              value: "multiple_penalties", 
              label: "Multiple Penalties (Combine Options)" 
            },
            { 
              value: "custom", 
              label: "Custom Penalty Clause" 
            },
          ]}
          helperText="Choose the consequence when lessee defaults on rent payment"
        />

        {/* Conditional Fields Based on Penalty Type */}
        <AnimatePresence>
          {showLateFeeFields && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pl-4 border-l-2 border-pink-500/30"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberField
                  label="Late Fee Amount"
                  name="lateFeeAmount"
                  value={formData.lateFeeAmount}
                  onChange={handleChange("lateFeeAmount")}
                  min={0}
                  required
                />
                <SelectField
                  label="Late Fee Type"
                  name="lateFeeCurrency"
                  value={formData.lateFeeCurrency}
                  onChange={handleChange("lateFeeCurrency")}
                  required
                  options={[
                    { value: "flat", label: "Flat Amount (₹)" },
                    { value: "percentage", label: "Percentage of Rent (%)" },
                  ]}
                />
              </div>
            </motion.div>
          )}

          {showInterestField && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 border-l-2 border-pink-500/30"
            >
              <NumberField
                label="Penalty Interest Rate (% per month)"
                name="penaltyInterestRate"
                value={formData.penaltyInterestRate}
                onChange={handleChange("penaltyInterestRate")}
                min={0}
                max={36}
                step={0.5}
                required
                helperText="Interest charged on overdue rent amount"
              />
            </motion.div>
          )}

          {showCustomField && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 border-l-2 border-pink-500/30"
            >
              <TextAreaField
                label="Custom Penalty Clause"
                name="customPenaltyClause"
                value={formData.customPenaltyClause}
                onChange={handleChange("customPenaltyClause")}
                placeholder="Write your custom penalty clause here. This will replace the standard penalty text in clause 4.3."
                minLength={50}
                maxLength={1000}
                required
                helperText="Describe the specific actions the Lessor can take upon default"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <TextAreaField
          label="Additional Rights & Remedies (Optional)"
          name="additionalPenaltyRights"
          value={formData.additionalPenaltyRights}
          onChange={handleChange("additionalPenaltyRights")}
          placeholder="e.g., 'and claim compensation for damages caused to the property'"
          maxLength={500}
          helperText="Add any additional rights beyond the primary penalty"
        />
      </div>

      {/* Section 2: Remedy Period Configuration */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></span>
              Remedy Period (Clause 4.4)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Give lessee a chance to remedy default before penalty enforcement
            </p>
          </div>
          
          <CheckboxField
            label=""
            name="enableRemedyPeriod"
            checked={formData.enableRemedyPeriod}
            onChange={(e) => handleChange("enableRemedyPeriod")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showRemedyFields && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <NumberField
                label="Days to Remedy Default After Notice"
                name="noticePeriodDays"
                value={formData.noticePeriodDays}
                onChange={handleChange("noticePeriodDays")}
                min={7}
                max={90}
                required
                helperText="Grace period after notice before penalty is enforced"
              />

              <SelectField
                label="If Remedy Period Expires Without Payment"
                name="remedyPeriodAction"
                value={formData.remedyPeriodAction}
                onChange={handleChange("remedyPeriodAction")}
                required
                options={[
                  { 
                    value: "auto_terminate", 
                    label: "Lease Automatically Terminated" 
                  },
                  { 
                    value: "lessor_action", 
                    label: "Lessor May Take Action (4.3 Applies)" 
                  },
                  { 
                    value: "escalate_penalty", 
                    label: "Escalate to Higher Penalty" 
                  },
                ]}
              />

              <TextAreaField
                label="Custom Remedy Clause (Optional)"
                name="customRemedyClause"
                value={formData.customRemedyClause}
                onChange={handleChange("customRemedyClause")}
                placeholder="Override the standard remedy period clause with your custom text..."
                maxLength={800}
                helperText="Leave blank to use auto-generated text based on fields above"
              />
            </motion.div>
          )}

          {!showRemedyFields && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
            >
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-200">
                <p className="font-semibold">No Remedy Period</p>
                <p>Penalty will be enforced immediately upon default without grace period.</p>
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
          {/* Clause 4.3 Preview */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-400 mb-2 font-mono">CLAUSE 4.3</p>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {generateClause43Preview()}
            </p>
          </div>

          {/* Clause 4.4 Preview */}
          {formData.enableRemedyPeriod && (
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <p className="text-xs text-slate-400 mb-2 font-mono">CLAUSE 4.4</p>
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {generateClause44Preview()}
              </p>
            </div>
          )}

          {!formData.enableRemedyPeriod && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm text-amber-200">
                ℹ️ Clause 4.4 will be omitted as remedy period is disabled
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicDefaultClauseSection;