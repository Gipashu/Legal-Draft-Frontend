import React from "react";
import Navbar from "./Components/Home/Navbar";
import Hero from "./Components/Home/Hero";
import VideoSection from "./Components/Home/VideoSection";
import FeatureSection from "./Components/Home/FeatureSection";
import Footer from "./Components/Home/Footer";

export default function Home() {
    return (
        <div className="min-h-screen w-full bg-black text-white">
            <Navbar />
            <main className="w-full overflow-hidden">
                <Hero />
                <div className="space-y-16 md:space-y-24 lg:space-y-32 py-8 md:py-12 lg:py-16">
                    <VideoSection />
                    <FeatureSection />
                </div>
            </main>
            <Footer />
        </div>
    );
}
