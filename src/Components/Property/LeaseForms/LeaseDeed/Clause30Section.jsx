import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy,Info,CheckCircle,AlertTriangle,FileCheck,Zap} from "lucide-react";
import NumberField from "../../../FormComponents/NumberField";
import TextAreaField from "../../../FormComponents/TextAreaField";
import CheckboxField from "../../../FormComponents/CheckboxField";
import SelectField from "../../../FormComponents/SelectField";

/**
 * Dynamic Counterparts Clause Component
 * Handles clause 30 with customization options
 */
const DynamicCounterpartsSection = ({ formData, setFormData, handleChange }) => {
  // Helper to show/hide conditional fields
  const showNumberOfCopies = formData.counterpartsClauseType === "specific_number";
  const showDigitalSignature = formData.enableDigitalSignature;
  const showDeliveryMethod = formData.enableDeliverySpecification;
  const showAuthenticationMethod = formData.enableAuthenticationMethod;
  const showCustomClause = formData.counterpartsClauseType === "custom";
  const showExecutionTiming = formData.enableExecutionTiming;

  // Update form data with generated clauses whenever they change
  useEffect(() => {
    const clause30 = generateClause30Preview();
    
    setFormData(prev => ({
      ...prev,
      counterpartsClause30: clause30,
      clause30: clause30
    }));
  }, [
    formData.counterpartsClauseType,
    formData.numberOfCounterparts,
    formData.enableDigitalSignature,
    formData.digitalSignatureType,
    formData.enableDeliveryMethod,
    formData.deliveryMethod,
    formData.enableAuthenticationMethod,
    formData.authenticationMethod,
    formData.customCounterpartsClause,
    formData.enableExecutionTiming,
    formData.executionTimingRequirement
  ]);

  // Generate preview of clause 30
  const generateClause30Preview = () => {
    let baseText = "";
    
    switch (formData.counterpartsClauseType) {
      case "standard_two":
        baseText += "This Lease Deed may be executed in two or more counterparts, each of which shall be deemed to be an original.";
        break;
      
      case "specific_number":
        const numCopies = formData.numberOfCounterparts || "2";
        baseText += `This Lease Deed may be executed in ${numCopies} counterparts, each of which shall be deemed to be an original. All counterparts together shall constitute one and the same instrument.`;
        break;
      
      case "unlimited":
        baseText += "This Lease Deed may be executed in any number of counterparts, each of which shall be deemed to be an original. The delivery of executed counterparts by facsimile or electronic means (PDF/email) shall have the same force and effect as delivery of manually executed originals.";
        break;
      
      case "electronic_only":
        baseText += "This Lease Deed shall be executed electronically and may be signed in multiple counterparts. Each electronic signature shall be deemed an original, and electronic signatures shall have the same legal force and effect as manual signatures. All counterparts together shall constitute one and the same instrument.";
        break;
      
      case "hybrid":
        baseText += "This Lease Deed may be executed in counterparts, including both physical originals and electronic copies. Each counterpart (whether physical or electronic) shall be deemed an original. The parties agree that any combination of physical and electronic counterparts shall together constitute one and the same instrument.";
        break;
      
      case "custom":
        baseText += formData.customCounterpartsClause 
          ? formData.customCounterpartsClause 
          : "[Your custom counterparts clause will appear here]";
        break;
      
      default:
        baseText += "[Select counterparts type]";
    }

    // Add digital signature specification if enabled
    if (formData.enableDigitalSignature && formData.counterpartsClauseType !== "custom") {
      let signatureText = "";
      
      switch (formData.digitalSignatureType) {
        case "basic_digital":
          signatureText = " Digital signatures on electronic counterparts shall be deemed valid and binding.";
          break;
        
        case "encrypted":
          signatureText = " All digital signatures must be encrypted and comply with encryption standards specified by both parties. Each party retains the right to verify digital signatures.";
          break;
        
        case "authenticated":
          signatureText = " Digital signatures must be authenticated through a mutually agreed upon digital authentication platform. Evidence of authentication shall be maintained by both parties.";
          break;
        
        case "advanced":
          signatureText = " Digital signatures shall comply with electronic signatures laws and regulations. Each party agrees to use advanced digital signature technology with timestamp verification and non-repudiation.";
          break;
      }
      
      baseText += signatureText;
    }

    // Add delivery method specification if enabled
    if (formData.enableDeliveryMethod && formData.counterpartsClauseType !== "custom") {
      let deliveryText = "";
      
      switch (formData.deliveryMethod) {
        case "email_pdf":
          deliveryText = " Counterparts may be delivered via email in PDF format. PDF copies shall be treated as original documents for all purposes.";
          break;
        
        case "courier_email":
          deliveryText = " Counterparts may be delivered either by courier service or via email in PDF format. At least one original physical counterpart shall be retained by the Lessor.";
          break;
        
        case "multiple_methods":
          deliveryText = " Counterparts may be delivered by any means including courier, email, facsimile, or electronic delivery service. All delivery methods shall be deemed equivalent.";
          break;
        
        case "physical_original":
          deliveryText = " At least one original physical counterpart signed by both parties shall be prepared and retained. Digital copies may be used for reference purposes only.";
          break;
      }
      
      baseText += deliveryText;
    }

    // Add authentication method if enabled
    if (formData.enableAuthenticationMethod && formData.counterpartsClauseType !== "custom") {
      let authText = "";
      
      switch (formData.authenticationMethod) {
        case "wet_signature":
          authText = " Each counterpart must be signed with wet ink signatures. Photocopies or digital reproductions do not substitute for original signatures.";
          break;
        
        case "digital_cert":
          authText = " Digital counterparts must be signed using digital certificates issued by a recognized certificate authority.";
          break;
        
        case "email_verification":
          authText = " Counterparts delivered via email shall be authenticated through email verification and may include digital signature verification tokens.";
          break;
        
        case "no_specific":
          authText = " Counterparts need not be notarized or authenticated by any third party and shall be binding as executed.";
          break;
      }
      
      baseText += authText;
    }

    // Add execution timing if enabled
    if (formData.enableExecutionTiming && formData.counterpartsClauseType !== "custom") {
      const timingReq = formData.executionTimingRequirement || "within 15 days";
      baseText += ` All counterparts must be executed and exchanged ${timingReq} of the execution date. The lease becomes effective upon execution of all counterparts by both parties.`;
    }

    return baseText;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 bg-opacity-10">
          <Copy className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Counterparts Configuration</h2>
          <p className="text-sm text-slate-400 mt-1">Customize execution and delivery of lease copies (Clause 30)</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-cyan-200">
          <p className="font-semibold mb-1">Counterparts & Execution</p>
          <p>Define how many copies of the lease can be executed and how they will be signed and delivered. This is essential for modern digital document execution.</p>
        </div>
      </div>

      {/* Section 1: Main Counterparts Type */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></span>
          Counterparts Type (Clause 30)
        </h3>

        <SelectField
          label="Counterparts Execution Type"
          name="counterpartsClauseType"
          value={formData.counterpartsClauseType}
          onChange={handleChange("counterpartsClauseType")}
          required
          options={[
            { 
              value: "standard_two", 
              label: "Standard Two Counterparts" 
            },
            { 
              value: "specific_number", 
              label: "Specific Number of Counterparts" 
            },
            { 
              value: "unlimited", 
              label: "Unlimited Counterparts (Traditional)" 
            },
            { 
              value: "electronic_only", 
              label: "Electronic Only (Digital-First)" 
            },
            { 
              value: "hybrid", 
              label: "Hybrid (Physical + Electronic)" 
            },
            { 
              value: "custom", 
              label: "Custom Counterparts Clause" 
            },
          ]}
          helperText="Define how many copies and what formats can be used"
        />

        {/* Number of Counterparts Field */}
        {showNumberOfCopies && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 border-l-2 border-cyan-500/30"
          >
            <NumberField
              label="Specific Number of Counterparts"
              name="numberOfCounterparts"
              value={formData.numberOfCounterparts}
              onChange={handleChange("numberOfCounterparts")}
              min={2}
              max={10}
              required
              helperText="Total number of counterparts allowed"
            />
          </motion.div>
        )}

        {/* Custom Clause */}
        {showCustomClause && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 border-l-2 border-cyan-500/30"
          >
            <TextAreaField
              label="Custom Counterparts Clause"
              name="customCounterpartsClause"
              value={formData.customCounterpartsClause}
              onChange={handleChange("customCounterpartsClause")}
              placeholder="Write your custom counterparts clause here..."
              minLength={30}
              maxLength={800}
              required
              helperText="Define exact counterparts and execution terms"
            />
          </motion.div>
        )}

        {/* Information for Electronic Only */}
        {formData.counterpartsClauseType === "electronic_only" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-3"
          >
            <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200">
              <p className="font-semibold">Digital-First Execution</p>
              <p>All signatures and delivery are electronic. No physical originals required.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Section 2: Digital Signature Configuration */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></span>
              Digital Signature Specification (Optional)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Define requirements for digital signatures
            </p>
          </div>
          
          <CheckboxField
            label=""
            name="enableDigitalSignature"
            checked={formData.enableDigitalSignature}
            onChange={(e) => handleChange("enableDigitalSignature")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showDigitalSignature && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SelectField
                label="Digital Signature Type"
                name="digitalSignatureType"
                value={formData.digitalSignatureType}
                onChange={handleChange("digitalSignatureType")}
                required
                options={[
                  { 
                    value: "basic_digital", 
                    label: "Basic Digital Signatures" 
                  },
                  { 
                    value: "encrypted", 
                    label: "Encrypted Digital Signatures" 
                  },
                  { 
                    value: "authenticated", 
                    label: "Platform Authenticated" 
                  },
                  { 
                    value: "advanced", 
                    label: "Advanced Digital Signatures (Compliance)" 
                  },
                ]}
                helperText="Define digital signature security level"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 3: Delivery Method Configuration */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
              Delivery Method (Optional)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Specify how counterparts should be delivered
            </p>
          </div>
          
          <CheckboxField
            label=""
            name="enableDeliveryMethod"
            checked={formData.enableDeliveryMethod}
            onChange={(e) => handleChange("enableDeliveryMethod")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showDeliveryMethod && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SelectField
                label="Delivery Method Type"
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleChange("deliveryMethod")}
                required
                options={[
                  { 
                    value: "email_pdf", 
                    label: "Email PDF Only" 
                  },
                  { 
                    value: "courier_email", 
                    label: "Courier or Email" 
                  },
                  { 
                    value: "multiple_methods", 
                    label: "Multiple Methods (Email, Courier, Fax)" 
                  },
                  { 
                    value: "physical_original", 
                    label: "At Least One Physical Original" 
                  },
                ]}
                helperText="Define acceptable delivery methods"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 4: Authentication Method Configuration */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></span>
              Authentication Method (Optional)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Define signature authentication requirements
            </p>
          </div>
          
          <CheckboxField
            label=""
            name="enableAuthenticationMethod"
            checked={formData.enableAuthenticationMethod}
            onChange={(e) => handleChange("enableAuthenticationMethod")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showAuthenticationMethod && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SelectField
                label="Authentication Type"
                name="authenticationMethod"
                value={formData.authenticationMethod}
                onChange={handleChange("authenticationMethod")}
                required
                options={[
                  { 
                    value: "wet_signature", 
                    label: "Wet Ink Signatures" 
                  },
                  { 
                    value: "digital_cert", 
                    label: "Digital Certificates" 
                  },
                  { 
                    value: "email_verification", 
                    label: "Email Verification" 
                  },
                  { 
                    value: "no_specific", 
                    label: "No Specific Requirement" 
                  },
                ]}
                helperText="Define how signatures are authenticated"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 5: Execution Timing */}
      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500"></span>
              Execution Timing (Optional)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Define timeline for counterpart exchange
            </p>
          </div>
          
          <CheckboxField
            label=""
            name="enableExecutionTiming"
            checked={formData.enableExecutionTiming}
            onChange={(e) => handleChange("enableExecutionTiming")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showExecutionTiming && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 border-l-2 border-amber-500/30"
            >
              <TextAreaField
                label="Execution Timing Requirement"
                name="executionTimingRequirement"
                value={formData.executionTimingRequirement}
                onChange={handleChange("executionTimingRequirement")}
                placeholder="e.g., 'within 15 days of the first execution' or 'within 7 business days'"
                maxLength={200}
                required
                helperText="Define timeline for counterpart exchange"
              />
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
          <p className="text-xs text-slate-400 mb-2 font-mono">CLAUSE 30 - COUNTERPARTS</p>
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
            {generateClause30Preview()}
          </p>
        </div>
      </div>

      {/* Summary Info */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-200">
            <p className="font-semibold mb-1">Current Configuration:</p>
            <ul className="space-y-1 text-xs">
              <li>✓ Counterparts Type: <span className="font-medium">{formData.counterpartsClauseType || "Not selected"}</span></li>
              <li>✓ Digital Signature: <span className="font-medium">{formData.enableDigitalSignature ? formData.digitalSignatureType || "Enabled" : "Not specified"}</span></li>
              <li>✓ Delivery Method: <span className="font-medium">{formData.enableDeliveryMethod ? formData.deliveryMethod || "Enabled" : "Not specified"}</span></li>
              <li>✓ Authentication: <span className="font-medium">{formData.enableAuthenticationMethod ? formData.authenticationMethod || "Enabled" : "Not specified"}</span></li>
              <li>✓ Timing Requirement: <span className="font-medium">{formData.enableExecutionTiming ? "Yes" : "Not specified"}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCounterpartsSection;