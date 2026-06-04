import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";
import { TemplateSlideshow } from "@/components/template-slideshow";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } }
};

const IMAGES = ["/custom-2.png", "/Aether/liveoperations.png", "/custom-3.png"];

const STACKS = [
  "Python",
  "JavaScript / TypeScript",
  "React",
  "Node.js",
  "SQL",
  "C#",
  "Java",
  "C++",
  "Lua",
  "Automation / No Preference",
  "Need Guidance",
];

const PROJECT_TYPES = [
  "Automation Script",
  "Internal Tool",
  "Dashboard",
  "File Management System",
  "Data Processing Tool",
  "AI Workflow",
  "Web Application",
  "Desktop Application",
  "Utility Program",
  "Monitoring System",
  "CRM / Management System",
  "Booking System",
  "API Integration",
  "Realtime System",
  "Experimental / Creative Tool",
  "Other Custom Project",
];

const FEATURES = [
  "Database Integration",
  "Authentication Systems",
  "Realtime Updates",
  "File Upload / Processing",
  "CSV / Excel Automation",
  "Analytics & Reporting",
  "Admin Dashboard",
  "API Connections",
  "Cloud Deployment",
  "AI Integration",
  "Notifications",
  "Scheduling Automation",
  "Multi-User Access",
  "Data Visualization",
  "Web Scraping",
  "Live Monitoring",
];

const SYSTEM_AREAS = ["Systems", "Workflows", "Operations", "Automation", "Infrastructure", "Tooling", "Utilities"];

export default function CustomSoftwarePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-foreground">
      <SiteNav
        links={[
          { label: "Studio", href: "#studio" },
          { label: "Stack", href: "#stack" },
          { label: "Features", href: "#features" },
        ]}
        ctaHref="/?inquiry=software#inquiry"
        ctaLabel="Start Software Inquiry"
        mobileCtaLabel="Inquire"
      />

      <section className="pt-32 pb-0 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 max-w-3xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Custom Programs & Software</p>
            <h1 className="text-5xl md:text-7xl font-serif italic leading-tight mb-6">Custom software built around your workflow.</h1>
            <p className="text-foreground/60 font-light leading-relaxed max-w-2xl">
              Automation, operational tools, dashboards, and bespoke digital systems designed specifically for your needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.2, ease: smoothEase } }}
            className="w-full aspect-[21/9] relative"
          >
            <TemplateSlideshow images={IMAGES} title="Custom Software" />
          </motion.div>
        </div>
      </section>

      <section id="studio" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-10 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Digital systems studio</h2>
            <p className="text-foreground/60 font-light leading-relaxed mb-8">
              From lightweight automation scripts to fully interactive software systems, every project is designed around your exact needs. Custom digital tools built for automation, operations, productivity, data management, and modern workflows.
            </p>
            <div className="flex flex-wrap gap-3">
              {SYSTEM_AREAS.map((area) => (
                <span key={area} className="border border-border/60 bg-[#F3EFEA] px-4 py-2 text-xs uppercase tracking-widest text-foreground/60">
                  {area}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
            viewport={{ once: true }}
          >
            <Card className="rounded-none border-0 bg-foreground text-background shadow-none">
              <CardContent className="p-8">
                <span className="text-xs tracking-widest uppercase text-accent mb-2 block">Starting at</span>
                <div className="flex items-start justify-between gap-6 mb-4">
                  <h3 className="text-3xl font-serif italic">Custom Programs & Software</h3>
                  <span className="text-3xl font-serif italic">$120+</span>
                </div>
                <p className="text-sm text-background/70 font-light leading-relaxed">
                  Bespoke software and utility systems designed to simplify processes, automate repetitive work, and create tailored digital experiences.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="stack" className="py-24 px-6 bg-[#F3EFEA]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Preferred Language / Stack</p>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Choose the right foundation</h2>
            <p className="text-foreground/60 font-light leading-relaxed">
              Bring a preferred technology stack, choose no preference, or ask for guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STACKS.map((stack, i) => (
              <motion.div
                key={stack}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: Math.min(i * 0.035, 0.25) } }}
                viewport={{ once: true }}
                className="border border-border/60 bg-background px-5 py-4 text-sm text-foreground/70 transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {stack}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Project Type</p>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">What are you looking to build?</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROJECT_TYPES.map((type, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: Math.min(i * 0.025, 0.25) } }}
                viewport={{ once: true }}
                className="border border-border/50 bg-transparent p-5 text-sm text-foreground/65"
              >
                {type}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-[#F3EFEA]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Possible Features</p>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Built around the work</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: Math.min(i * 0.03, 0.3) } }}
                viewport={{ once: true }}
              >
                <Card className="h-full rounded-none border-border/50 bg-background shadow-none">
                  <CardContent className="p-6">
                    <span className="mb-5 block text-[10px] uppercase tracking-[0.3em] text-accent">Feature</span>
                    <h3 className="text-lg font-serif italic">{feature}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Start Software Inquiry</h2>
          <p className="text-foreground/60 font-light mb-10 leading-relaxed">
            Every system is designed from the ground up around your workflow - not forced into a one-size-fits-all solution.
          </p>
          <Link href="/?inquiry=software#inquiry">
            <button
              data-testid="button-start-software-inquiry"
              className="min-h-12 w-full max-w-sm bg-foreground px-6 py-4 text-sm uppercase tracking-widest text-background transition-colors duration-500 hover:bg-accent hover:text-foreground sm:w-auto sm:px-10"
            >
              Start Software Inquiry →
            </button>
          </Link>
        </motion.div>
      </section>

      <footer className="py-10 px-6 border-t border-border/30 text-center">
        <Link href="/">
          <span className="text-sm font-serif italic tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors duration-300 cursor-pointer">solennestudios</span>
        </Link>
      </footer>
    </div>
  );
}
