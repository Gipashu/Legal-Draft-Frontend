import React from "react";
import { HoverEffect } from "./CardHoverEffect";

const FeatureSection = () => {
  const categories = [
    {
      title: "Marriage & Divorce Documents",
      description: "Draft, manage and process marriage and divorce-related legal documents.",
      link: "/marriage",
      gradient: "from-pink-500 to-red-500",
    },
    {
      title: "Affidavits",
      description: "Quickly generate and verify legally binding affidavits with ease.",
      link: "/affidavit",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "Property Agreements",
      description: "Create property-related agreements, contracts, and deeds securely.",
      link: "/property",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Business Contracts",
      description: "Streamline your business contracts and ensure legal compliance.",
      link: "/business",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Wills & Testaments",
      description: "Prepare wills and estate-related documents with full legal coverage.",
      link: "/wills",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Legal Services
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Professional legal document services tailored to your needs
        </p>
      </div>
      <HoverEffect items={categories} />
    </div>
  );
};

export default FeatureSection;