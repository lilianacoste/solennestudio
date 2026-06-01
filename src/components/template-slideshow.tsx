import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export function TemplateSlideshow({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number, dir: number) => {
    setDirection(dir);
    setCurrent((next + images.length) % images.length);
  };

  return (
    <div className="overflow-hidden bg-muted relative group/slide w-full h-full">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} ${current + 1}`}
          custom={direction}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 40 }),
            center: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smoothEase } },
            exit: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.4, ease: smoothEase } }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </AnimatePresence>

      <button
        data-testid={`btn-prev-${title}`}
        onClick={() => go(current - 1, -1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border/40 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 hover:bg-background hover:border-accent"
        aria-label="Previous image"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 2L4 7l5 5" />
        </svg>
      </button>
      <button
        data-testid={`btn-next-${title}`}
        onClick={() => go(current + 1, 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border/40 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 hover:bg-background hover:border-accent"
        aria-label="Next image"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 2l5 5-5 5" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            data-testid={`dot-${title}-${i}`}
            onClick={() => go(i, i > current ? 1 : -1)}
            className={`rounded-full transition-all duration-400 ${i === current ? "w-4 h-1.5 bg-background" : "w-1.5 h-1.5 bg-background/50"}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
