import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2,
  Info,
  CheckCircle,
  AlertTriangle,
  Shield,
  Lock
} from "lucide-react";
import NumberField from "../../../FormComponents/NumberField";
import TextAreaField from "../../../FormComponents/TextAreaField";
import CheckboxField from "../../../FormComponents/CheckboxField";
import SelectField from "../../../FormComponents/SelectField";

/**
 * Dynamic Right to Mortgage Clause Component
 * Handles clause 26 with customization options
 */
const DynamicRightToMortgageSection = ({ formData, setFormData, handleChange }) => {
  // Helper to show/hide conditional fields
  const showLesseeLien = formData.mortgageClauseType === "lessee_notice";
  const showMortgageConsent = formData.mortgageClauseType === "mortgagor_consent";
  const showRestrictions = formData.enableMortgageRestrictions;
  const showCustomClause = formData.mortgageClauseType === "custom";
  const showLienProtection = formData.enableLienProtection;
  const showPriorityRights = formData.enablePriorityRights;

  // Update form data with generated clauses whenever they change
  useEffect(() => {
    const clause26 = generateClause26Preview();
    
    setFormData(prev => ({
      ...prev,
      mortgageClause26: clause26,
      clause26: clause26

    }));
  }, [
    formData.mortgageClauseType,
    formData.lienNoticeRequirement,
    formData.mortgagorConsentDays,
    formData.enableMortgageRestrictions,
    formData.mortgageRestrictions,
    formData.customMortgageClause,
    formData.enableLienProtection,
    formData.lienProtectionType,
    formData.customLienProtection,
    formData.enablePriorityRights,
    formData.priorityRightsType
  ]);

  const generateClause26Preview = () => {
    let baseText = "";
    
    switch (formData.mortgageClauseType) {
      case "unrestricted":
        baseText += "Lessor reserves the right to mortgage or otherwise place a lien on the Leased Premises, and Lessee agrees to accept the Leased Premises subject to and subordinate to any such mortgage or lien. In the event the Lessor has already mortgaged the Leased Premises, it shall ensure that it obtains the consent of the mortgagor, if required, for the lease of the Leased Premises.";
        break;
      
      case "lessee_notice":
        const noticeReq = formData.lienNoticeRequirement || "written notice within 30 days";
        baseText += `Lessor reserves the right to mortgage or otherwise place a lien on the Leased Premises. However, the Lessor must provide the Lessee with ${noticeReq} of any such mortgage or lien. The Lessee agrees to accept the Leased Premises subject to and subordinate to any such mortgage or lien. In the event the Lessor has already mortgaged the Leased Premises, it shall obtain the consent of the mortgagor for the lease of the Leased Premises.`;
        break;
      
      case "mortgagor_consent":
        const consentDays = formData.mortgagorConsentDays || "30";
        baseText += `The Lessor warrants that it has obtained or shall obtain the mortgagor's consent prior to entering into this Lease Deed. The Lessor shall provide evidence of such consent within ${consentDays} days. The Lessee agrees to accept the Leased Premises subject to and subordinate to any existing or future mortgage or lien, provided that the mortgagor consents to the lease. If the mortgagor does not consent, the Lessor shall inform the Lessee in writing within ${consentDays} days.`;
        break;
      
      case "lessee_protected":
        baseText += `The Lessor reserves the right to mortgage the Leased Premises with the following limitations: (a) The mortgage shall not interfere with the Lessee's quiet enjoyment of the premises; (b) The mortgagee shall recognize the Lessee's lease rights and provide a non-disturbance agreement; (c) The Lessee shall not be held liable for the Lessor's mortgage debt or defaults. The Lessee agrees to execute any non-disturbance agreements required by the mortgagee.`;
        break;
      
      case "restricted_amount":
        const maxLTV = formData.maxMortgageLTV || "70%";
        baseText += `The Lessor may mortgage the Leased Premises provided that the total mortgage does not exceed ${maxLTV} of the property's assessed value. The Lessor must provide proof of the property valuation and mortgage amount to the Lessee upon request. The Lessee agrees to accept the Leased Premises subject to such mortgage within the specified limit. Any mortgage exceeding this limit requires the Lessee's written consent.`;
        break;
      
      case "custom":
        baseText += formData.customMortgageClause 
          ? formData.customMortgageClause 
          : "[Your custom mortgage clause will appear here]";
        break;
      
      default:
        baseText += "[Select mortgage clause type]";
    }

    // Add lien protections if enabled
    if (formData.enableLienProtection) {
      let protectionText = "";
      
      switch (formData.lienProtectionType) {
        case "nda_required":
          protectionText = " The Lessor shall ensure that any mortgagee provides a Non-Disturbance and Attornment (NDA) agreement protecting the Lessee's lease rights in case of foreclosure.";
          break;
        
        case "lease_priority":
          protectionText = " The Lessor shall ensure that this lease is recorded and has priority over any mortgage or lien created after the lease commencement date.";
          break;
        
        case "quiet_enjoyment":
          protectionText = " The Lessee's right to quiet enjoyment shall be expressly preserved and shall not be affected by any mortgage, lien, or foreclosure proceedings.";
          break;
        
        case "custom":
          protectionText = formData.customLienProtection ? ` ${formData.customLienProtection}` : "";
          break;
      }
      
      baseText += protectionText;
    }

    // Add priority rights if enabled
    if (formData.enablePriorityRights) {
      let priorityText = "";
      
      switch (formData.priorityRightsType) {
        case "subordination":
          priorityText = " The Lessee unconditionally subordinates its lease to all existing and future mortgages, liens, and encumbrances on the Leased Premises.";
          break;
        
        case "superior":
          priorityText = " The Lessee's lease rights shall be superior to any mortgage or lien created after the lease commencement date, unless the Lessee consents otherwise.";
          break;
        
        case "negotiated":
          priorityText = " The priority of the Lessee's lease relative to any mortgage or lien shall be negotiated and documented in writing between the parties and any mortgagee.";
          break;
      }
      
      baseText += priorityText;
    }

    // Add mortgage restrictions if enabled
    if (formData.enableMortgageRestrictions) {
      const restrictions = formData.mortgageRestrictions || [];
      if (restrictions.length > 0) {
        baseText += " Additional restrictions on mortgage: " + restrictions.join("; ") + ".";
      }
    }

    return baseText;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 bg-opacity-10">
          <Building2 className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Right to Mortgage Configuration</h2>
          <p className="text-sm text-slate-400 mt-1">Customize mortgage and lien terms (Clause 26)</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-200">
          <p className="font-semibold mb-1">Mortgage Rights</p>
          <p>Define the lessor's right to mortgage the property and protect the lessee's interests in case of foreclosure or financial default.</p>
        </div>
      </div>

      {/* Section 1: Main Mortgage Clause Type */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></span>
          Mortgage Clause Type (Clause 26)
        </h3>

        <SelectField
          label="Right to Mortgage Type"
          name="mortgageClauseType"
          value={formData.mortgageClauseType}
          onChange={handleChange("mortgageClauseType")}
          required
          options={[
            { 
              value: "unrestricted", 
              label: "Unrestricted Mortgage Rights (Lessor-Friendly)" 
            },
            { 
              value: "lessee_notice", 
              label: "With Lessee Notification" 
            },
            { 
              value: "mortgagor_consent", 
              label: "Mortgagor Consent Required" 
            },
            { 
              value: "lessee_protected", 
              label: "Lessee Protected (Tenant-Friendly)" 
            },
            { 
              value: "restricted_amount", 
              label: "Restricted Mortgage Amount" 
            },
            { 
              value: "custom", 
              label: "Custom Mortgage Clause" 
            },
          ]}
          helperText="Define conditions under which lessor can mortgage property"
        />

        {/* Lessee Notice Period */}
        {showLesseeLien && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 border-l-2 border-blue-500/30"
          >
            <TextAreaField
              label="Lessee Notice Requirement"
              name="lienNoticeRequirement"
              value={formData.lienNoticeRequirement}
              onChange={handleChange("lienNoticeRequirement")}
              placeholder="e.g., 'written notice within 30 days' or 'email notification before mortgage creation'"
              maxLength={200}
              required
              helperText="Specify how and when lessee should be notified"
            />
          </motion.div>
        )}

        {/* Mortgagor Consent Days */}
        {showMortgageConsent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 border-l-2 border-blue-500/30"
          >
            <NumberField
              label="Mortgagor Consent Deadline (Days)"
              name="mortgagorConsentDays"
              value={formData.mortgagorConsentDays}
              onChange={handleChange("mortgagorConsentDays")}
              min={7}
              max={90}
              required
              helperText="Days to provide consent proof or notification"
            />
          </motion.div>
        )}

        {/* Restricted Mortgage Amount */}
        {formData.mortgageClauseType === "restricted_amount" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 border-l-2 border-blue-500/30"
          >
            <TextAreaField
              label="Maximum Mortgage Amount/LTV"
              name="maxMortgageLTV"
              value={formData.maxMortgageLTV}
              onChange={handleChange("maxMortgageLTV")}
              placeholder="e.g., '70% of property value' or '₹5,000,000'"
              maxLength={150}
              required
              helperText="Specify the maximum mortgage limit"
            />
          </motion.div>
        )}

        {/* Custom Clause */}
        {showCustomClause && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 border-l-2 border-blue-500/30"
          >
            <TextAreaField
              label="Custom Mortgage Clause"
              name="customMortgageClause"
              value={formData.customMortgageClause}
              onChange={handleChange("customMortgageClause")}
              placeholder="Write your custom mortgage clause here..."
              minLength={50}
              maxLength={1000}
              required
              helperText="Define exact mortgage terms and conditions"
            />
          </motion.div>
        )}

        {/* Warning for Unrestricted */}
        {formData.mortgageClauseType === "unrestricted" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-200">
              <p className="font-semibold">Unrestricted Mortgage Rights</p>
              <p>Lessor can freely mortgage with no lessee notice or protection. Lessee may lose premises in foreclosure.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Section 2: Lien Protection */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></span>
              Lien Protection for Lessee (Optional)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Protect lessee's rights in case of mortgage or foreclosure
            </p>
          </div>
          
          <CheckboxField
            label=""
            name="enableLienProtection"
            checked={formData.enableLienProtection}
            onChange={(e) => handleChange("enableLienProtection")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showLienProtection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SelectField
                label="Type of Lien Protection"
                name="lienProtectionType"
                value={formData.lienProtectionType}
                onChange={handleChange("lienProtectionType")}
                required
                options={[
                  { 
                    value: "nda_required", 
                    label: "Non-Disturbance Agreement (NDA)" 
                  },
                  { 
                    value: "lease_priority", 
                    label: "Lease Priority Recording" 
                  },
                  { 
                    value: "quiet_enjoyment", 
                    label: "Quiet Enjoyment Protection" 
                  },
                  { 
                    value: "custom", 
                    label: "Custom Protection" 
                  },
                ]}
                helperText="Define how lessee is protected"
              />

              {formData.lienProtectionType === "custom" && (
                <TextAreaField
                  label="Custom Lien Protection"
                  name="customLienProtection"
                  value={formData.customLienProtection}
                  onChange={handleChange("customLienProtection")}
                  placeholder="Describe custom protection measures..."
                  maxLength={500}
                  required
                  helperText="Specify additional protections for lessee"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 3: Priority Rights */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
              Priority of Lease vs Mortgage
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Define which has priority: lease or mortgage
            </p>
          </div>
          
          <CheckboxField
            label=""
            name="enablePriorityRights"
            checked={formData.enablePriorityRights}
            onChange={(e) => handleChange("enablePriorityRights")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showPriorityRights && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SelectField
                label="Priority Type"
                name="priorityRightsType"
                value={formData.priorityRightsType}
                onChange={handleChange("priorityRightsType")}
                required
                options={[
                  { 
                    value: "subordination", 
                    label: "Subordination (Mortgage Priority)" 
                  },
                  { 
                    value: "superior", 
                    label: "Superior Rights (Lease Priority)" 
                  },
                  { 
                    value: "negotiated", 
                    label: "Negotiated with Mortgagee" 
                  },
                ]}
                helperText="Define priority in case of conflict"
              />

              <div className="p-3 bg-slate-700/30 rounded-lg text-sm text-slate-300">
                <p className="flex items-start gap-2">
                  <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    {formData.priorityRightsType === "subordination" && "Lessee subordinates to mortgage. Lease can be terminated if property foreclosed."}
                    {formData.priorityRightsType === "superior" && "Lease has priority over future mortgages. Better protection for lessee."}
                    {formData.priorityRightsType === "negotiated" && "Priority depends on agreement with mortgagee. Requires negotiation."}
                    {!formData.priorityRightsType && "Select a priority option."}
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 4: Additional Mortgage Restrictions */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></span>
              Additional Mortgage Restrictions (Optional)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Add specific restrictions on mortgaging
            </p>
          </div>
          
          <CheckboxField
            label=""
            name="enableMortgageRestrictions"
            checked={formData.enableMortgageRestrictions}
            onChange={(e) => handleChange("enableMortgageRestrictions")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showRestrictions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 border-l-2 border-orange-500/30"
            >
              <div className="space-y-3">
                <label className="text-slate-200 text-sm font-medium mb-2 block">Select Restrictions:</label>
                <div className="space-y-2 pl-1">
                  {[
                    "No mortgage refinancing without lessee consent",
                    "Mortgage cannot exceed current outstanding debt",
                    "Mortgagee must maintain property insurance",
                    "All mortgage modifications require lessee notice",
                    "Lessor must keep mortgage current and in good standing",
                    "No pledge of lease payments without permission"
                  ].map((restriction, idx) => (
                    <div key={idx} className="restriction-item flex items-start">
                      <CheckboxField
                        label={restriction}
                        name={`mortgage_restriction_${idx}`}
                        className="mb-0"
                        checked={(formData.mortgageRestrictions || []).includes(restriction)}
                        onChange={(e) => {
                          const current = formData.mortgageRestrictions || [];
                          const updated = e.target.checked
                            ? [...current, restriction]
                            : current.filter(i => i !== restriction);
                          handleChange("mortgageRestrictions")({ target: { value: updated }});
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

      {/* Live Preview Section */}
      <div className="mt-6 p-5 bg-slate-950/50 border border-slate-700 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <h4 className="text-white font-semibold">Live Preview</h4>
        </div>
        
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <p className="text-xs text-slate-400 mb-2 font-mono">CLAUSE 26 - RIGHT TO MORTGAGE</p>
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
            {generateClause26Preview()}
          </p>
        </div>
      </div>

      {/* Summary Info */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-200">
            <p className="font-semibold mb-1">Current Configuration:</p>
            <ul className="space-y-1 text-xs">
              <li>✓ Mortgage Type: <span className="font-medium">{formData.mortgageClauseType || "Not selected"}</span></li>
              <li>✓ Lien Protection: <span className="font-medium">{formData.enableLienProtection ? formData.lienProtectionType || "Enabled" : "None"}</span></li>
              <li>✓ Priority Type: <span className="font-medium">{formData.enablePriorityRights ? formData.priorityRightsType || "Enabled" : "Not set"}</span></li>
              <li>✓ Restrictions: <span className="font-medium">{formData.enableMortgageRestrictions ? `${(formData.mortgageRestrictions || []).length} items` : "None"}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicRightToMortgageSection;