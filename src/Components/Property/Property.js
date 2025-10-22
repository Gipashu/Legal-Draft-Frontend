import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Property.css"; // CSS file for property page
import RentalLease from "./LeaseForms/RentalLease"
import FlatLease from "./LeaseForms/FlatLease"
import CommercialLeaseForm from "./LeaseForms/CommercialLeaseForm"
import LandLease from "./LeaseForms/LandLease"
import IndustrialLease from "./LeaseForms/IndustrialLease";
export const leases = [
  {
    title: "Residential Lease Agreement",
    desc: "Standard lease agreement for residential properties.",
    gradient: "blue-cyan",
    type: "residential",
    img: require("../../Images/Property/RentalAgreement.png"),
    component: RentalLease,  // 👈 attach component directly
  },
  {
    title: "Flat Lease Agreement",
    desc: "Standard lease agreement for residential flats.",
    gradient: "blue-cyan",
    type: "flat",
    img: require("../../Images/Property/FlatAgreement.png"),
    component: FlatLease,
  },
  {
    title: "Commercial Lease Agreement",
    desc: "Lease agreements for office or commercial spaces.",
    gradient: "green-emerald",
    type: "commercial",
    img: require("../../Images/Property/CommercialAgreement.png"),
    component: CommercialLeaseForm,
  },
  {
    title: "Land Lease Agreement",
    desc: "Agreements for leasing land or plots.",
    gradient: "purple-indigo",
    type: "land",
    img: require("../../Images/Property/LandAgreement.png"),
    component: LandLease,
  },
  {
    title: "Industrial Lease Agreement",
    desc: "For industrial properties and warehouses.",
    gradient: "pink-red",
    type: "industrial",
    img: require("../../Images/Property/IndustrialAgreement.png"),
    component: IndustrialLease,
  },
];
export default function Property() {
  

  return (
    <div className="property-container">
      <div className="property-inner">
        <h1 className="property-title">Property Lease Agreements</h1>
        <p className="property-subtitle">
          Select a lease agreement type to start drafting
        </p>

        <div className="grid-container">
          {leases.map((lease, i) => (
            <Link
              to={`/property/${lease.type}`} // ✅ dynamically build link
              key={i}
              className={`card ${lease.gradient}`}
            >
              <div className="card-image">
                {lease.img && <img src={lease.img} alt={lease.title} />}
              </div>
              <div className="card-content">
                <h2>{lease.title}</h2>
                <p>{lease.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
