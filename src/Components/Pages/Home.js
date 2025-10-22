import { Link } from "react-router-dom";
import "../CSS/Home.css";

export default function Home() {
  const categories = [
    {
      title: "Marriage & Divorce Documents",
      desc: "Draft, manage and process marriage and divorce-related legal documents.",
      link: "/marriage",
      gradient: "pink-red",
      img: require("../../Images/Marraige&Divorce.png"), 
    },
    {
      title: "Affidavits",
      desc: "Quickly generate and verify legally binding affidavits with ease.",
      link: "/affidavit",
      gradient: "purple-indigo",
      img: require("../../Images/Affedevait.png"),
    },
    {
      title: "Property Agreements",
      desc: "Create property-related agreements, contracts, and deeds securely.",
      link: "/property",
      gradient: "green-emerald",
      img: require("../../Images/PropertyAgreement.png"),
    },
    {
      title: "Business Contracts",
      desc: "Streamline your business contracts and ensure legal compliance.",
      link: "/business",
      gradient: "blue-cyan",
      img: require("../../Images/BusinessContract.png"),
    },
    {
      title: "Wills & Testaments",
      desc: "Prepare wills and estate-related documents with full legal coverage.",
      link: "/wills",
      gradient: "yellow-orange",
      img: require("../../Images/Wills&Testament.png"),
    },
  ];

  return (
    <div className="home-container">
      <div className="home-inner">
        <h1 className="home-title">Legal Document Catalogue</h1>
        <p className="home-subtitle">
          Select a category to begin drafting your document
        </p>

        <div className="grid-container">
          {categories.map((cat, i) => (
            <Link to={cat.link} key={i} className={`card ${cat.gradient}`}>
              {/* ✅ Card image */}
              <div className="card-image">
                <img src={cat.img} alt={cat.title} />
              </div>

              {/* Card text */}
              <div className="card-content">
                <h2>{cat.title}</h2>
                <p>{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
