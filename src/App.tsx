import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Rocket, 
  Play, 
  Star, 
  Megaphone, 
  Target, 
  PenTool, 
  Search, 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Twitter,
  ChevronDown,
  Quote,
  Clock,
  Users,
  BarChart3,
  Globe
} from "lucide-react";

// ─── CONSTANTS ───
const B = "#1A56DB"; // Brand Blue
const G9 = "#1A1A2E"; // Dark Navy
const G7 = "#3D3D5C"; // Muted Navy
const G5 = "#6B6B8A"; // Grayish Navy
const G3 = "#C2C2D6"; // Light Gray
const G1 = "#F4F4FA"; // Background Gray

const CLIENTS = ["Flipkart", "boAt", "Tata CLiQ", "Samsung India", "Mamaearth", "Nykaa", "Meesho", "Puma India", "Wow Skin", "Sugar Cosmetics", "UrbanClap", "Mivi Audio", "Kapiva", "Beardo"];

const SVCS = [
  { id: "ugc", icon: <Play className="w-6 h-6" />, title: "UGC Content Production", short: "Authentic creator videos that convert at every funnel stage.", color: B, bg: "#EBF2FF", tagline: "Real People. Real Content. Real Conversions.", features: ["Unboxing & Review Videos", "Testimonials & Social Proof", "Tutorial & Demo Reels", "Lifestyle Content", "UGC for Meta, Google & YouTube", "Hook Testing & Multi-Variant"], results: [{ n: "3-5x", l: "Higher CTR" }, { n: "67%", l: "Lower CPA" }, { n: "48hr", l: "Avg delivery" }] },
  { id: "influencer", icon: <Star className="w-6 h-6" />, title: "Influencer Marketing", short: "End-to-end influencer campaigns from nano to celebrity.", color: "#7C3AED", bg: "#F3E8FF", tagline: "The Right Voice. The Right Audience.", features: ["Nano, Micro & Macro Campaigns", "Celebrity Tie-ups", "Instagram Reels & Stories", "YouTube Integrations", "Brand Safety Vetting", "Full Campaign Management"], results: [{ n: "500+", l: "Vetted influencers" }, { n: "1B+", l: "Combined reach" }, { n: "4.2%", l: "Avg engagement" }] },
  { id: "social-ads", icon: <Megaphone className="w-6 h-6" />, title: "Social Media Ads", short: "Paid social on Meta, Instagram & YouTube built on data.", color: "#F97316", bg: "#FFF4ED", tagline: "Scroll-Stopping Ads. Measurable ROI.", features: ["Meta & Instagram Ads", "YouTube & Google Display", "Retargeting Campaigns", "Creative A/B Testing", "Audience Segmentation", "Daily Budget Optimisation"], results: [{ n: "4.8x", l: "Average ROAS" }, { n: "40%", l: "Lower CPM" }, { n: "2x", l: "Conversion uplift" }] },
  { id: "performance", icon: <Target className="w-6 h-6" />, title: "Performance Marketing", short: "Full-funnel strategies engineered around ROAS and CPA.", color: "#059669", bg: "#ECFDF5", tagline: "Every Rupee Accountable.", features: ["Google Search & Shopping", "Meta Performance Campaigns", "YouTube Video Funnels", "Landing Page CRO", "ROAS & CPA Optimisation", "Weekly Performance Reviews"], results: [{ n: "120+", l: "Brands scaled" }, { n: "₹50Cr+", l: "Ad spend managed" }, { n: "3.8x", l: "Avg ROAS" }] },
  { id: "content", icon: <PenTool className="w-6 h-6" />, title: "Content Marketing", short: "Blogs, copy and brand storytelling that build authority.", color: "#0EA5E9", bg: "#E0F2FE", tagline: "Content That Ranks and Converts.", features: ["SEO Blog Writing", "Social Media Copywriting", "Email Campaigns", "Case Studies & Whitepapers", "Brand Storytelling", "Content Calendar Strategy"], results: [{ n: "3x", l: "Organic traffic growth" }, { n: "60%", l: "More time-on-site" }, { n: "45%", l: "Higher email opens" }] },
  { id: "seo", icon: <Search className="w-6 h-6" />, title: "SEO", short: "Technical SEO and link building that improves rankings.", color: "#DC2626", bg: "#FEF2F2", tagline: "Rank Higher. Grow Organically.", features: ["Full Technical Audit", "Keyword Research", "On-Page Optimisation", "Off-Page & Link Building", "Local SEO", "Monthly Ranking Reports"], results: [{ n: "2.5x", l: "Organic traffic" }, { n: "Top 5", l: "Keyword rankings" }, { n: "35%", l: "More organic leads" }] },
  { id: "creative", icon: <Palette className="w-6 h-6" />, title: "Creative Production", short: "Ad creatives and motion graphics built to perform.", color: "#9333EA", bg: "#FAF5FF", tagline: "Visuals That Stop Scrolls.", features: ["Static Ad Creative Design", "Motion Graphics", "Video Ad Editing", "Brand Identity Design", "Product Photography", "Creative Briefs"], results: [{ n: "2.8x", l: "Higher engagement" }, { n: "5 days", l: "Turnaround" }, { n: "100+", l: "Creatives/month" }] },
];

const STATS = [{ n: "500+", l: "Verified Creators" }, { n: "1B+", l: "Campaign Views" }, { n: "4.8x", l: "Avg ROAS" }, { n: "120+", l: "Brands Scaled" }];

const TESTIMONIALS = [
  { name: "Priya Mehta", role: "Founder, Plush & Co.", text: "Our ROAS went from 1.8x to 5.2x in 60 days purely through their UGC ad creatives. Best agency we've worked with.", avatar: "PM", col: B },
  { name: "Rahul Sharma", role: "CMO, DermGlow India", text: "They genuinely understand the Indian D2C market. Every UGC piece resonates with our audience and converts consistently.", avatar: "RS", col: "#7C3AED" },
  { name: "Ananya Singh", role: "Marketing Head, FitCore", text: "20 on-brand, converting UGC videos in month one and a campaign that cut our CPA by 40%. Remarkable results.", avatar: "AS", col: "#F97316" },
  { name: "Siddharth V.", role: "CEO, UrbanNest", text: "Influencer campaigns drove Rs 2.4Cr in Q1 alone. They handled everything — sourcing, briefs, production, reporting.", avatar: "SV", col: "#059669" },
];

const CASE_STUDIES = [
  { brand: "DermGlow India", cat: "Skincare D2C", result: "5.2x ROAS", sub: "UGC Testimonials + Meta Ads — 60 days", col: B, bg: "#EBF2FF" },
  { brand: "FitCore", cat: "Health & Fitness", result: "3.1x CVR", sub: "Creator Reels + Google Performance Max", col: "#7C3AED", bg: "#F3E8FF" },
  { brand: "UrbanNest", cat: "Home Decor", result: "Rs 2.4Cr Q1", sub: "Influencer Campaigns + Performance Ads", col: "#F97316", bg: "#FFF4ED" },
  { brand: "SipFresh", cat: "Beverage D2C", result: "400% Growth", sub: "Lifestyle UGC + Meta Scale Campaigns", col: "#059669", bg: "#ECFDF5" },
];

const PROCESS = [
  { n: "01", t: "Discovery & Brand Audit", d: "We analyse your brand, product, current marketing and competitive landscape before any spending." },
  { n: "02", t: "Strategy & Creative Blueprint", d: "Custom content formats, hook angles, creator briefs and ad structures aligned to your goals." },
  { n: "03", t: "Execution & Production", d: "Creators shoot. Every deliverable passes our quality, compliance and brand-safety review." },
  { n: "04", t: "Launch & Optimisation", d: "Campaigns launch with A/B tests. We monitor daily, cut losers fast and scale winners." },
  { n: "05", t: "Reporting & Growth Review", d: "Weekly dashboards and monthly strategy reviews. Full transparency on every metric." },
];

const PRICING = [
  { plan: "Starter", price: "Rs 49,999", period: "/mo", desc: "For early-stage D2C brands", hot: false, cta: "Get Started", features: ["8 UGC Videos/month", "2 Creator Profiles", "Meta Ad Setup", "Monthly Report", "Account Manager"] },
  { plan: "Growth", price: "Rs 1,19,999", period: "/mo", desc: "The full engine for scaling", hot: true, cta: "Most Popular", features: ["20 UGC Videos/month", "6 Creator Profiles", "Meta + Google Campaigns", "1 Influencer Campaign/mo", "Creative Testing Lab", "Weekly Dashboard", "Performance Optimisation"] },
  { plan: "Scale", price: "Custom", period: "", desc: "Enterprise & agency partnerships", hot: false, cta: "Talk to Us", features: ["Unlimited UGC Volume", "Dedicated Creator Pod", "Full-Funnel Strategy", "Celebrity Influencers", "White-label Option", "24/7 Priority Support"] },
];

const CREATORS = [
  { name: "Sneha R.", niche: "Beauty", handle: "@snehacreates", flw: "240K", bg: "#FFE4EC", tc: "#C42D5A" },
  { name: "Arjun M.", niche: "Fitness", handle: "@fitwitharjun", flw: "180K", bg: "#E4F5FF", tc: "#0A72B8" },
  { name: "Kavya S.", niche: "Food", handle: "@kavyaeats", flw: "310K", bg: "#FFF3E0", tc: "#B85C00" },
  { name: "Rohit D.", niche: "Tech", handle: "@techwithrohit", flw: "420K", bg: "#E8F5E9", tc: "#1B7A3A" },
  { name: "Priya K.", niche: "Fashion", handle: "@priyastyle", flw: "155K", bg: "#F3E8FF", tc: "#7C3AED" },
  { name: "Dev P.", niche: "Home", handle: "@devdecors", flw: "92K", bg: "#E0F7FA", tc: "#00838F" },
];

const FAQS = [
  { q: "How quickly can you start producing UGC?", a: "We begin creator casting within 48 hours of onboarding. First deliverables are ready within 7-10 business days." },
  { q: "Do you only work with D2C brands?", a: "D2C and e-commerce are our sweet spot but we work with any consumer brand selling online — apps, FMCG, and service businesses too." },
  { q: "How do you vet your creator network?", a: "Every creator is manually reviewed across 30+ parameters including audience quality, engagement rate and brand safety record." },
  { q: "Can UGC be used for paid ads?", a: "Yes. All UGC includes usage rights for paid advertising on Meta, Google and YouTube. Ad-usage rights are in every creator agreement." },
  { q: "What is the minimum ad spend budget?", a: "We recommend minimum Rs 50,000/month for Meta campaigns to generate enough data for meaningful optimisation." },
  { q: "Do you offer white-label services?", a: "Yes. Our Scale plan includes white-label partnership options for other Indian digital agencies." },
];

// ─── COMPONENTS ───

function Counter({ target }: { target: string }) {
  const num = parseFloat(target.replace(/[^\d.]/g, ""));
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    const interval = setInterval(() => {
      start += increment;
      if (start >= num) {
        setVal(num);
        clearInterval(interval);
      } else {
        setVal(Math.floor(start));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, num]);

  const prefix = target.includes("₹") ? "₹" : target.includes("Rs") ? "Rs " : "";
  const suffix = target.includes("Cr") ? "Cr+" : target.includes("B+") ? "B+" : target.includes("x") ? "x" : target.includes("+") ? "+" : "";

  return <span ref={ref as any}>{prefix}{val}{suffix}</span>;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-brand-light rounded-full px-4 py-1.5 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
      <span className="text-[11px] font-bold text-brand tracking-widest uppercase">{children}</span>
    </div>
  );
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer" onClick={onClick}>
      <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
        <img 
          src="/logo.png" 
          alt="Brand Propel Studio" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to icon if image is missing
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"></path><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"></path></svg>';
          }}
        />
      </div>
      <div>
        <div className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">Brand Propel Studio</div>
        <div className="text-[9px] text-slate-500 tracking-widest uppercase font-semibold">UGC & Performance Marketing</div>
      </div>
    </div>
  );
}

function Ticker() {
  return (
    <div className="bg-slate-900 py-4 overflow-hidden border-t-2 border-brand">
      <div className="animate-tick whitespace-nowrap inline-block">
        {[...CLIENTS, ...CLIENTS].map((c, i) => (
          <span key={i} className="mr-12 text-xs font-bold text-white/40 uppercase tracking-widest">
            {c}<span className="text-brand ml-12">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Navbar({ page, setPage, scrolled }: { page: string, setPage: (p: string) => void, scrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[500] h-16 px-[5%] flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm" : "bg-transparent"}`}>
      <Logo onClick={() => setPage("home")} />
      
      <div className="hidden md:flex gap-8 items-center">
        <button className={`text-sm font-semibold transition-colors ${page === "home" ? "text-brand" : "text-slate-600 hover:text-brand"}`} onClick={() => setPage("home")}>Home</button>
        <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
          <button className={`text-sm font-semibold flex items-center gap-1 transition-colors ${page.startsWith("svc") ? "text-brand" : "text-slate-600 hover:text-brand"}`}>
            Services <ChevronDown className="w-3 h-3" />
          </button>
          <AnimatePresence>
            {drop && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-[-10px] pt-2 z-[600]"
              >
                <div className="bg-white border border-slate-100 rounded-xl py-2 shadow-xl min-w-[220px]">
                  {SVCS.map(s => (
                    <button 
                      key={s.id} 
                      onClick={() => { setPage("svc-" + s.id); setDrop(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand flex items-center gap-3 transition-colors"
                    >
                      <span className="text-brand opacity-80">{s.icon}</span>
                      {s.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className={`text-sm font-semibold transition-colors ${page === "work" ? "text-brand" : "text-slate-600 hover:text-brand"}`} onClick={() => setPage("work")}>Our Work</button>
        <button className={`text-sm font-semibold transition-colors ${page === "creators" ? "text-brand" : "text-slate-600 hover:text-brand"}`} onClick={() => setPage("creators")}>Creators</button>
        <button className={`text-sm font-semibold transition-colors ${page === "contact" ? "text-brand" : "text-slate-600 hover:text-brand"}`} onClick={() => setPage("contact")}>Contact</button>
      </div>

      <div className="flex gap-3 items-center">
        <button className="hidden sm:inline-flex px-5 py-2 rounded-lg border-2 border-brand text-brand font-bold text-xs hover:bg-brand-light transition-all" onClick={() => setPage("creators")}>For Creators</button>
        <button className="px-5 py-2 rounded-lg bg-brand text-white font-bold text-xs hover:bg-brand-dark shadow-lg shadow-brand/20 transition-all" onClick={() => setPage("contact")}>Free Audit</button>
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[600] p-6 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <Logo onClick={() => { setPage("home"); setIsOpen(false); }} />
              <button onClick={() => setIsOpen(false)}><X className="text-slate-900" /></button>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              {["Home", "Work", "Creators", "Contact"].map(item => (
                <button 
                  key={item} 
                  className="text-2xl font-bold text-slate-900 text-left"
                  onClick={() => { setPage(item.toLowerCase()); setIsOpen(false); }}
                >
                  {item}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Services</div>
              {SVCS.map(s => (
                <button 
                  key={s.id} 
                  className="text-lg font-bold text-slate-600 text-left flex items-center gap-3"
                  onClick={() => { setPage("svc-" + s.id); setIsOpen(false); }}
                >
                  <span className="text-brand">{s.icon}</span>
                  {s.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Foot({ setPage }: { setPage: (p: string) => void }) {
  const nav = (p: string) => { setPage(p); window.scrollTo({ top: 0 }); };
  return (
    <footer className="bg-slate-900 pt-16 pb-8 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <Logo onClick={() => nav("home")} />
          <p className="text-sm text-slate-400 leading-relaxed mt-6 max-w-xs">India's leading UGC and performance marketing studio built to scale D2C brands.</p>
          <div className="flex gap-3 mt-8">
            {[Instagram, Youtube, Linkedin, Twitter].map((Icon, i) => (
              <button key={i} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-brand hover:text-white transition-all">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
        {[
          { t: "Services", ls: [{ l: "UGC Production", p: "svc-ugc" }, { l: "Influencer Marketing", p: "svc-influencer" }, { l: "Social Media Ads", p: "svc-social-ads" }, { l: "Performance Marketing", p: "svc-performance" }, { l: "Content Marketing", p: "svc-content" }, { l: "SEO", p: "svc-seo" }] },
          { t: "Company", ls: [{ l: "About Us", p: "about" }, { l: "Our Work", p: "work" }, { l: "Blog", p: "blog" }, { l: "Creators", p: "creators" }, { l: "Contact", p: "contact" }] },
          { t: "Contact", ls: [{ l: "hello@brandpropelstudio.in", p: "" }, { l: "+91 98765 43210", p: "" }, { l: "Mumbai, India", p: "" }, { l: "Bangalore, India", p: "" }] },
        ].map((col, i) => (
          <div key={i}>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6">{col.t}</div>
            <div className="flex flex-col gap-3">
              {col.ls.map(l => (
                <button 
                  key={l.l} 
                  onClick={() => l.p && nav(l.p)} 
                  className={`text-sm text-slate-400 text-left transition-colors ${l.p ? "hover:text-white" : "cursor-default"}`}
                >
                  {l.l}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs text-slate-600">© 2025 Brand Propel Studio. All rights reserved. Made with love in India</span>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms", "Refund Policy"].map(l => (
            <button key={l} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{l}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── PAGES ───

function Home({ setPage }: { setPage: (p: string) => void }) {
  const [heroRef, heroInView] = useInView(0);
  const [svcRef, svcInView] = useInView(0.05);
  const [workRef, workInView] = useInView(0.05);
  const [processRef, processInView] = useInView(0.05);
  const [creatorRef, creatorInView] = useInView(0.05);
  const [testRef, testInView] = useInView(0.05);
  const [priceRef, priceInView] = useInView(0.05);

  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIdx(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef as any} className="min-h-screen flex items-center bg-gradient-to-br from-brand-light via-white to-[#F2F5FF] px-[5%] pt-24 pb-16 relative overflow-hidden">
        <div className="absolute right-[-200px] top-[5%] w-[700px] h-[700px] rounded-full bg-radial-gradient from-brand/5 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white border border-brand-muted rounded-full px-4 py-2 text-xs font-bold text-brand shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              India's Leading UGC and Influencer Marketing Studio
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(38px,5.5vw,72px)] font-extrabold leading-[1.05] tracking-tight text-slate-900 mb-6"
          >
            Content That <span className="text-brand">Connects.</span><br />
            Ads That <span className="text-brand">Convert.</span><br />
            <span className="text-slate-500 text-[0.85em]">Brands That Scale.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed max-w-xl mb-10"
          >
            We help Indian D2C brands grow through <strong>UGC video production</strong>, <strong>influencer marketing</strong>, and <strong>high-performance social ads</strong> — all under one roof.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button className="px-8 py-4 rounded-xl bg-brand text-white font-bold text-lg hover:bg-brand-dark shadow-xl shadow-brand/20 transition-all" onClick={() => setPage("contact")}>Start Scaling Today</button>
            <button className="px-8 py-4 rounded-xl border-2 border-brand text-brand font-bold text-lg hover:bg-brand-light transition-all" onClick={() => setPage("work")}>View Case Studies</button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-10"
          >
            {STATS.map((s, i) => (
              <div key={i} className="border-l-4 border-brand pl-4">
                <div className="text-2xl font-extrabold text-brand leading-none mb-1"><Counter target={s.n} /></div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="hidden lg:flex absolute right-[5%] top-1/2 -translate-y-1/2 flex-col gap-6 z-10">
          {[
            { l: "Live Campaign", v: "DermGlow x 18 Creators", ic: <Play className="w-5 h-5" />, s: "+234% CTR", c: "text-brand" },
            { l: "ROAS This Month", v: "5.8x", ic: <BarChart3 className="w-5 h-5" />, s: "vs 1.9x before", c: "text-emerald-600" },
            { l: "UGC Delivered", v: "20 Videos", ic: <CheckCircle2 className="w-5 h-5" />, s: "On schedule", c: "text-purple-600" },
          ].map((c, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
              className="bg-white border border-slate-100 rounded-2xl p-5 min-w-[240px] shadow-xl shadow-slate-200/50"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.l}</span>
                <span className="text-brand">{c.ic}</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 mb-1">{c.v}</div>
              <div className={`text-xs font-bold ${c.c}`}>{c.s}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <Ticker />

      {/* SERVICES */}
      <section ref={svcRef as any} className="py-24 px-[5%] bg-white">
        <div className="text-center mb-16">
          <Label>What We Do</Label>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={svcInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            One Studio. Every Growth Channel.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={svcInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 max-w-xl mx-auto"
          >
            From UGC to full-funnel ad campaigns — we cover every touchpoint of your customer journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SVCS.slice(0, 6).map((s, i) => (
            <motion.div 
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={svcInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              onClick={() => setPage("svc-" + s.id)}
              className="group p-8 rounded-2xl border border-slate-100 bg-white hover:border-brand hover:shadow-2xl hover:shadow-brand/5 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ backgroundColor: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{s.short}</p>
              <div className="flex items-center gap-2 text-sm font-bold text-brand">
                Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section ref={workRef as any} className="py-24 px-[5%] bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <Label>Our Work</Label>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={workInView ? { opacity: 1, y: 0 } : {}}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Numbers That Matter.
            </motion.h2>
          </div>
          <button className="px-6 py-3 rounded-xl border-2 border-brand text-brand font-bold hover:bg-brand-light transition-all" onClick={() => setPage("work")}>See All Case Studies</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CASE_STUDIES.map((w, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={workInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl transition-all group"
            >
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4" style={{ backgroundColor: w.bg, color: w.col }}>{w.cat}</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{w.brand}</h3>
              <div className="text-3xl font-extrabold mb-2" style={{ color: w.col }}>{w.result}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{w.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section ref={processRef as any} className="py-24 px-[5%] bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute left-[-10%] bottom-[-10%] w-[40%] aspect-square rounded-full bg-brand/10 blur-[120px]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <Label>How We Work</Label>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6"
            >
              Our Proven <span className="text-brand">5-Step</span> System
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 leading-relaxed mb-10"
            >
              Strategy before spending — every campaign starts with a full audit of your brand and market.
            </motion.p>
            <button className="px-8 py-4 rounded-xl bg-brand text-white font-bold text-lg hover:bg-brand-dark shadow-xl shadow-brand/20 transition-all" onClick={() => setPage("contact")}>Book a Strategy Call</button>
          </div>

          <div className="flex flex-col gap-8">
            {PROCESS.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={processInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center shrink-0 font-extrabold text-sm group-hover:scale-110 transition-transform">
                  {p.n}
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">{p.t}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATORS */}
      <section ref={creatorRef as any} className="py-24 px-[5%] bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <Label>Creator Network</Label>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={creatorInView ? { opacity: 1, y: 0 } : {}}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              500+ Verified Creators.<br /><span className="text-brand">Hand-picked. Brand-safe.</span>
            </motion.h2>
          </div>
          <button className="px-6 py-3 rounded-xl border-2 border-brand text-brand font-bold hover:bg-brand-light transition-all" onClick={() => setPage("creators")}>View All Creators</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREATORS.map((c, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={creatorInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-xl transition-all flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-lg shrink-0" style={{ backgroundColor: c.bg, color: c.tc }}>
                {c.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">{c.name}</div>
                <div className="text-xs font-bold mt-0.5" style={{ color: c.tc }}>{c.niche}</div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">{c.handle} · {c.flw}</div>
              </div>
              <div className="bg-brand-light text-brand text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Verified</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testRef as any} className="py-24 px-[5%] bg-brand-light relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-brand/5 -skew-x-12 translate-x-1/2" />
        
        <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
          <div className="lg:w-1/2">
            <Label>Client Stories</Label>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={testInView ? { opacity: 1, y: 0 } : {}}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-8"
            >
              Brands Love Us.
            </motion.h2>
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setTIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === tIdx ? "w-10 bg-brand" : "w-2 bg-brand/20"}`}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={tIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl p-10 md:p-14 shadow-2xl shadow-brand/10 relative"
              >
                <Quote className="absolute top-10 right-10 w-16 h-16 text-brand/10" />
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium mb-10 italic">
                  "{TESTIMONIALS[tIdx].text}"
                </p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-white text-xl" style={{ backgroundColor: TESTIMONIALS[tIdx].col }}>
                    {TESTIMONIALS[tIdx].avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">{TESTIMONIALS[tIdx].name}</div>
                    <div className="text-sm text-slate-500">{TESTIMONIALS[tIdx].role}</div>
                  </div>
                  <div className="ml-auto hidden sm:flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section ref={priceRef as any} className="py-24 px-[5%] bg-white">
        <div className="text-center mb-16">
          <Label>Pricing</Label>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={priceInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900"
          >
            Transparent. <span className="text-brand">No Hidden Fees.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={priceInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl p-10 relative overflow-hidden flex flex-col ${p.hot ? "bg-brand text-white shadow-2xl shadow-brand/30 scale-105 z-10" : "bg-white border border-slate-100 shadow-lg shadow-slate-200/50"}`}
            >
              {p.hot && <div className="absolute top-6 right-6 bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>}
              
              <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${p.hot ? "text-white/60" : "text-brand"}`}>{p.plan}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold">{p.price}</span>
                <span className={`text-sm ${p.hot ? "text-white/60" : "text-slate-500"}`}>{p.period}</span>
              </div>
              <p className={`text-sm mb-8 leading-relaxed ${p.hot ? "text-white/70" : "text-slate-500"}`}>{p.desc}</p>
              
              <div className={`border-t mb-8 pt-8 flex-1 ${p.hot ? "border-white/10" : "border-slate-100"}`}>
                <div className="flex flex-col gap-4">
                  {p.features.map((f, j) => (
                    <div key={j} className="flex gap-3 items-start text-sm">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${p.hot ? "text-white" : "text-brand"}`} />
                      <span className={p.hot ? "text-white/90" : "text-slate-600"}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${p.hot ? "bg-white text-brand hover:bg-brand-muted" : "bg-brand text-white hover:bg-brand-dark"}`} onClick={() => setPage("contact")}>
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <CTABand setPage={setPage} />
    </>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", brand: "", budget: "", service: "", msg: "" });
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-32 pb-24 px-[5%] bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <Label>Get In Touch</Label>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">Let's Build Something <span className="text-brand">Powerful.</span></h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-12">Whether you are a D2C startup or an established brand — we will give you a free audit, honest advice and a clear roadmap for growth.</p>
            
            <div className="flex flex-col gap-8">
              {[
                { ic: <Megaphone className="w-5 h-5" />, l: "Email Us", v: "hello@brandpropelstudio.in" },
                { ic: <Users className="w-5 h-5" />, l: "Call Us", v: "+91 98765 43210" },
                { ic: <Globe className="w-5 h-5" />, l: "Mumbai Office", v: "Andheri East, Mumbai 400069" }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand shrink-0">{item.ic}</div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.l}</div>
                    <div className="text-lg font-bold text-slate-900">{item.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/50">
            {sent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500">We'll reach out within 24 hours with your free brand audit.</p>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand outline-none transition-all" placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand outline-none transition-all" placeholder="Email Address *" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand outline-none transition-all" placeholder="Brand / Company Name" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand outline-none transition-all appearance-none" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}>
                  <option value="">Monthly Budget Range</option>
                  <option>Under Rs 25,000</option>
                  <option>Rs 25,000 to Rs 75,000</option>
                  <option>Rs 75,000 to Rs 2,00,000</option>
                  <option>Rs 2,00,000 plus</option>
                </select>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand outline-none transition-all h-32 resize-none" placeholder="Tell us about your brand and goals..." value={form.msg} onChange={e => setForm({...form, msg: e.target.value})} />
                <button 
                  className="w-full py-4 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark shadow-xl shadow-brand/20 transition-all mt-4"
                  onClick={() => { if(form.name && form.email) setSent(true); }}
                >
                  Send and Get Free Audit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkPage({ setPage }: { setPage: (p: string) => void }) {
  const [ref, inView] = useInView(0.05);
  return (
    <div className="pt-32 pb-24 px-[5%] bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Label>Our Work</Label>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">Case Studies</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-16">Real campaigns, real brands, real numbers — how we help Indian D2C brands grow.</p>
        
        <div ref={ref as any} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((w, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-white border border-slate-100 hover:shadow-2xl transition-all group"
              style={{ backgroundColor: w.bg + "44" }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6" style={{ backgroundColor: w.bg, color: w.col }}>{w.cat}</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{w.brand}</h3>
              <div className="text-5xl font-extrabold mb-4" style={{ color: w.col }}>{w.result}</div>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">{w.sub}</p>
              <button className="text-sm font-bold flex items-center gap-2" style={{ color: w.col }} onClick={() => setPage("contact")}>
                View Full Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CreatorsPage({ setPage }: { setPage: (p: string) => void }) {
  const [ref, inView] = useInView(0.05);
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-32 pb-24 px-[5%] bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Label>Creator Network</Label>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">500+ Verified Creators.<br /><span className="text-brand">Hand-picked. Brand-safe.</span></h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-16">Every creator is manually vetted on 30+ parameters — audience quality, engagement rate, brand safety and niche relevance.</p>
        
        <div ref={ref as any} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {CREATORS.map((c, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-xl transition-all flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-xl shrink-0" style={{ backgroundColor: c.bg, color: c.tc }}>
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">{c.name}</div>
                  <div className="text-sm font-bold" style={{ color: c.tc }}>{c.niche}</div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{c.handle}</div>
                <div className="text-sm font-extrabold text-slate-900">{c.flw}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-brand/10 -skew-x-12 translate-x-1/2" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Label>Join Us</Label>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Are You a Creator? <span className="text-brand">Get Paid to Create.</span></h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">Join India's fastest-growing UGC creator network. Get matched with top D2C brands and earn for content you love creating.</p>
              <div className="flex flex-col gap-4">
                {[["💰", "Fair, transparent pay per video"], ["🎯", "Brands matched to your niche"], ["🛡️", "Hassle-free contracts — we handle it"]].map(([ic, t], i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <span className="text-2xl">{ic}</span>
                    <span className="text-slate-300 font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              {sent ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-brand mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Application Sent!</h3>
                  <p className="text-slate-400">We'll review your profile within 48 hours.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <input className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand" placeholder="Your Name *" />
                  <input className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand" placeholder="Email Address *" />
                  <input className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand" placeholder="Instagram Handle" />
                  <button className="w-full py-4 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark transition-all mt-4" onClick={() => setSent(true)}>Submit Application</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CTABand({ setPage }: { setPage: (p: string) => void }) {
  return (
    <section className="py-24 px-[5%] bg-gradient-to-br from-brand to-brand-dark text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      
      <div className="relative z-10">
        <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Free Consultation — No Commitments</div>
        <h2 className="text-3xl md:text-6xl font-extrabold text-white tracking-tight mb-6">Ready to Propel Your Brand?</h2>
        <p className="text-lg text-white/70 max-w-lg mx-auto mb-10">Book a free 30-min strategy call. We will show you exactly where you are leaving money on the table.</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-5 rounded-xl bg-white text-brand font-bold text-lg hover:bg-brand-muted shadow-2xl transition-all" onClick={() => setPage("contact")}>Book Free Strategy Call</button>
          <button className="px-10 py-5 rounded-xl bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/20 transition-all" onClick={() => setPage("creators")}>Join as a Creator</button>
        </div>
      </div>
    </section>
  );
}

function SvcPage({ svcId, setPage }: { svcId: string, setPage: (p: string) => void }) {
  const svc = SVCS.find(s => s.id === svcId) || SVCS[0];
  const [ref, inView] = useInView(0.05);
  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-20 px-[5%] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${svc.bg} 0%, #fff 60%)` }}>
        <div className="max-w-6xl mx-auto">
          <button onClick={() => setPage("home")} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-brand mb-8 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
          </button>
          <Label>Our Services</Label>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl" style={{ backgroundColor: svc.color }}>
            {svc.icon}
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">{svc.title}</h1>
          <p className="text-xl font-bold mb-6" style={{ color: svc.color }}>{svc.tagline}</p>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-10">{svc.short}</p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-xl bg-brand text-white font-bold text-lg hover:bg-brand-dark shadow-xl shadow-brand/20 transition-all" onClick={() => setPage("contact")}>Get Started</button>
            <button className="px-8 py-4 rounded-xl border-2 border-brand text-brand font-bold text-lg hover:bg-brand-light transition-all" onClick={() => setPage("contact")}>Free Consultation</button>
          </div>
        </div>
      </section>

      <section className="py-12 px-[5%]" style={{ backgroundColor: svc.color }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {svc.results.map((r, i) => (
            <div key={i} className="text-center py-8 border-b md:border-b-0 md:border-r border-white/20 last:border-0">
              <div className="text-4xl md:text-6xl font-extrabold text-white mb-2">{r.n}</div>
              <div className="text-sm font-bold text-white/70 uppercase tracking-widest">{r.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section ref={ref as any} className="py-24 px-[5%] bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <Label>What is Included</Label>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">Everything You Need to <span style={{ color: svc.color }}>Succeed</span></h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">We provide a full-service experience, handling everything from strategy and creator sourcing to production and performance optimization.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {svc.features.map((ft, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50 flex gap-4 items-start"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-1" style={{ color: svc.color }} />
                <span className="text-sm font-bold text-slate-700 leading-tight">{ft}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTABand setPage={setPage} />
    </div>
  );
}

// ─── MAIN APP ───

export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderPage = () => {
    if (page.startsWith("svc-")) return <SvcPage svcId={page.replace("svc-", "")} setPage={setPage} />;
    switch (page) {
      case "home": return <Home setPage={setPage} />;
      case "contact": return <ContactPage />;
      case "work": return <WorkPage setPage={setPage} />;
      case "creators": return <CreatorsPage setPage={setPage} />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand selection:text-white">
      <Navbar page={page} setPage={setPage} scrolled={scrolled} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Foot setPage={setPage} />
    </div>
  );
}
