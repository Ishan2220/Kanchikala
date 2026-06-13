import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#E8E5DF] pt-24 pb-24 md:pb-12 relative overflow-hidden">
      {/* Subtle Gold Dust Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Section */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link to="/" className="inline-block mb-8">
              <img 
                src="/images/logo.webp" 
                alt="KanchiKala" 
                className="h-20 sm:h-24 w-auto object-contain transition-opacity hover:opacity-80"
              />
            </Link>
            <p className="text-gray-400 text-sm sm:text-base leading-loose max-w-md font-light mb-8">
              A timeless curation of authentic handloom weaves, bringing the royal heritage of Indian craftsmanship to discerning women worldwide.
            </p>
            <div className="flex gap-6">
               <a href="https://instagram.com/kanchikala.in" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
               </a>
               <a href="https://facebook.com/kanchikala" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
               </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center sm:text-left">
            <div>
              <h4 className="font-serif text-sm tracking-[0.2em] uppercase mb-8 text-[#D4AF37]">Collections</h4>
              <ul className="space-y-5 text-sm font-light text-gray-400">
                <li><Link to="/banarasi-sarees" className="hover:text-[#D4AF37] transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-[#D4AF37] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Banarasi</Link></li>
                <li><Link to="/kanjeevaram-sarees" className="hover:text-[#D4AF37] transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-[#D4AF37] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Kanjeevaram</Link></li>
                <li><Link to="/paithani-sarees" className="hover:text-[#D4AF37] transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-[#D4AF37] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Paithani</Link></li>
                <li><Link to="/pochampally-ikkat" className="hover:text-[#D4AF37] transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-[#D4AF37] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Pochampally</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm tracking-[0.2em] uppercase mb-8 text-[#D4AF37]">Boutique</h4>
              <ul className="space-y-5 text-sm font-light text-gray-400">
                <li><a href="/#heritage" className="hover:text-[#D4AF37] transition-colors">Our Heritage</a></li>
                <li><a href="/#visit-store" className="hover:text-[#D4AF37] transition-colors">Store Location</a></li>
                <li><a href="/#stylist" className="hover:text-[#D4AF37] transition-colors">Personal Stylist</a></li>
                <li><Link to="#" className="hover:text-[#D4AF37] transition-colors">Book Appointment</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm tracking-[0.2em] uppercase mb-8 text-[#D4AF37]">Concierge</h4>
              <ul className="space-y-5 text-sm font-light text-gray-400">
                <li className="flex items-start justify-center sm:justify-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={1} />
                  <span className="leading-relaxed">Kolhapur, Maharashtra<br/>India - 416001</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" strokeWidth={1} />
                  <a href="tel:+919623446066" className="hover:text-[#D4AF37] transition-colors">+91 96234 46066</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] uppercase tracking-[0.2em] font-light text-gray-500">
          <p>© {new Date().getFullYear()} KanchiKala Sarees. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
