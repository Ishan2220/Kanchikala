import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/images/logo-couture.webp" 
                alt="KanchiKala" 
                className="h-16 w-auto object-contain brightness-0 invert transition-transform hover:scale-105"
                style={{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(330deg) saturate(3) brightness(1.2)' }}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
              Handcrafted luxury sarees from the heart of Kolhapur. We bridge the gap between India's finest weavers and discerning women who appreciate authentic handloom artistry.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg tracking-wider uppercase mb-6 text-[#D4AF37]">Collections</h4>
            <ul className="space-y-4 text-sm font-light text-gray-300">
              <li><Link to="/banarasi-sarees" className="hover:text-white transition-colors">Banarasi</Link></li>
              <li><Link to="/kanjeevaram-sarees" className="hover:text-white transition-colors">Kanjeevaram</Link></li>
              <li><Link to="/paithani-sarees" className="hover:text-white transition-colors">Paithani</Link></li>
              <li><Link to="/pochampally-ikkat" className="hover:text-white transition-colors">Pochampally Ikkat</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg tracking-wider uppercase mb-6 text-[#D4AF37]">Information</h4>
            <ul className="space-y-4 text-sm font-light text-gray-300">
              <li><a href="/#heritage" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="/#visit-store" className="hover:text-white transition-colors">Boutique Location</a></li>
              <li><a href="/#stylist" className="hover:text-white transition-colors">Contact Stylist</a></li>
              <li><Link to="#" className="hover:text-white transition-colors">Business Hours</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg tracking-wider uppercase mb-6 text-[#D4AF37]">Get In Touch</h4>
            <ul className="space-y-4 text-sm font-light text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Kolhapur, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
                <a href="tel:+919623446066" className="hover:text-white transition-colors">+91 96234 46066</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <a href="https://instagram.com/kanchikala.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@kanchikala.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-gray-500">
          <p>© {new Date().getFullYear()} KanchiKala Sarees. All rights reserved.</p>
          <p>Crafted with elegance in Kolhapur</p>
        </div>
      </div>
    </footer>
  );
}
