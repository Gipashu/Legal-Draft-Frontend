import React, { useState, useEffect } from "react";
import { Badge, Button, Link } from "@nextui-org/react";
import { ArrowRight, FileText, Scale } from "lucide-react";
import MagicBentoDesktop from "./MagicBentoDestop";
import MagicBentoMobile from "./MagicBentoMobile";


const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  const phrases = [
    'Precision Legal Documentation',
    'Expert Legal Drafting',
    'Compliant & Accurate',
    'Tailored Legal Solutions'
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout;

    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, Math.random() * 50 + 50);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 30);
      } else {
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentPhraseIndex]);

  return (
    <section className="relative w-full z-20 min-h-[85vh] sm:min-h-[90vh] flex items-center py-8 mt-16 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 text-white max-w-2xl mx-auto lg:mx-0 px-2 sm:px-4 lg:px-0">
              {/* Animated Badge */}
              <div className="animate-slide-up">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 
                  backdrop-blur-md border border-blue-400/30 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full shadow-lg 
                  inline-flex items-center justify-center whitespace-nowrap w-fit transition-all duration-300 transform hover:scale-105"
                >
                  <Scale className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                  <span>Expert Legal Drafting</span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-2 sm:space-y-3 animate-slide-up-delay-1 group">
                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
                  <div className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-indigo-300">
                      {displayText}
                      <span className={`inline-block w-0.5 sm:w-1 h-7 sm:h-9 -mb-1 ml-1 bg-blue-300 transition-opacity duration-300 ${!isTyping ? 'opacity-0' : 'opacity-100'}`}></span>
                    </span>
                    
                  </div>
                </h1>
                <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-indigo-500 animate-fade-in-up-delay-2"></div>
              </div>

              {/* Description */}
              <div className="animate-slide-up-delay-2">
                <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed font-normal">
                  Professional legal document drafting services tailored to your needs. 
                  Our expert team ensures accuracy, compliance, and peace of mind for all 
                  your legal documentation requirements.
                </p>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 md:pt-10 animate-slide-up-delay-3">
                <Button
                  as={Link}
                  href="/services"
                  size="md"
                  className="group bg-white text-blue-900 hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-0.5 
                  transition-all duration-300 w-full xs:w-auto px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold rounded-lg"
                  startContent={<FileText className="h-4 w-4 sm:h-5 sm:w-5" />}
                >
                  Our Services
                  <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                <Button
                  size="md"
                  variant="flat"
                  className="text-white bg-blue-600/30 hover:bg-blue-500/40 hover:shadow-xl backdrop-blur-md 
                  w-full xs:w-auto px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 
                  border border-blue-400/20 rounded-lg hover:border-blue-400/40"
                >
                  Free Consultation
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 md:pt-10 lg:pt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-blue-100/80">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  <span className="truncate">100% Confidential</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  <span className="truncate">Expert Legal Team</span>
                </div>
                <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  <span className="truncate">Timely Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - MagicBento */}
          <div className="w-full lg:w-1/2 flex items-center justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-0">
            {/* Desktop and Tablet View */}
            <div className="hidden sm:block relative w-full h-[380px] md:h-[420px] lg:h-[460px] xl:h-[500px] 2xl:h-[550px] rounded-xl sm:rounded-2xl overflow-hidden">
              <MagicBentoDesktop
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="99, 102, 241"
                cardBackground="rgba(17, 24, 39, 0.8)"
                cardBorderColor="rgba(99, 102, 241, 0.4)"
                className="h-full w-full"
                itemPadding="p-3 sm:p-4"
                items={[
                  {
                    title: "Legal Drafting",
                    description: "Precision-crafted legal documents",
                    icon: "📄",
                    color: "from-indigo-500 to-purple-600",
                  },
                  {
                    title: "Review",
                    description: "Expert document review",
                    icon: "🔍",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "Compliance",
                    description: "Regulatory compliance check",
                    icon: "✅",
                    color: "from-emerald-500 to-teal-500",
                  },
                  {
                    title: "Support",
                    description: "24/7 Legal support",
                    icon: "🛡️",
                    color: "from-amber-500 to-orange-500",
                  },
                ]}
              />
            </div>

            {/* Mobile View */}
            <div className="block sm:hidden relative w-full max-w-md mx-auto">
              <MagicBentoMobile
                textAutoHide={true}
                enableStars={false}
                enableSpotlight={false}
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={8}
                glowColor="99, 102, 241"
                cardBackground="rgba(17, 24, 39, 0.8)"
                cardBorderColor="rgba(99, 102, 241, 0.4)"
                className="w-full"
                itemPadding="p-3"
                items={[
                  {
                    title: "Legal Drafting",
                    description: "Precision-crafted legal documents",
                    icon: "📄",
                    color: "from-indigo-500 to-purple-600",
                  },
                  {
                    title: "Review",
                    description: "Expert document review",
                    icon: "🔍",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "Compliance",
                    description: "Regulatory compliance check",
                    icon: "✅",
                    color: "from-emerald-500 to-teal-500",
                  },
                  {
                    title: "Support",
                    description: "24/7 Legal support",
                    icon: "🛡️",
                    color: "from-amber-500 to-orange-500",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;