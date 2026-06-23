import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Phone, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import categoriesData from "@/data/categories.json";
import { ImageSlider } from "@/components/ImageSlider";

export default function Home() {
  const topCategories = categoriesData.slice(0, 4);

  return (
    <>
      {/* Editorial Video Hero Section */}
      <section className="relative min-h-[100svh] w-full bg-[#FEFCF8] pt-20 md:pt-28 pb-12 overflow-hidden flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
            
            {/* Left/Top: Portrait Video */}
            <div className="w-full md:w-[45%] h-[75svh] md:h-[85vh] relative order-1 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden group">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full relative"
              >
                <div className="absolute inset-0 bg-[#E8E5DF] animate-pulse"></div>
                {/* Note: Upload your video to public/videos/hero-video.mp4 */}
                <video
                  src="/videos/hero-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center absolute inset-0 z-10 transition-transform duration-1000 group-hover:scale-105"
                  poster="/images/model.webp"
                />
                <div className="absolute inset-0 bg-black/10 z-20 transition-opacity duration-700 group-hover:bg-black/0"></div>
                
                {/* Overlay Premium Play effect (Visual only) */}
                <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="w-20 h-20 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </div>
                </div>
              </motion.div>
            </div>

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

              {/* Floating Stats / Trust badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                className="mt-12 pt-10 border-t border-[#E8E5DF] grid grid-cols-3 gap-6"
              >
                <div className="group cursor-default">
                  <p className="text-3xl font-serif text-[#D4AF37] mb-1 transition-transform duration-500 group-hover:-translate-y-1">50+</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-[#2A2A2A] transition-colors duration-300">Master Weavers</p>
                </div>
                <div className="group cursor-default">
                  <p className="text-3xl font-serif text-[#D4AF37] mb-1 transition-transform duration-500 group-hover:-translate-y-1">100%</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-[#2A2A2A] transition-colors duration-300">Pure Silk</p>
                </div>
                <div className="group cursor-default">
                  <p className="text-3xl font-serif text-[#D4AF37] mb-1 transition-transform duration-500 group-hover:-translate-y-1">Authentic</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-[#2A2A2A] transition-colors duration-300">Heritage</p>
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
                  <Link to={`/${category.slug}`} className="relative block w-full h-full">
                    <img
                      src={category.coverImage}
                      alt={category.name}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
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
