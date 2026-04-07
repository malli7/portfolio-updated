"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  ChevronUp,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  Database,
  Cloud,
  Layers,
  ArrowRight,
  Terminal,
  Brain,
  Server,
} from "lucide-react";
import { ResumePopup } from "@/app/components/resume-popup";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Experience", "Skills", "Projects", "Education", "Contact"];

const STATS = [
  { value: "3+", label: "Years of Experience", icon: Briefcase },
  { value: "3.9", label: "GPA (Master's)", icon: GraduationCap },
  { value: "5+", label: "LLM Systems Shipped", icon: Brain },
  { value: "10+", label: "Production Projects", icon: Layers },
];

const SKILL_CATEGORIES = [
  {
    label: "Languages & Frameworks",
    icon: Code2,
    color: "blue",
    skills: ["Python", "TypeScript", "JavaScript", "React.js", "Next.js", "Node.js", "Express.js", "FastAPI"],
  },
  {
    label: "AI / ML & NLP",
    icon: Brain,
    color: "purple",
    skills: ["Large Language Models", "LangGraph", "LangChain", "RAG", "LoRA / PEFT Fine-Tuning", "Prompt Engineering", "TensorFlow", "spaCy", "Scikit-learn", "LLM-as-Judge Evaluation"],
  },
  {
    label: "MLOps & Infrastructure",
    icon: Server,
    color: "cyan",
    skills: ["MLflow", "vLLM", "AWS SageMaker", "RAGAS", "GitHub Actions", "CI/CD", "Docker", "Kubernetes", "AWS EKS", "AWS Lambda"],
  },
  {
    label: "Data & Storage",
    icon: Database,
    color: "emerald",
    skills: ["Pinecone", "PostgreSQL", "MongoDB", "DynamoDB"],
  },
  {
    label: "Cloud & DevOps",
    icon: Cloud,
    color: "orange",
    skills: ["AWS", "Containerization", "Microservices", "Auto-Scaling", "Infrastructure as Code"],
  },
];

const SKILL_COLOR_MAP: Record<string, { chip: string; dot: string }> = {
  blue:    { chip: "bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40",  dot: "bg-blue-400" },
  purple:  { chip: "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40", dot: "bg-purple-400" },
  cyan:    { chip: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40", dot: "bg-cyan-400" },
  emerald: { chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40", dot: "bg-emerald-400" },
  orange:  { chip: "bg-orange-500/10 text-orange-300 border-orange-500/20 hover:bg-orange-500/20 hover:border-orange-500/40", dot: "bg-orange-400" },
};

const EXPERIENCE = [
  {
    company: "Zoom",
    position: "AI Engineer",
    period: "Jun 2024 – Present",
    location: "Remote",
    color: "blue",
    highlights: [
      "Deployed production LLM inference pipelines on AWS EKS using vLLM, improving throughput through dynamic batching and prompt caching strategies.",
      "Architected end-to-end RAG systems using LangGraph and Pinecone — owning the full pipeline from embedding model selection and chunking strategy to reranking and retrieval quality evaluation with RAGAS.",
      "Built MLOps automation pipelines with MLflow and GitHub Actions, enabling prompt regression testing on every code merge and proactive monitoring of embedding drift.",
      "Fine-tuned domain-specific LLMs using LoRA and PEFT on AWS SageMaker, validated through LLM-as-judge evaluation pipelines.",
      "Contributed to cross-functional architecture discussions on model deployment strategies, inference optimization tradeoffs, and production readiness criteria for generative AI features.",
    ],
    tech: ["vLLM", "LangGraph", "Pinecone", "RAGAS", "MLflow", "AWS EKS", "LoRA/PEFT", "SageMaker"],
  },
  {
    company: "Cognizant",
    position: "Software Engineer",
    period: "Feb 2023 – Aug 2023",
    location: "Hyderabad, India",
    color: "cyan",
    highlights: [
      "Developed high-performance SPAs using React.js, Next.js, and Node.js, reducing user bounce rate by 30% through optimized client-side routing and lazy loading.",
      "Designed and deployed TensorFlow-based ML models to automate fraud detection and customer support workflows in enterprise finance and e-commerce environments.",
      "Built secure, token-based RESTful APIs with Express.js, implementing input validation and role-based access control across large-scale user bases.",
      "Containerized microservices using Docker and deployed on AWS Lambda and Kubernetes with auto-scaling configurations and CI/CD pipelines.",
    ],
    tech: ["React.js", "Next.js", "TensorFlow", "Docker", "Kubernetes", "AWS Lambda", "Express.js"],
  },
  {
    company: "Cognizant",
    position: "Software Engineer Intern",
    period: "Feb 2022 – Aug 2022",
    location: "Hyderabad, India",
    color: "purple",
    highlights: [
      "Built an internal operations dashboard using React and FastAPI, streamlining record tracking workflows and reducing administrative overhead.",
      "Integrated NLP-powered search using spaCy, Scikit-learn, and fuzzy matching algorithms, improving retrieval precision over semi-structured enterprise datasets.",
      "Developed secure backend APIs with JWT authentication and role-based access control, ensuring controlled data access across multiple user types.",
      "Deployed backend services on AWS Lambda with DynamoDB, reducing infrastructure costs while maintaining high availability.",
    ],
    tech: ["React", "FastAPI", "spaCy", "Scikit-learn", "AWS Lambda", "DynamoDB", "JWT"],
  },
];

const PROJECTS = [
  {
    title: "Acco Finder – AI-Powered Housing Platform",
    description: "Housing discovery platform that cuts student search time by 50% with ML-powered recommendations and real-time map search.",
    bullets: [
      "Built with React, Next.js, and MongoDB; cosine-similarity recommendation engine using pandas.",
      "Real-time chat, map-based search, and Vercel serverless deployment with performance-optimized caching.",
    ],
    image: "/acco-finder-image.jpeg",
    link: "https://www.acco-finder.com/",
    tech: ["Next.js", "MongoDB", "Python", "Vercel"],
    accent: "blue",
  },
  {
    title: "AI-Powered Resume & Cover Letter Generator",
    description: "Document generation platform with 93% reported ATS success rate, powered by GPT-4 and containerized for scale.",
    bullets: [
      "OpenAI GPT-4 for content generation with prompt engineering and semantic alignment to job descriptions.",
      "Selenium Chrome headless for pixel-perfect PDF rendering; Docker + Firestore for persistent session management.",
    ],
    image: "/ai-resume.png",
    link: "https://ai-resume-drab.vercel.app/",
    tech: ["Next.js", "OpenAI GPT-4", "Docker", "Firestore", "Selenium"],
    accent: "purple",
  },
  {
    title: "Entry-Level Jobs Dashboard",
    description: "Full-stack job discovery platform aggregating listings from LinkedIn, Indeed, and Google Jobs with AI-driven resume matching.",
    bullets: [
      "TF-IDF + XGBoost for entry-level classification; personalized job scores and gap analysis.",
      "Interactive analytics dashboards (Chart.js / Recharts) with real-time Firestore data and Firebase Auth.",
    ],
    image: "/entry-level.png",
    link: "https://entry-level-jobs-dashboard.vercel.app/",
    tech: ["Next.js", "TypeScript", "Firebase", "OpenAI", "XGBoost"],
    accent: "cyan",
  },
  {
    title: "AI Article Summarizer",
    description: "Real-time AI summarization tool built on GPT-4 with smart caching achieving 70% faster load times.",
    bullets: [
      "Next.js frontend with TypeScript; Node.js backend APIs for efficient OpenAI model integration.",
      "Smart caching strategy and optimized database interactions slashed loading speed by 70%.",
    ],
    image: "/ai-summarizer-image.jpeg",
    link: "https://aisummarizer-website.netlify.app/",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Node.js"],
    accent: "emerald",
  },
  {
    title: "Portfolio Website",
    description: "This portfolio — a responsive, SEO-optimized Next.js site with dynamic animations and dark-mode-first design.",
    bullets: [
      "Built with Next.js, Tailwind CSS, and Framer Motion for smooth scroll-triggered animations.",
      "Fully responsive with performance optimizations, accessibility, and real-time project previews.",
    ],
    image: "/portfolio-image.png",
    link: "https://www.mallikarjuna-portfolio.com/",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    accent: "blue",
  },
  {
    title: "Emotion-Based Music Player",
    description: "CNN-powered music recommendation system that analyzes live facial expressions to suggest personalized tracks.",
    bullets: [
      "Improved user engagement by 40% through real-time mood detection and personalized playlist curation.",
      "Published research presented at ICSCDS 2022.",
    ],
    image: "/emotion-image.jpeg",
    link: "https://github.com/malli7",
    tech: ["Python", "TensorFlow", "CNN", "OpenCV"],
    accent: "purple",
  },
];

const PROJECT_ACCENT: Record<string, string> = {
  blue:    "from-blue-500/20 to-blue-600/5 border-blue-500/20",
  purple:  "from-purple-500/20 to-purple-600/5 border-purple-500/20",
  cyan:    "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20",
  emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
};

const PROJECT_TAG: Record<string, string> = {
  blue:    "bg-blue-500/10 text-blue-300 border-blue-500/20",
  purple:  "bg-purple-500/10 text-purple-300 border-purple-500/20",
  cyan:    "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
};

const EDUCATION = [
  {
    degree: "Master of Science in Information Systems",
    institution: "Saint Louis University",
    period: "Aug 2023 – May 2025",
    detail: "GPA: 3.9 / 4.0",
    icon: "🎓",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Lakireddy Bali Reddy College of Engineering",
    period: "Jun 2018 – May 2022",
    detail: "",
    icon: "🏛️",
  },
];

const SOCIAL = [
  { href: "mailto:mallikarjunareddygayam77@gmail.com", icon: Mail,     label: "Email",    color: "hover:text-red-400" },
  { href: "https://github.com/malli7",                  icon: Github,   label: "GitHub",   color: "hover:text-white" },
  { href: "https://linkedin.com/in/mallikarjunag1",     icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
];

const ROLES = ["AI Engineer", "LLM Systems Builder", "MLOps Architect", "Full-Stack Developer", "RAG Specialist"];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay   = deleting ? speed / 2 : charIdx === current.length ? pause : speed;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, width: "100%" }}
    />
  );
}

function Navbar({ onResume }: { onResume: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060612]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#about" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
            M
          </div>
          <span className="hidden sm:block font-semibold text-white/90 group-hover:text-white transition-colors">
            Mallikarjuna
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onResume}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-200 transition-all duration-200"
          >
            <FileText className="w-4 h-4" />
            Resume
          </button>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg glass text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span className={`block h-0.5 bg-current rounded transition-transform ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-current rounded transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current rounded transition-transform ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#060612]/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col px-4 py-4 gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                >
                  {link}
                </a>
              ))}
              <button
                onClick={() => { onResume(); setMobileOpen(false); }}
                className="flex items-center gap-2 mt-2 px-3 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
                View Resume
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      className="text-center mb-14"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="section-label mb-4 inline-flex">{label}</span>
      <h2 className="section-title text-white mt-4 mb-3">{title}</h2>
      {subtitle && <p className="text-white/40 text-base max-w-xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const role = useTypewriter(ROLES);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-[#060612] text-white overflow-x-hidden">
      <ScrollProgressBar />
      <Navbar onResume={() => setResumeOpen(true)} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        id="about"
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 dot-pattern opacity-60" />
        <div className="absolute inset-0 bg-hero-gradient" />

        {/* Animated orbs */}
        <div className="orb orb-1 absolute top-1/4 -left-32 pointer-events-none" />
        <div className="orb orb-2 absolute bottom-1/4 -right-32 pointer-events-none" />
        <div className="orb orb-3 absolute top-1/2 left-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column */}
            <motion.div
              className="space-y-7"
              style={{ opacity: heroOpacity, y: heroY }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Status badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </motion.div>

              {/* Name */}
              <div>
                <motion.p
                  className="text-white/50 text-sm font-medium tracking-widest uppercase mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Hi, I&apos;m
                </motion.p>
                <motion.h1
                  className="hero-title text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                >
                  Mallikarjuna
                  <br />
                  <span className="gradient-text">Reddy Gayam</span>
                </motion.h1>
              </div>

              {/* Typewriter role */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Terminal className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-lg sm:text-xl text-blue-300 font-mono font-medium cursor-blink min-h-[1.75rem]">
                  {role}
                </span>
              </motion.div>

              {/* Summary */}
              <motion.p
                className="text-white/55 text-base sm:text-lg leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                AI Engineer with <strong className="text-white/80">3+ years</strong> designing production-grade LLM systems, RAG pipelines, and MLOps infrastructure. Currently at{" "}
                <strong className="text-blue-400">Zoom</strong>, optimizing inference latency and building domain-specific fine-tuned models at scale.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold transition-all duration-300 hover:shadow-glow-blue hover:-translate-y-0.5"
                >
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-white/80 text-sm font-semibold hover:bg-white/5 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  View Projects
                </a>
              </motion.div>

              {/* Social links */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
              >
                {SOCIAL.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`p-2 rounded-lg glass glass-hover text-white/40 ${s.color} transition-colors`}
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
                <div className="h-px flex-1 bg-white/5 max-w-[80px]" />
                <span className="text-white/30 text-xs">Let&apos;s connect</span>
              </motion.div>
            </motion.div>

            {/* Right column — Terminal card */}
            <motion.div
              className="float-animation"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="glass gradient-border rounded-2xl overflow-hidden glow-blue">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="text-white/30 text-xs ml-2 font-mono">profile.ts</span>
                </div>

                {/* Terminal body */}
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <p className="text-white/30"><span>{"// AI Engineer @ Zoom"}</span></p>
                  <br />
                  <p>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-300">engineer</span>{" "}
                    <span className="text-white/60">=</span>{" "}
                    <span className="text-white/60">{"{"}</span>
                  </p>
                  <div className="pl-4 space-y-1.5 my-2">
                    <p>
                      <span className="text-cyan-400">name</span>
                      <span className="text-white/60">: </span>
                      <span className="text-green-400">&apos;Mallikarjuna Reddy Gayam&apos;</span>
                      <span className="text-white/40">,</span>
                    </p>
                    <p>
                      <span className="text-cyan-400">role</span>
                      <span className="text-white/60">: </span>
                      <span className="text-green-400">&apos;AI Engineer&apos;</span>
                      <span className="text-white/40">,</span>
                    </p>
                    <p>
                      <span className="text-cyan-400">company</span>
                      <span className="text-white/60">: </span>
                      <span className="text-green-400">&apos;Zoom&apos;</span>
                      <span className="text-white/40">,</span>
                    </p>
                    <p>
                      <span className="text-cyan-400">focus</span>
                      <span className="text-white/60">: [</span>
                    </p>
                    <div className="pl-4 space-y-1">
                      {["LLM Inference", "RAG Pipelines", "MLOps", "Fine-Tuning"].map((f) => (
                        <p key={f}>
                          <span className="text-green-400">&apos;{f}&apos;</span>
                          <span className="text-white/40">,</span>
                        </p>
                      ))}
                    </div>
                    <p><span className="text-white/60">],</span></p>
                  </div>
                  <p><span className="text-white/60">{"}"}</span></p>
                  <br />
                  <p className="text-white/30">
                    <span className="text-purple-400">export</span>{" "}
                    <span className="text-purple-400">default</span>{" "}
                    <span className="text-blue-300">engineer</span>
                    <span className="text-white/60">;</span>
                  </p>
                </div>
              </div>

              {/* Location badge below card */}
              <motion.div
                className="mt-4 flex items-center justify-end gap-2 text-white/35 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Available · Open to Relocation</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="stat-border p-4 rounded-xl text-center"
              >
                <stat.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-white/45 text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────────── */}
      <section id="experience" className="py-24 relative">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Experience"
            title="Professional Journey"
            subtitle="Building production-grade AI systems and full-stack applications across enterprise environments"
          />

          <div className="relative space-y-8">
            {/* Vertical timeline line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />

            {EXPERIENCE.map((job, idx) => {
              const colorClasses: Record<string, { dot: string; badge: string; tag: string }> = {
                blue:   { dot: "bg-blue-500",   badge: "bg-blue-500/10 text-blue-300 border-blue-500/25",   tag: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
                cyan:   { dot: "bg-cyan-500",   badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/25",   tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" },
                purple: { dot: "bg-purple-500", badge: "bg-purple-500/10 text-purple-300 border-purple-500/25", tag: "bg-purple-500/10 text-purple-300 border-purple-500/20" },
              };
              const cc = colorClasses[job.color];

              return (
                <motion.div
                  key={idx}
                  className="md:pl-20 relative"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className={`hidden md:flex absolute left-6 top-6 w-4 h-4 rounded-full border-2 border-[#060612] ${cc.dot} items-center justify-center`} />

                  <div className="glass glass-hover card-hover rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">{job.position}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full border ${cc.badge}`}>
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1 text-white/40 text-xs">
                            <MapPin className="w-3 h-3" /> {job.location}
                          </span>
                        </div>
                      </div>
                      <span className="text-white/40 text-xs font-mono shrink-0 mt-1">{job.period}</span>
                    </div>

                    <ul className="space-y-2.5 mb-5">
                      {job.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex gap-2.5 text-white/60 text-sm leading-relaxed">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${cc.dot}`} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {job.tech.map((t) => (
                        <span
                          key={t}
                          className={`text-xs px-2.5 py-1 rounded-full border font-medium ${cc.tag}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Skills"
            title="Technical Toolkit"
            subtitle="Across AI/ML, full-stack engineering, and cloud infrastructure"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILL_CATEGORIES.map((cat, catIdx) => {
              const cc = SKILL_COLOR_MAP[cat.color];
              return (
                <motion.div
                  key={cat.label}
                  className="glass glass-hover card-hover rounded-2xl p-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${cc.chip.split(" ").slice(0, 2).join(" ")}`}>
                      <cat.icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white/80">{cat.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`skill-chip text-xs border ${cc.chip}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────── */}
      <section id="projects" className="py-24 relative">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Projects"
            title="Featured Work"
            subtitle="Production-grade applications at the intersection of AI and full-stack engineering"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => {
              const accentClass = PROJECT_ACCENT[project.accent] ?? PROJECT_ACCENT.blue;
              const tagClass    = PROJECT_TAG[project.accent]    ?? PROJECT_TAG.blue;

              return (
                <motion.div
                  key={idx}
                  className="group relative"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                >
                  <div className={`glass card-hover rounded-2xl overflow-hidden h-full flex flex-col border bg-gradient-to-br ${accentClass}`}>
                    {/* Image with overlay */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060612] via-[#060612]/60 to-transparent" />
                      {/* Live link on hover */}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label={`Open ${project.title}`}
                      >
                        <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                          <ExternalLink className="w-4 h-4" /> View Live
                        </span>
                      </a>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-white mb-2 leading-snug">{project.title}</h3>
                      <p className="text-white/50 text-sm mb-3 leading-relaxed">{project.description}</p>
                      <ul className="space-y-1.5 mb-4 flex-1">
                        {project.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex gap-2 text-white/40 text-xs leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${tagClass}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ─────────────────────────────────────────────── */}
      <section id="education" className="py-24 relative">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Education"
            title="Academic Background"
          />

          <div className="space-y-5">
            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={idx}
                className="glass glass-hover card-hover rounded-2xl p-6 sm:p-8"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{edu.icon}</span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">{edu.degree}</h3>
                      <p className="text-blue-400 text-sm font-medium mt-0.5">{edu.institution}</p>
                      {edu.detail && (
                        <span className="inline-block mt-2 text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold">
                          {edu.detail}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-white/35 text-xs font-mono shrink-0">{edu.period}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────── */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/15 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-6 inline-flex">Contact</span>
            <h2 className="section-title text-white mt-4 mb-4">
              Let&apos;s Build Something
              <span className="gradient-text block">Together</span>
            </h2>
            <p className="text-white/45 text-base leading-relaxed mb-10 max-w-lg mx-auto">
              I&apos;m open to AI engineering roles, MLOps opportunities, and collaborations on generative AI and RAG-based systems. Feel free to reach out.
            </p>

            {/* Social links */}
            <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl glass glass-hover border border-white/8 text-white/50 text-sm font-medium ${s.color} transition-all`}
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </a>
              ))}
            </div>

            {/* Resume button */}
            <button
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm transition-all duration-300 hover:shadow-glow-blue hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              View Full Resume
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-sm">
          <span>© 2025 Mallikarjuna Reddy Gayam</span>
          <span>Built with Next.js · Tailwind CSS · Framer Motion</span>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.a
            href="#about"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-xl glass border border-white/10 text-white/60 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all"
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.a>
        )}
      </AnimatePresence>

      <ResumePopup isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
