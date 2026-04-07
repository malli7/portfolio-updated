import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mallikarjuna Reddy Gayam — AI Engineer",
  description:
    "AI Engineer with 3+ years designing production LLM systems, RAG pipelines, and MLOps infrastructure. Currently at Zoom building generative AI features at scale.",
  keywords: [
    "AI Engineer",
    "LLM",
    "RAG",
    "MLOps",
    "LangChain",
    "LangGraph",
    "Pinecone",
    "vLLM",
    "Next.js",
    "React",
    "Python",
    "Full Stack Developer",
    "Mallikarjuna Reddy Gayam",
  ],
  authors: [{ name: "Mallikarjuna Reddy Gayam", url: "https://mallikarjuna-portfolio.com" }],
  creator: "Mallikarjuna Reddy Gayam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mallikarjuna-portfolio.com",
    title: "Mallikarjuna Reddy Gayam — AI Engineer",
    description:
      "AI Engineer specializing in LLM systems, RAG pipelines, and MLOps. Building production-grade generative AI at Zoom.",
    siteName: "Mallikarjuna Reddy Gayam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mallikarjuna Reddy Gayam — AI Engineer",
    description: "AI Engineer · LLM Systems · RAG · MLOps · Full-Stack",
    creator: "@mallireddy0",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://mallikarjuna-portfolio.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#060612]`}
      >
        {children}
      </body>
    </html>
  );
}
