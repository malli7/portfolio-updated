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
    title: "Acco Finder",
    features: [
      "Designed and developed a platform using Next.js and firebase to solve housing challenges for international students, increasing user engagement by 50%.",
      "Integrated real-time chat, user authentication, and Google Maps API, significantly enhancing platform usability and reducing the bounce rate by 75%.",
      "Implemented personalized notifications and location-based services, leading to a 40% increase in daily active users.",
    ],
    image: "/acco-finder-image.jpeg",
    link: "https://www.acco-finder.com/",
  },
  {
    title: "Portfolio",
    features: [
      "Designed a personal portfolio website to showcase professional projects and skills, addressing the need for an impactful online presence.",
      "Built the site using Next.js, React.js, and Tailwind CSS, focusing on responsive layouts and intuitive navigation to enhance accessibility across devices.",
      "Achieved high search visibility and a polished online portfolio by integrating custom animations and SEO optimizations, significantly improving engagement and professional outreach.",
    ],
    image: "/portfolio-image.jpeg",
    link: "https://www.mallikarjuna-portfolio.com/",
  },
  {
    title: "AI Article Summarizer",
    features: [
      "Built an AI-powered summarization tool using GPT-4 technology to address the challenge of time-consuming manual content summarization.",
      "Designed an interactive React.js interface with live previews, boosting user engagement by 60% and reducing summarization time by 40%.",
      "Applied advanced caching techniques to optimize performance, cutting loading times by 70% and enhancing user satisfaction.",
    ],
    image: "/ai-summarizer-image.jpeg",
    link: "https://aisummarizer-website.netlify.app/",
  },
  {
    title: "Real Time Collaboration Platform",
    features: [
      "Developed a collaborative web application using Next.js and React.js to enable real-time updates for document editing and team communication.",
      "Integrated WebSocket-based communication to support live updates, task management, and chat functionality, improving team productivity significantly.",
      "Implemented user roles and permissions for enhanced security, ensuring scalability for diverse team structures and projects.",
    ],
    image: "/collab-image.jpeg",
    link: "https://github.com/malli7",
  },
  {
    title: "Car Zone",
    features: [
      "Created a captivating web page for a car repair and wash company to improve online visibility and customer engagement.",
      "Leveraged React.js and modern web development techniques to deliver a responsive and visually appealing user interface.",
      "Integrated optimized components for showcasing services and customer testimonials, enhancing user trust and engagement.",
    ],
    image: "/carzone-image.jpeg",
    link: "https://github.com/malli7",
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
  "User Interface Design",
  "WebSocket",
  "MongoDB",
  "OpenAI API",
  "GPT-4",
  "Three.js",
  "Search Engine Optimization (SEO)",
  "TypeScript",
  "Firebase",
  "HTML5",
  "CSS",
  "Tailwind CSS",
  "MySQL",
  "Data Structures",
  "Algorithm Design",
  "Express.js",
  "REST APIs",
  "docker",
  "Git",
  "CI/CD",
  "jetkins",
  "PostgreSQL",
  "Full-Stack Development",
  "Artificial Intelligence (AI)",
  "Machine Learning",
  "Generative AI",
  "Google Cloud Platform (GCP)",
  "Back-End Web Development",
  "Responsive Web Design",
  "Next.js",
  "React.js",
  "Node.js",
  "JavaScript",
  "React Native",
  "Android Development",
  "Python (Programming Language)",
  "Java",
];
const workExperience = [
  {
    company: "Cognizant",
    position: "Software Engineer Trainee",
    period: "Feb 2023 - Aug 2023",
    responsibilities: [
      "Developed and deployed full-stack web applications using React.js and Node.js, addressing performance challenges in existing systems.",
      "Tasked with improving query response times and ensuring seamless feature deployments across development, staging, and production environments.",
      "Optimized PostgreSQL database schemas and integrated robust CI/CD pipelines with Jenkins and Docker, enabling streamlined deployments and scalable application architecture.",
      "Delivered a 40% improvement in application performance, a 50% reduction in database query response times, and a 60% decrease in deployment time, enhancing user satisfaction and operational efficiency.",
    ],
  },
  {
    company: "CourseHero",
    position: "Tutor",
    period: "Aug 2022 - Apr 2023",
    responsibilities: [
      "Assisted students in solving complex coding challenges in Java and Python, focusing on explaining foundational programming concepts and problem-solving strategies.",
      "Tasked with delivering clear, concise, and accurate solutions to a diverse range of coding problems while maintaining a high helpfulness rating.",
      "Reviewed and answered over 500+ coding questions, reinforcing students' understanding of data structures, algorithms, and language-specific best practices.",
      "Consistently achieved a 93% helpful rating, showcasing a commitment to clarity, accuracy, and improving students' coding proficiency.",
    ],
  },
  {
    company: "Cognizant",
    position: "Software Engineer Intern",
    period: "Feb 2022 - Aug 2022",
    responsibilities: [
      "Engineered a comprehensive student management system to streamline academic processes and boost administrative efficiency.",
      "Tasked with developing a scalable and responsive system capable of managing over 10,000 student records.",
      "Designed the system using React.js and Node.js, optimized MySQL database schemas, and implemented RESTful APIs to ensure efficient data handling and interaction.",
      "Achieved a 30% improvement in administrative efficiency, a 45% acceleration in data retrieval times, and a 25% reduction in system response time, delivering a high-impact solution.",
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
                className="px-3 py-1 bg-gradient-to-r from-blue-200 to-gray-200 text-gray-800"
              >
                Full Stack Developer
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Hey, I&apos;m Mallikarjuna Reddy Gayam
              </h1>
              <p className="text-gray-600 text-lg max-w-[600px]">
                A passionate and versatile Full Stack Developer creating
                innovative solutions with expertise in Front-End and Back-End
                technologies.
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
                        &apos;Mallikarjuna&apos;
                      </span>
                      ,
                    </span>
                    <span className="pl-4">
                      role:{" "}
                      <span className="text-blue-500">
                        &apos;Full Stack Developer&apos;
                      </span>
                      ,
                    </span>
                    <span className="pl-4">
                      location:{" "}
                      <span className="text-blue-500">&apos;United States&apos;</span>,
                    </span>
                    <span className="pl-4">
                      interests: [
                      <span className="text-blue-500">
                        &apos;Full Stack Development&apos;
                      </span>
                      ,{" "}
                      <span className="text-blue-500">
                        &apos;Cloud Computing&apos;
                      </span>
                      ]
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
