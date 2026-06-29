import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { useCatalog } from "@/context/CatalogContext";
import { scrollToTop } from "@/lib/utils";

export default function Collections() {
  const { categories: categoriesData } = useCatalog();
  return (
    <div className="pt-32 pb-32 bg-[#FEFCF8] min-h-screen relative overflow-hidden">
      {/* Subtle Premium Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <Helmet>
        <title>Collections | KanchiKala - The House of Sarees</title>
        <meta name="description" content="Explore our luxurious collections of Banarasi, Kanjeevaram, Paithani, Gadwal, Chanderi, and Maheshwari pure silk sarees." />
      </Helmet>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-24">
          <span className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] font-medium mb-4 block">Our Masterpieces</span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl uppercase tracking-widest mb-6 break-words">Collections</h1>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-gray-600 font-light leading-relaxed max-w-2xl mx-auto text-lg">
            A curation of India's finest handloom artistry. Every collection tells a story of royal heritage, meticulous craftsmanship, and timeless elegance.
          </p>
        </div>

        {/* Categories Magazine Layout */}
        <div className="flex flex-col gap-32">
          {categoriesData.map((category, index) => (
            <div 
              key={category.id} 
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 aspect-[3/4] overflow-hidden group relative">
                <Link to={`/${category.slug}`} onClick={scrollToTop} className="relative block w-full h-full cursor-pointer">
                  <img 
                    src={category.coverImage} 
                    alt={category.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                  />
                </Link>
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-wider mb-6">{category.name}</h2>
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
        
      </div>
    </div>
  );
}
