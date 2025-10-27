import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Building2, Home, Factory, MapPin } from "lucide-react";
import RentalLease from "./LeaseForms/RentalLease";
import FlatLease from "./LeaseForms/FlatLease";
import CommercialLeaseForm from "./LeaseForms/CommercialLeaseForm";
import LandLease from "./LeaseForms/LandLease";
import IndustrialLease from "./LeaseForms/IndustrialLease";

export const leases = [
  {
    title: "Residential Lease",
    desc: "Perfect for houses and apartments. Includes tenant rights, maintenance terms, and security deposit clauses.",
    gradient: "from-blue-500 to-cyan-500",
    type: "residential",
    img: require("../../Images/Property/RentalAgreement.png"),
    component: RentalLease,
    icon: Home,
    popular: true,
  },
  {
    title: "Flat Lease",
    desc: "Specialized agreement for multi-unit residential flats with common area provisions.",
    gradient: "from-blue-500 to-cyan-500",
    type: "flat",
    img: require("../../Images/Property/FlatAgreement.png"),
    component: FlatLease,
    icon: Building2,
  },
  {
    title: "Commercial Lease",
    desc: "Comprehensive agreement for office spaces, retail stores, and commercial properties.",
    gradient: "from-green-500 to-emerald-500",
    type: "commercial",
    img: require("../../Images/Property/CommercialAgreement.png"),
    component: CommercialLeaseForm,
    icon: Building2,
    popular: true,
  },
  {
    title: "Land Lease",
    desc: "Agreements for vacant land, plots, and agricultural leasing purposes.",
    gradient: "from-purple-500 to-indigo-500",
    type: "land",
    img: require("../../Images/Property/LandAgreement.png"),
    component: LandLease,
    icon: MapPin,
  },
  {
    title: "Industrial Lease",
    desc: "For warehouses, manufacturing units, and industrial property complexes.",
    gradient: "from-pink-500 to-red-500",
    type: "industrial",
    img: require("../../Images/Property/IndustrialAgreement.png"),
    component: IndustrialLease,
    icon: Factory,
  },
];

const Property = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen w-full bg-black py-12 px-4 pt-32 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full mb-6"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 text-sm">Legal Documents</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
          >
            Property Lease Agreements
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Create legally binding lease agreements in minutes. Choose from our professionally 
            drafted templates tailored for different property types.
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
        >
          {[
            { label: "Templates", value: "5+" },
            { label: "Downloads", value: "10K+" },
            { label: "States Covered", value: "All" },
            { label: "Legally Verified", value: "100%" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leases.map((lease, idx) => {
            const Icon = lease.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Link
                  to={`/property/${lease.type}`}
                  className="relative group block h-full"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Hover Effect Background */}
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.div
                        className={`absolute -inset-1 bg-gradient-to-r ${lease.gradient} rounded-2xl blur-xl opacity-30`}
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Card Content */}
                  <div className="relative h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-slate-700 group-hover:shadow-2xl">
                    {/* Popular Badge */}
                    {lease.popular && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${lease.gradient} text-white`}>
                          Popular
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${lease.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                    {/* Image Section with Icon Overlay */}
                    <div className="relative h-48 bg-slate-800 overflow-hidden">
                      {lease.img && (
                        <img
                          src={lease.img}
                          alt={lease.title}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                        />
                      )}
                      {/* Icon Overlay */}
                      <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${lease.gradient} opacity-0 group-hover:opacity-90 transition-all duration-300`}>
                        <Icon className="w-16 h-16 text-white" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${lease.gradient} bg-opacity-10`}>
                          <Icon className={`w-6 h-6 bg-gradient-to-r ${lease.gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }} />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                        {lease.title}
                      </h3>

                      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-slate-300">
                        {lease.desc}
                      </p>

                      {/* Action Button */}
                      <div className="flex items-center gap-2 text-slate-400 group-hover:text-white transition-colors">
                        <span className="text-sm font-medium">Get Started</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className={`h-1 bg-gradient-to-r ${lease.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-3">Need Custom Agreement?</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our legal experts can help you create a custom lease agreement tailored to your specific needs.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
            Contact Legal Team
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Property;
