import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
};

const guests = [
  { name: "Amelia Hart", group: "Family", status: "Checked in", table: "Villa 2" },
  { name: "Marco Bellini", group: "Wedding Party", status: "Arriving", table: "Terrace 1" },
  { name: "Sofia Clarke", group: "Friends", status: "RSVP confirmed", table: "Garden 4" },
  { name: "Elliot Rowe", group: "Vendor", status: "Needs review", table: "Vendor" },
];

const activity = [
  "RSVP confirmation received from Sofia Clarke",
  "Vendor arrival window updated for floral team",
  "Guestbook message queued for review",
  "Shuttle pickup time adjusted for hotel block",
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#10100d] text-white selection:bg-accent selection:text-foreground">
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-[#10100d]/80 px-6 py-5 backdrop-blur-md">
        <Link href="/">
          <span className="cursor-pointer font-serif text-lg italic uppercase tracking-widest text-white/80 transition-colors hover:text-accent">solennestudios</span>
        </Link>
        <Link href="/?inquiry=wedding#inquiry">
          <span className="cursor-pointer text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-accent">Start Inquiry</span>
        </Link>
      </nav>

      <main className="px-6 pb-24 pt-32">
        <motion.section initial="hidden" animate="visible" variants={fadeUp} className="mx-auto mb-12 max-w-7xl">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">Demo Admin Console</p>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <h1 className="mb-5 font-serif text-5xl italic leading-tight md:text-7xl">Live event operations, simplified.</h1>
              <p className="max-w-2xl font-light leading-relaxed text-white/60">
                A lightweight preview of guest tracking, RSVP activity, vendor timing, and travel coordination for premium event experiences.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["142", "Guests"],
                ["87%", "RSVP"],
                ["12", "Updates"],
              ].map(([value, label]) => (
                <Card key={label} className="rounded-none border-white/10 bg-white/[0.04] text-white shadow-none">
                  <CardContent className="p-5">
                    <div className="font-serif text-3xl italic">{value}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-widest text-white/45">{label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-none border-white/10 bg-white/[0.04] text-white shadow-none">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-3xl italic">Guest Flow</h2>
                  <p className="mt-1 text-sm font-light text-white/45">Filtered operational snapshot</p>
                </div>
                <span className="border border-accent/50 px-3 py-2 text-[10px] uppercase tracking-widest text-accent">Demo Magic</span>
              </div>
              <div className="space-y-3">
                {guests.map((guest) => (
                  <div key={guest.name} className="grid gap-3 border border-white/10 bg-black/20 p-4 text-sm md:grid-cols-[1fr_0.8fr_0.8fr_0.5fr]">
                    <span className="font-serif text-lg italic">{guest.name}</span>
                    <span className="text-white/55">{guest.group}</span>
                    <span className="text-accent">{guest.status}</span>
                    <span className="text-white/45">{guest.table}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-white/10 bg-white/[0.04] text-white shadow-none">
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-6 font-serif text-3xl italic">Live Activity</h2>
              <div className="space-y-4">
                {activity.map((item, index) => (
                  <div key={item} className="border-l border-accent/50 pl-4">
                    <p className="text-sm font-light text-white/70">{item}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-white/35">{index + 2} min ago</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
