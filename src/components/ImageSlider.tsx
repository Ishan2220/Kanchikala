import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SliderImage = string | { src: string; label?: string };

interface ImageSliderProps {
  images: SliderImage[];
  interval?: number;
  className?: string;
  hoverToPlay?: boolean;
}

export function ImageSlider({ images, interval = 2000, className = "", hoverToPlay = false }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    if (hoverToPlay && !isHovered) {
      setCurrentIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval, hoverToPlay, isHovered]);

  if (!images || images.length === 0) return null;

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="sync">
        {images.map((item, index) => {
          const isObject = typeof item === 'object';
          const src = isObject ? item.src : item;
          const label = isObject ? item.label : undefined;

          return index === currentIndex && (
            <motion.div
              key={src}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img
                src={src}
                alt={label || "Slider Image"}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {label && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <h3 className="font-serif text-3xl md:text-5xl text-[#E7D6B6] uppercase tracking-[0.2em] text-center px-4 drop-shadow-2xl opacity-90">
                    {label}
                  </h3>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
