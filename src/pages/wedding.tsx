import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { EditorialGallery } from "@/components/editorial-gallery";
import { SiteNav } from "@/components/site-nav";
import { TemplateSlideshow } from "@/components/template-slideshow";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } }
};

const IMAGES = [
  "/wedding.png",
  "/wedding-2.png",
  "/wedding-3.png",
  "/wedding-4.png",
  "/wedding-5.png",
  "/wedding-6.png",
  "/wedding-7.png",
  "/wedding-8.png",
  "/wedding-9.png",
];

const GALLERY_IMAGES = [
  { src: "/wedding.png", title: "Cinematic Wedding Arrival", category: "Invitation Experience", span: "md:col-span-2 md:row-span-2" },
  { src: "/wedding-2.png", title: "Couple Storytelling", category: "Editorial Design" },
  { src: "/wedding-3.png", title: "Romantic Photo Gallery", category: "Visual Showcase" },
  { src: "/wedding-4.png", title: "Venue Feature Moment", category: "Travel & Venue", span: "md:col-span-2" },
  { src: "/wedding-5.png", title: "Celebration Timeline", category: "Guest Planning" },
  { src: "/wedding-6.png", title: "Reception Experience Tools", category: "Interactive Add-Ons", span: "md:col-span-2" },
  { src: "/wedding-7.png", title: "Travel Coordination", category: "Guest Planning" },
  { src: "/wedding-8.png", title: "Polaroid Memory Wall", category: "Guestbook" },
  { src: "/wedding-9.png", title: "Digital Guestbook", category: "Guestbook", span: "md:col-span-2" },
  { src: "/wedding/gallery.png", title: "Shared Wedding Gallery", category: "Gallery Experience" },
  { src: "/wedding/gallery2.png", title: "Gallery Detail View", category: "Gallery Experience" },
  { src: "/wedding/personalizedrsvphomepage1.png", title: "Personalized RSVP Portal", category: "RSVP Experience", span: "md:col-span-2" },
  { src: "/wedding/personalizedrsvphomepage2.png", title: "Guest Welcome Flow", category: "RSVP Experience" },
  { src: "/wedding/RSVPFORM.png", title: "Elegant RSVP Form", category: "RSVP Experience" },
  { src: "/wedding/receptionmusicdesign1.png", title: "Reception Soundtrack", category: "Music Requests", span: "md:col-span-2" },
  { src: "/wedding/receptionmusicdesign2.png", title: "Guest Song Requests", category: "Music Requests" },
  { src: "/wedding/receptionmusicdesign2b.png", title: "Live Music Queue", category: "Music Requests" },
  { src: "/wedding/travelassistant.png", title: "Travel Assistant Overview", category: "Travel & Venue", span: "md:col-span-2" },
  { src: "/wedding/travelassistant2.png", title: "Destination Card", category: "Travel & Venue" },
  { src: "/wedding/travelassistant3.png", title: "Guest Travel Details", category: "Travel & Venue" },
  { src: "/wedding/travelassistant4.png", title: "Concierge Travel Help", category: "Travel & Venue" },
  { src: "/wedding/vendorcheckin.png", title: "Vendor Check-In Flow", category: "Event Operations" },
  { src: "/wedding/weddingdetails.png", title: "Wedding Details Hub", category: "Guest Planning", span: "md:col-span-2" },
  { src: "/wedding/weddingdetails2.png", title: "Event Detail Cards", category: "Guest Planning" },
  { src: "/wedding/weddingdetails3.png", title: "Intimate Detail View", category: "Guest Planning" },
];

const PACKAGES = [
  {
    label: "Foundation",
    name: "Signature Wedding Website",
    price: "$80",
    desc: "A beautifully designed wedding website crafted to share your story, organize your celebration, and create an elegant guest experience across every device.",
    features: ["Responsive Design", "Couple Story Section", "Event Schedule", "RSVP Form", "Photo Gallery", "Location & Travel Info", "Smooth Animations", "Mobile Optimization"],
    dark: false,
  },
  {
    label: "Premium Package",
    name: "Signature Experience",
    price: "$180",
    desc: "An elevated wedding experience package focused on interactivity, guest engagement, and premium visual design.",
    features: ["Everything in Signature Wedding", "Digital Guestbook", "Shared Memory Wall", "Enhanced Gallery Experience", "Premium Animations", "Reception Experience Features", "Floating Interactive Widgets", "QR Experiences"],
    dark: true,
  },
  {
    label: "Luxury Package",
    name: "Luxury Interactive",
    price: "$350+",
    desc: "A fully immersive wedding platform designed to feel cinematic, interactive, and unforgettable for guests throughout the entire celebration weekend.",
    features: ["Fully Custom Luxury Design", "Interactive Reception Experience", "Live Music Requests", "Real-Time Guestbook Feed", "Advanced Animations & Motion", "Floating UI Experiences", "Premium Mobile Experience", "Personalized Guest Flows", "Priority Customization Support"],
    dark: true,
  },
];

const ADDONS = [
  {
    name: "Live Music Requests",
    price: "+$120",
    desc: "Transform your reception into a live interactive music experience where guests can request songs, vote on favorites, and help shape the soundtrack of the night. Cinematic Spotify-inspired interface with floating album artwork and soft glow effects.",
    features: ["QR Song Requests", "Live Song Queue", "Guest Voting System", "Now Playing Display", "DJ Approval Dashboard", "Album Artwork Integration", "Song Search & Autocomplete", "Mobile-Friendly Interface"],
  },
  {
    name: "Digital Guestbook",
    price: "+$15–30",
    desc: "An interactive digital guestbook where guests can leave heartfelt messages, upload photos and videos, and share memories throughout the celebration. Elegant, moderated, and beautifully integrated.",
    features: ["Guest Messages", "Photo Uploads", "Video Uploads", "Live Memory Feed", "Elegant Card Layouts", "Automatic Content Filtering", "Mobile-Friendly Upload Experience"],
  },
  {
    name: "Shared Wedding Gallery",
    price: "+$40",
    desc: "Guests upload live photos and videos throughout the celebration into a shared cinematic gallery experience.",
    features: ["Live Upload Feed", "Mobile Uploads", "QR Access", "Moderated Content System", "Elegant Masonry Gallery Layout"],
  },
  {
    name: "Wedding Weekend Companion",
    price: "+$60",
    desc: "Interactive travel and event companion designed for destination weddings and multi-day celebrations.",
    features: ["Interactive Timeline", "Travel Information", "Hotel Recommendations", "Maps & Directions", "Local Recommendations", "Weekend Itinerary"],
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
        <p className="text-sm text-foreground/60 font-light mb-0">{addon.desc}</p>
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

export default function WeddingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-foreground">
      <SiteNav
        links={[
          { label: "Preview", href: "#preview" },
          { label: "Packages", href: "#packages" },
          { label: "Add-ons", href: "#addons" },
        ]}
        ctaHref="/?inquiry=wedding#inquiry"
        ctaLabel="Start Your Project"
        mobileCtaLabel="Inquire"
      />

      {/* Hero */}
      <section className="pt-32 pb-0 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Wedding Experience</p>
            <h1 className="text-5xl md:text-7xl font-serif italic leading-tight mb-6">Signature<br />Wedding<br />Website</h1>
            <p className="text-foreground/60 font-light leading-relaxed">
              A beautifully designed wedding website crafted to share your story, organize your celebration, and create an elegant guest experience across every device. Designed with a luxury editorial aesthetic — cinematic layouts, smooth transitions, refined typography.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.2, ease: smoothEase } }}
            className="w-full aspect-[21/9] relative"
          >
            <TemplateSlideshow images={IMAGES} title="Wedding" />
          </motion.div>
        </div>
      </section>

      {/* Demo Video */}
      <section id="preview" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Live Demo</p>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Wedding Website Preview</h2>
            <p className="text-foreground/60 font-light leading-relaxed">
              See the wedding experience in motion, from polished page transitions to mobile-friendly guest details.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } }}
            viewport={{ once: true }}
            className="w-full overflow-hidden bg-muted border border-border/30"
          >
            <video
              className="block w-full aspect-video object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/wedding.png"
              data-testid="video-wedding-demo"
            >
              <source src="/weddingdemo-h264.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* Design Gallery */}
      <section className="relative overflow-hidden py-24 px-6 bg-[#F3EFEA]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Wedding Design Gallery</p>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">A Romantic Look at the Experience</h2>
            <p className="text-foreground/60 font-light leading-relaxed">
              A curated view of the wedding website design, from the cinematic invitation pages to RSVP, travel, gallery, music, guestbook, and reception tools.
            </p>
          </motion.div>

          <EditorialGallery images={GALLERY_IMAGES} testIdPrefix="wedding-gallery" />
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-3">Choose Your Package</h2>
            <p className="text-foreground/50 text-sm uppercase tracking-widest">Three tiers of experience</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <span className={`text-xs tracking-widest uppercase mb-2 block ${pkg.dark ? "text-accent" : "text-accent"}`}>{pkg.label}</span>
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
      <section id="addons" className="py-32 px-6 bg-[#F3EFEA]">
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
                <p className="text-sm text-foreground/60 font-light mb-4">Request a completely custom wedding experience tailored specifically to your vision, venue, or guest experience goals.</p>
                <div className="grid grid-cols-2 gap-1 mb-6">
                  {["Custom RSVP Flows", "AI Features", "Interactive Seating Charts", "Couple Portals", "Personalized Guest Experiences", "Live Event Features", "Countdown Experiences", "Interactive Storytelling"].map((ex, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-foreground/40">
                      <span className="w-1 h-1 bg-accent/50 rounded-full flex-shrink-0" />{ex}
                    </div>
                  ))}
                </div>
                <Link href="/?inquiry=wedding#inquiry">
                  <button
                    data-testid="button-wedding-custom"
                    className="min-h-11 w-full border border-foreground/30 px-5 py-3 text-xs uppercase tracking-widest transition-colors duration-300 hover:border-accent hover:text-accent sm:w-auto sm:px-6"
                  >
                    Build My Wedding Experience
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
          <Link href="/?inquiry=wedding#inquiry">
            <button
              data-testid="button-cta-start"
              className="min-h-12 w-full max-w-sm bg-foreground px-6 py-4 text-sm uppercase tracking-widest text-background transition-colors duration-500 hover:bg-accent hover:text-foreground sm:w-auto sm:px-10"
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
