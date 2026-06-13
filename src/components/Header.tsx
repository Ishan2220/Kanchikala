"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSolid = scrolled || !isHome;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isSolid 
            ? "bg-[#FEFCF8] border-b border-[#E8E5DF] py-4 shadow-sm" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Hamburger Menu (Mobile & Desktop) */}
            <div className="flex-1 flex justify-start">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2 transition-colors duration-300 ${isSolid ? 'text-black hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Center: Logo */}
            <Link to="/" className="flex-1 flex justify-center items-center group py-2">
              <img 
                src="/images/logo-couture.png" 
                alt="KanchiKala" 
                className="h-14 sm:h-16 md:h-24 lg:h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Right: Search */}
            <div className="flex-1 flex justify-end">
              <button 
                className={`p-2 transition-colors duration-300 ${isSolid ? 'text-black hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[85vw] sm:w-[400px] bg-[#FEFCF8] z-[70] flex flex-col shadow-2xl"
            >
              <div className="p-8 flex justify-between items-center border-b border-[#E8E5DF] bg-[#2C0F18]">
                <img 
                  src="/images/logo-couture.png" 
                  alt="KanchiKala" 
                  className="h-10 w-auto object-contain brightness-0 invert"
                  style={{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(330deg) saturate(3) brightness(1.2)' }}
                />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-[#E7D6B6] transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-12 px-8 flex flex-col gap-8">
                <Link onClick={() => setMobileMenuOpen(false)} to="/" className="text-2xl tracking-widest uppercase font-serif hover:text-[#D4AF37] transition-colors">Home</Link>
                <Link onClick={() => setMobileMenuOpen(false)} to="/collections" className="text-2xl tracking-widest uppercase font-serif hover:text-[#D4AF37] transition-colors">Collections</Link>
                <a onClick={() => setMobileMenuOpen(false)} href="/#heritage" className="text-2xl tracking-widest uppercase font-serif hover:text-[#D4AF37] transition-colors">Our Story</a>
                <a onClick={() => setMobileMenuOpen(false)} href="/#visit-store" className="text-2xl tracking-widest uppercase font-serif hover:text-[#D4AF37] transition-colors">Visit Store</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
