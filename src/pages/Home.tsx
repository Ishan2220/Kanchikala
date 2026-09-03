import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Phone, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { useCatalog } from "@/context/CatalogContext";
import { ImageSlider } from "@/components/ImageSlider";
import { scrollToTop } from "@/lib/utils";
import { Helmet } from "react-helmet-async";

const hoverImages = [
  "/Hover/new-hover-1.webp",
  "/Hover/new-hover-2.webp",
  "/Hover/new-hover-3.webp",
  "/Hover/new-hover-4.webp",
  "/Hover/new-hover-5.webp",
  "/Hover/new-hover-6.webp",
  "/Hover/new-hover-7.webp",
  "/Hover/new-hover-8.webp",
  "/Hover/new-hover-9.webp",
  "/Hover/new-hover-10.webp",
  "/Hover/new-hover-11.webp",
  "/Hover/new-hover-12.webp",
  "/Hover/new-hover-13.webp",
  "/Hover/new-hover-14.webp",
  "/Hover/new-hover-15.webp"
];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hoverImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div 
      className="w-full md:w-[45%] h-[75svh] md:h-[85vh] relative order-1 shadow-[0_24px_60px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden group border border-[#ECE9E2]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background stacked images for smooth crossfade */}
      {hoverImages.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={src}
            alt={`Masterpiece Saree ${idx + 1}`}
            className="w-full h-full object-cover object-top transition-transform duration-[3000ms] ease-out group-hover:scale-108"
          />
          {/* Subtle luxury vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-40 group-hover:opacity-20 transition-opacity duration-700"></div>
        </div>
      ))}

      {/* Interactive Bottom Progress Indicators */}
      <div className="absolute bottom-6 inset-x-6 z-20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          {hoverImages.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-8 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                  : "w-2 bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { categories: categoriesData } = useCatalog();
  const topCategories = categoriesData.slice(0, 4);

  return (
    <>
      <Helmet>
        <title>KanchiKala - The House of Sarees | Luxury Authentic Sarees in Kolhapur</title>
        <meta name="description" content="Discover authentic handwoven luxury sarees at KanchiKala - The House of Sarees in Rajarampuri, Kolhapur. Explore Banarasi, Kanjeevaram, Paithani, Gadwal, Chanderi, and Maheshwari pure silk sarees." />
      </Helmet>
      {/* Editorial Video Hero Section */}
      <section className="relative min-h-[100svh] w-full bg-[#FEFCF8] pt-20 md:pt-28 pb-12 overflow-hidden flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
            
            {/* Left/Top: Portrait Luxury Image Carousel */}
            <HeroCarousel />

            {/* Right/Bottom: Premium Typography & Content */}
            <div className="w-full md:w-[50%] flex flex-col justify-center order-2">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="mb-8"
              >
                <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl text-[#2A2A2A] tracking-tighter leading-none mb-6">
                  Timeless<br/>
                  <span className="text-[#D4AF37] italic font-light tracking-wide pr-2">Elegance.</span>
                </h1>
                
                <div className="w-24 h-[1px] bg-[#D4AF37] mb-8"></div>
                
                <p className="font-serif text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mb-10 font-light">
                  Discover the epitome of Indian heritage. Every thread weaves a story of tradition, crafted for the modern connoisseur of luxury.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                  <Link 
                    to="/collections" 
                    onClick={scrollToTop}
                    className="bg-[#2A2A2A] text-white hover:bg-[#D4AF37] hover:-translate-y-1 hover:shadow-xl px-10 py-5 text-center uppercase tracking-widest text-xs transition-all duration-500"
                  >
                    Explore Collections
                  </Link>
                  <a 
                    href="https://wa.me/919175954455" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-transparent border border-[#2A2A2A] text-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-white hover:-translate-y-1 hover:shadow-xl px-10 py-5 text-center uppercase tracking-widest text-xs transition-all duration-500"
                  >
                    Book Appointment
                  </a>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Shop By Category - Editorial Layout */}
      <section id="categories" className="py-24 md:py-32 bg-[#FEFCF8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-widest mb-4">Curated Collections</h2>
            <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto"></div>
          </div>

          <div className="flex flex-col gap-24 md:gap-40">
            {topCategories.map((category, index) => (
              <div 
                key={category.id} 
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2 aspect-[3/4] overflow-hidden bg-gray-100 group relative">
                  <Link to={`/${category.slug}`} onClick={scrollToTop} className="relative block w-full h-full">
                    <img
                      src={category.coverImage}
                      alt={category.name}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                    />
                  </Link>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">

                  <h3 className="font-serif text-4xl md:text-5xl uppercase tracking-wider mb-6">{category.name}</h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-10 max-w-md mx-auto md:mx-0">
                    {category.description}
                  </p>
                  <Link 
                    to={`/${category.slug}`}
                    onClick={scrollToTop}
                    className="group inline-flex items-center gap-4 text-sm uppercase tracking-widest border-b border-black pb-2 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors w-fit mx-auto md:mx-0"
                  >
                    Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-32">
             <Link 
                to="/collections" 
                onClick={scrollToTop}
                className="bg-transparent border border-black hover:bg-black hover:text-white text-black px-12 py-5 uppercase tracking-widest text-sm transition-all"
              >
                View All Categories
              </Link>
          </div>
        </div>
      </section>

      {/* Heritage Section (Upgraded) */}
      <section id="heritage" className="py-24 md:py-32 bg-[#F5F5F0] relative overflow-hidden">
        {/* Subtle Kolhapur Arch Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2A2A2A 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-5/12">
              <span className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] font-medium mb-4 block">Our Story</span>
              <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-widest mb-8 leading-tight">From The Heart of Kolhapur</h2>
              <div className="w-12 h-[1px] bg-black mb-8"></div>
              <p className="text-gray-600 font-light leading-relaxed mb-6 text-lg">
                Rooted in the royal city of Kolhapur, KanchiKala Sarees brings together the most exquisite handloom sarees from every corner of India under one roof.
              </p>
              <p className="text-gray-600 font-light leading-relaxed text-lg">
                From Banarasi silks of the North to Kanjeevarams of the South, we curate India's finest artisanal heritage so you can experience the nation's diverse weaving traditions in a single destination.
              </p>
            </div>
            <div className="w-full md:w-7/12 relative aspect-[4/5] shadow-2xl overflow-hidden group">
              <ImageSlider 
                images={[
                  "/images/heritage/mahalaxmi-temple-kolhapur.webp",
                  "/images/heritage/bhavani-mandap-kolhapur.webp",
                  "/images/heritage/new-palace-museum-kolhapur.webp",
                  "/images/heritage/rankala-lake-shalini-palace.webp",
                  "/images/heritage/panhala-fort-kolhapur.webp",
                  "/images/heritage/jyotiba-temple-kolhapur.webp",
                  "/images/heritage/sahyadri-monsoon-gaur-kolhapur.webp"
                ]} 
                interval={3000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Stylist */}
      <section id="stylist" className="py-24 md:py-32 bg-[#1A1A1A] text-white text-center relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <span className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] font-medium mb-6 block">Personal Concierge</span>
          <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-widest mb-8">Contact Our Stylist</h2>
          <p className="text-gray-400 font-light leading-relaxed mb-12 text-lg">
            Experience our premium concierge service. Schedule a video product preview, request styling assistance, or inquire about custom draping and bridal trousseau planning.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <a href="tel:+919623446066" className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white px-10 py-4 uppercase tracking-widest text-sm transition-colors">
              Call Now
             </a>
             <a href="https://wa.me/919175954455" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white hover:bg-[#20bd5a] px-10 py-4 uppercase tracking-widest text-sm transition-colors">
              Chat on WhatsApp
             </a>
          </div>
        </div>
      </section>

      {/* Store Location */}
      <section id="visit-store" className="py-24 md:py-32 bg-[#FEFCF8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative aspect-square md:aspect-[4/5] shadow-xl">
               <img
                src="/images/interior-wall.webp"
                alt="KanchiKala Boutique Interior"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] font-medium mb-4 block">Experience Luxury</span>
              <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-widest mb-10">Visit Our Boutique</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-serif text-xl tracking-wider uppercase mb-2">Location</h4>
                    <p className="text-gray-600 font-light leading-relaxed">
                      KanchiKala Sarees<br/>
                      7th Lane, Rajarampuri<br/>
                      Kolhapur, Maharashtra<br/>
                      India - 416008
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-serif text-xl tracking-wider uppercase mb-2">Business Hours</h4>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Monday - Saturday<br/>
                      10:30 AM - 8:30 PM<br/>
                      Sunday: By Appointment Only
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-serif text-xl tracking-wider uppercase mb-2">Contact</h4>
                    <p className="text-gray-600 font-light leading-relaxed">
                      +91 96234 46066<br/>
                      +91 91759 54455
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4">
                  <a 
                    href="https://maps.app.goo.gl/UXqErpFKTcRCYjLu6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#2A2A2A] text-white hover:bg-[#D4AF37] px-8 py-4 uppercase tracking-widest text-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group"
                  >
                    <span>Get Directions</span>
                    <Navigation className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
