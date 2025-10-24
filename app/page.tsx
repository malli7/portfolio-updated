"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ChevronDown,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResumePopup } from "@/app/components/resume-popup";

const projects = [
  {
    title: "Acco Finder – AI-Powered Housing Platform",
    features: [
      "Built a housing discovery platform using React, Next.js, and MongoDB, reducing student housing search time by 50% through location-based filtering and user-tailored listings.",
      "Integrated a recommendation engine using Python, pandas, and cosine similarity, leveraging user input and listing metadata to deliver personalized housing suggestions.",
      "Implemented real-time chat and map-based search functionality, improving platform engagement and interactivity.",
      "Deployed on Vercel with serverless functions and caching, reducing backend latency by 35% under peak usage.",
    ],
    image: "/acco-finder-image.jpeg",
    link: "https://www.acco-finder.com/",
  },
  {
    title: "Portfolio",
    features: [
      "Designed and developed a responsive, SEO-optimized portfolio website using Next.js, React.js, and Tailwind CSS to showcase projects and technical expertise.",
      "Implemented dynamic animations, optimized load times, and ensured accessibility across all devices.",
      "The portfolio includes interactive components, performance enhancements, and real-time project previews to support professional engagement and recruiter visibility.",
    ],
    image: "/portfolio-image.png",
    link: "https://www.mallikarjuna-portfolio.com/",
  },
  {
    title: "AI Article Summarizer",
    features: [
      "Developed an AI-based summarization tool using OpenAI API (GPT-4), designed to automate long-form content reduction for quicker readability.",
      "Created a real-time preview interface with Next.js and TypeScript, and built backend APIs in Node.js for efficient model integration.",
      "Optimized loading speed by 70% using smart caching and improved database interactions.",
    ],
    image: "/ai-summarizer-image.jpeg",
    link: "https://aisummarizer-website.netlify.app/",
  },
  {
    title: "Entry-Level Jobs Dashboard",
    features: [
      "Built a full-stack job discovery platform using Next.js, TypeScript, and Firebase, aggregating listings from LinkedIn, Indeed, and Google Jobs with real-time updates and filtering.",
      "Integrated AI-driven resume matching using OpenAI for skill extraction and TF-IDF + XGBoost for entry-level classification, enabling personalized job scores and gap analysis.",
      "Developed interactive analytics dashboards with Chart.js and Recharts, visualizing job trends, hiring regions, and skill demands using real-time Firestore data.",
      "Implemented secure Firebase Authentication, profile management, and resume upload with version control, enabling users to track matches over time.",
    ],
    image: "/entry-level.png",
    link: "https://entry-level-jobs-dashboard.vercel.app/",
  },
  {
    title: "AI-Powered Resume & Cover Letter Generator",
    features: [
      "Built a document generation platform using Next.js, Firestore, and Docker, enabling users to create tailored, ATS-optimized resumes and cover letters with a 93% reported success rate.",
      "Integrated OpenAI GPT-4 for real-time content generation, leveraging prompt engineering, keyword optimization, and semantic alignment to match job descriptions at scale.",
      "Used Selenium with Chrome headless to automate PDF rendering of resumes with pixel-perfect formatting and export functionality.",
      "Deployed the entire system in a containerized environment using Docker, with scalable serverless functions for content generation and Firestore for persistent data and user session management.",
    ],
    image: "/ai-resume.png",
    link: "https://ai-resume-drab.vercel.app/",
  },
  {
    title: "Emotion Based Music Player",
    features: [
      "Developed a machine learning-powered music recommendation system using CNNs to analyze user facial expressions.",
      "Created a seamless user interface for live mood detection and personalized music suggestions, improving user engagement by 40%.",
      "Presented and published research on the system at ICSCDS 2022, showcasing its innovative impact on personalized user experiences.",
    ],
    image: "/emotion-image.jpeg",
    link: "https://github.com/malli7",
  },
];

const skills = [
  "OpenAI API",
  "TypeScript",
  "Firebase",
  "Tailwind CSS",
  "MySQL",
  "Express.js",
  "REST APIs",
  "docker",
  "Git",
  "PostgreSQL",
  "Full-Stack Development",
  "Artificial Intelligence",
  "Machine Learning",
  "Next.js",
  "React.js",
  "Node.js",
  "JavaScript",
  "Python",
  "Java",
];
const workExperience = [
  {
    company: "Cognizant",
    position: "Software Engineer",
    period: "Feb 2023 - Aug 2023",
    responsibilities: [
      "Developed dynamic web apps using React.js, Next.js, and Node.js, improving user engagement and reducing bounce rate by 30% through SPA optimizations and lazy loading.",
      "Engineered secure backend APIs with Express.js, implementing token-based authentication, input validation, and role-based access.",
      "Designed and deployed TensorFlow-based classification models for customer support and fraud detection, reducing manual review workloads by 35%.",
      "Refactored database models in MongoDB/PostgreSQL, optimizing data retrieval and caching to reduce average query time by 50%.",
      "Deployed microservices using Docker, AWS Lambda, and Kubernetes, enabling auto-scaling and ensuring 99.9% service availability.",
      "Led automation of CI/CD pipelines with GitHub Actions and Jenkins, cutting down deployment cycles by 40% and reducing production errors",
      "Worked across full Agile cycles, regularly contributing to sprint planning, testing, and release documentation.",
    ],
  },
  {
    company: "Cognizant",
    position: "Software Engineer Intern",
    period: "Feb 2022 - Aug 2022",
    responsibilities: [
      "Built a fully interactive internal dashboard using React, FastAPI, and MongoDB, automating record tracking and reducing admin workload by 30%.",
      "Integrated NLP search features using spaCy, Scikit-learn, and fuzzy string matching to enhance search precision over semi-structured records.",
      "Developed a secure API layer with JWT-based auth and role-specific endpoints, enforcing access controls for multiple user roles.",
      "Deployed services on AWS Lambda and DynamoDB, reducing infrastructure overhead and scaling automatically during peak loads.",
      "Participated in full sprint cycles from UI planning and API development to code reviews and test coverage, gaining exposure to production-grade deployments.",
    ],
  },
];

const socialLinks = [
  {
    href: "mailto:mallikarjunareddygayam77@gmail.com",
    icon: Mail,
    label: "Email",
  },
  { href: "https://github.com/malli7", icon: Github, label: "GitHub" },
  {
    href: "https://linkedin.com/in/mallikarjuna-reddy-gayam",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "https://twitter.com/mallireddy0", icon: Twitter, label: "Twitter" },
];

const education = [
  {
    degree: "Master’s in Information Systems",
    institution: "Saint Louis University",
    period: "Aug 2023 – May 2025",
    details: "GPA: 3.9",
  },
  {
    degree: "Bachelor’s in Computer Science and Engineering",
    institution: "Lakireddy Bali Reddy College of Engineering",
    period: "Jun 2018 – May 2022",
    details: "",
  },
];

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) => {
    return pos === 1 ? "relative" : "fixed";
  });

  const openResume = () => setIsResumeOpen(true);
  const closeResume = () => setIsResumeOpen(false);

  return (
    <div
      ref={targetRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50"
    >
      <motion.header
        style={{ opacity, scale, position }}
        className="w-full top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Mallikarjuna
          </span>
          <nav className="hidden md:flex items-center gap-6">
            {["About", "Experience", "Skills", "Projects", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </nav>
          <Button
            onClick={openResume}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
          >
            <FileText className="mr-2 h-4 w-4" /> Resume
          </Button>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <section id="about" className="min-h-screen flex items-center">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="secondary"
                className="px-3 py-1 mr-3 bg-gradient-to-r from-blue-200 to-gray-200 text-gray-800"
              >
                Full Stack Developer
              </Badge>

              <Badge
                variant="secondary"
                className="px-3 py-1 bg-gradient-to-r from-blue-200 to-gray-200 text-gray-800"
              >
                ML Engineer
              </Badge>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Hey, I&apos;m Mallikarjuna Reddy Gayam
              </h1>
              <p className="text-gray-600 text-lg max-w-[600px]">
                Full Stack and AI/ML Engineer with expertise in building
                scalable web applications, intelligent systems, and deploying ML
                models. Proficient in React/Next.js, Node.js, Python, and AWS,
                delivering impactful features with a focus on performance and
                clean architecture.
              </p>
              <div className="flex gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                >
                  <a href="#contact">Get in Touch</a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  <a href="#projects">View Projects</a>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                {[
                  { href: "https://github.com/malli7", icon: Github },
                  { href: "https://twitter.com/mallireddy0", icon: Twitter },
                  {
                    href: "https://linkedin.com/in/mallikarjuna-reddy-gayam",
                    icon: Linkedin,
                  },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">
                      {social.href.split(".com/")[0].split("//")[1]}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 border-none shadow-lg">
                <CardContent className="p-6">
                  <code className="grid gap-2 text-sm">
                    <span>
                      <span className="text-blue-600">const</span> developer ={" "}
                      {"{"}
                    </span>
                    <span className="pl-4">
                      name:{" "}
                      <span className="text-blue-500">
                        &apos;Mallikarjuna Reddy Gayam&apos;
                      </span>
                      ,
                    </span>
                    <span className="pl-4">
                      role:{" "}
                      <span className="text-blue-500">
                        &apos;Full Stack Developer&apos;
                      </span>
                      ,
                      <span className="text-blue-500">
                        &apos;ML Engineer&apos;
                      </span>
                    </span>
                  

                    <span>{"}"}</span>
                  </code>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <motion.section
          id="experience"
          className="pt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-2 mb-12">
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-gradient-to-r from-blue-200 to-gray-200 text-gray-800"
            >
              Experience
            </Badge>
            <h2 className="text-3xl font-bold text-gray-800">Work History</h2>
            <p className="text-gray-600">My professional journey</p>
          </div>
          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-blue-600">
                      {job.position}
                    </h3>
                    <p className="text-gray-500">
                      {job.company} | {job.period}
                    </p>
                    <ul className="mt-2 text-gray-600 list-disc list-inside">
                      {job.responsibilities.map((responsibility, idx) => (
                        <li key={idx}>{responsibility}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="education"
          className="pt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-2 mb-12">
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-gradient-to-r from-blue-200 to-gray-200 text-gray-800"
            >
              Education
            </Badge>
            <h2 className="text-3xl font-bold text-gray-800">
              My Academic Journey
            </h2>
            <p className="text-gray-600">Degrees and qualifications</p>
          </div>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-blue-600">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-500">
                    {edu.institution} | {edu.period}
                  </p>
                  {edu.details && (
                    <p className="text-gray-500">{edu.details}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="pt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-2 mb-12">
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-gradient-to-r from-blue-200 to-gray-200 text-gray-800"
            >
              Skills
            </Badge>
            <h2 className="text-3xl font-bold text-gray-800">My Tech Stack</h2>
            <p className="text-gray-600">Technologies and tools I work with</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="group relative overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 h-full flex items-center justify-center">
                    <div className="font-medium text-center text-gray-700 group-hover:text-blue-600 transition-colors">
                      {skill}
                    </div>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-gray-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="pt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-2 mb-12">
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-gradient-to-r from-blue-200 to-gray-200 text-gray-800"
            >
              Projects
            </Badge>
            <h2 className="text-3xl font-bold text-gray-800">Featured Work</h2>
            <p className="text-gray-600">Some of my recent projects</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-48"
                  />
                  <CardContent className="p-4 space-y-2 flex-grow">
                    <h3 className="font-bold text-lg text-blue-600">
                      {project.title}
                    </h3>
                    <ul className="text-gray-600 list-disc list-inside">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 mt-auto text-blue-500 hover:text-blue-600"
                    >
                      <a href={project.link}>View Project</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="pt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-2 mb-12">
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-gradient-to-r from-blue-200 to-gray-200 text-gray-800"
            >
              Contact
            </Badge>
            <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
            <p className="text-gray-600">
              Connect with me on social media or via email
            </p>
          </div>
          <div className="flex justify-center items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-8 w-8" />
              </a>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              onClick={openResume}
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
            >
              <FileText className="mr-2 h-4 w-4" /> View Resume
            </Button>
          </div>
        </motion.section>
      </main>

      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <a
          href="#about"
          className="bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          aria-label="Scroll to top"
        >
          <ChevronDown className="h-6 w-6 text-blue-600 transform rotate-180" />
        </a>
      </motion.div>

      <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
    </div>
  );
}
