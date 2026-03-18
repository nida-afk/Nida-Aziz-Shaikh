import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";
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
  Facebook,
  ChevronDown,
  Quote,
  Clock,
  Users,
  BarChart3,
  Globe,
  Code,
  Layout,
  Sparkles,
  Cpu,
  Zap,
  PlayCircle,
  Image as ImageIcon,
  Package,
  MessageSquare
} from "lucide-react";

// ─── CONSTANTS ───
const B = "#1A56DB"; // Brand Blue
const G9 = "#1A1A2E"; // Dark Navy
const G7 = "#3D3D5C"; // Muted Navy
const G5 = "#6B6B8A"; // Grayish Navy
const G3 = "#C2C2D6"; // Light Gray
const G1 = "#F4F4FA"; // Background Gray

const CLIENTS = [
  { 
    name: "Tech Mahindra", 
    logo: "https://careers.techmahindra.com/images/TM_Logo_Header.png",
    url: "https://www.techmahindra.com/"
  },
  { 
    name: "Sovereign Solutions", 
    logo: "https://tse1.mm.bing.net/th/id/OIP.nC1InpfgZ-wCyHRpyz2YgAHaFQ?rs=1&pid=ImgDetMain&o=7&rm=3",
    url: "https://sovereignsolutions.com/"
  },
  { 
    name: "Stone DesignWorks", 
    logo: "https://tse1.mm.bing.net/th/id/OIP.5HDEoeT5vAqVrWLIw78pRAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    url: "https://stonedesignworks.com/"
  },
  { 
    name: "Accessibility Ventures", 
    logo: "https://tse1.mm.bing.net/th/id/OIP.j8JhFtZAXpBHnqqHIcOCTQHaFo?rs=1&pid=ImgDetMain&o=7&rm=3",
    url: "https://accessibilityventures.com/"
  },
  { 
    name: "Crosspoint Designs", 
    logo: "https://crosspointdesigns.com/wp-content/uploads/2024/07/logo.png",
    url: "https://crosspointdesigns.com/"
  },
  { 
    name: "SKJ Juris", 
    logo: "https://www.skjjuris.com/wp-content/uploads/2022/12/skj-juris-logo-r-1.jpg",
    url: "https://skjjuris.com/"
  },
  { 
    name: "Zeta Technologies", 
    logo: "https://th.bing.com/th/id/OIP._v9PLmTQe3i-YHH-01NRewHaCV?w=350&h=110&c=7&r=0&o=7&dpr=1.7&pid=1.7&rm=3",
    url: "https://zetatech.in/"
  },
  { 
    name: "Sunstone BBQ Outlets", 
    logo: "https://members.dlat.org/wp-content/uploads/2020/03/Sunstone-Logo-Color.png",
    url: "https://sunstonegrills.com/"
  },
  { 
    name: "Ameritech Solutions", 
    logo: "https://ameritechds.com/wp-content/uploads/2019/03/logo-ameritech-data-solutions.png",
    url: "https://ameritechds.com/"
  },
  { 
    name: "Oodlebit", 
    logo: "https://www.airdropsmob.com/wp-content/uploads/2018/08/oodlebit-logo.jpg",
    url: "https://oodlebit.com/"
  }
];

const SVCS = [
  { id: "ugc", icon: <Play className="w-6 h-6" />, title: "UGC Content", short: "Authentic creator videos that convert at every funnel stage.", color: B, bg: "#EBF2FF", tagline: "Real People. Real Content. Real Conversions.", features: ["Unboxing & Review Videos", "Testimonials & Social Proof", "Tutorial & Demo Reels", "Lifestyle Content", "UGC for Meta, Google & YouTube", "Hook Testing & Multi-Variant"], results: [{ n: "3-5x", l: "Higher CTR" }, { n: "67%", l: "Lower CPA" }, { n: "48hr", l: "Avg delivery" }] },
  { id: "influencer", icon: <Star className="w-6 h-6" />, title: "Influencer Marketing", short: "End-to-end influencer campaigns from nano to celebrity.", color: "#7C3AED", bg: "#F3E8FF", tagline: "The Right Voice. The Right Audience.", features: ["Nano, Micro & Macro Campaigns", "Celebrity Tie-ups", "Instagram Reels & Stories", "YouTube Integrations", "Brand Safety Vetting", "Full Campaign Management", "Unboxing Videos (Makeup & Skincare)", "Testimonial Videos"], results: [{ n: "500+", l: "Vetted influencers" }, { n: "1B+", l: "Combined reach" }, { n: "4.2%", l: "Avg engagement" }] },
  { id: "social-ads", icon: <Megaphone className="w-6 h-6" />, title: "Social Media Ads", short: "Paid social on Meta, Instagram & YouTube built on data.", color: "#F97316", bg: "#FFF4ED", tagline: "Scroll-Stopping Ads. Measurable ROI.", features: ["Meta & Instagram Ads", "YouTube & Google Display", "Retargeting Campaigns", "Creative A/B Testing", "Audience Segmentation", "Daily Budget Optimisation", "Product Demo Ads"], results: [{ n: "4.8x", l: "Average ROAS" }, { n: "40%", l: "Lower CPM" }, { n: "2x", l: "Conversion uplift" }] },
  { id: "performance", icon: <Target className="w-6 h-6" />, title: "Performance Marketing", short: "Full-funnel strategies engineered around ROAS and CPA.", color: "#059669", bg: "#ECFDF5", tagline: "Every Rupee Accountable.", features: ["Google Search & Shopping", "Meta Performance Campaigns", "YouTube Video Funnels", "Landing Page CRO", "ROAS & CPA Optimisation", "Weekly Performance Reviews"], results: [{ n: "120+", l: "Brands scaled" }, { n: "₹50Cr+", l: "Ad spend managed" }, { n: "3.8x", l: "Avg ROAS" }] },
  { id: "content", icon: <PenTool className="w-6 h-6" />, title: "Content Marketing", short: "Blogs, copy and brand storytelling that build authority.", color: "#0EA5E9", bg: "#E0F2FE", tagline: "Content That Ranks and Converts.", features: ["SEO Blog Writing", "Social Media Copywriting", "Email Campaigns", "Case Studies & Whitepapers", "Brand Storytelling", "Content Calendar Strategy", "Problem-Solution Ads"], results: [{ n: "3x", l: "Organic traffic growth" }, { n: "60%", l: "More time-on-site" }, { n: "45%", l: "Higher email opens" }] },
  { id: "seo", icon: <Search className="w-6 h-6" />, title: "SEO", short: "Technical SEO and link building that improves rankings.", color: "#DC2626", bg: "#FEF2F2", tagline: "Rank Higher. Grow Organically.", features: ["Full Technical Audit", "Keyword Research", "On-Page Optimisation", "Off-Page & Link Building", "Local SEO", "Monthly Ranking Reports"], results: [{ n: "2.5x", l: "Organic traffic" }, { n: "Top 5", l: "Keyword rankings" }, { n: "35%", l: "More organic leads" }] },
  { id: "aeo", icon: <Search className="w-6 h-6" />, title: "AEO", short: "Optimising your brand for AI search engines like Perplexity & ChatGPT.", color: "#0D9488", bg: "#F0FDFA", tagline: "Be the Answer AI Gives.", features: ["AI Visibility Audit", "Answer Engine Optimisation", "Structured Data Markup", "Conversational Keyword Research", "Brand Authority Building", "AI Search Tracking"], results: [{ n: "85%", l: "AI Citation Rate" }, { n: "2x", l: "Brand Mentions" }, { n: "Top 3", l: "AI Recommendations" }] },
  { id: "design", icon: <Code className="w-6 h-6" />, title: "Design & Development", short: "High-converting landing pages and D2C storefronts.", color: "#4F46E5", bg: "#EEF2FF", tagline: "Built for Speed. Designed for Sales.", features: ["Custom Shopify Stores", "High-CVR Landing Pages", "UI/UX Design", "Web Performance Tuning", "Mobile-First Development", "Conversion Rate Optimisation"], results: [{ n: "45%", l: "CVR Improvement" }, { n: "90+", l: "PageSpeed Score" }, { n: "3x", l: "Faster Load Time" }] },
];

const STATS = [{ n: "500+", l: "Verified Creators" }, { n: "1B+", l: "Campaign Views" }, { n: "4.8x", l: "Avg ROAS" }, { n: "120+", l: "Brands Scaled" }];

const TESTIMONIALS = [
  { 
    name: "Project Manager", 
    role: "Tech Mahindra", 
    text: "Codism's technical expertise and commitment to quality were evident throughout our digital transformation journey. They delivered a robust solution that exceeded our expectations.", 
    avatar: "M", 
    col: "#E31837"
  },
  { 
    name: "CEO", 
    role: "Sovereign Solutions Corp", 
    text: "The team at Codism is highly professional and responsive. Their ability to translate complex requirements into functional software is impressive.", 
    avatar: "S", 
    col: "#1A56DB"
  },
  { 
    name: "Founder", 
    role: "Stone DesignWorks", 
    text: "We've worked with many agencies, but Codism stands out for their attention to detail and proactive communication. Highly recommended for any scale.", 
    avatar: "SD", 
    col: "#7C3AED"
  },
  { 
    name: "Operations Director", 
    role: "Onsite Storage Solutions", 
    text: "Codism built a custom inventory and rental management system that transformed our business. Their technical depth and ability to solve complex logistics challenges are unmatched.", 
    avatar: "OSS", 
    col: "#F97316"
  },
];

const CASE_STUDIES = [
  { brand: "Tech Mahindra", cat: "Enterprise Solutions", result: "30% Efficiency Gain", sub: "Digital Transformation & Staff Augmentation", col: B, bg: "#EBF2FF" },
  { brand: "Sovereign Solutions", cat: "Custom Software", result: "Scalable Architecture", sub: "End-to-End IT Consulting & Development", col: "#7C3AED", bg: "#F3E8FF" },
  { brand: "Oodlebit", cat: "Fintech / Crypto", result: "Secure Exchange", sub: "Cryptocurrency Trading Platform Development", col: "#F97316", bg: "#FFF4ED" },
  { brand: "Stone DesignWorks", cat: "UI/UX & Web", result: "Modern Interface", sub: "Creative Design & Frontend Engineering", col: "#059669", bg: "#ECFDF5" },
  { brand: "ReadySetBoom", cat: "Digital Marketing", result: "4x ROAS", sub: "Performance Strategy & Campaign Management", col: "#0EA5E9", bg: "#E0F2FE" },
  { brand: "Sunset BBQ Grill", cat: "E-commerce", result: "40% Sales Boost", sub: "Magento to Shopify Migration & SEO", col: "#DC2626", bg: "#FEF2F2" },
  { brand: "Cross Point Design", cat: "Web Development", result: "Responsive Design", sub: "Custom Web Solutions for Creative Agencies", col: "#0D9488", bg: "#F0FDFA" },
];

const BLOG_POSTS = [
  { title: "How UGC is Outperforming Studio Content in 2025", date: "Mar 15, 2026", cat: "UGC Strategy", img: "https://picsum.photos/seed/blog1/800/450" },
  { title: "The Rise of AI Influencers: Why Brands are Switching", date: "Mar 10, 2026", cat: "Influencer Marketing", img: "https://picsum.photos/seed/blog2/800/450" },
  { title: "5 Performance Marketing Hacks for D2C Brands", date: "Mar 05, 2026", cat: "Performance", img: "https://picsum.photos/seed/blog3/800/450" },
  { title: "Scaling to 10Cr/mo: A Case Study in Performance Marketing", date: "Feb 28, 2026", cat: "Case Study", img: "https://picsum.photos/seed/blog4/800/450" },
  { title: "Why Problem-Solution Ads are Your Highest Converting Format", date: "Feb 20, 2026", cat: "Ad Strategy", img: "https://picsum.photos/seed/blog5/800/450" },
];

const PROCESS = [
  { n: "01", t: "Brand Audit", d: "We deep-dive into your current performance, creative assets, and competitor landscape." },
  { n: "02", t: "Creator Matching", d: "We hand-pick creators from our vetted network that perfectly align with your brand persona." },
  { n: "03", t: "Creative Strategy", d: "Developing high-converting hooks and scripts based on proven performance data." },
  { n: "04", t: "Production & QA", d: "End-to-end production management ensuring premium quality and brand safety." },
  { n: "05", t: "Optimisation", d: "Continuous A/B testing of hooks and formats to maximise your ad spend ROI." }
];

const WHY_US = [
  { 
    title: "Performance-First DNA", 
    desc: "We don't just make content; we engineer conversions. Every creative is backed by data from ₹50Cr+ in managed ad spend.",
    icon: <BarChart3 className="w-6 h-6" />
  },
  { 
    title: "Vetted Creator Network", 
    desc: "Access to 500+ hand-picked Indian creators across niches, ensuring authentic storytelling for your brand.",
    icon: <Users className="w-6 h-6" />
  },
  { 
    title: "48-Hour Delivery", 
    desc: "Speed is our superpower. From brief to final delivery, we move at the speed of social media trends.",
    icon: <Clock className="w-6 h-6" />
  },
  { 
    title: "Full-Funnel Expertise", 
    desc: "From top-of-funnel awareness to bottom-of-funnel retargeting, we know what works at every stage.",
    icon: <Target className="w-6 h-6" />
  }
];

const CREATORS_LIST = [
  { name: "Ananya S.", niche: "Beauty & Skincare", img: "https://picsum.photos/seed/creator1/400/500" },
  { name: "Rahul M.", niche: "Tech & Gadgets", img: "https://picsum.photos/seed/creator2/400/500" },
  { name: "Priya K.", niche: "Lifestyle & Fashion", img: "https://picsum.photos/seed/creator3/400/500" },
  { name: "Vikram R.", niche: "Fitness & Health", img: "https://picsum.photos/seed/creator4/400/500" }
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
    <div className="flex items-center gap-3 cursor-pointer group" onClick={onClick}>
      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shrink-0 bg-white border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
        <img 
          src="https://scontent.fpnq6-1.fna.fbcdn.net/v/t39.30808-6/590807351_122098733535148525_6374173426190407819_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=YWd0pszrpOIQ7kNvwFvw5g5&_nc_oc=Adl6cy4OOqlK60YqoFVzNr7Ib5z62m_4OV-ohCZjo-EeACyz7b6KjY3u4AFadLTkrbe_puQ5YviyDMBYx1jPw5hR&_nc_zt=23&_nc_ht=scontent.fpnq6-1.fna&_nc_gid=Y4Lk2C39or5wJ64llBK4oQ&_nc_ss=8&oh=00_AfyJVvlO-YNMyODvVzylTW41Hmsem4op57x0j5y_dQQVog&oe=69C050D3" 
          alt="Brand Propel Studio" 
          className="w-full h-full object-contain p-1"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:text-brand transition-colors" style={{ textDecorationLine: 'none' }}>Brand propel studio</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">codism io</span>
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
            {c.name}<span className="text-brand ml-12">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Navbar({ page, handleNav, scrolled }: { page: string, handleNav: (p: string, s?: string) => void, scrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[500] h-16 px-[5%] flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm" : "bg-transparent"}`}>
      <Logo onClick={() => handleNav("home", "home")} />
      
      <div className="hidden md:flex gap-8 items-center">
        <button className={`text-sm font-semibold transition-colors ${page === "home" ? "text-brand" : "text-slate-600 hover:text-brand"}`} onClick={() => handleNav("home", "home")}>Home</button>
        <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
          <button className={`text-sm font-semibold flex items-center gap-1 transition-colors ${page.startsWith("svc") ? "text-brand" : "text-slate-600 hover:text-brand"}`} onClick={() => handleNav("home", "services")}>
            Services <ChevronDown className="w-3 h-3" />
          </button>
          <AnimatePresence>
            {drop && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[600]"
              >
                <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl min-w-[750px] overflow-hidden">
                  <div className="grid grid-cols-3 divide-x divide-slate-50">
                    {[
                      { group: "Performance & Ads", items: ["performance", "social-ads", "ugc"] },
                      { group: "Influencer & Content", items: ["influencer", "content"] },
                      { group: "Search & Tech", items: ["seo", "aeo", "design"] }
                    ].map((col, idx) => (
                      <div key={idx} className="p-6">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-l-2 border-brand pl-3">{col.group}</div>
                        <div className="flex flex-col gap-1">
                          {col.items.map(id => {
                            const s = SVCS.find(x => x.id === id);
                            if (!s) return null;
                            return (
                              <button 
                                key={s.id} 
                                onClick={() => { handleNav("svc-" + s.id); setDrop(false); }}
                                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand flex items-center gap-3 rounded-lg transition-colors group"
                              >
                                <span className="text-brand opacity-80 group-hover:scale-110 transition-transform">{s.icon}</span>
                                {s.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className={`text-sm font-semibold transition-colors ${page === "contact" ? "text-brand" : "text-slate-600 hover:text-brand"}`} onClick={() => handleNav("contact")}>Contact</button>
        <button className={`text-sm font-semibold transition-colors ${page === "blogs" ? "text-brand" : "text-slate-600 hover:text-brand"}`} onClick={() => handleNav("blogs")}>Blogs</button>
      </div>

      <div className="flex gap-3 items-center">
        <button 
          className="hidden sm:flex px-5 py-2 rounded-lg bg-brand text-white text-xs font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/10"
          onClick={() => handleNav("contact")}
        >
          Book Free Audit
        </button>
        <button 
          className="hidden sm:flex px-5 py-2 rounded-lg border-2 border-brand text-brand text-xs font-bold hover:bg-brand-light transition-all"
          onClick={() => handleNav("influencer")}
        >
          Join as an Influencer
        </button>
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
              <Logo onClick={() => { handleNav("home", "home"); setIsOpen(false); }} />
              <button onClick={() => setIsOpen(false)}><X className="text-slate-900" /></button>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              {["Home", "Blogs", "Contact"].map(item => (
                <button 
                  key={item} 
                  className="text-2xl font-bold text-slate-900 text-left"
                  onClick={() => { handleNav(item.toLowerCase(), item.toLowerCase()); setIsOpen(false); }}
                >
                  {item}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Services</div>
              {[
                { group: "Performance & Ads", items: ["performance", "social-ads", "ugc"] },
                { group: "Influencer & Content", items: ["influencer", "content"] },
                { group: "Search & Tech", items: ["seo", "aeo", "design"] }
              ].map((col, idx) => (
                <div key={idx} className="flex flex-col gap-3 mb-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l-2 border-brand pl-3">{col.group}</div>
                  <div className="flex flex-col gap-4 pl-3">
                    {col.items.map(id => {
                      const s = SVCS.find(x => x.id === id);
                      if (!s) return null;
                      return (
                        <button 
                          key={s.id} 
                          className="text-lg font-bold text-slate-600 text-left flex items-center gap-3"
                          onClick={() => { handleNav("svc-" + s.id); setIsOpen(false); }}
                        >
                          <span className="text-brand scale-90">{s.icon}</span>
                          {s.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Foot({ handleNav }: { handleNav: (p: string, s?: string) => void }) {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <Logo onClick={() => handleNav("home", "home")} />
          <p className="text-sm text-slate-400 leading-relaxed mt-6 max-w-xs">India's leading UGC and performance marketing studio built to scale D2C brands.</p>
          <div className="flex gap-3 mt-8">
            {[
              { Icon: Instagram, url: "https://www.instagram.com/brandpropelstudio/reels/" },
              { Icon: Youtube, url: "https://www.youtube.com/@BrandPropelStudio" },
              { Icon: Linkedin, url: "https://www.linkedin.com/company/propel-studios/" },
              { Icon: Twitter, url: "https://x.com/brand_prop81404" },
              { Icon: Facebook, url: "https://www.facebook.com/profile.php?id=61584455763253#" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-brand hover:text-white transition-all"
              >
                <social.Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { t: "Services", ls: [{ l: "UGC Content", p: "svc-ugc" }, { l: "Influencer Marketing", p: "svc-influencer" }, { l: "Social Media Ads", p: "svc-social-ads" }, { l: "Performance Marketing", p: "svc-performance" }, { l: "AEO", p: "svc-aeo" }, { l: "Design & Development", p: "svc-design" }] },
          { t: "Company", ls: [{ l: "About Us", p: "about" }, { l: "Blogs & Case Studies", p: "blogs" }, { l: "Contact", p: "contact" }] },
          { t: "Contact", ls: [{ l: "hello@brandpropelstudio.in", p: "" }, { l: "+91 98765 43210", p: "" }, { l: "Pune, India", p: "" }] },
        ].map((col, i) => (
          <div key={i}>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6">{col.t}</div>
            <div className="flex flex-col gap-3">
              {col.ls.map(l => (
                <button 
                  key={l.l} 
                  onClick={() => l.p && handleNav(l.p)} 
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

function ClientLogoItem({ client }: any) {
  const [imgSrc, setImgSrc] = useState(client.logo);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isError, setIsError] = useState(false);

  const generateFallback = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        // @ts-ignore
        fetch: window.fetch.bind(window)
      });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `A professional, minimalist, high-quality corporate logo for a company named "${client.name}". The logo should be clean, modern, and suitable for a business website. Use a professional color palette. White background.`,
            },
          ],
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setImgSrc(`data:image/png;base64,${base64EncodeString}`);
          setIsGenerating(false);
          return;
        }
      }
      throw new Error("No image generated");
    } catch (error) {
      console.error("Error generating logo:", error);
      setIsError(true);
      setIsGenerating(false);
    }
  };

  return (
    <a 
      href={client.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 grayscale hover:grayscale-0 transition-all hover:shadow-lg group h-28 relative overflow-hidden"
    >
      <div className="text-center w-full h-full flex items-center justify-center">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Generating Logo...</span>
          </div>
        ) : isError ? (
          <div className="text-lg font-black text-slate-400 group-hover:text-brand transition-colors tracking-tighter leading-tight uppercase italic">{client.name}</div>
        ) : (
          <img 
            src={imgSrc} 
            alt={client.name} 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={() => {
              generateFallback();
            }}
          />
        )}
      </div>
    </a>
  );
}

function ClientLogos() {
  return (
    <section className="py-10 px-[5%] bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <Label>Trusted By Global Leaders</Label>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Our Prestigious Clients</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {CLIENTS.map((c, i) => (
            <ClientLogoItem key={i} client={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [ref, inView] = useInView(0.05);
  return (
    <section ref={ref as any} className="py-10 px-[5%] bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <Label>Client Success Stories</Label>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Verified Reviews from Clutch</h2>
          <div className="flex items-center justify-center gap-2 text-brand font-bold">
            <Star className="w-5 h-5 fill-current" />
            <span>4.9/5.0 Average Rating</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6">
                <Quote className="w-12 h-12 text-slate-50 group-hover:text-brand/5 transition-colors" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Review</span>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: t.col }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ROICalculator({ setPage }: { setPage: (p: string) => void }) {
  const [spend, setSpend] = useState(0);
  const [aov, setAov] = useState(0);
  const [cvr, setCvr] = useState(0);

  const cpc = 20;
  const clicks = spend / cpc;
  const conversions = clicks * (cvr / 100);
  const revenue = conversions * aov;
  const roas = spend > 0 ? revenue / spend : 0;

  return (
    <section className="py-20 px-[5%] bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Label>Growth Estimator</Label>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Calculate Your <span className="text-brand">Potential ROI</span></h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">See how much revenue your brand could be generating with optimized UGC and performance marketing. Adjust the sliders to see the impact.</p>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-slate-300">Monthly Ad Spend (₹)</span>
                  <span className="font-bold text-brand">₹{spend.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="0" max="1000000" step="10000" 
                  value={spend} onChange={(e) => setSpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand"
                />
              </div>
              <div>
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-slate-300">Avg. Order Value (₹)</span>
                  <span className="font-bold text-brand">₹{aov.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="0" max="10000" step="100" 
                  value={aov} onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand"
                />
              </div>
              <div>
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-slate-300">Target Conversion Rate (%)</span>
                  <span className="font-bold text-brand">{cvr}%</span>
                </div>
                <input 
                  type="range" min="0" max="10" step="0.1" 
                  value={cvr} onChange={(e) => setCvr(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 gap-8">
              <div className="p-6 rounded-2xl bg-brand/10 border border-brand/20">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Estimated Monthly Revenue</div>
                <div className="text-4xl md:text-5xl font-black text-white">₹{Math.round(revenue).toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Target ROAS</div>
                  <div className="text-2xl font-bold text-brand">{roas.toFixed(1)}x</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Est. Conversions</div>
                  <div className="text-2xl font-bold text-white">{Math.round(conversions)}</div>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-slate-500 italic">*These are estimations based on industry averages and your inputs. Actual results may vary based on creative quality and market conditions.</p>
              </div>
              <button 
                className="w-full py-4 rounded-xl bg-brand text-white font-bold text-lg hover:bg-brand-dark transition-all shadow-xl shadow-brand/20"
                onClick={() => setPage("contact")}
              >
                Get This Strategy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      <section id="home" ref={heroRef as any} className="min-h-screen flex items-center bg-gradient-to-br from-brand-light via-white to-[#F2F5FF] px-[5%] pt-20 pb-12 relative overflow-hidden">
        <div className="absolute right-[-200px] top-[5%] w-[700px] h-[700px] rounded-full bg-radial-gradient from-brand/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <div className="max-w-4xl">
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
              <span className="text-slate-500">Brands That Scale.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed max-w-xl mb-6"
            >
              We help Indian D2C brands grow through <strong>UGC video production</strong>, <strong>influencer marketing</strong>, and <strong>high-performance social ads</strong> — all under one roof.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center gap-2 mb-10"
            >
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <Facebook className="w-4 h-4 text-[#1877F2] fill-[#1877F2]" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Meta Business Partner</span>
              </div>
            </motion.div>

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

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/marketing/800/1000" 
                alt="Marketing Strategy" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Logos under picture as requested in screenshot */}
            <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Trusted by Industry Leaders</div>
              <div className="flex flex-wrap justify-center gap-6 grayscale opacity-60">
                {CLIENTS.slice(0, 5).map((c, i) => (
                  <img 
                    key={i} 
                    src={c.logo} 
                    alt={c.name} 
                    className="h-6 object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating stats cards */}
            <div className="absolute -right-8 top-1/4 flex flex-col gap-4">
              {[
                { v: "5.8x", l: "Avg ROAS", c: "text-emerald-600" },
                { v: "234%", l: "CTR Boost", c: "text-brand" },
              ].map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  animate={heroInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.2 }}
                  className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 min-w-[120px]"
                >
                  <div className={`text-xl font-black ${s.c}`}>{s.v}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Ticker />
      
      <ROICalculator setPage={setPage} />
      
      <ClientLogos />

      {/* WHY CHOOSE US - UNIQUE PROPOSITION */}
      <section className="py-12 px-[5%] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Label>The Propel Advantage</Label>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Why Brands Choose Us Over <span className="text-brand">Traditional Agencies</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              We've combined the creativity of a studio with the analytical rigour of a performance agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_US.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={svcRef as any} className="py-8 px-[5%] bg-white">
        <div className="text-center mb-10">
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
          {SVCS.map((s, i) => (
            <motion.div 
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={svcInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              onClick={() => setPage("svc-" + s.id)}
              className="group p-8 rounded-2xl border border-slate-100 bg-white hover:border-brand hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-2 transition-all cursor-pointer"
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
      <section id="work" ref={workRef as any} className="py-8 px-[5%] bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
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

      {/* BEFORE VS AFTER */}
      <section className="py-12 px-[5%] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-100">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img src="https://picsum.photos/seed/before/400/600" alt="Before" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Before Propel</div>
                  </div>
                  <div className="relative">
                    <img src="https://picsum.photos/seed/after/400/600" alt="After" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">After Propel</div>
                  </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 min-w-[200px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">ROAS Increase</span>
                    <span className="text-emerald-500 font-bold text-sm">+180%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Label>The Impact</Label>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                Stop Guessing. <br /> Start <span className="text-brand">Scaling.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Most agencies focus on vanity metrics. We focus on your bottom line. Our performance-first UGC strategy is designed to lower your CPA and skyrocket your ROAS.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-3xl font-black text-brand mb-1">40%</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg. CPA Reduction</div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-3xl font-black text-emerald-600 mb-1">3.5x</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg. CTR Uplift</div>
                </div>
              </div>
              <button className="px-8 py-4 rounded-xl bg-brand text-white font-bold text-lg hover:bg-brand-dark shadow-xl shadow-brand/20 transition-all" onClick={() => setPage("contact")}>Get a Free Audit</button>
            </div>
          </div>
        </div>
      </section>

      {/* CREATORS SECTION */}
      <section ref={creatorRef as any} className="py-12 px-[5%] bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Label>Our Network</Label>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                500+ Vetted Creators <br /> Ready to <span className="text-brand">Tell Your Story</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We don't just find influencers; we build a creator army for your brand. Every creator in our network is vetted for content quality, engagement authenticity, and brand safety.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Niche-specific matching (Beauty, Tech, Lifestyle, etc.)",
                  "Full rights management for ad usage",
                  "End-to-end communication & logistics",
                  "Performance-based creator selection"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
              <button className="px-8 py-4 rounded-xl bg-brand text-white font-bold text-lg hover:bg-brand-dark shadow-xl shadow-brand/20 transition-all" onClick={() => setPage("contact")}>Access Our Creator List</button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {CREATORS_LIST.map((c, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? "mt-8" : ""}`}
                  >
                    <img 
                      src={c.img} 
                      alt={c.name} 
                      className="w-full h-64 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                      <div className="text-white font-bold">{c.name}</div>
                      <div className="text-white/70 text-sm">{c.niche}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-brand/5 rounded-full blur-3xl" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" ref={processRef as any} className="py-8 px-[5%] bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute left-[-10%] bottom-[-10%] w-[40%] aspect-square rounded-full bg-brand/10 blur-[120px]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
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



      {/* CTA BAND */}
      <Testimonials />

      <CTABand setPage={setPage} />
    </>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", brand: "", budget: "", service: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
          template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            brand_name: form.brand,
            budget: form.budget,
            message: form.msg,
            to_name: "Brand Propel Studio",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      
      setSent(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="pt-24 pb-16 px-[5%] bg-slate-50 min-h-screen">
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
                  className="w-full py-4 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark shadow-xl shadow-brand/20 transition-all mt-4 disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send and Get Free Audit"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfluencerPage({ setPage }: { setPage: (p: string) => void }) {
  const [heroRef, heroInView] = useInView(0);
  const [netRef, netInView] = useInView(0.05);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", link: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.link) return;
    setLoading(true);
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
          template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            influencer_link: form.link,
            message: "New Influencer Application",
            to_name: "Brand Propel Studio",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setSent(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send application. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { t: "Beauty & Fashion", d: "150+ Creators", ic: "💄", col: "#C42D5A", bg: "#FFE4EC" },
    { t: "Tech & Gadgets", d: "80+ Creators", ic: "📱", col: "#0A72B8", bg: "#E4F5FF" },
    { t: "Food & Lifestyle", d: "120+ Creators", ic: "🍕", col: "#B85C00", bg: "#FFF3E0" },
    { t: "Fitness & Health", d: "95+ Creators", ic: "💪", col: "#1B7A3A", bg: "#E8F5E9" },
    { t: "Travel & Decor", d: "60+ Creators", ic: "✈️", col: "#00838F", bg: "#E0F7FA" },
    { t: "Gaming & Entertainment", d: "110+ Creators", ic: "🎮", col: "#7C3AED", bg: "#F3E8FF" },
  ];

  return (
    <div id="influencer" className="min-h-screen bg-white">
      {/* HERO */}
      <section ref={heroRef as any} className="pt-32 pb-20 px-[5%] bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#FF6321_0%,transparent_50%)] opacity-10" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#FF6321_0%,transparent_50%)] opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                className="mb-8 inline-block"
              >
                <div className="px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                  Next-Gen Creator Economy
                </div>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9]"
              >
                The Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">Influence is AI.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-400 max-w-xl mb-12 leading-relaxed font-medium"
              >
                From human creators to virtual AI influencers, we manage the world's most engaging digital personas for global makeup and beauty brands.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-6"
              >
                <button className="px-10 py-5 rounded-full bg-brand text-white font-bold text-lg hover:bg-brand-dark shadow-[0_0_40px_rgba(255,99,33,0.3)] transition-all hover:scale-105 active:scale-95" onClick={() => setPage("contact")}>Start Campaign</button>
                <button 
                  className="px-10 py-5 rounded-full bg-white/5 text-white font-bold text-lg border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all" 
                  onClick={() => {
                    const el = document.getElementById("gallery");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Gallery
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(255,99,33,0.15)] border border-white/10">
                <img 
                  src="https://picsum.photos/seed/makeup-hero-girl/800/1000" 
                  alt="AI Makeup Influencer" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating Stats Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand">
                      <img src="https://picsum.photos/seed/avatar1/100/100" alt="Avatar" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Aria V.</div>
                      <div className="text-brand text-[10px] font-bold uppercase tracking-widest">AI Beauty Creator</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Engagement</div>
                      <div className="text-white font-bold">8.4%</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Reach</div>
                      <div className="text-white font-bold">1.2M+</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand/20 rounded-full blur-[100px] -z-10" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI INFLUENCERS SECTION */}
      <AIInfluencerGallery />
      <AIAdvertisingShowcase />

      <section className="py-16 px-[5%] bg-slate-950 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 text-brand mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Virtual Creators</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-none">Meet Our <span className="text-slate-500 italic serif">AI Influencers</span></h2>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              Infinite scalability. 24/7 engagement. Zero drama. Our AI creators are built to represent your brand values perfectly across every platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Aria V", niche: "Fashion & Tech", followers: "1.2M", img: "https://picsum.photos/seed/ai1/600/800" },
              { name: "Kai Digital", niche: "Fitness & Wellness", followers: "850K", img: "https://picsum.photos/seed/ai2/600/800" },
              { name: "Luna Star", niche: "Gaming & Lifestyle", followers: "2.5M", img: "https://picsum.photos/seed/ai3/600/800" }
            ].map((ai, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative aspect-[3/4] rounded-[32px] overflow-hidden bg-slate-900 border border-white/10"
              >
                <img src={ai.img} alt={ai.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs font-bold text-brand uppercase tracking-widest mb-1">{ai.niche}</div>
                      <h3 className="text-2xl font-bold text-white mb-1">{ai.name}</h3>
                      <div className="flex items-center gap-2 text-white/50 text-xs">
                        <Users className="w-3 h-3" /> {ai.followers} Reach
                      </div>
                    </div>
                    <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand hover:border-brand transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI REELS GALLERY */}
      <section className="py-16 px-[5%] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Label>AI-Generated Content</Label>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tighter">Viral <span className="text-brand">AI Reels</span> & Content</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <motion.div 
                key={n}
                whileHover={{ scale: 0.98 }}
                className="aspect-[9/16] rounded-2xl bg-slate-100 relative overflow-hidden group cursor-pointer"
              >
                <img src={`https://picsum.photos/seed/reel${n}/400/711`} alt="AI Reel" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest">
                    <Zap className="w-3 h-3 text-brand" /> 1.2M Views
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CONTENT GENERATOR DEMO */}
      <section className="py-16 px-[5%] bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Cpu className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-brand mb-6">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Live AI Demo</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Generate Your <span className="text-brand">AI Creator</span></h2>
              <p className="text-slate-500 mb-10 leading-relaxed">Experience the power of our proprietary AI engine. Describe your ideal influencer and watch our system generate a persona in seconds.</p>
              
              <AIContentDemo />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-brand">
        <div className="max-w-6xl mx-auto px-[5%] grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { n: "50,000+", l: "Influencers" },
            { n: "1B+", l: "Monthly Reach" },
            { n: "500+", l: "Brands Scaled" },
            { n: "10,000+", l: "Campaigns" }
          ].map((s, i) => (
            <div key={i} className="text-center text-white">
              <div className="text-3xl md:text-5xl font-extrabold mb-1">{s.n}</div>
              <div className="text-xs font-bold text-white/60 uppercase tracking-widest">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section ref={netRef as any} className="py-16 px-[5%] bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Label>Our Network</Label>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Creators for Every Niche</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={netInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110" style={{ backgroundColor: c.bg }}>
                  {c.ic}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{c.t}</h3>
                <p className="text-sm font-bold mb-4" style={{ color: c.col }}>{c.d}</p>
                <button className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-brand transition-colors">
                  Explore Niche <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN AS INFLUENCER */}
      <section className="py-16 px-[5%] bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto bg-brand rounded-[48px] p-10 md:p-16 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/4" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter">Are You a Creator? <br /><span className="text-white/80">Join the Elite.</span></h2>
              <p className="text-lg text-white/70 mb-8 max-w-md">Get exclusive access to top brands, transparent payments, and dedicated support to grow your personal brand.</p>
              <div className="flex flex-col gap-4">
                {["Direct Brand Deals", "Timely Payments", "Growth Support"].map((f, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span className="font-bold">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-2xl">
              {sent ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Application Sent!</h3>
                  <p className="text-slate-500">We'll review your profile and reach out soon.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm outline-none focus:border-brand" placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm outline-none focus:border-brand" placeholder="Email Address *" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm outline-none focus:border-brand" placeholder="Instagram/YouTube Link *" value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
                  <button 
                    className="w-full py-5 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-all mt-4 disabled:opacity-50 shadow-xl" 
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Apply to Join Network"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NEW: UNBOXING & TESTIMONIALS SECTION */}
      <section className="py-24 px-[5%] bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <Label>High-Converting Formats</Label>
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-8 leading-tight">Content That <span className="text-brand">Builds Desire</span></h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Unboxing Videos (Makeup & Skincare)</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">First-impression content that builds desire before the purchase. Perfect for reels and stories.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Testimonial Videos</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Real customers sharing authentic experiences with your product. The ultimate social proof.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[9/16] rounded-3xl bg-slate-200 overflow-hidden shadow-2xl">
                <img src="https://picsum.photos/seed/unboxing1/400/711" alt="Unboxing" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-[9/16] rounded-3xl bg-slate-200 overflow-hidden shadow-2xl mt-12">
                <img src="https://picsum.photos/seed/testimonial1/400/711" alt="Testimonial" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SkincareAISection />

      <CTABand setPage={setPage} />
    </div>
  );
}

function CTABand({ setPage }: { setPage: (p: string) => void }) {
  return (
    <section className="py-12 px-[5%] bg-gradient-to-br from-brand to-brand-dark text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      
      <div className="relative z-10">
        <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Free Consultation — No Commitments</div>
        <h2 className="text-3xl md:text-6xl font-extrabold text-white tracking-tight mb-6">Ready to Propel Your Brand?</h2>
        <p className="text-lg text-white/70 max-w-lg mx-auto mb-10">Book a free 30-min strategy call. We will show you exactly where you are leaving money on the table.</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-5 rounded-xl bg-white text-brand font-bold text-lg hover:bg-brand-muted shadow-2xl transition-all" onClick={() => setPage("contact")}>Book Free Strategy Call</button>
          <button className="px-10 py-5 rounded-xl bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/20 transition-all" onClick={() => setPage("influencer")}>Join as an Influencer</button>
        </div>
      </div>
    </section>
  );
}

function SkincareAISection() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [type, setType] = useState<"reel" | "photo">("reel");
  const [category, setCategory] = useState<"skincare" | "makeup" | "fashion">("skincare");

  const generateAI = async () => {
    setGenerating(true);
    try {
      // Explicitly passing fetch to avoid "Cannot set property fetch of #<Window>" error
      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        // @ts-ignore - explicitly passing fetch to the constructor if supported by this version
        fetch: window.fetch.bind(window)
      });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [{ text: `A high-quality, professional ${type === "reel" ? "video frame of an unboxing reel" : "product photography"} for a luxury ${category} brand. Style: ${prompt || "Minimalist, clean, aesthetic"}. Cinematic lighting, hyper-realistic, showing textures and elegant packaging.` }]
      });
      
      let found = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setResult(`data:image/png;base64,${part.inlineData.data}`);
          found = true;
          break;
        }
      }
      if (!found) setResult(`https://picsum.photos/seed/${category}${Math.random()}/600/800`);
    } catch (err) {
      console.error(err);
      setResult(`https://picsum.photos/seed/${category}${Math.random()}/600/800`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="py-24 px-[5%] bg-slate-950 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Label>AI Creative Studio</Label>
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-6">Generate <span className="text-brand">Brand Content</span> with AI</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Instant unboxing reels and professional product photos for skincare, makeup, and fashion. No studio needed.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] shadow-2xl">
            <div className="flex gap-4 mb-6">
              {(["skincare", "makeup", "fashion"] as const).map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-1 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${category === cat ? "bg-white text-slate-950" : "bg-white/5 text-white/40 hover:bg-white/10"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setType("reel")}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${type === "reel" ? "bg-brand text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
              >
                Unboxing Reel
              </button>
              <button 
                onClick={() => setType("photo")}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${type === "photo" ? "bg-brand text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
              >
                Product Photo
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Describe the Vibe</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-brand transition-all min-h-[120px] text-white"
                  placeholder={`e.g. ${category === 'skincare' ? 'Morning sun hitting a glass bottle of serum...' : category === 'makeup' ? 'Close up of a luxury lipstick with gold accents...' : 'Aesthetic fashion flatlay with silk textures...'}`}
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                />
              </div>
              <button 
                onClick={generateAI}
                disabled={generating}
                className="w-full py-5 rounded-2xl bg-brand text-white font-bold hover:bg-brand-dark transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,99,33,0.3)]"
              >
                {generating ? <Zap className="w-6 h-6 animate-pulse" /> : <Sparkles className="w-6 h-6" />}
                {generating ? "AI is Crafting..." : `Generate AI ${type === "reel" ? "Reel" : "Photo"}`}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand/20 blur-3xl rounded-full opacity-50" />
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key={result}
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  className="relative aspect-[9/16] max-w-[340px] mx-auto rounded-[40px] overflow-hidden border-8 border-white/10 shadow-2xl group"
                >
                  <img src={result} alt="AI Generated Content" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                    <div className="text-brand font-black text-xs uppercase tracking-[0.2em] mb-2">AI Generated {category} {type}</div>
                    <div className="text-xl font-bold text-white leading-tight">Perfect for your next campaign.</div>
                  </div>
                </motion.div>
              ) : (
                <div className="aspect-[9/16] max-w-[340px] mx-auto rounded-[40px] border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center p-8 text-white/30">
                  <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm font-medium">Your AI-generated {category} {type} will appear here.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function AIAdvertisingShowcase() {
  const ads = [
    { title: "Luxury Silk Collection", cat: "Clothing", img: "https://picsum.photos/seed/fashion-girl-1/800/1000", tag: "Fashion", size: "tall" },
    { title: "Velvet Matte Lipstick", cat: "Makeup", img: "https://picsum.photos/seed/makeup-girl-1/800/1000", tag: "Beauty", size: "square" },
    { title: "Summer Linen Series", cat: "Clothing", img: "https://picsum.photos/seed/fashion-girl-2/800/1000", tag: "Fashion", size: "square" },
    { title: "Hydra-Glow Foundation", cat: "Makeup", img: "https://picsum.photos/seed/makeup-girl-2/800/1000", tag: "Beauty", size: "tall" },
    { title: "Urban Streetwear", cat: "Clothing", img: "https://picsum.photos/seed/fashion-girl-3/800/1000", tag: "Fashion", size: "tall" },
    { title: "Midnight Eyeshadow", cat: "Makeup", img: "https://picsum.photos/seed/makeup-girl-3/800/1000", tag: "Beauty", size: "square" },
    { title: "Boho Chic Accessories", cat: "Fashion", img: "https://picsum.photos/seed/fashion-girl-4/800/1000", tag: "Fashion", size: "square" },
    { title: "Radiant Skin Serum", cat: "Skincare", img: "https://picsum.photos/seed/skincare-girl-1/800/1000", tag: "Beauty", size: "tall" },
  ];

  return (
    <section id="gallery" className="py-24 px-[5%] bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <Label>Campaign Gallery</Label>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-6">AI-Generated <span className="text-brand">Advertising Gallery</span></h2>
            <p className="text-slate-500 text-lg">Hyper-realistic AI creators delivering high-impact advertising for global makeup and clothing brands.</p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-900 font-bold text-sm shadow-sm">600+ AI Models</div>
            <div className="px-6 py-3 rounded-full bg-brand text-white font-bold text-sm shadow-lg shadow-brand/20">98% Realism Score</div>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {ads.map((ad, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid group relative rounded-[32px] overflow-hidden shadow-2xl bg-slate-200"
            >
              <img 
                src={ad.img} 
                alt={ad.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                  {ad.tag}
                </div>
                <div className="px-3 py-1 rounded-full bg-brand text-white text-[10px] font-bold uppercase tracking-widest">
                  AI Generated
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">{ad.cat}</div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{ad.title}</h3>
                <button className="flex items-center gap-2 text-brand font-bold text-sm group-hover:gap-3 transition-all">
                  View Campaign Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIInfluencerGallery() {
  const influencers = [
    { name: "Sasha V.", niche: "Fashion", img: "https://picsum.photos/seed/fashionai1/600/800" },
    { name: "Elena R.", niche: "Makeup", img: "https://picsum.photos/seed/makeupai1/600/800" },
    { name: "Marcus K.", niche: "Lifestyle", img: "https://picsum.photos/seed/lifestyleai1/600/800" },
    { name: "Chloe M.", niche: "Skincare", img: "https://picsum.photos/seed/skincareai1/600/800" },
  ];

  return (
    <section className="py-24 px-[5%] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Label>AI Influencer Studio</Label>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-6">AI-Generated <span className="text-brand">Influencer Avatars</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Scale your influencer marketing with hyper-realistic AI avatars tailored to your brand's aesthetic.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {influencers.map((inf, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden group shadow-xl"
            >
              <img src={inf.img} alt={inf.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <div className="text-white font-bold text-lg">{inf.name}</div>
                <div className="text-brand font-bold text-xs uppercase tracking-widest">{inf.niche}</div>
              </div>
              <div className="absolute top-4 right-4 bg-brand text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">AI Generated</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIContentDemo() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const generateAI = async () => {
    if (!prompt) return;
    setGenerating(true);
    try {
      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        // @ts-ignore
        fetch: window.fetch.bind(window)
      });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [{ text: `A high-quality, professional portrait of a virtual AI influencer creator. Style: ${prompt}. Cinematic lighting, hyper-realistic.` }]
      });
      
      let found = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setResult(`data:image/png;base64,${part.inlineData.data}`);
          found = true;
          break;
        }
      }
      if (!found) {
        // Fallback if no image part found (though nano banana should return one)
        setResult(`https://picsum.photos/seed/${Math.random()}/600/800`);
      }
    } catch (err) {
      console.error(err);
      setResult(`https://picsum.photos/seed/${Math.random()}/600/800`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input 
          className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-brand transition-all"
          placeholder="e.g. Cyberpunk fashion model, Minimalist yoga guru..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button 
          onClick={generateAI}
          disabled={generating}
          className="px-8 py-4 rounded-2xl bg-brand text-white font-bold hover:bg-brand-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {generating ? <Zap className="w-5 h-5 animate-pulse" /> : <Sparkles className="w-5 h-5" />}
          {generating ? "Generating..." : "Generate Persona"}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 aspect-[3/4] max-w-sm mx-auto rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative group"
          >
            <img src={result} alt="AI Generated Creator" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="text-white">
                <div className="text-xs font-bold uppercase tracking-widest text-brand mb-1">AI Generated</div>
                <div className="text-lg font-bold">Your Custom Creator</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BlogsPage() {
  const [ref, inView] = useInView(0.05);
  return (
    <div className="min-h-screen pt-24 pb-16 px-[5%] bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <Label>Our Blog</Label>
        <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-12">Insights & <span className="text-brand">Case Studies</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {BLOG_POSTS.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-video relative overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-slate-900 uppercase tracking-widest">{post.cat}</div>
              </div>
              <div className="p-8">
                <div className="text-xs text-slate-400 font-bold mb-3">{post.date}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-brand transition-colors">{post.title}</h3>
                <button className="flex items-center gap-2 text-brand font-bold text-sm group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-20">
          <Label>Success Stories</Label>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-12">Detailed Case Studies</h2>
          <div ref={ref as any} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASE_STUDIES.map((cs, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row"
              >
                <div className="w-full md:w-1/3 aspect-square md:aspect-auto relative overflow-hidden">
                  <img src={`https://picsum.photos/seed/cs${i}/400/400`} alt={cs.brand} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">{cs.brand}</h3>
                    <div className="px-3 py-1 rounded-lg bg-brand-light text-brand text-xs font-bold">{cs.result}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{cs.cat}</div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{cs.sub}</p>
                  <button className="flex items-center gap-2 text-brand font-bold text-sm group-hover:gap-3 transition-all">
                    View Full Case Study <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SvcPage({ svcId, setPage }: { svcId: string, setPage: (p: string) => void }) {
  const svc = SVCS.find(s => s.id === svcId) || SVCS[0];
  const [ref, inView] = useInView(0.05);

  // Custom descriptions for specific features
  const featureDetails: Record<string, string> = {
    "Product Demo Ads": "Show your product in action to educate and convert simultaneously.",
    "Problem-Solution Ads": "Hook with a problem, sell with your solution — the highest-converting format.",
    "Unboxing Videos (Makeup & Skincare)": "First-impression content that builds desire before the purchase.",
    "Testimonial Videos": "Real customers sharing authentic experiences with your product."
  };

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-12 px-[5%] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${svc.bg} 0%, #fff 60%)` }}>
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

      <section className="py-10 px-[5%]" style={{ backgroundColor: svc.color }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {svc.results.map((r, i) => (
            <div key={i} className="text-center py-8 border-b md:border-b-0 md:border-r border-white/20 last:border-0">
              <div className="text-4xl md:text-6xl font-extrabold text-white mb-2">{r.n}</div>
              <div className="text-sm font-bold text-white/70 uppercase tracking-widest">{r.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section ref={ref as any} className="py-10 px-[5%] bg-white">
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
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col gap-3 items-start"
              >
                <div className="flex gap-3 items-center">
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: svc.color }} />
                  <span className="text-sm font-bold text-slate-700 leading-tight">{ft}</span>
                </div>
                {featureDetails[ft] && (
                  <p className="text-xs text-slate-500 leading-relaxed pl-8">{featureDetails[ft]}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {svcId === "influencer" && (
        <>
          <AIInfluencerGallery />
          <AIAdvertisingShowcase />
        </>
      )}

      {svcId === "social-ads" && (
        <section className="py-24 px-[5%] bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Label>Ad Creative Showcase</Label>
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tighter">Product Demo <span className="text-brand">Ads in Action</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { t: "Dynamic Demo", d: "Educate and convert simultaneously.", img: "https://picsum.photos/seed/demo1/600/800" },
                { t: "Feature Highlight", d: "Showcase unique selling points.", img: "https://picsum.photos/seed/demo2/600/800" },
                { t: "Lifestyle Integration", d: "Product in real-world use.", img: "https://picsum.photos/seed/demo3/600/800" }
              ].map((ad, i) => (
                <div key={i} className="group rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-100">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={ad.img} alt={ad.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{ad.t}</h3>
                    <p className="text-sm text-slate-500">{ad.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {svcId === "content" && (
        <section className="py-24 px-[5%] bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/10 blur-[120px] -z-10" />
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <Label>Highest-Converting Format</Label>
                <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[0.9]">Problem-Solution <span className="text-brand">Ads</span></h2>
                <p className="text-2xl font-bold text-white/80 mb-8 italic serif">"Hook with a problem, sell with your solution — the highest-converting format."</p>
                <p className="text-lg text-slate-400 leading-relaxed mb-10">We engineer content that identifies your customer's deepest pain points and positions your product as the only logical answer. This psychological framework consistently outperforms standard brand awareness content.</p>
                <div className="space-y-4">
                  {["Pain Point Identification", "Solution Positioning", "Strong Call-to-Action"].map((step, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-xs font-bold">{i + 1}</div>
                      <span className="font-bold text-white/90">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[40px] bg-white/5 border border-white/10 p-4 relative overflow-hidden">
                   <img src="https://picsum.photos/seed/problem1/800/800" alt="Problem Solution Ad" className="w-full h-full object-cover rounded-[32px] opacity-80" referrerPolicy="no-referrer" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="px-8 py-4 bg-brand text-white font-black text-2xl uppercase tracking-tighter shadow-2xl rotate-[-5deg]">The Solution</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      <CTABand setPage={setPage} />
    </div>
  );
}

// ─── MAIN APP ───

export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setTargetSection(null);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, targetSection]);

  const handleNav = (p: string, section?: string) => {
    if (section && page === "home") {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (section) {
      setTargetSection(section);
      setPage("home");
    } else {
      if (page === p) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setPage(p);
      }
    }
  };

  const renderPage = () => {
    if (page.startsWith("svc-")) return <SvcPage svcId={page.replace("svc-", "")} setPage={setPage} />;
    switch (page) {
      case "home": return <Home setPage={setPage} />;
      case "contact": return <ContactPage />;
      case "influencer": return <InfluencerPage setPage={setPage} />;
      case "blogs": return <BlogsPage />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand selection:text-white">
      <Navbar page={page} handleNav={handleNav} scrolled={scrolled} />
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
      <Foot handleNav={handleNav} />
    </div>
  );
}
