import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SareeCardSliderProps {
  productSlug: string;
  images: string[];
  name: string;
  fabric: string;
}

export function SareeCardSlider({ productSlug, images, name, fabric }: SareeCardSliderProps) {
  const [hoverIndex, setHoverIndex] = useState(0);

  // Desktop hover interactions
  const handleMouseEnter = () => {
    // Reveal second image on hover if it exists
    if (images.length > 1) {
      setHoverIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(0);
  };

  return (
    <div 
      className="flex flex-col group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Slider Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
        <Link to={`/product/${productSlug}`} className="block w-full h-full relative">
          <AnimatePresence initial={false}>
            {images.map((imgSrc, index) => {
              if (index === hoverIndex) {
                return (
                  <motion.img
                    key={index}
                    src={imgSrc}
                    alt={`${name} - View ${index + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                );
              }
              return null;
            })}
          </AnimatePresence>
        </Link>
        
        {/* Mobile Swipe Indicators (dots) */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full ${idx === hoverIndex ? 'bg-white' : 'bg-white/40'}`} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col text-center">
        <Link to={`/product/${productSlug}`} className="group-hover:text-[#D4AF37] transition-colors">
          <h3 className="font-serif text-xl md:text-2xl uppercase tracking-widest mb-2">{name}</h3>
        </Link>
        <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">{fabric}</p>
      </div>
    </div>
  );
}
