/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import AuthModal from "./Auth/AuthModal";



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShow(false); // scrolling neche
      } else {
        setShow(true); // scrolling upar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", label: "" ,link:"/"},
    { name: "Company", label: "timeline",link:"/company" },
    { name: "Contact Us", label: "speakers",link:"/contact" },
    
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const handleScrollTo = (item) => {
    setActiveItem(item.name);

    if (item.name === "Home") {
      // Navigate to root path for Home
      window.location.href = "/";
    } else if (item.label === "") {
      // Scroll to top for other items without a label
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  console.log(isMenuOpen);
  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="relative w-full max-w-7xl mx-auto bg-black/30 backdrop-blur-xl border border-blue-400/20 rounded-2xl px-3 sm:px-4 md:px-6 lg:px-8 shadow-2xl shadow-black/20">
        {/* Top-left border accent */}
        <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l-2 border-t-2 border-blue-400/60 rounded-tl-2xl opacity-50 transition-all duration-300"></div>
        {/* Bottom-right border accent */}
        <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r-2 border-b-2 border-blue-400/60 rounded-br-2xl opacity-50 transition-all duration-300"></div>

        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 w-full">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleScrollTo({ name: "Home", label: "" })}
          >
            
            <span className="text-white font-bold text-base sm:text-lg lg:text-xl tracking-wide">
              Legal Draft
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.name === "Home" || item.label === "" ? (
                  <motion.button
                    onClick={() => handleScrollTo(item)}
                    className="relative px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    {activeItem === item.name && (
                      <motion.div
                        layoutId="activeTab"
                        
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                ) : (
                  <Link
                    to={item.label}
                    spy={true}
                    smooth={true}
                    duration={800}
                    offset={-100}
                    className="block"
                    onClick={() => setActiveItem(item.name)}
                  >
                    <motion.div
                      className="relative px-4 py-2 text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white cursor-pointer group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      {activeItem === item.name && (
                        <motion.div
                          layoutId="activeTab"
                          
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Login Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgba(96, 165, 250, 0.6)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-blue-400 transition-all duration-300 group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="relative">
                Log in
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </motion.button>
            
            {/* Sign Up Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 20px -5px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setAuthMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="relative px-6 py-2.5 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-full transition-all duration-300 shadow-lg group overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <span className="relative z-10">Sign up free</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-10">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-full hover:bg-white/10 focus:outline-none focus:bg-white/10"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden pb-4 px-4"
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <div key={item.name} className="w-full">
                    {item.name === "Home" || item.label === "" ? (
                      <motion.button
                        onClick={() => {
                          handleScrollTo(item);
                          setIsMenuOpen(false);
                        }}
                        variants={menuItemVariants}
                        className={`w-full text-left px-4 py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 ${
                          activeItem === item.name
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.name}
                      </motion.button>
                    ) : (
                      <Link
                        to={item.label}
                        spy={true}
                        smooth={true}
                        duration={800}
                        offset={-100}
                        className="block"
                        onClick={() => {
                          setActiveItem(item.name);
                          setIsMenuOpen(false);
                        }}
                      >
                        <motion.div
                          variants={menuItemVariants}
                          className={`px-4 py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 ${
                            activeItem === item.name
                              ? "text-white bg-white/10"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-3 space-y-3 border-t border-white/10">
                  <motion.button
                    onClick={() => {
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    variants={menuItemVariants}
                    className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base text-white font-semibold rounded-lg transition-all duration-200 bg-white/5 hover:bg-white/10 border border-white/10"
                  >
                    Log in
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setAuthMode('signup');
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    variants={menuItemVariants}
                    className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#f37516] to-[#f9a826] hover:from-[#f9a826] hover:to-[#f37516] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg"
                  >
                    Sign up free
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />
    </motion.nav>
  );
};

export default Navbar;