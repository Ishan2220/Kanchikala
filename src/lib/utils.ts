import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToTop() {
  if ((window as any).lenis) {
    (window as any).lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
}

