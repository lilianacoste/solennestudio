import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

type NavLink = {
  label: string;
  href: string;
};

type SiteNavProps = {
  brand?: string;
  ctaHref?: string;
  ctaLabel?: string;
  mobileCtaLabel?: string;
  links?: NavLink[];
  dark?: boolean;
  blend?: boolean;
};

function NavAnchor({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href}>
      <span className={className} onClick={onClick}>
        {children}
      </span>
    </Link>
  );
}

export function SiteNav({
  brand = "solennestudios",
  ctaHref = "/#inquiry",
  ctaLabel = "Start Your Project",
  mobileCtaLabel = "Inquire",
  links = [],
  dark = false,
  blend = false,
}: SiteNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const textClass = dark || blend ? "text-white" : "text-foreground";
  const panelClass = dark ? "border-white/10 bg-[#070707]/94 text-white" : "border-border/60 bg-background/94 text-foreground";
  const menuCtaClass = dark ? "bg-white text-[#070707] hover:bg-accent hover:text-foreground" : "bg-foreground text-background hover:bg-accent hover:text-foreground";
  const linkClass = "inline-flex min-h-11 items-center text-xs uppercase tracking-widest transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <>
      <nav
        className={`fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:py-6 ${textClass} ${
          blend ? "mix-blend-difference" : dark ? "border-b border-white/10 bg-[#070707]/80 backdrop-blur-sm" : "border-b border-border/30 bg-background/80 backdrop-blur-sm"
        }`}
      >
        <NavAnchor href="/" className="min-w-0 cursor-pointer truncate font-serif text-[15px] italic uppercase tracking-[0.22em] transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-xl">
          {brand}
        </NavAnchor>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavAnchor key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </NavAnchor>
          ))}
          {ctaLabel && (
            <NavAnchor href={ctaHref} className={linkClass}>
              {ctaLabel}
            </NavAnchor>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {ctaLabel && (
            <NavAnchor
              href={ctaHref}
              className="inline-flex min-h-11 items-center border border-current/25 px-3 text-[10px] uppercase tracking-widest transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {mobileCtaLabel}
            </NavAnchor>
          )}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-current/25 transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/35 p-4 pt-20 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              id="mobile-navigation"
              className={`mx-auto max-h-[calc(100dvh-6rem)] max-w-md overflow-y-auto border p-5 shadow-xl ${panelClass}`}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="truncate font-serif text-base italic uppercase tracking-[0.2em]">{brand}</span>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center border border-current/20 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2 text-xs uppercase tracking-widest">
                {links.map((link) => (
                  <NavAnchor
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-12 items-center border-b border-current/10 py-3 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {link.label}
                  </NavAnchor>
                ))}
                {ctaLabel && (
                  <NavAnchor
                    href={ctaHref}
                    onClick={() => setIsOpen(false)}
                    className={`mt-3 flex min-h-12 items-center justify-center px-5 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${menuCtaClass}`}
                  >
                    {ctaLabel}
                  </NavAnchor>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
