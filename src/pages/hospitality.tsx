import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const IMAGES = ["/hospitality.png", "/hospitality-2.png", "/hospitality-3.png"];

const GALLERY_IMAGES = [
  { src: "/hospitality/HHome.png", title: "Brand Arrival Experience", category: "Guest Experience", span: "md:col-span-2 md:row-span-2" },
  { src: "/hospitality/Habout.png", title: "Storytelling Section", category: "Brand Design" },
  { src: "/hospitality/Menu1.png", title: "Editorial Menu Preview", category: "Core Website" },
  { src: "/hospitality/HGallery.png", title: "Atmosphere Gallery", category: "Visual Showcase", span: "md:col-span-2" },
  { src: "/hospitality/HStory.png", title: "Origin Story Layout", category: "Brand Design" },
  { src: "/hospitality/HSig1.png", title: "Signature Offering", category: "Menu Experience" },
  { src: "/hospitality/Hsig2.png", title: "Featured Dish Moment", category: "Menu Experience", span: "md:col-span-2" },
  { src: "/hospitality/Menu2.png", title: "Curated Menu Detail", category: "Core Website" },
  { src: "/hospitality/BasicOrder.png", title: "Ordering Entry Point", category: "Ordering Flow" },
  { src: "/hospitality/AddTOCart.png", title: "Luxury Cart Flow", category: "Ordering Flow", span: "md:col-span-2" },
  { src: "/hospitality/Democheckout.png", title: "Checkout Experience", category: "Ordering Flow" },
  { src: "/hospitality/Democheckout2.png", title: "Guest Checkout Detail", category: "Ordering Flow" },
  { src: "/hospitality/OrderPlaced.png", title: "Order Confirmation", category: "Customer Journey" },
  { src: "/hospitality/AdminDashboard.png", title: "Admin Overview", category: "Operations" },
  { src: "/hospitality/AdminDashboard2.png", title: "Order Management Console", category: "Operations", span: "md:col-span-2" },
  { src: "/hospitality/Admindashboard3.png", title: "Daily Operations View", category: "Operations" },
  { src: "/hospitality/rewardslogin.png", title: "Rewards Entry", category: "Loyalty" },
  { src: "/hospitality/rewardsdashboard.png", title: "Customer Loyalty Dashboard", category: "Loyalty", span: "md:col-span-2" },
  { src: "/hospitality/challengesystem.png", title: "Engagement Challenges", category: "Loyalty" },
  { src: "/hospitality/memberpass.png", title: "Member Pass", category: "Loyalty" },
];

const PACKAGES = [
  {
    label: "Foundation",
    name: "Food & Beverage Website",
    price: "$50",
    desc: "Modern restaurant or café website designed to showcase your brand, menu, and atmosphere with a smooth luxury experience. Estimated turnaround: 1 day.",
    features: ["Responsive Design", "Interactive Menu Section", "Photo Gallery", "Smooth Animations & Transitions", "Contact + Reservations"],
    dark: false,
  },
  {
    label: "Best Value",
    name: "Premium Experience Package",
    price: "$200",
    desc: "Everything included in the core website plus all premium add-ons bundled together for a complete customer experience system.",
    features: ["Full Website Package", "Order Ahead System", "Admin Dashboard", "Premium Loyalty Experience", "Analytics & Customer Insights", "QR Check-In System", "Automated Rewards", "Enhanced UI Animations"],
    dark: true,
  },
];

const ADDONS = [
  {
    name: "Order Ahead System",
    price: "+$25",
    desc: "Allow customers to place pickup orders directly through your website with a clean, seamless ordering experience.",
    features: ["Online Pickup Ordering", "Pickup Time Selection", "Simple Order Flow", "Mobile-Friendly UI"],
  },
  {
    name: "Order Ahead + Admin Dashboard",
    price: "+$50",
    desc: "Complete restaurant order management system with a private dashboard for tracking and managing incoming orders in real time.",
    features: ["Incoming Orders Dashboard", "Pending / Preparing / Ready Statuses", "Customer Name + Pickup Tracking", "Daily Order Totals", "Popular Item Insights", "Simple Sales Analytics"],
  },
  {
    name: "Basic Loyalty Program",
    price: "+$25",
    desc: "Simple digital loyalty experience designed to increase repeat customers and customer retention.",
    features: ["Digital Punch Card System", "Rewards Tracking", "Customer Loyalty Dashboard UI"],
  },
  {
    name: "Premium Loyalty Experience",
    price: "+$75",
    desc: "Advanced loyalty ecosystem with customer accounts, analytics, and automated rewards for a modern customer retention experience.",
    features: ["Admin Dashboard", "Loyalty Analytics", "QR Code Check-In System", "Customer Accounts", "Automated Rewards"],
  },
];

function AddonCard({ addon }: { addon: typeof ADDONS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <Card
      data-testid={`addon-card-${addon.name}`}
      className="bg-transparent border border-border/50 hover:border-accent/50 transition-colors duration-500 rounded-none shadow-none cursor-pointer"
      onClick={() => setOpen(v => !v)}
    >
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-serif italic">{addon.name}</h4>
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            <span className="text-xs tracking-widest uppercase text-accent">{addon.price}</span>
            <span className={`text-foreground/40 text-xs transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▾</span>
          </div>
        </div>
        <p className="text-sm text-foreground/60 font-light">{addon.desc}</p>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto", transition: { duration: 0.4, ease: smoothEase } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
              className="mt-5 space-y-1 overflow-hidden"
            >
              {addon.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-foreground/50">
                  <span className="w-1 h-1 bg-accent/60 rounded-full flex-shrink-0" />{f}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export default function HospitalityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-background/80 backdrop-blur-sm border-b border-border/30">
        <Link href="/" data-testid="link-home">
          <span className="text-xl font-serif italic tracking-widest uppercase cursor-pointer hover:text-accent transition-colors duration-300">solennestudios</span>
        </Link>
        <Link href="/?inquiry=hospitality#inquiry" data-testid="link-inquire">
          <span className="text-xs tracking-widest uppercase cursor-pointer hover:text-accent transition-colors duration-300">Start Your Project</span>
        </Link>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-0 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Hospitality Experience</p>
            <h1 className="text-5xl md:text-7xl font-serif italic leading-tight mb-6">Food &<br />Beverage<br />Website</h1>
            <p className="text-foreground/60 font-light leading-relaxed">
              Modern restaurant or café website designed to showcase your brand, menu, and atmosphere with a smooth luxury experience. From a simple menu site to a full order management system — built and live in as little as one day.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.2, ease: smoothEase } }}
            className="w-full aspect-[21/9] relative"
          >
            <TemplateSlideshow images={IMAGES} title="Hospitality" />
          </motion.div>
        </div>
      </section>

      {/* Design Gallery */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Basic Design Gallery</p>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">A Sweet Look at the Experience</h2>
            <p className="text-foreground/60 font-light leading-relaxed">
              A collection of hospitality screens showcasing the core website design, ordering flow, admin tools, and loyalty features.
            </p>
          </motion.div>

          <EditorialGallery images={GALLERY_IMAGES} testIdPrefix="hospitality-gallery" />
        </div>
      </section>

      {/* Packages */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-3">Choose Your Package</h2>
            <p className="text-foreground/50 text-sm uppercase tracking-widest">Start simple or go premium</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.15, ease: smoothEase } }}
                viewport={{ once: true }}
                data-testid={`package-card-${pkg.name}`}
              >
                <Card className={`rounded-none shadow-none border-0 h-full ${pkg.dark ? "bg-foreground text-background" : "bg-[#F3EFEA] text-foreground"}`}>
                  <CardContent className="p-8 flex flex-col h-full">
                    <span className="text-xs tracking-widest uppercase text-accent mb-2 block">{pkg.label}</span>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-serif italic">{pkg.name}</h3>
                      <span className="text-2xl font-serif italic flex-shrink-0 ml-4">{pkg.price}</span>
                    </div>
                    <p className={`text-sm font-light mb-6 leading-relaxed ${pkg.dark ? "text-background/70" : "text-foreground/60"}`}>{pkg.desc}</p>
                    <ul className="space-y-1.5 mt-auto">
                      {pkg.features.map((f, j) => (
                        <li key={j} className={`flex items-center gap-2 text-xs ${pkg.dark ? "text-background/70" : "text-foreground/60"}`}>
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

      {/* Add-ons */}
      <section className="py-32 px-6 bg-[#F3EFEA]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-3">Popular Add-Ons</h2>
            <p className="text-foreground/50 text-sm uppercase tracking-widest">Click any add-on to expand details</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {ADDONS.map((addon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }}
                viewport={{ once: true }}
              >
                <AddonCard addon={addon} />
              </motion.div>
            ))}
          </div>

          {/* Custom Feature */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Card className="bg-transparent border border-accent/40 hover:border-accent transition-colors duration-500 rounded-none shadow-none">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs tracking-widest uppercase text-accent/70 mb-2 block">Custom</span>
                    <h4 className="text-xl font-serif italic">Custom Feature Request</h4>
                  </div>
                  <span className="text-xs tracking-widest uppercase text-accent">Custom Pricing</span>
                </div>
                <p className="text-sm text-foreground/60 font-light mb-4">Need something unique? Submit a custom feature request tailored specifically to your business, workflow, or customer experience goals.</p>
                <div className="grid grid-cols-2 gap-1 mb-6">
                  {["Custom Booking Systems", "AI Integrations", "Client Portals", "Mobile Apps", "Loyalty Systems", "Advanced Animations", "Membership Systems", "Custom Business Software"].map((ex, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-foreground/40">
                      <span className="w-1 h-1 bg-accent/50 rounded-full flex-shrink-0" />{ex}
                    </div>
                  ))}
                </div>
                <Link href="/?inquiry=hospitality#inquiry">
                  <button
                    data-testid="button-hospitality-custom"
                    className="text-xs tracking-widest uppercase border border-foreground/30 hover:border-accent hover:text-accent px-6 py-3 transition-colors duration-300"
                  >
                    Request Custom Feature
                  </button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Ready to Begin?</h2>
          <p className="text-foreground/60 font-light mb-10 leading-relaxed">
            Every project begins with a conversation. Share your vision and we'll craft something uniquely yours — timeless, elegant, and unforgettable.
          </p>
          <Link href="/?inquiry=hospitality#inquiry">
            <button
              data-testid="button-cta-start"
              className="text-sm tracking-widest uppercase bg-foreground text-background px-10 py-4 hover:bg-accent hover:text-foreground transition-colors duration-500"
            >
              Start Your Project
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border/30 text-center">
        <Link href="/">
          <span className="text-sm font-serif italic tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors duration-300 cursor-pointer">solennestudios</span>
        </Link>
      </footer>
    </div>
  );
}
