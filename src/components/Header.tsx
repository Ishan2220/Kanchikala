"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";

export function Header() {

  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  


  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Scroll tracking for hide/show navbar

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

  // Clear search query slightly after closing to hide the transition
  useEffect(() => {
    if (!searchOpen) {
      const timer = setTimeout(() => setSearchQuery(""), 300);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  // Derived search results
  const searchResults = searchQuery.trim() === "" ? { categories: [], products: [] } : {
    categories: categoriesData.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())),
    products: productsData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.fabric.toLowerCase().includes(searchQuery.toLowerCase()))
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } bg-[#FEFCF8] border-b border-[#E8E5DF] py-4 shadow-sm`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Hamburger Menu (Mobile & Desktop) */}
            <div className="flex-1 flex justify-start">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 transition-colors duration-300 text-black hover:text-[#D4AF37]"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Center: Logo */}
            <Link to="/" className="flex-1 flex justify-center items-center group py-2">
              <img 
                src="/images/logo.webp" 
                alt="KanchiKala" 
                className="h-14 sm:h-16 md:h-24 lg:h-32 w-auto object-contain scale-150 sm:scale-100 origin-center transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            {/* Right: Search */}
            <div className="flex-1 flex justify-end">
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 transition-colors duration-300 text-black hover:text-[#D4AF37]"
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
                  src="/images/logo.webp" 
                  alt="KanchiKala" 
                  className="h-10 w-auto object-contain scale-150 origin-left sm:scale-100"
                />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-black hover:text-[#D4AF37] transition-colors"
                >
                  <X className="w-7 h-7" strokeWidth={1.5} />
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
                <p className="text-sm font-serif text-[#2A2A2A] mb-1">+91 96234 46066</p>
                <p className="text-sm font-serif text-[#2A2A2A]">hello@kanchikala.in</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-[#FEFCF8]/95 backdrop-blur-md flex flex-col"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex-1 flex flex-col max-w-5xl">
              {/* Search Header */}
              <div className="flex items-center justify-between border-b border-gray-300 pb-4 md:pb-6">
                <Search className="w-6 h-6 md:w-8 md:h-8 text-gray-400 shrink-0" strokeWidth={1.5} />
                <input 
                  type="text"
                  placeholder="Search for Banarasi, Kanjeevaram, Silk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none px-4 md:px-8 text-xl md:text-4xl font-serif text-[#2A2A2A] placeholder:text-gray-300"
                  autoFocus
                />
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-black hover:text-[#D4AF37] transition-colors shrink-0"
                >
                  <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
                </button>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto py-8 md:py-12 no-scrollbar">
                {searchQuery.trim() !== "" && searchResults.categories.length === 0 && searchResults.products.length === 0 && (
                  <div className="text-center text-gray-500 mt-12 md:mt-20 font-light text-lg">
                    No results found for "{searchQuery}"
                  </div>
                )}

                {(searchResults.categories.length > 0 || searchResults.products.length > 0) && (
                  <div className="flex flex-col gap-12 md:gap-16">
                    
                    {searchResults.categories.length > 0 && (
                      <div>
                        <h4 className="text-xs md:text-sm uppercase tracking-widest text-[#D4AF37] mb-6 md:mb-8 font-medium">Collections</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
                          {searchResults.categories.slice(0, 4).map(category => (
                            <Link 
                              key={category.id} 
                              to={`/${category.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="group block"
                            >
                              <div className="aspect-[4/5] overflow-hidden mb-4 bg-gray-100 shadow-sm">
                                <img src={category.coverImage} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              </div>
                              <p className="font-serif text-sm md:text-base group-hover:text-[#D4AF37] transition-colors line-clamp-1">{category.name}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.products.length > 0 && (
                      <div>
                        <h4 className="text-xs md:text-sm uppercase tracking-widest text-[#D4AF37] mb-6 md:mb-8 font-medium">Products</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                          {searchResults.products.slice(0, 6).map(product => (
                            <Link 
                              key={product.id} 
                              to={`/product/${product.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="group flex gap-5 items-center"
                            >
                              <div className="w-20 h-28 md:w-24 md:h-32 shrink-0 overflow-hidden bg-gray-100 shadow-sm">
                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div>
                                <p className="font-serif text-[#2A2A2A] text-base md:text-lg group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">{product.name}</p>
                                <p className="text-[10px] md:text-xs text-gray-500 mt-2 md:mt-3 uppercase tracking-wider">{product.fabric}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
