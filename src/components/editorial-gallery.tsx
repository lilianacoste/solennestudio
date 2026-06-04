import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type EditorialGalleryImage = {
  src: string;
  title: string;
  category: string;
  span?: string;
};

export function EditorialGallery({
  images,
  testIdPrefix,
}: {
  images: EditorialGalleryImage[];
  testIdPrefix: string;
}) {
  const [selectedImage, setSelectedImage] = useState<EditorialGalleryImage | null>(null);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[320px] md:gap-y-12">
        {images.map((image, i) => (
          (() => {
            const imageHeight = image.span?.includes("row-span-2") ? "h-[320px] md:h-[592px]" : "h-[250px]";

            return (
          <motion.figure
            key={image.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: Math.min(i * 0.035, 0.35) } }}
            viewport={{ once: true, margin: "-80px" }}
            className={`group ${image.span ?? ""}`}
            data-testid={`${testIdPrefix}-${i}`}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(image)}
              className="block w-full text-left transition-all duration-500 hover:-translate-y-1"
              aria-label={`View ${image.title} larger`}
            >
              <div className={`${imageHeight} overflow-hidden rounded-md border border-black/5 bg-[#f7f3ee] shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-shadow duration-500 group-hover:shadow-[0_18px_44px_rgba(0,0,0,0.08)]`}>
                <img
                  src={image.src}
                  alt={`${image.title} screenshot`}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 33vw"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="px-1 pt-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/30">{image.category}</p>
                <h3 className="mt-2 text-[13px] uppercase tracking-[0.25em] text-[#8f7c67]">{image.title}</h3>
                <p className="mt-1 text-sm text-foreground/45">Click to view larger</p>
              </div>
            </button>
          </motion.figure>
            );
          })()
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={`${selectedImage.title} enlarged screenshot`}
                className="max-h-[72dvh] w-full rounded-md object-contain sm:max-h-[82vh]"
              />

              <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">{selectedImage.category}</p>
                  <h2 className="font-serif text-2xl italic text-white">{selectedImage.title}</h2>
                </div>

                <button
                  type="button"
                  className="min-h-11 border border-white/15 px-4 text-sm uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  onClick={() => setSelectedImage(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
