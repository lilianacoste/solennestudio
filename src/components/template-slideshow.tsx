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
          loading={current === 0 ? "eager" : "lazy"}
          decoding="async"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 90vw, 1280px"
          custom={direction}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 40 }),
            center: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smoothEase } },
            exit: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.4, ease: smoothEase } }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </AnimatePresence>

      <button
        data-testid={`btn-prev-${title}`}
        onClick={() => go(current - 1, -1)}
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border/40 bg-background/75 opacity-100 backdrop-blur-sm transition-opacity duration-300 hover:border-accent hover:bg-background md:h-9 md:w-9 md:opacity-0 md:group-hover/slide:opacity-100"
        aria-label="Previous image"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 2L4 7l5 5" />
        </svg>
      </button>
      <button
        data-testid={`btn-next-${title}`}
        onClick={() => go(current + 1, 1)}
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border/40 bg-background/75 opacity-100 backdrop-blur-sm transition-opacity duration-300 hover:border-accent hover:bg-background md:h-9 md:w-9 md:opacity-0 md:group-hover/slide:opacity-100"
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
            className={`min-h-4 min-w-4 rounded-full transition-all duration-400 ${i === current ? "h-1.5 w-5 bg-background" : "h-1.5 w-4 bg-background/50"}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
