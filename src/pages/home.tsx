import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { SiteNav } from "@/components/site-nav";
import { TemplateSlideshow } from "@/components/template-slideshow";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqejvrvl";
const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const customProjectTypes = [
  "Wedding Experience",
  "Startup / SaaS",
  "Creative Agency",
  "Restaurant / Hospitality",
  "Portfolio",
  "Luxury Brand",
  "Event Experience",
  "Interactive Dashboard",
  "Other",
];

const customFeatureOptions = [
  "RSVP System",
  "Admin Dashboard",
  "Live Activity Feed",
  "Music Requests",
  "Interactive Gallery",
  "Guestbook / Comments",
  "Booking System",
  "Contact Forms",
  "CMS / Editable Content",
  "Animations & Motion Design",
  "Mobile Optimization",
  "Password Protected Pages",
  "Analytics Dashboard",
  "Interactive Maps",
  "AI / Live Data Features",
  "Other Custom Features",
];

const softwareProjectTypes = [
  "Automation Script",
  "File Management System",
  "Internal Tool",
  "Dashboard",
  "Data Processing Utility",
  "AI Workflow Tool",
  "Web Application",
  "Desktop Application",
  "Monitoring System",
  "Business Utility",
  "Experimental / Creative Tool",
  "API Integration",
  "Other Custom Project",
];

const softwareStacks = [
  "Python",
  "JavaScript / TypeScript",
  "React",
  "Node.js",
  "SQL",
  "C#",
  "Java",
  "C++",
  "Lua",
  "No Preference / Need Guidance",
];

const softwareFeatureOptions = [
  "Authentication / Login",
  "Database Integration",
  "Realtime Updates",
  "Analytics / Reporting",
  "File Uploads",
  "CSV / Excel Support",
  "API Integration",
  "Notifications",
  "Automation Workflows",
  "Cloud Hosting",
  "Admin Dashboard",
  "Multi-User Support",
  "AI Integration",
  "Mobile Responsive UI",
  "Other Custom Features",
];

const softwareMaterials = [
  "Wireframes",
  "Existing Code",
  "Database",
  "API Access",
  "Documentation",
  "Branding / UI Direction",
  "Spreadsheets / Data",
  "Workflow Examples",
];

const hospitalityBusinessTypes = [
  "Restaurant",
  "Cafe",
  "Cocktail Bar",
  "Bakery",
  "Winery",
  "Hotel / Resort",
  "Lounge",
  "Food Truck",
  "Fine Dining",
  "Other",
];

const hospitalityAtmospheres = [
  "Luxury / Editorial",
  "Warm & Cozy",
  "Modern Minimal",
  "Dark & Moody",
  "High-End Dining",
  "Vintage European",
  "Cinematic",
  "Upscale Lounge",
  "Trendy / Social",
  "Organic / Natural",
  "Experimental / Artistic",
];

const hospitalityExperienceFeatures = [
  "Digital Menu",
  "Mobile Ordering",
  "Reservations",
  "Event Booking",
  "Interactive Gallery",
  "Loyalty / Rewards System",
  "QR Experiences",
  "Online Ordering",
  "Admin Dashboard",
  "Live Waitlist",
  "Gift Cards",
  "Customer Accounts",
  "Analytics Dashboard",
  "Multi-Location Support",
  "Vendor / Staff Portal",
];

const hospitalityOperationalNeeds = [
  "Elegant Branding",
  "Mobile Experience",
  "Faster Ordering",
  "Better Reservations",
  "Customer Retention",
  "Loyalty Programs",
  "Social Media Presence",
  "Luxury Visual Design",
  "Operational Simplicity",
  "Interactive Customer Experience",
];

const hospitalityAssets = [
  "Brand Logo",
  "Photography",
  "Menu PDF",
  "Brand Colors",
  "Typography",
  "Social Media Assets",
  "Existing Website",
  "Interior Photography",
];

const weddingGuestCounts = ["Under 50", "50-100", "100-200", "200+"];

const weddingAtmospheres = [
  "Editorial / Luxury",
  "Cinematic",
  "Romantic Minimal",
  "Modern Black Tie",
  "European / Old Money",
  "Garden Party",
  "Destination Wedding",
  "Coastal",
  "Vintage",
  "Modern Luxury",
  "Interactive / Immersive",
];

const weddingExperienceFeatures = [
  "RSVP System",
  "Wedding Weekend Schedule",
  "Travel Hub",
  "Hotel Recommendations",
  "Shared Photo Gallery",
  "Digital Guestbook",
  "Memory Wall",
  "Music Requests",
  "QR Experiences",
  "Vendor Dashboard",
  "Seating Arrangement",
  "Interactive Story Timeline",
  "Mobile Guest Companion",
  "Live Reception Features",
  "Admin Dashboard",
];

const weddingGuestPriorities = [
  "Elegant Design",
  "Guest Convenience",
  "Travel Coordination",
  "Mobile Experience",
  "Emotional Storytelling",
  "Interactive Features",
  "Luxury Feel",
  "Simple RSVP Flow",
  "Personalized Guest Experience",
];

const weddingTravelFeatures = [
  "Hotel blocks",
  "Flight recommendations",
  "Local recommendations",
  "Weekend itinerary",
  "Shuttle coordination",
];

const weddingContentAssets = [
  "Engagement photos",
  "Wedding branding",
  "Invitations",
  "Videos",
  "Schedules",
  "Venue imagery",
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn about your business, audience, goals, and vision to understand exactly what success looks like.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We create layouts, visual direction, user flows, and interactive concepts tailored specifically to your project.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Your website, platform, or software solution is carefully developed with performance, scalability, and usability in mind.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "After testing and refinement, your project goes live with continued support and guidance when needed.",
  },
];

const founderHighlights = [
  "✓ Master's in Computer Science",
  "✓ Custom Websites & Software",
  "✓ Charlotte-Based",
  "✓ Mobile-First Development",
  "✓ Business Systems & Automation",
];

const formSchema = z.object({
  template: z.enum(["wedding", "hospitality", "aether", "custom-software", "custom"], {
    required_error: "Please select a template type.",
  }),
  features: z.array(z.string()).optional(),
  consultation: z.enum(["video", "email", "text"]).optional(),
  inspiration: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  company: z.string().optional(),
  links: z.string().optional(),
  customProjectType: z.string().optional(),
  customOtherProjectType: z.string().optional(),
  customVision: z.string().optional(),
  customFeatures: z.array(z.string()).optional(),
  designReferences: z.string().optional(),
  launchTimeline: z.string().optional(),
  budgetRange: z.string().optional(),
  customConsultationPreference: z.string().optional(),
  anythingElse: z.string().optional(),
  preferredContact: z.string().optional(),
  softwareProjectType: z.string().optional(),
  softwareStack: z.string().optional(),
  softwareDescription: z.string().optional(),
  softwareFeatures: z.array(z.string()).optional(),
  softwareMaterials: z.array(z.string()).optional(),
  softwareReferences: z.string().optional(),
  softwareTimeline: z.string().optional(),
  softwareBudget: z.string().optional(),
  softwareProblem: z.string().optional(),
  hospitalityBusinessName: z.string().optional(),
  hospitalityContactName: z.string().optional(),
  hospitalityEmail: z.string().optional(),
  hospitalityBusinessType: z.string().optional(),
  hospitalityAtmosphere: z.array(z.string()).optional(),
  hospitalityFeatures: z.array(z.string()).optional(),
  hospitalityNeeds: z.array(z.string()).optional(),
  hospitalityAssets: z.array(z.string()).optional(),
  hospitalityInspiration: z.string().optional(),
  hospitalityCustomerExperience: z.string().optional(),
  hospitalityTimeline: z.string().optional(),
  hospitalityBudget: z.string().optional(),
  hospitalityGuestFeeling: z.string().optional(),
  coupleNames: z.string().optional(),
  weddingEmail: z.string().optional(),
  weddingDate: z.string().optional(),
  weddingLocation: z.string().optional(),
  weddingGuestCount: z.string().optional(),
  weddingAtmosphere: z.array(z.string()).optional(),
  weddingFeatures: z.array(z.string()).optional(),
  weddingPriorities: z.array(z.string()).optional(),
  weddingInspiration: z.string().optional(),
  weddingTravelStatus: z.string().optional(),
  weddingTravelFeatures: z.array(z.string()).optional(),
  weddingAssets: z.array(z.string()).optional(),
  weddingTimeline: z.string().optional(),
  weddingBudget: z.string().optional(),
  weddingMemory: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.template === "aether" && !data.consultation) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a consultation method.",
      path: ["consultation"],
    });
  }

  if (data.template === "custom") {
    const requiredFields: Array<[keyof typeof data, string]> = [
      ["name", "Name is required."],
      ["email", "Email address is required."],
      ["customProjectType", "Please select a project type."],
      ["customVision", "Please describe your project vision."],
      ["launchTimeline", "Please select a launch timeline."],
      ["budgetRange", "Please select a budget range."],
      ["customConsultationPreference", "Please select a communication preference."],
    ];

    requiredFields.forEach(([field, message]) => {
      if (!data[field]) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message, path: [field] });
      }
    });

    if (data.email && !z.string().email().safeParse(data.email).success) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid email is required.", path: ["email"] });
    }
  }

  if (data.template === "custom-software") {
    const requiredFields: Array<[keyof typeof data, string]> = [
      ["name", "Name is required."],
      ["email", "Email address is required."],
      ["softwareProjectType", "Please select a project type."],
      ["softwareStack", "Please select a preferred technology."],
      ["softwareDescription", "Please describe what the software should do."],
      ["softwareTimeline", "Please select a timeframe."],
      ["softwareBudget", "Please select a budget range."],
      ["softwareProblem", "Please describe the problem this should solve."],
    ];

    requiredFields.forEach(([field, message]) => {
      if (!data[field]) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message, path: [field] });
      }
    });

    if (data.email && !z.string().email().safeParse(data.email).success) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid email is required.", path: ["email"] });
    }
  }

  if (data.template === "hospitality") {
    const requiredFields: Array<[keyof typeof data, string]> = [
      ["hospitalityBusinessName", "Business name is required."],
      ["hospitalityContactName", "Contact name is required."],
      ["hospitalityEmail", "Email address is required."],
      ["hospitalityBusinessType", "Please select a business type."],
      ["hospitalityCustomerExperience", "Please describe the customer experience."],
      ["hospitalityTimeline", "Please select a launch timeframe."],
      ["hospitalityBudget", "Please select a budget range."],
      ["hospitalityGuestFeeling", "Please answer the final brand question."],
    ];

    requiredFields.forEach(([field, message]) => {
      if (!data[field]) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message, path: [field] });
      }
    });

    if (data.hospitalityEmail && !z.string().email().safeParse(data.hospitalityEmail).success) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid email is required.", path: ["hospitalityEmail"] });
    }
  }

  if (data.template === "wedding") {
    const requiredFields: Array<[keyof typeof data, string]> = [
      ["coupleNames", "Couple names are required."],
      ["weddingEmail", "Contact email is required."],
      ["weddingDate", "Wedding date is required."],
      ["weddingLocation", "Wedding location or venue is required."],
      ["weddingGuestCount", "Please select an estimated guest count."],
      ["weddingTravelStatus", "Please select a travel answer."],
      ["weddingTimeline", "Please select a desired timeline."],
      ["weddingBudget", "Please select a budget range."],
      ["weddingMemory", "Please answer the final wedding question."],
    ];

    requiredFields.forEach(([field, message]) => {
      if (!data[field]) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message, path: [field] });
      }
    });

    if (data.weddingEmail && !z.string().email().safeParse(data.weddingEmail).success) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid email is required.", path: ["weddingEmail"] });
    }
  }

  if (data.template === "aether") {
    if (!data.name) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Name is required.", path: ["name"] });
    }

    if (!data.email) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email is required.", path: ["email"] });
    } else if (!z.string().email().safeParse(data.email).success) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid email is required.", path: ["email"] });
    }
  }
});

export default function Home() {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      features: [],
      customFeatures: [],
      softwareFeatures: [],
      softwareMaterials: [],
      hospitalityAtmosphere: [],
      hospitalityFeatures: [],
      hospitalityNeeds: [],
      hospitalityAssets: [],
      weddingAtmosphere: [],
      weddingFeatures: [],
      weddingPriorities: [],
      weddingTravelFeatures: [],
      weddingAssets: [],
    },
  });

  const selectedTemplate = form.watch("template");
  const totalFormSteps = selectedTemplate === "custom" || selectedTemplate === "custom-software" || selectedTemplate === "hospitality" || selectedTemplate === "wedding" ? 2 : 5;
  const isSending = submitStatus === "sending";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inquiryType = params.get("inquiry");
    const templateMap: Record<string, z.infer<typeof formSchema>["template"]> = {
      wedding: "wedding",
      hospitality: "hospitality",
      software: "custom-software",
      "custom-software": "custom-software",
      aether: "aether",
      startup: "aether",
      custom: "custom",
    };
    const template = inquiryType ? templateMap[inquiryType] : undefined;

    if (!template) return;

    form.setValue("template", template, { shouldValidate: true });
    setFormStep(template === "aether" ? 2 : 2);
    window.requestAnimationFrame(() => {
      document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [form]);

  const getInquiryContact = (data: z.infer<typeof formSchema>) => {
    if (data.template === "wedding") {
      return {
        name: data.coupleNames,
        email: data.weddingEmail,
        company: null,
      };
    }

    if (data.template === "hospitality") {
      return {
        name: data.hospitalityContactName,
        email: data.hospitalityEmail,
        company: data.hospitalityBusinessName || null,
      };
    }

    return {
      name: data.name,
      email: data.email,
      company: data.company || null,
    };
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isSending) return;

    const contact = getInquiryContact(data);
    setSubmitStatus("sending");
    setSubmitError("");

    try {
      const formData = new FormData();
      formData.append("_subject", `New ${data.template} inquiry from solennestudios`);
      formData.append("template", data.template);
      formData.append("name", contact.name ?? "");
      formData.append("email", contact.email ?? "");
      formData.append("company", contact.company ?? "");
      formData.append("message", JSON.stringify(data, null, 2));
      formData.append("inquiry_data", JSON.stringify(data));

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const responseBody = await response.json().catch(() => null);
        const formspreeError = responseBody?.errors?.[0]?.message || responseBody?.error;
        throw new Error(formspreeError || `Formspree returned ${response.status}`);
      }

      setIsSubmitted(true);
      setSubmitStatus("idle");
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown submission error.";
      setSubmitStatus("error");
      setSubmitError(`We could not send your inquiry. Please try again. Technical detail: ${message}`);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (formStep === 1) fieldsToValidate = ["template"];
    else if (selectedTemplate === "custom" && formStep === 2) {
      fieldsToValidate = ["name", "email", "customProjectType", "customVision", "launchTimeline", "budgetRange", "customConsultationPreference"];
    }
    else if (selectedTemplate === "custom-software" && formStep === 2) {
      fieldsToValidate = ["name", "email", "softwareProjectType", "softwareStack", "softwareDescription", "softwareTimeline", "softwareBudget", "softwareProblem"];
    }
    else if (selectedTemplate === "hospitality" && formStep === 2) {
      fieldsToValidate = ["hospitalityBusinessName", "hospitalityContactName", "hospitalityEmail", "hospitalityBusinessType", "hospitalityCustomerExperience", "hospitalityTimeline", "hospitalityBudget", "hospitalityGuestFeeling"];
    }
    else if (selectedTemplate === "wedding" && formStep === 2) {
      fieldsToValidate = ["coupleNames", "weddingEmail", "weddingDate", "weddingLocation", "weddingGuestCount", "weddingTravelStatus", "weddingTimeline", "weddingBudget", "weddingMemory"];
    }
    else if (formStep === 2) fieldsToValidate = ["features"];
    else if (formStep === 3) fieldsToValidate = ["consultation"];
    else if (formStep === 4) fieldsToValidate = ["inspiration"];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setFormStep(prev => Math.min(prev + 1, totalFormSteps));
  };

  const prevStep = () => setFormStep(prev => prev - 1);

  const openComingSoon = () => {
    setShowComingSoon(true);
    window.setTimeout(() => setShowComingSoon(false), 2200);
  };

  const startWeddingInquiry = () => {
    form.setValue("template", "wedding", { shouldValidate: true });
    setFormStep(2);
    document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Experiences", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Inquire", href: "#inquiry" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-foreground">
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="fixed bottom-8 left-1/2 z-[70] -translate-x-1/2 border border-border/60 bg-background px-6 py-4 text-sm font-light tracking-widest uppercase shadow-lg"
            role="status"
          >
            Coming soon!
          </motion.div>
        )}
      </AnimatePresence>

      <SiteNav links={navLinks} ctaHref="#inquiry" ctaLabel="Start Your Project" mobileCtaLabel="Inquire" blend />

      {/* Hero Section */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-12 pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Warm ivory editorial minimal objects" 
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-tight mb-8 text-foreground"
          >
            Crafted digital experiences for modern brands, weddings, and spaces.
          </motion.h1>
          <motion.p 
            variants={fadeUp}
            className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed tracking-wide text-foreground/80 sm:text-lg md:mb-12 md:text-xl"
          >
            Minimal websites and interactive systems designed to feel timeless, elegant, and unforgettable.
          </motion.p>
          <motion.div 
            variants={fadeUp}
            className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-6"
          >
            <Button size="lg" variant="outline" className="h-14 w-full max-w-sm rounded-none border-foreground/20 px-6 text-xs uppercase tracking-widest transition-all duration-500 hover:border-accent hover:bg-accent hover:text-foreground sm:w-auto sm:px-8 sm:text-sm" asChild>
              <a href="#services">Explore Templates</a>
            </Button>
            <Button size="lg" className="h-14 w-full max-w-sm rounded-none bg-foreground px-6 text-xs uppercase tracking-widest text-background transition-all duration-500 hover:bg-accent hover:text-foreground sm:w-auto sm:px-8 sm:text-sm" asChild>
              <a href="#inquiry">Start Your Project</a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-background">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-serif italic mb-8">What We Offer</h2>
          <p className="text-lg text-foreground/70 leading-relaxed font-light mb-12">
            We don't just build websites; we craft interactive luxury web experiences. Every project includes free revisions, daily updates, and personalized video consultations to ensure your vision is realized perfectly.
          </p>
        </motion.div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="py-32 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-24 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Curated Experiences</h2>
            <p className="text-foreground/60 uppercase tracking-widest text-sm">Select a foundation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-12">
            {[
              {
                title: "Signature Wedding",
                price: "Starting at $80",
                description: "A beautifully designed wedding website crafted to share your story, organize your celebration, and create an elegant guest experience across every device.",
                features: ["Responsive Design", "Couple Story Section", "Event Schedule", "RSVP Form", "Photo Gallery", "Location & Travel Info", "Smooth Animations", "Mobile Optimization"],
                images: [
                  "/wedding.png",
                  "/wedding-2.png",
                  "/wedding-3.png",
                  "/wedding-4.png",
                  "/wedding-5.png",
                  "/wedding-6.png",
                  "/wedding-7.png",
                  "/wedding-8.png",
                  "/wedding-9.png",
                ],
                href: "/wedding",
              },
              {
                title: "Food & Beverage",
                price: "Starting at $50",
                description: "Modern restaurant or café website designed to showcase your brand, menu, and atmosphere with a smooth luxury experience.",
                features: ["Responsive Design", "Interactive Menu Section", "Photo Gallery", "Smooth Animations", "Contact + Reservations"],
                images: ["/hospitality.png", "/hospitality-2.png", "/hospitality-3.png"],
                href: "/hospitality",
              },
              {
                title: "Aether",
                price: "Starting at $180",
                description: "A cinematic startup and technology website designed to feel intelligent, immersive, and operationally alive.",
                features: ["Premium Dark UI", "Cinematic Motion", "Live Operations Visuals", "Dashboard Screens", "Global System Maps", "Launch-Ready Deployment"],
                images: ["/Aether/homepage.png", "/Aether/liveoperations.png", "/Aether/map.png"],
                href: "/aether",
              },
              {
                title: "Custom Software",
                price: "Starting at $120+",
                description: "Custom-built software, automation tools, scripts, and operational systems tailored to your workflow, business, or idea.",
                features: ["Automation Systems", "Internal Tools", "Dashboards", "API Integrations", "Data Processing", "AI Workflows"],
                images: ["/customsoftware.png"],
                href: "/custom-software",
              },
              {
                title: "Custom Website",
                price: "Custom Pricing",
                description: "A bespoke digital experience built entirely around your vision — unique architecture, advanced interactions, and dedicated support from concept to launch.",
                features: ["Unique Architecture", "Advanced Animations", "Custom Integrations", "Dedicated Support"],
                images: ["/hero-bg.png", "/custom-2.png", "/custom-3.png"],
                href: "/#inquiry",
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.2 } }
                }}
                className="group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden mb-8 bg-muted relative">
                  <TemplateSlideshow images={service.images} title={service.title} />
                </div>
                <h3 className="text-2xl font-serif italic mb-2">{service.title}</h3>
                <p className="text-accent text-sm tracking-wider uppercase mb-3">{service.price}</p>
                <p className="text-sm text-foreground/55 font-light leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f, j) => (
                    <li key={j} className="text-sm text-foreground/70 font-light flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent rounded-full" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href={service.href}>
                  <span
                    data-testid={`link-learn-more-${service.title}`}
                    className="inline-flex items-center gap-2 text-xs tracking-widest uppercase border-b border-foreground/30 pb-0.5 hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
                  >
                    Learn More
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 6h8M6 2l4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-32 px-6 bg-[#F3EFEA]">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Enhance Your Experience</h2>
            <p className="text-foreground/60 uppercase tracking-widest text-sm">Interactive Add-ons</p>
          </motion.div>

          <Tabs defaultValue="wedding" className="w-full">
            <TabsList className="mb-10 flex h-auto w-full justify-start overflow-x-auto rounded-none border-b border-border/50 bg-transparent p-0 md:mb-16 md:justify-center">
              <TabsTrigger 
                value="wedding" 
                className="min-h-12 flex-shrink-0 rounded-none px-5 py-4 text-xs uppercase tracking-widest data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:bg-transparent sm:px-8 sm:text-sm"
              >
                Wedding
              </TabsTrigger>
              <TabsTrigger 
                value="hospitality"
                className="min-h-12 flex-shrink-0 rounded-none px-5 py-4 text-xs uppercase tracking-widest data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:bg-transparent sm:px-8 sm:text-sm"
              >
                Hospitality
              </TabsTrigger>
              <TabsTrigger 
                value="aether"
                className="min-h-12 flex-shrink-0 rounded-none px-5 py-4 text-xs uppercase tracking-widest data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:bg-transparent sm:px-8 sm:text-sm"
              >
                Aether
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="wedding">
              <div className="space-y-6">

                {/* Premium Packages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-foreground text-background border-0 rounded-none shadow-none">
                    <CardContent className="p-8">
                      <span className="text-xs tracking-widest uppercase text-accent mb-2 block">Premium Package</span>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-2xl font-serif italic">Signature Experience</h4>
                        <span className="text-2xl font-serif italic flex-shrink-0 ml-4">$180</span>
                      </div>
                      <p className="text-background/70 text-sm font-light mb-5">An elevated wedding package focused on interactivity, guest engagement, and premium visual design.</p>
                      <ul className="space-y-1">
                        {["Everything in Signature Wedding", "Digital Guestbook", "Shared Memory Wall", "Enhanced Gallery Experience", "Premium Animations", "Reception Experience Features", "Floating Interactive Widgets", "QR Experiences"].map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-background/70">
                            <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-foreground text-background border-0 rounded-none shadow-none">
                    <CardContent className="p-8">
                      <span className="text-xs tracking-widest uppercase text-accent mb-2 block">Luxury Package</span>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-2xl font-serif italic">Luxury Interactive</h4>
                        <span className="text-2xl font-serif italic flex-shrink-0 ml-4">$350+</span>
                      </div>
                      <p className="text-background/70 text-sm font-light mb-5">A fully immersive wedding platform designed to feel cinematic, interactive, and unforgettable throughout the entire celebration weekend.</p>
                      <ul className="space-y-1">
                        {["Fully Custom Luxury Design", "Interactive Reception Experience", "Live Music Requests", "Real-Time Guestbook Feed", "Advanced Animations & Motion", "Floating UI Experiences", "Premium Mobile Experience", "Personalized Guest Flows", "Priority Customization Support"].map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-background/70">
                            <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Individual Add-ons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Live Music Requests",
                      price: "+$120",
                      desc: "Transform your reception into a live interactive music experience where guests can request songs, vote on favorites, and help shape the soundtrack of the night. Cinematic Spotify-inspired interface with floating album artwork and soft glow effects.",
                      features: ["QR Song Requests", "Live Song Queue", "Guest Voting System", "Now Playing Display", "DJ Approval Dashboard", "Album Artwork Integration", "Song Search & Autocomplete", "Mobile-Friendly Interface"]
                    },
                    {
                      name: "Digital Guestbook",
                      price: "+$15–30",
                      desc: "An interactive digital guestbook where guests can leave heartfelt messages, upload photos and videos, and share memories throughout the celebration. Elegant, moderated, and beautifully integrated.",
                      features: ["Guest Messages", "Photo Uploads", "Video Uploads", "Live Memory Feed", "Elegant Card Layouts", "Automatic Content Filtering", "Mobile-Friendly Upload Experience"]
                    },
                    {
                      name: "Shared Wedding Gallery",
                      price: "+$40",
                      desc: "Guests upload live photos and videos throughout the celebration into a shared cinematic gallery experience.",
                      features: ["Live Upload Feed", "Mobile Uploads", "QR Access", "Moderated Content System", "Elegant Masonry Gallery Layout"]
                    },
                    {
                      name: "Wedding Weekend Companion",
                      price: "+$60",
                      desc: "Interactive travel and event companion designed for destination weddings and multi-day celebrations.",
                      features: ["Interactive Timeline", "Travel Information", "Hotel Recommendations", "Maps & Directions", "Local Recommendations", "Weekend Itinerary"]
                    },
                  ].map((addon, i) => (
                    <Card key={i} className="bg-transparent border border-border/50 hover:border-accent/50 transition-colors duration-500 rounded-none shadow-none">
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-xl font-serif italic">{addon.name}</h4>
                          <span className="text-xs tracking-widest uppercase text-accent flex-shrink-0 ml-4">{addon.price}</span>
                        </div>
                        <p className="text-sm text-foreground/60 font-light mb-4">{addon.desc}</p>
                        <ul className="space-y-1">
                          {addon.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs text-foreground/50">
                              <span className="w-1 h-1 bg-accent/60 rounded-full flex-shrink-0" />{f}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Custom Feature Request */}
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
                    <button
                      data-testid="button-wedding-custom-feature"
                      onClick={startWeddingInquiry}
                      className="min-h-11 w-full border border-foreground/30 px-5 py-3 text-xs uppercase tracking-widest transition-colors duration-300 hover:border-accent hover:text-accent sm:w-auto sm:px-6"
                    >
                      Build My Wedding Experience
                    </button>
                  </CardContent>
                </Card>

              </div>
            </TabsContent>
            
            <TabsContent value="hospitality">
              <div className="space-y-6">
                {/* Premium Package highlight */}
                <Card className="bg-foreground text-background border-0 rounded-none shadow-none">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs tracking-widest uppercase text-accent mb-2 block">Best Value</span>
                        <h4 className="text-2xl font-serif italic">Premium Experience Package</h4>
                      </div>
                      <span className="text-2xl font-serif italic">$200</span>
                    </div>
                    <p className="text-background/70 text-sm font-light mb-6">Everything in the core website plus all premium add-ons bundled together for a complete customer experience system.</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["Full website package", "Order ahead system", "Admin dashboard", "Premium loyalty experience", "Analytics & customer insights", "QR check-in system", "Automated rewards", "Enhanced UI animations"].map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-background/70">
                          <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />{f}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Individual add-ons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Order Ahead System",
                      price: "+$25",
                      desc: "Allow customers to place pickup orders directly through your website with a clean, seamless ordering experience.",
                      features: ["Online pickup ordering", "Pickup time selection", "Simple order flow", "Mobile-friendly UI"]
                    },
                    {
                      name: "Order Ahead + Admin Dashboard",
                      price: "+$50",
                      desc: "Complete order management with a private dashboard for tracking and managing incoming orders in real time.",
                      features: ["Incoming orders dashboard", "Pending / Preparing / Ready statuses", "Customer name + pickup tracking", "Daily order totals", "Popular item insights", "Simple sales analytics"]
                    },
                    {
                      name: "Basic Loyalty Program",
                      price: "+$25",
                      desc: "Simple digital loyalty experience designed to increase repeat customers and customer retention.",
                      features: ["Digital punch card system", "Rewards tracking", "Customer loyalty dashboard UI"]
                    },
                    {
                      name: "Premium Loyalty Experience",
                      price: "+$75",
                      desc: "Advanced loyalty ecosystem with customer accounts, analytics, and automated rewards for modern retention.",
                      features: ["Admin dashboard", "Loyalty analytics", "QR code check-in system", "Customer accounts", "Automated rewards"]
                    },
                  ].map((addon, i) => (
                    <Card key={i} className="bg-transparent border border-border/50 hover:border-accent/50 transition-colors duration-500 rounded-none shadow-none group">
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-xl font-serif italic">{addon.name}</h4>
                          <span className="text-xs tracking-widest uppercase text-accent flex-shrink-0 ml-4">{addon.price}</span>
                        </div>
                        <p className="text-sm text-foreground/60 font-light mb-4">{addon.desc}</p>
                        <ul className="space-y-1">
                          {addon.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs text-foreground/50">
                              <span className="w-1 h-1 bg-accent/60 rounded-full flex-shrink-0" />{f}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Custom Feature Request */}
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
                      {["Custom booking systems", "AI integrations", "Client portals", "Mobile apps", "Loyalty systems", "Advanced animations", "Membership systems", "Custom business software"].map((ex, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-foreground/40">
                          <span className="w-1 h-1 bg-accent/50 rounded-full flex-shrink-0" />{ex}
                        </div>
                      ))}
                    </div>
                    <button
                      data-testid="button-custom-feature"
                      className="min-h-11 w-full border border-foreground/30 px-5 py-3 text-xs uppercase tracking-widest transition-colors duration-300 hover:border-accent hover:text-accent sm:w-auto sm:px-6"
                    >
                      Request Custom Feature
                    </button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="aether">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-foreground text-background border-0 rounded-none shadow-none">
                    <CardContent className="p-8">
                      <span className="text-xs tracking-widest uppercase text-accent mb-2 block">Creative Startup Experience</span>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-2xl font-serif italic">Aether</h4>
                        <span className="text-2xl font-serif italic flex-shrink-0 ml-4">$180</span>
                      </div>
                      <p className="text-background/70 text-sm font-light mb-5">A cinematic startup and technology website designed to feel intelligent, immersive, and operationally alive.</p>
                      <ul className="space-y-1">
                        {["Fully responsive premium design", "Cinematic motion system", "Interactive live operations visuals", "Animated dashboards & infrastructure UI", "Smooth scroll storytelling", "Luxury dark-mode interface styling", "Mobile optimization", "Launch-ready deployment"].map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-background/70">
                            <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-foreground text-background border-0 rounded-none shadow-none">
                    <CardContent className="p-8">
                      <span className="text-xs tracking-widest uppercase text-accent mb-2 block">Premium Startup Package</span>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-2xl font-serif italic">Aether Intelligence Suite</h4>
                        <span className="text-2xl font-serif italic flex-shrink-0 ml-4">$350+</span>
                      </div>
                      <p className="text-background/70 text-sm font-light mb-5">An advanced interactive experience for AI companies, agencies, and technology brands that want their platform to feel like a living system.</p>
                      <ul className="space-y-1">
                        {["Everything in Aether", "Custom interface architecture", "Interactive operational dashboards", "Real-time style activity feeds", "Animated global system maps", "Ambient intelligence panels", "Investor/demo presentation mode", "Priority revisions & support"].map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-background/70">
                            <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    ["Live Operations Dashboard", "+$80", "Interactive operational overview with live activity feeds, system metrics, and animated monitoring panels."],
                    ["Global Infrastructure Map", "+$60", "Animated worldwide synchronization map with live routing visuals and region activity indicators."],
                    ["Ambient Intelligence Panels", "+$45", "Floating AI-style analysis cards with adaptive motion and contextual system insights."],
                    ["Interactive Product Showcase", "+$50", "Cinematic product walkthrough sections with layered transitions and immersive storytelling."],
                    ["Founder / Team Experience", "+$35", "Elegant founder profiles, company philosophy sections, and animated team storytelling layouts."],
                    ["Investor Presentation Mode", "+$75", "Dedicated demo flow designed for pitches, presentations, and cinematic walkthrough videos."],
                    ["Custom Motion System", "+$90+", "Customized animation architecture with floating UI, layered transitions, glow systems, and ambient movement."],
                    ["Full Brand Identity Integration", "+$40", "Typography systems, color direction, visual consistency, and luxury UI refinement tailored to the brand."],
                  ].map(([name, price, desc], i) => (
                    <Card key={i} className="bg-transparent border border-border/50 hover:border-accent/50 transition-colors duration-500 rounded-none shadow-none">
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-xl font-serif italic">{name}</h4>
                          <span className="text-xs tracking-widest uppercase text-accent flex-shrink-0 ml-4">{price}</span>
                        </div>
                        <p className="text-sm text-foreground/60 font-light">{desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Our Process */}
      <section id="process" className="relative overflow-hidden border-t border-border/50 bg-background px-6 py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <p className="mb-4 text-xs uppercase tracking-widest text-accent">Our Process</p>
            <h2 className="mb-6 font-serif text-4xl italic md:text-5xl">From Idea to Launch</h2>
            <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-foreground/60 md:text-base">
              Every project follows a thoughtful process designed to transform ideas into polished digital experiences.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((step) => (
              <motion.article
                key={step.number}
                variants={fadeUp}
                className="group relative min-h-[260px] border border-border/60 bg-[#F3EFEA] p-6 transition-colors duration-500 hover:border-accent/70 hover:bg-background md:p-7"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="font-serif text-6xl italic leading-none text-accent/45 transition-colors duration-500 group-hover:text-accent md:text-7xl">
                    {step.number}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
                </div>
                <h3 className="mb-4 font-serif text-2xl italic">{step.title}</h3>
                <p className="text-sm font-light leading-relaxed text-foreground/60">{step.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About the Founder */}
      <section className="border-t border-border/50 bg-[#F3EFEA] px-6 py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 h-24 w-24 border-l border-t border-accent/60" />
            <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b border-r border-accent/60" />
            <div className="relative aspect-[4/5] overflow-hidden border border-border/60 bg-[#10100d]">
              <img
                src="/solennestudio.png"
                alt="Solenne Studio brand mark"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <p className="mb-4 text-xs uppercase tracking-widest text-accent">Meet the Founder</p>
            <h2 className="mb-3 font-serif text-4xl italic md:text-5xl">Liliana Coste</h2>
            <p className="mb-8 text-xs uppercase tracking-widest text-foreground/45">Founder & Developer</p>

            <div className="space-y-5 text-sm font-light leading-relaxed text-foreground/65 md:text-base">
              <p>I founded Solenne Studios to combine thoughtful design with practical software development.</p>
              <p>
                After earning my Master's degree in Computer Science, I began building custom websites, digital experiences, and business systems that help organizations present themselves professionally and operate more effectively.
              </p>
              <p>
                My background spans full-stack development, automation, data systems, interactive experiences, and user-focused design. Whether it's a wedding venue, hospitality brand, startup, or custom software solution, my goal is always the same: create digital products that feel intentional, polished, and memorable.
              </p>
              <p>
                Every project is approached with a focus on quality, usability, and long-term value rather than one-size-fits-all templates.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {founderHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="border border-border/60 bg-background/70 px-4 py-3 text-sm font-light text-foreground/70"
                >
                  {highlight}
                </div>
              ))}
            </div>

            <a
              href="#inquiry"
              className="mt-10 inline-flex min-h-12 w-full items-center justify-center bg-foreground px-8 text-xs uppercase tracking-widest text-background transition-colors duration-500 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto"
            >
              Start Your Project
            </a>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Design Your Experience</h2>
            <p className="text-foreground/60 uppercase tracking-widest text-sm mb-4">Begin the conversation</p>
            <p className="text-sm text-foreground/50 font-light max-w-xl mx-auto">
              Every project includes the option for a personalized video consultation to discuss your vision, features, branding, and experience goals in detail. Prefer something simpler? Submit your inquiry and we'll reach out directly.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 border border-border/50 bg-[#F3EFEA] p-12"
            >
              <h3 className="text-3xl font-serif italic mb-4">Inquiry Received</h3>
              <p className="text-foreground/70 font-light">We will be in touch shortly to begin crafting your experience.</p>
            </motion.div>
          ) : (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border border-border/50 bg-[#F3EFEA] p-5 sm:p-8 md:p-16">
                {selectedTemplate && (
                  <div className="border border-accent/30 bg-background/60 px-4 py-3 text-xs uppercase tracking-widest text-foreground/60">
                    Selected inquiry: <span className="text-accent">{selectedTemplate === "custom-software" ? "Custom Software" : selectedTemplate}</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="border border-red-900/25 bg-red-50 px-4 py-3 text-sm text-red-950" role="alert">
                    <p className="font-medium">Inquiry not sent.</p>
                    <p className="mt-1 font-light">{submitError}</p>
                  </div>
                )}
                
                {/* Step Indicators */}
                <div className="relative mb-10 flex items-center justify-between gap-2 sm:mb-12">
                  <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-border/50 -z-10" />
                  {Array.from({ length: totalFormSteps }, (_, index) => index + 1).map((step) => (
                    <div 
                      key={step}
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border bg-background text-xs transition-colors duration-500
                        ${formStep >= step ? 'border-accent text-accent' : 'border-border text-foreground/30'}
                        ${formStep === step ? 'ring-4 ring-accent/20' : ''}
                      `}
                    >
                      {step}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {formStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-serif italic mb-2">Select Your Canvas</h3>
                      </div>
                      <FormField
                        control={form.control}
                        name="template"
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                              >
                                {["wedding", "hospitality", "aether", "custom-software", "custom"].map((type) => (
                                  <FormItem key={type} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 hover:border-accent transition-colors cursor-pointer bg-background">
                                    <FormControl>
                                      <RadioGroupItem value={type} className="text-accent" />
                                    </FormControl>
                                    <FormLabel className="font-serif italic text-lg capitalize cursor-pointer">
                                      {type === "custom-software" ? "custom software" : type === "custom" ? "custom website" : type}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {selectedTemplate === "custom" && formStep === 2 && (
                    <motion.div
                      key="custom-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div className="text-center mb-8">
                        <p className="text-xs tracking-widest uppercase text-accent mb-4">Custom Website Inquiry Form</p>
                        <h3 className="text-3xl font-serif italic mb-3">Let's Build Something Unique</h3>
                        <p className="text-sm font-light text-foreground/60 max-w-xl mx-auto">
                          Tell us a bit about your project, vision, and the kind of experience you want to create.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Project Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Full Name</FormLabel>
                                <FormControl>
                                  <Input className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Company / Brand Name</FormLabel>
                                <FormControl>
                                  <Input className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="links"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Website / Social Links</FormLabel>
                                <FormControl>
                                  <Input className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Project Type</h4>
                        <p className="text-sm text-foreground/60 font-light">What type of experience are you looking for?</p>
                        <FormField
                          control={form.control}
                          name="customProjectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {customProjectTypes.map((type) => (
                                    <FormItem key={type} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background hover:border-accent transition-colors">
                                      <FormControl>
                                        <RadioGroupItem value={type} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{type}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {form.watch("customProjectType") === "Other" && (
                          <FormField
                            control={form.control}
                            name="customOtherProjectType"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="Tell us what kind of experience" className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Vision & Inspiration</h4>
                        <FormField
                          control={form.control}
                          name="customVision"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe the vibe, atmosphere, or feeling: cinematic, luxury minimal, futuristic, editorial, dark ambient, elegant, modern tech, immersive storytelling..."
                                  className="min-h-[170px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Features & Functionality</h4>
                        <FormField
                          control={form.control}
                          name="customFeatures"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {customFeatureOptions.map((item) => (
                                  <FormField
                                    key={item}
                                    control={form.control}
                                    name="customFeatures"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), item])
                                                : field.onChange(field.value?.filter((value) => value !== item))
                                            }}
                                            className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                          />
                                        </FormControl>
                                        <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Design References</h4>
                        <div className="border border-dashed border-border/70 bg-background p-8 text-center">
                          <p className="text-sm text-foreground/60 font-light mb-4">Upload inspiration websites, screenshots, Pinterest boards, or references.</p>
                          <Input type="file" multiple className="bg-[#F3EFEA] border-border/50 focus-visible:ring-accent rounded-none font-light" />
                        </div>
                        <FormField
                          control={form.control}
                          name="designReferences"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea placeholder="Or paste links here..." className="min-h-[120px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="launchTimeline"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-xl font-serif italic">Timeline</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                                  {["ASAP", "1-2 Weeks", "1 Month", "Flexible", "Just Exploring"].map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={item} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="budgetRange"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-xl font-serif italic">Budget Range</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                                  {["$50-100", "$100-250", "$250-500", "$500+", "Custom Quote"].map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={item} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Consultation Preference</h4>
                        <FormField
                          control={form.control}
                          name="customConsultationPreference"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {["Video Call", "Discord", "Email", "Text Message"].map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={item} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Anything Else?</h4>
                        <FormField
                          control={form.control}
                          name="anythingElse"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea placeholder="Tell us anything important about your project." className="min-h-[150px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  )}

                  {selectedTemplate === "custom-software" && formStep === 2 && (
                    <motion.div
                      key="software-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div className="text-center mb-8">
                        <p className="text-xs tracking-widest uppercase text-accent mb-4">Custom Programs & Software Inquiry Form</p>
                        <h3 className="text-3xl font-serif italic mb-3">Tell us about your project</h3>
                        <p className="text-sm font-light text-foreground/60 max-w-xl mx-auto">
                          Custom software, automation, and operational systems designed around your workflow, business, or idea.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Contact Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Full Name</FormLabel>
                                <FormControl>
                                  <Input className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Company / Brand (Optional)</FormLabel>
                                <FormControl>
                                  <Input className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="preferredContact"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Discord / Preferred Contact</FormLabel>
                                <FormControl>
                                  <Input className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Project Type</h4>
                        <p className="text-sm text-foreground/60 font-light">What are you looking to build?</p>
                        <FormField
                          control={form.control}
                          name="softwareProjectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {softwareProjectTypes.map((type) => (
                                    <FormItem key={type} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background hover:border-accent transition-colors">
                                      <FormControl>
                                        <RadioGroupItem value={type} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{type}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Preferred Language / Stack</h4>
                        <p className="text-sm text-foreground/60 font-light">Preferred Technology</p>
                        <FormField
                          control={form.control}
                          name="softwareStack"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {softwareStacks.map((stack) => (
                                    <FormItem key={stack} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background hover:border-accent transition-colors">
                                      <FormControl>
                                        <RadioGroupItem value={stack} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{stack}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Project Description</h4>
                        <p className="text-sm text-foreground/60 font-light">Describe what you want the software/program to do.</p>
                        <FormField
                          control={form.control}
                          name="softwareDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Automate repetitive tasks, organize files, process Excel/CSV data, build an internal dashboard, realtime monitoring, AI workflow assistance, booking or management system, custom utility program..."
                                  className="min-h-[170px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Features & Requirements</h4>
                        <p className="text-sm text-foreground/60 font-light">Which features are important?</p>
                        <FormField
                          control={form.control}
                          name="softwareFeatures"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {softwareFeatureOptions.map((item) => (
                                  <FormField
                                    key={item}
                                    control={form.control}
                                    name="softwareFeatures"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), item])
                                                : field.onChange(field.value?.filter((value) => value !== item))
                                            }}
                                            className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                          />
                                        </FormControl>
                                        <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Existing Materials</h4>
                        <p className="text-sm text-foreground/60 font-light">Do you already have:</p>
                        <FormField
                          control={form.control}
                          name="softwareMaterials"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {softwareMaterials.map((item) => (
                                  <FormField
                                    key={item}
                                    control={form.control}
                                    name="softwareMaterials"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), item])
                                                : field.onChange(field.value?.filter((value) => value !== item))
                                            }}
                                            className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                          />
                                        </FormControl>
                                        <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Inspiration / References</h4>
                        <p className="text-sm text-foreground/60 font-light">Any references, screenshots, or examples?</p>
                        <FormField
                          control={form.control}
                          name="softwareReferences"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Paste websites, GitHub projects, UI inspiration, screenshots, or workflow examples."
                                  className="min-h-[140px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="softwareTimeline"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-xl font-serif italic">Timeline</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                                  {["ASAP", "Within 1 Week", "2-4 Weeks", "Flexible", "Just Exploring"].map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={item} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="softwareBudget"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-xl font-serif italic">Budget Range</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                                  {["$40-100", "$100-250", "$250-500", "$500+", "Unsure / Need Guidance"].map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={item} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Final Question</h4>
                        <p className="text-sm text-foreground/60 font-light">What problem should this software solve for you?</p>
                        <FormField
                          control={form.control}
                          name="softwareProblem"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea className="min-h-[160px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  )}

                  {selectedTemplate === "hospitality" && formStep === 2 && (
                    <motion.div
                      key="hospitality-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div className="text-center mb-8">
                        <p className="text-xs tracking-widest uppercase text-accent mb-4">Hospitality / Restaurant Inquiry Form</p>
                        <h3 className="text-3xl font-serif italic mb-3">Tell us about your space</h3>
                        <p className="text-sm font-light text-foreground/60 max-w-xl mx-auto">
                          We design hospitality experiences that capture the atmosphere, energy, and identity of your brand.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Business Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="hospitalityBusinessName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Business Name</FormLabel>
                                <FormControl>
                                  <Input className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hospitalityContactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Contact Name</FormLabel>
                                <FormControl>
                                  <Input className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hospitalityEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hospitalityBusinessType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-light text-sm">Business Type</FormLabel>
                                <FormControl>
                                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 gap-3">
                                    {hospitalityBusinessTypes.map((type) => (
                                      <FormItem key={type} className="flex items-center space-x-3 space-y-0 border border-border/50 p-3 bg-background">
                                        <FormControl>
                                          <RadioGroupItem value={type} className="text-accent" />
                                        </FormControl>
                                        <FormLabel className="font-light text-sm cursor-pointer">{type}</FormLabel>
                                      </FormItem>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {[
                        ["Brand Atmosphere", "What feeling should the website create?", "hospitalityAtmosphere", hospitalityAtmospheres],
                        ["Features & Functionality", "Which experiences are you interested in?", "hospitalityFeatures", hospitalityExperienceFeatures],
                        ["Operational Needs", "What matters most to your business?", "hospitalityNeeds", hospitalityOperationalNeeds],
                        ["Menu & Branding Assets", "Do you already have:", "hospitalityAssets", hospitalityAssets],
                      ].map(([title, prompt, fieldName, options]) => (
                        <div key={title as string} className="space-y-6">
                          <h4 className="text-xl font-serif italic">{title as string}</h4>
                          <p className="text-sm text-foreground/60 font-light">{prompt as string}</p>
                          <FormField
                            control={form.control}
                            name={fieldName as any}
                            render={() => (
                              <FormItem>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {(options as string[]).map((item) => (
                                    <FormField
                                      key={item}
                                      control={form.control}
                                      name={fieldName as any}
                                      render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...(field.value || []), item])
                                                  : field.onChange(field.value?.filter((value: string) => value !== item))
                                              }}
                                              className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                            />
                                          </FormControl>
                                          <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                        </FormItem>
                                      )}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Inspiration</h4>
                        <p className="text-sm text-foreground/60 font-light">Inspiration websites, restaurants, or brands.</p>
                        <FormField
                          control={form.control}
                          name="hospitalityInspiration"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Paste websites, Instagram pages, Pinterest boards, or design inspiration."
                                  className="min-h-[140px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Customer Experience</h4>
                        <p className="text-sm text-foreground/60 font-light">How should customers interact with your brand online?</p>
                        <FormField
                          control={form.control}
                          name="hospitalityCustomerExperience"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Effortless reservations, luxury digital menu, immersive atmosphere, cinematic storytelling, modern ordering experience, social-first visuals..."
                                  className="min-h-[160px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="hospitalityTimeline"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-xl font-serif italic">Timeline</FormLabel>
                              <p className="text-sm text-foreground/60 font-light">Desired launch timeframe</p>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                                  {["ASAP", "1-2 Weeks", "1 Month", "Flexible"].map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={item} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="hospitalityBudget"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-xl font-serif italic">Budget Range</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                                  {["$50-100", "$100-250", "$250-500", "Premium Custom Build", "Unsure / Need Guidance"].map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={item} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Final Brand Question</h4>
                        <p className="text-sm text-foreground/60 font-light">What should guests feel the moment they open your website?</p>
                        <FormField
                          control={form.control}
                          name="hospitalityGuestFeeling"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea className="min-h-[160px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  )}

                  {selectedTemplate === "wedding" && formStep === 2 && (
                    <motion.div
                      key="wedding-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div className="text-center mb-8">
                        <p className="text-xs tracking-widest uppercase text-accent mb-4">Wedding Inquiry Form</p>
                        <h3 className="text-3xl font-serif italic mb-3">Tell us about your celebration</h3>
                        <p className="text-sm font-light text-foreground/60 max-w-xl mx-auto">
                          Every wedding weekend is different. We design around your atmosphere, guests, and experience.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Couple Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            ["coupleNames", "Couple Names", "Emily & Ryan", "text"],
                            ["weddingEmail", "Contact Email", "", "email"],
                            ["weddingDate", "Wedding Date", "", "date"],
                            ["weddingLocation", "Wedding Location / Venue", "", "text"],
                          ].map(([name, label, placeholder, type]) => (
                            <FormField
                              key={name}
                              control={form.control}
                              name={name as any}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-light text-sm">{label}</FormLabel>
                                  <FormControl>
                                    <Input type={type} placeholder={placeholder} className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormField
                          control={form.control}
                          name="weddingGuestCount"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="font-light text-sm">Estimated Guest Count</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {weddingGuestCounts.map((count) => (
                                    <FormItem key={count} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={count} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{count}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {[
                        ["Wedding Style / Atmosphere", "What feeling should the website create?", "weddingAtmosphere", weddingAtmospheres],
                        ["Features", "Which experiences are you interested in?", "weddingFeatures", weddingExperienceFeatures],
                        ["Guest Experience", "What matters most to you?", "weddingPriorities", weddingGuestPriorities],
                        ["Content Collection", "Do you already have:", "weddingAssets", weddingContentAssets],
                      ].map(([title, prompt, fieldName, options]) => (
                        <div key={title as string} className="space-y-6">
                          <h4 className="text-xl font-serif italic">{title as string}</h4>
                          <p className="text-sm text-foreground/60 font-light">{prompt as string}</p>
                          <FormField
                            control={form.control}
                            name={fieldName as any}
                            render={() => (
                              <FormItem>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {(options as string[]).map((item) => (
                                    <FormField
                                      key={item}
                                      control={form.control}
                                      name={fieldName as any}
                                      render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...(field.value || []), item])
                                                  : field.onChange(field.value?.filter((value: string) => value !== item))
                                              }}
                                              className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                            />
                                          </FormControl>
                                          <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                        </FormItem>
                                      )}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Inspiration</h4>
                        <p className="text-sm text-foreground/60 font-light">Pinterest / Reference Links</p>
                        <FormField
                          control={form.control}
                          name="weddingInspiration"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Paste Pinterest boards, wedding websites, Instagram links, or screenshots."
                                  className="min-h-[140px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Wedding Weekend Details</h4>
                        <p className="text-sm text-foreground/60 font-light">Are guests traveling from out of town?</p>
                        <FormField
                          control={form.control}
                          name="weddingTravelStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  {["Yes", "No", "Most Guests Are Traveling"].map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={item} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {(form.watch("weddingTravelStatus") === "Yes" || form.watch("weddingTravelStatus") === "Most Guests Are Traveling") && (
                          <FormField
                            control={form.control}
                            name="weddingTravelFeatures"
                            render={() => (
                              <FormItem className="pt-2">
                                <FormLabel className="text-sm font-light">Would you like travel assistance features?</FormLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                  {weddingTravelFeatures.map((item) => (
                                    <FormField
                                      key={item}
                                      control={form.control}
                                      name="weddingTravelFeatures"
                                      render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...(field.value || []), item])
                                                  : field.onChange(field.value?.filter((value) => value !== item))
                                              }}
                                              className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                            />
                                          </FormControl>
                                          <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                        </FormItem>
                                      )}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="weddingTimeline"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-xl font-serif italic">Desired Timeline</FormLabel>
                              <p className="text-sm text-foreground/60 font-light">When would you like the website ready?</p>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                                  {["ASAP", "Within 1 Week", "Within 1 Month", "Flexible"].map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={item} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="weddingBudget"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-xl font-serif italic">Budget</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                                  {["$80-150", "$150-300", "$300-500", "Luxury Custom Experience", "Unsure / Need Guidance"].map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <RadioGroupItem value={item} className="text-accent" />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-serif italic">Final Emotional Question</h4>
                        <p className="text-sm text-foreground/60 font-light">What do you want guests to remember most about your wedding weekend?</p>
                        <FormField
                          control={form.control}
                          name="weddingMemory"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea className="min-h-[160px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  )}

                  {selectedTemplate !== "custom" && selectedTemplate !== "custom-software" && selectedTemplate !== "hospitality" && selectedTemplate !== "wedding" && formStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-serif italic mb-2">Curate Features</h3>
                      </div>
                      <FormField
                        control={form.control}
                        name="features"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {["Live Operations Dashboard", "Global Infrastructure Map", "Ambient Intelligence Panels", "Investor Presentation Mode"].map((item) => (
                                <FormField
                                  key={item}
                                  control={form.control}
                                  name="features"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-border/50 p-4 bg-background">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), item])
                                              : field.onChange(field.value?.filter((value) => value !== item))
                                          }}
                                          className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                        />
                                      </FormControl>
                                      <FormLabel className="font-light text-sm cursor-pointer">{item}</FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-serif italic mb-2">Connection Preference</h3>
                      </div>
                      <FormField
                        control={form.control}
                        name="consultation"
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col gap-4"
                              >
                                {["video", "email", "text"].map((type) => (
                                  <FormItem key={type} className="flex items-center space-x-3 space-y-0 border border-border/50 p-4 bg-background hover:border-accent transition-colors cursor-pointer">
                                    <FormControl>
                                      <RadioGroupItem value={type} className="text-accent" />
                                    </FormControl>
                                    <FormLabel className="font-light text-sm capitalize cursor-pointer">
                                      {type === 'video' ? 'Video Consultation (Recommended)' : type === 'email' ? 'Email Follow-up' : 'Text Message'}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {formStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-serif italic mb-2">Aesthetic Vision</h3>
                        <p className="text-sm font-light text-foreground/60">Share links to moodboards, Pinterest, or websites you admire.</p>
                      </div>
                      <FormField
                        control={form.control}
                        name="inspiration"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea 
                                placeholder="Paste links or describe your vibe here..." 
                                className="min-h-[150px] bg-background border-border/50 focus-visible:ring-accent rounded-none resize-none font-light"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {formStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-serif italic mb-2">Final Details</h3>
                      </div>
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif italic text-lg">Name</FormLabel>
                              <FormControl>
                                <Input className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif italic text-lg">Email</FormLabel>
                              <FormControl>
                                <Input type="email" className="bg-background border-border/50 focus-visible:ring-accent rounded-none h-12 font-light" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col-reverse gap-3 border-t border-border/50 pt-8 sm:flex-row sm:justify-between">
                  {formStep > 1 ? (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="h-12 w-full rounded-none border-foreground/20 px-6 text-xs font-light uppercase tracking-widest hover:border-accent hover:text-accent sm:w-auto sm:px-8"
                    >
                      Back
                    </Button>
                  ) : <div className="hidden sm:block"></div>}
                  
                  {formStep < totalFormSteps ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="h-12 w-full rounded-none bg-foreground px-6 text-xs font-light uppercase tracking-widest text-background hover:bg-accent sm:w-auto sm:px-8"
                    >
                      Continue
                    </Button>
                  ) : (
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
                      <Button 
                        type="submit"
                        disabled={isSending}
                        className="h-12 w-full rounded-none bg-foreground px-6 text-xs font-light uppercase tracking-widest text-background hover:bg-accent sm:w-auto sm:px-8"
                      >
                        {isSending ? "Sending..." : selectedTemplate === "custom-software" ? "Start Software Inquiry \u2192" : selectedTemplate === "hospitality" ? "Submit Hospitality Inquiry \u2192" : selectedTemplate === "wedding" ? "Submit Wedding Inquiry \u2192" : selectedTemplate === "custom" ? "Begin Project Inquiry \u2192" : "Submit Inquiry"}
                      </Button>
                      {selectedTemplate === "custom" && (
                        <p className="max-w-sm text-left text-xs font-light text-foreground/45 sm:text-right">
                          Free revisions, collaborative updates, and personalized creative direction included with every project.
                        </p>
                      )}
                      {selectedTemplate === "custom-software" && (
                        <p className="max-w-sm text-left text-xs font-light text-foreground/45 sm:text-right">
                          Every project is built specifically around your workflow, goals, and operational needs.
                        </p>
                      )}
                      {selectedTemplate === "hospitality" && (
                        <p className="max-w-sm text-left text-xs font-light text-foreground/45 sm:text-right">
                          Premium hospitality websites are shaped around atmosphere, guest experience, and operational clarity.
                        </p>
                      )}
                      {selectedTemplate === "wedding" && (
                        <p className="max-w-sm text-left text-xs font-light text-foreground/45 sm:text-right">
                          Your wedding website is shaped around your celebration, guests, and the feeling of the weekend.
                        </p>
                      )}
                    </div>
                  )}
                </div>

              </form>
            </Form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/50 text-center">
        <h2 className="text-3xl font-serif italic mb-6">solennestudios</h2>
        <div className="mb-8 flex flex-col items-center justify-center gap-3 text-xs uppercase tracking-widest text-foreground/50 sm:flex-row sm:gap-8">
          {["Instagram", "Pinterest", "Contact"].map((label) => (
            <button
              key={label}
              type="button"
              onClick={openComingSoon}
              className="min-h-11 px-3 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-foreground/30 font-light">&copy; {new Date().getFullYear()} solennestudios. All rights reserved.</p>
      </footer>
    </div>
  );
}
