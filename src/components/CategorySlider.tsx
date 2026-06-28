import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToTop } from "@/lib/utils";

interface CategorySliderProps {
  slug: string;
  images: string[];
  name: string;
  priority?: boolean;
}

export function CategorySlider({ slug, images, name, priority = false }: CategorySliderProps) {
  const [hoverIndex, setHoverIndex] = useState(0);

  const handleMouseEnter = () => {
    if (images.length > 1) {
      setHoverIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(0);
  };

  // For mobile, we can support simple touch sliding
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && hoverIndex < images.length - 1) {
      setHoverIndex(prev => prev + 1);
    } else if (isRightSwipe && hoverIndex > 0) {
      setHoverIndex(prev => prev - 1);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div 
      className="w-full h-full relative group overflow-hidden shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Link to={`/${slug}`} onClick={scrollToTop} className="block w-full h-full relative bg-gray-100">
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
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading={priority && index === 0 ? "eager" : "lazy"}
                />
              );
            }
            return null;
          })}
        </AnimatePresence>
      </Link>
      
      {/* Swipe Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
          {images.map((_, idx) => (
            <button 
              key={idx} 
              onClick={(e) => {
                e.preventDefault();
                setHoverIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === hoverIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
