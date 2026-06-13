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
                src="/images/logo-couture.webp" 
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
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[85vw] sm:w-[450px] bg-[#FEFCF8] z-[70] flex flex-col shadow-[20px_0_40px_rgba(0,0,0,0.1)]"
            >
              <div className="p-8 flex justify-between items-center bg-[#FEFCF8]">
                <img 
                  src="/images/logo-couture.webp" 
                  alt="KanchiKala" 
                  className="h-10 w-auto object-contain"
                />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-black hover:text-[#D4AF37] transition-colors"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-8 px-10 flex flex-col justify-center gap-10">
                <Link onClick={() => setMobileMenuOpen(false)} to="/" className="group flex items-center gap-4">
                  <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">01</span>
                  <span className="text-3xl sm:text-4xl tracking-widest uppercase font-serif text-[#2A2A2A] group-hover:text-[#D4AF37] transition-colors">Home</span>
                </Link>
                <Link onClick={() => setMobileMenuOpen(false)} to="/collections" className="group flex items-center gap-4">
                  <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">02</span>
                  <span className="text-3xl sm:text-4xl tracking-widest uppercase font-serif text-[#2A2A2A] group-hover:text-[#D4AF37] transition-colors">Collections</span>
                </Link>
                <a onClick={() => setMobileMenuOpen(false)} href="/#heritage" className="group flex items-center gap-4">
                  <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">03</span>
                  <span className="text-3xl sm:text-4xl tracking-widest uppercase font-serif text-[#2A2A2A] group-hover:text-[#D4AF37] transition-colors">Our Story</span>
                </a>
                <a onClick={() => setMobileMenuOpen(false)} href="/#visit-store" className="group flex items-center gap-4">
                  <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">04</span>
                  <span className="text-3xl sm:text-4xl tracking-widest uppercase font-serif text-[#2A2A2A] group-hover:text-[#D4AF37] transition-colors">Visit Store</span>
                </a>
              </div>
              <div className="p-10 border-t border-[#E8E5DF] bg-[#F5F5F0]">
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">Contact Us</p>
                <p className="text-sm font-serif text-[#2A2A2A] mb-1">+91 98765 43210</p>
                <p className="text-sm font-serif text-[#2A2A2A]">hello@kanchikala.com</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
