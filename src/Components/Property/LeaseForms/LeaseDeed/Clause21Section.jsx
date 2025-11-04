import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle,Info,CheckCircle,AlertTriangle,Ban} from "lucide-react";
import NumberField from "../../../FormComponents/NumberField";
import TextAreaField from "../../../FormComponents/TextAreaField";
import CheckboxField from "../../../FormComponents/CheckboxField";
import SelectField from "../../../FormComponents/SelectField";

/**
 * Dynamic Termination Clause Section Component
 * Handles clause 20.1 and 20.2 with customization options
 */
const DynamicTerminationSection = ({ formData, setFormData, handleChange }) => {
  // Helper to show/hide conditional fields
  const showRemedyPeriod = formData.terminationClauseType !== "immediate";
  const showCustomClause = formData.terminationClauseType === "custom";
  const showConsequences = formData.enableTerminationConsequences;
  const showEarlyTermination = formData.enableEarlyTermination;

  // Update form data with generated clauses whenever they change
  useEffect(() => {
    const clause201 = generateClause201Preview();
    const clause202 = generateClause202Preview();
    
    setFormData(prev => ({
      ...prev,
      terminationClause201: clause201,
      terminationClause202: clause202,
      clause201: clause201,
      clause202: clause202
    }));
  }, [
    formData.terminationNoticeDays,
    formData.terminationClauseType,
    formData.customTerminationClause,
    formData.enableTerminationConsequences,
    formData.terminationConsequences,
    formData.enableEarlyTermination,
    formData.earlyTerminationPenalty,
    formData.earlyTerminationNotice
  ]);

  // Generate preview of clause 20.1
  const generateClause201Preview = () => {
    const days = formData.terminationNoticeDays || "___";
    
    switch (formData.terminationClauseType) {
      case "standard":
        return `The Lessor shall have the right to terminate the lease without notice in the event of a default by the Lessee that is not remedied within ${days} days of receiving a written notice from the Lessor regarding the default.`;
      
      case "with_warning":
        return `The Lessor shall have the right to terminate the lease in the event of a default by the Lessee. The Lessor must first provide a written notice to the Lessee specifying the nature of the default. If the Lessee fails to remedy the default within ${days} days of receiving such notice, the Lessor may proceed with termination by serving a final termination notice.`;
      
      case "escalation":
        const firstWarning = formData.firstWarningDays || "7";
        return `The Lessor shall have the right to terminate the lease through the following escalation process: (a) First Warning - Written notice to remedy default within ${firstWarning} days; (b) Second Warning - If not remedied, additional ${days} days to cure the breach; (c) Termination - If still not remedied, the Lessor may terminate the lease without further notice.`;
      
      case "immediate":
        return `The Lessor shall have the right to terminate the lease immediately without prior notice in the event of any material default by the Lessee, including but not limited to non-payment of rent for 2 consecutive months, illegal use of premises, or causing significant damage to the property.`;
      
      case "mutual_agreement":
        return `This lease may be terminated by mutual written agreement of both parties at any time. In case of unilateral termination by the Lessor due to Lessee's default, the Lessor must provide written notice to the Lessee. If the default is not remedied within ${days} days, the Lessor may terminate the lease.`;
      
      case "custom":
        return formData.customTerminationClause 
          ? `${formData.customTerminationClause}` 
          : "[Your custom termination clause will appear here]";
      
      default:
        return "[Select termination type]";
    }
  };

  // Generate preview of clause 20.2
  const generateClause202Preview = () => {
    let baseText = "Upon any termination of the Lease for any reason, the Lessee shall return physical vacant possession of the scheduled property to the Lessor";
    
    // Add possession timeline if specified
    if (formData.possessionReturnDays) {
      baseText += ` within ${formData.possessionReturnDays} days of termination notice`;
    }
    
    // Security deposit handling
    baseText += ", concurrently with the Lessor refunding the Security Deposit to the Lessee after deducting all amounts due and payable by the Lessee under this Lease Deed";
    
    // Add consequences if enabled
    if (formData.enableTerminationConsequences) {
      const consequences = formData.terminationConsequences || [];
      if (consequences.length > 0) {
        baseText += ". Additionally, upon termination: " + consequences.join("; ");
      }
    }
    
    baseText += ".";
    
    // Add early termination clause if enabled
    if (formData.enableEarlyTermination) {
      const earlyTermText = generateEarlyTerminationText();
      baseText += ` ${earlyTermText}`;
    }
    
    return baseText;
  };

  // Generate early termination text
  const generateEarlyTerminationText = () => {
    if (!formData.enableEarlyTermination) return "";
    
    const noticeDays = formData.earlyTerminationNotice || "90";
    const penalty = formData.earlyTerminationPenalty || "3 months rent";
    
    switch (formData.earlyTerminationType) {
      case "with_penalty":
        return `Either party may terminate this lease before the expiration of the Lease Period by providing ${noticeDays} days written notice to the other party and paying a penalty equivalent to ${penalty}.`;
      
      case "notice_only":
        return `Either party may terminate this lease before the expiration of the Lease Period by providing ${noticeDays} days written notice to the other party without any penalty.`;
      
      case "lessor_only":
        return `Only the Lessor may terminate this lease before the expiration of the Lease Period by providing ${noticeDays} days written notice to the Lessee. The Lessee does not have the right to early termination.`;
      
      case "after_lockin":
        const lockInPeriod = formData.earlyTermAfterMonths || "12";
        return `After completion of ${lockInPeriod} months from the commencement date, either party may terminate this lease by providing ${noticeDays} days written notice to the other party.`;
      
      default:
        return "";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 bg-opacity-10">
          <XCircle className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Termination Configuration</h2>
          <p className="text-sm text-slate-400 mt-1">Customize termination conditions and consequences (Clause 20)</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-red-200">
          <p className="font-semibold mb-1">Lease Termination Terms</p>
          <p>Define how and when the lease can be terminated by either party. These clauses protect both lessor and lessee rights.</p>
        </div>
      </div>

      {/* Section 1: Termination by Lessor (Clause 20.1) */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500"></span>
          Termination by Lessor (Clause 20.1)
        </h3>

        <SelectField
          label="Termination Clause Type"
          name="terminationClauseType"
          value={formData.terminationClauseType}
          onChange={handleChange("terminationClauseType")}
          required
          options={[
            { 
              value: "standard", 
              label: "Standard Notice Period (Most Common)" 
            },
            { 
              value: "with_warning", 
              label: "Two-Step Warning Process" 
            },
            { 
              value: "escalation", 
              label: "Three-Step Escalation Process" 
            },
            { 
              value: "immediate", 
              label: "Immediate Termination (No Notice)" 
            },
            { 
              value: "mutual_agreement", 
              label: "Mutual Agreement with Default Clause" 
            },
            { 
              value: "custom", 
              label: "Custom Termination Clause" 
            },
          ]}
          helperText="Define how lessor can terminate lease upon default"
        />

        {/* Conditional Fields Based on Termination Type */}
        <AnimatePresence>
          {showRemedyPeriod && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <NumberField
                label="Days to Remedy Default After Notice"
                name="terminationNoticeDays"
                value={formData.terminationNoticeDays}
                onChange={handleChange("terminationNoticeDays")}
                min={7}
                max={90}
                required
                helperText="Grace period for lessee to fix the breach before termination"
              />

              {formData.terminationClauseType === "escalation" && (
                <NumberField
                  label="First Warning Period (Days)"
                  name="firstWarningDays"
                  value={formData.firstWarningDays}
                  onChange={handleChange("firstWarningDays")}
                  min={3}
                  max={30}
                  helperText="Initial warning period before escalation"
                />
              )}
            </motion.div>
          )}

          {showCustomClause && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 border-l-2 border-red-500/30"
            >
              <TextAreaField
                label="Custom Termination Clause"
                name="customTerminationClause"
                value={formData.customTerminationClause}
                onChange={handleChange("customTerminationClause")}
                placeholder="Write your custom termination clause here..."
                minLength={50}
                maxLength={1000}
                required
                helperText="Define exact conditions under which lessor can terminate"
              />
            </motion.div>
          )}

          {formData.terminationClauseType === "immediate" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-200">
                <p className="font-semibold">Warning: Immediate Termination</p>
                <p>This option allows termination without notice period. Use with caution as it may be viewed as harsh by lessees.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 2: Possession & Security Deposit (Clause 20.2) */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></span>
          Post-Termination Terms (Clause 20.2)
        </h3>

        <NumberField
          label="Days to Return Possession (Optional)"
          name="possessionReturnDays"
          value={formData.possessionReturnDays}
          onChange={handleChange("possessionReturnDays")}
          min={0}
          max={90}
          helperText="Leave blank for immediate possession. Specify days if grace period needed."
        />

        {/* Termination Consequences */}
        <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
          <div>
            <label className="text-white text-sm font-medium">Add Termination Consequences?</label>
            <p className="text-xs text-slate-400 mt-1">
              Additional obligations upon termination (utilities, repairs, etc.)
            </p>
          </div>
          <CheckboxField
            label=""
            name="enableTerminationConsequences"
            checked={formData.enableTerminationConsequences}
            onChange={(e) => handleChange("enableTerminationConsequences")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showConsequences && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 border-l-2 border-amber-500/30"
            >
              <div className="space-y-3">
                <label className="text-slate-200 text-sm font-medium mb-2 block">Select Termination Consequences:</label>
                <div className="space-y-2 pl-1">
                  {[
                    "Lessee must settle all utility bills within 15 days",
                    "Lessee must repair any damages to the premises",
                    "Lessee must remove all installed fixtures and fittings",
                    "Lessee must clear all outstanding maintenance fees",
                    "Lessee must provide forwarding address for correspondence",
                    "Lessor may deduct unpaid rent from security deposit",
                    "Lessee forfeits right to renewal or extension"
                  ].map((consequence, idx) => (
                    <div key={idx} className="consequence-item flex items-start">
                      <CheckboxField
                        label={consequence}
                        name={`consequence_${idx}`}
                        className="mb-0"
                        checked={(formData.terminationConsequences || []).includes(consequence)}
                        onChange={(e) => {
                          const current = formData.terminationConsequences || [];
                          const updated = e.target.checked
                            ? [...current, consequence]
                            : current.filter(i => i !== consequence);
                          handleChange("terminationConsequences")({ target: { value: updated }});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 3: Early Termination Provisions */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></span>
              Early Termination Rights (Optional)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Allow termination before lease expiry with notice/penalty
            </p>
          </div>
          
          <CheckboxField
            label=""
            name="enableEarlyTermination"
            checked={formData.enableEarlyTermination}
            onChange={(e) => handleChange("enableEarlyTermination")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showEarlyTermination && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SelectField
                label="Early Termination Type"
                name="earlyTerminationType"
                value={formData.earlyTerminationType}
                onChange={handleChange("earlyTerminationType")}
                required
                options={[
                  { 
                    value: "with_penalty", 
                    label: "With Notice Period + Penalty" 
                  },
                  { 
                    value: "notice_only", 
                    label: "With Notice Period Only (No Penalty)" 
                  },
                  { 
                    value: "lessor_only", 
                    label: "Lessor Only (Lessee Cannot Terminate Early)" 
                  },
                  { 
                    value: "after_lockin", 
                    label: "After Lock-in Period" 
                  },
                ]}
                helperText="Define conditions for early termination"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberField
                  label="Early Termination Notice (Days)"
                  name="earlyTerminationNotice"
                  value={formData.earlyTerminationNotice}
                  onChange={handleChange("earlyTerminationNotice")}
                  min={30}
                  max={180}
                  required
                  helperText="Advance notice required"
                />

                {(formData.earlyTerminationType === "with_penalty" || 
                  formData.earlyTerminationType === "after_lockin") && (
                  <NumberField
                    label={formData.earlyTerminationType === "after_lockin" 
                      ? "Lock-in Period (Months)" 
                      : "Penalty Amount"}
                    name={formData.earlyTerminationType === "after_lockin" 
                      ? "earlyTermAfterMonths" 
                      : "earlyTerminationPenalty"}
                    value={formData.earlyTerminationType === "after_lockin"
                      ? formData.earlyTermAfterMonths
                      : formData.earlyTerminationPenalty}
                    onChange={handleChange(formData.earlyTerminationType === "after_lockin" 
                      ? "earlyTermAfterMonths" 
                      : "earlyTerminationPenalty")}
                    min={1}
                    helperText={formData.earlyTerminationType === "after_lockin"
                      ? "Months before early termination allowed"
                      : "e.g., '3 months rent' or specific amount"}
                  />
                )}
              </div>
            </motion.div>
          )}

          {!showEarlyTermination && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-3"
            >
              <Ban className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-200">
                <p className="font-semibold">No Early Termination</p>
                <p>Neither party can terminate before lease expiry except as specified in clause 20.1.</p>
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
          {/* Clause 20.1 Preview */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-400 mb-2 font-mono">CLAUSE 20.1 - TERMINATION BY LESSOR</p>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {generateClause201Preview()}
            </p>
          </div>

          {/* Clause 20.2 Preview */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-400 mb-2 font-mono">CLAUSE 20.2 - POST-TERMINATION</p>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {generateClause202Preview()}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Info */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-200">
            <p className="font-semibold mb-1">Current Configuration:</p>
            <ul className="space-y-1 text-xs">
              <li>✓ Termination Type: <span className="font-medium">{formData.terminationClauseType || "Not selected"}</span></li>
              <li>✓ Remedy Period: <span className="font-medium">{formData.terminationNoticeDays || "___"} days</span></li>
              <li>✓ Early Termination: <span className="font-medium">{formData.enableEarlyTermination ? formData.earlyTerminationType || "Enabled" : "Disabled"}</span></li>
              <li>✓ Consequences: <span className="font-medium">{formData.enableTerminationConsequences ? `${(formData.terminationConsequences || []).length} items` : "None"}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTerminationSection;