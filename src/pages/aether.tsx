import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { EditorialGallery } from "@/components/editorial-gallery";
import { TemplateSlideshow } from "@/components/template-slideshow";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } }
};

const IMAGES = ["/Aether/homepage.png", "/Aether/liveoperations.png", "/Aether/map.png"];

const GALLERY_IMAGES = [
  { src: "/Aether/homepage.png", title: "Infrastructure Landing", category: "Hero System", span: "md:col-span-2 md:row-span-2" },
  { src: "/Aether/homepage2.png", title: "Platform Status Entry", category: "Onboarding" },
  { src: "/Aether/operations.png", title: "Live Operations Feed", category: "Operations" },
  { src: "/Aether/operations2.png", title: "Operational Event Stream", category: "Operations", span: "md:col-span-2" },
  { src: "/Aether/liveoperations.png", title: "Dashboard Intelligence", category: "Monitoring", span: "md:col-span-2" },
  { src: "/Aether/map.png", title: "Global Infrastructure Map", category: "Network" },
  { src: "/Aether/AI.png", title: "Ambient Intelligence Panel", category: "AI Analysis" },
  { src: "/Aether/details.png", title: "Feature Grid System", category: "Product Detail", span: "md:col-span-2" },
];

const PACKAGES = [
  {
    label: "Creative Startup Experience",
    name: "Aether",
    price: "$180",
    desc: "A cinematic startup and technology website designed to feel intelligent, immersive, and operationally alive. Built for AI startups, SaaS platforms, creative agencies, and modern digital products.",
    features: ["Fully Responsive Premium Design", "Cinematic Motion System", "Interactive Live Operations Visuals", "Animated Dashboards & Infrastructure UI", "Smooth Scroll Storytelling", "Luxury Dark-Mode Interface Styling", "Mobile Optimization", "Launch-Ready Deployment"],
    dark: false,
  },
  {
    label: "Premium Startup Package",
    name: "Aether Intelligence Suite",
    price: "$350+",
    desc: "An advanced interactive experience for modern AI companies, agencies, and technology brands that want their platform to feel like a living system rather than a standard marketing site.",
    features: ["Everything in Aether", "Fully Custom Interface Architecture", "Interactive Operational Dashboards", "Real-Time Style Activity Feeds", "Animated Global System Maps", "Ambient Intelligence Panels", "Cinematic Onboarding Flows", "Investor/Demo Presentation Mode", "Custom Branding Integration", "Priority Revisions & Support"],
    dark: true,
  },
];

const ADDONS = [
  ["Live Operations Dashboard", "+$80", "Interactive operational overview with live activity feeds, system metrics, and animated monitoring panels."],
  ["Global Infrastructure Map", "+$60", "Animated worldwide synchronization map with live routing visuals and region activity indicators."],
  ["Ambient Intelligence Panels", "+$45", "Floating AI-style analysis cards with adaptive motion and contextual system insights."],
  ["Interactive Product Showcase", "+$50", "Cinematic product walkthrough sections with layered transitions and immersive storytelling."],
  ["Founder / Team Experience", "+$35", "Elegant founder profiles, company philosophy sections, and animated team storytelling layouts."],
  ["Investor Presentation Mode", "+$75", "Dedicated demo flow designed specifically for pitches, presentations, and cinematic walkthrough videos."],
  ["Custom Motion System", "+$90+", "Highly customized animation architecture with floating UI, layered transitions, glow systems, and ambient movement."],
  ["Full Brand Identity Integration", "+$40", "Typography systems, color direction, visual consistency, and luxury UI refinement tailored to the brand."],
];

function AddonCard({ addon }: { addon: typeof ADDONS[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      data-testid={`addon-card-${addon[0]}`}
      className="bg-white/[0.03] border border-white/10 hover:border-accent/60 transition-colors duration-500 rounded-none shadow-none cursor-pointer text-white"
      onClick={() => setOpen((value) => !value)}
    >
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-serif italic">{addon[0]}</h4>
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            <span className="text-xs tracking-widest uppercase text-accent">{addon[1]}</span>
            <span className={`text-white/40 text-xs transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▾</span>
          </div>
        </div>
        <p className="text-sm text-white/55 font-light">{addon[2]}</p>
        <AnimatePresence>
          {open && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto", transition: { duration: 0.4, ease: smoothEase } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
              className="mt-5 overflow-hidden text-xs uppercase tracking-[0.25em] text-white/35"
            >
              Designed for premium startup presentations and launch-ready product storytelling.
            </motion.p>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export default function AetherPage() {
  return (
    <div className="min-h-screen bg-[#070707] text-white overflow-x-hidden selection:bg-accent selection:text-foreground">
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#070707]/80 backdrop-blur-sm border-b border-white/10">
        <Link href="/" data-testid="link-home">
          <span className="text-xl tracking-[0.25em] uppercase cursor-pointer hover:text-accent transition-colors duration-300">Aether</span>
        </Link>
        <Link href="/?inquiry=aether#inquiry" data-testid="link-inquire">
          <span className="text-xs tracking-widest uppercase cursor-pointer hover:text-accent transition-colors duration-300">Start Your Project</span>
        </Link>
      </nav>

      <section className="relative pt-32 pb-0 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 max-w-3xl">
            <p className="text-xs tracking-[0.35em] uppercase text-accent mb-4">Creative Startup Experience</p>
            <h1 className="text-5xl md:text-7xl font-sans leading-tight mb-6">Infrastructure for<br />modern digital<br />experiences.</h1>
            <p className="text-white/60 font-light leading-relaxed max-w-2xl">
              Modern infrastructure, quietly orchestrated. Operational intelligence layered beneath elegant digital products for AI startups, SaaS platforms, creative agencies, and modern technology brands.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.2, ease: smoothEase } }}
            className="w-full aspect-[21/9] relative border border-white/10 bg-white/[0.03]"
          >
            <TemplateSlideshow images={IMAGES} title="Aether" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ["Live Operations", "A real-time operational layer monitoring global infrastructure, active systems, and synchronized deployments."],
            ["Ambient Intelligence", "Context-aware operational analysis surfaced only when meaningful action is required."],
            ["Global Synchronization", "Infrastructure activity routed dynamically across every active region with sub-second responsiveness."],
          ].map(([title, text], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }}
              viewport={{ once: true }}
              className="border border-white/10 bg-white/[0.03] p-8"
            >
              <p className="text-[10px] tracking-[0.35em] uppercase text-accent mb-8">0{i + 1}</p>
              <h3 className="text-2xl font-serif italic mb-4">{title}</h3>
              <p className="text-sm text-white/55 font-light leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24 px-6 bg-[#0d0d0d]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-30" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Aether Gallery</p>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">A Living Digital System</h2>
            <p className="text-white/55 font-light leading-relaxed">
              A modern infrastructure experience blending cinematic motion design, live operational visuals, and intelligent interface systems into a premium startup presentation layer.
            </p>
          </motion.div>

          <EditorialGallery images={GALLERY_IMAGES} testIdPrefix="aether-gallery" />
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-3">Choose Your Package</h2>
            <p className="text-white/40 text-sm uppercase tracking-widest">Startup systems with cinematic presence</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.15, ease: smoothEase } }}
                viewport={{ once: true }}
                data-testid={`package-card-${pkg.name}`}
              >
                <Card className={`rounded-none shadow-none h-full ${pkg.dark ? "bg-white text-[#070707] border-0" : "bg-white/[0.03] text-white border-white/10"}`}>
                  <CardContent className="p-8 flex flex-col h-full">
                    <span className="text-xs tracking-widest uppercase text-accent mb-2 block">{pkg.label}</span>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-serif italic">{pkg.name}</h3>
                      <span className="text-2xl font-serif italic flex-shrink-0 ml-4">{pkg.price}</span>
                    </div>
                    <p className={`text-sm font-light mb-6 leading-relaxed ${pkg.dark ? "text-[#070707]/65" : "text-white/55"}`}>{pkg.desc}</p>
                    <ul className="space-y-1.5 mt-auto">
                      {pkg.features.map((f) => (
                        <li key={f} className={`flex items-center gap-2 text-xs ${pkg.dark ? "text-[#070707]/65" : "text-white/55"}`}>
                          <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-3">Optional Add-Ons</h2>
            <p className="text-white/40 text-sm uppercase tracking-widest">Click any add-on to expand details</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ADDONS.map((addon, i) => (
              <motion.div
                key={addon[0]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08 } }}
                viewport={{ once: true }}
              >
                <AddonCard addon={addon} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Ready to Build Aether?</h2>
          <p className="text-white/55 font-light mb-10 leading-relaxed">
            Build a premium startup presentation layer with operational intelligence, immersive dashboards, and luxury dark-mode interface design.
          </p>
          <Link href="/?inquiry=aether#inquiry">
            <button
              data-testid="button-cta-start"
              className="text-sm tracking-widest uppercase bg-white text-[#070707] px-10 py-4 hover:bg-accent hover:text-foreground transition-colors duration-500"
            >
              Start Your Project
            </button>
          </Link>
        </motion.div>
      </section>

      <footer className="py-10 px-6 border-t border-white/10 text-center">
        <Link href="/">
          <span className="text-sm tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors duration-300 cursor-pointer">solennestudios</span>
        </Link>
      </footer>
    </div>
  );
}
