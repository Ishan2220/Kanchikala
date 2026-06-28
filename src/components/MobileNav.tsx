"use client";

import { Link, useLocation } from "react-router-dom";
import { Home, Grid, Phone, MapPin } from "lucide-react";
import { scrollToTop } from "@/lib/utils";

export function MobileNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FEFCF8]/95 backdrop-blur-md border-t border-[#E8E5DF] pb-safe pt-2 px-6 flex justify-between items-center sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <Link to="/" onClick={scrollToTop} className={`flex flex-col items-center gap-1 p-2 ${pathname === '/' ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
        <Home className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-wider font-medium">Home</span>
      </Link>
      
      <Link to="/collections" onClick={scrollToTop} className={`flex flex-col items-center gap-1 p-2 ${pathname.includes('/category') || pathname === '/collections' ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
        <Grid className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-wider font-medium">Shop</span>
      </Link>

      <a href="/#visit-store" onClick={scrollToTop} className={`flex flex-col items-center gap-1 p-2 text-gray-500`}>
        <MapPin className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-wider font-medium">Store</span>
      </a>
      
      <a href="/#stylist" onClick={scrollToTop} className={`flex flex-col items-center gap-1 p-2 text-gray-500`}>
        <Phone className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-wider font-medium">Contact</span>
      </a>
    </nav>
  );
}

