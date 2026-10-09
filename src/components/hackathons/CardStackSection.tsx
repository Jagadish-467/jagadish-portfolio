import React, { useRef } from "react";
import { HACKATHONS_DATA } from "./data";
import { ExpandingBladesView } from "./designs/ExpandingBladesView";
import "./designs/HackathonsDesigns.css";

// Re-export original types and assets for backwards compatibility
import auPhoto from "@/assets/hackathon-au.jpg";
import techniversePhoto from "@/assets/hackathon-techniverse.jpg";
import sihPhoto from "@/assets/hackathon-sih.jpg";
import lnitPhoto from "@/assets/hackathon-lnit.jpg";
import adobePhoto from "@/assets/about-5.jpg";

export interface CardItem {
  id: string | number;
  image: string;
  title: string;
  date: string;
  result: string;
  statement: string;
  description: string;
  technologies: string[];
}

export interface CardStackSectionProps {
  id?: string;
  tag?: string;
  sectionTitle?: string;
  subtitle?: string;
  cards?: CardItem[];
  height?: string;
  className?: string;
}

export const DEFAULT_CARDS: CardItem[] = [
  { 
    id: 1, 
    image: techniversePhoto, 
    title: "Techniverse 2K25", 
    date: "7–9 MAR 2025 · RGUKT IIIT SRIKAKULAM",
    result: "Finalist",
    statement: "Built the backend logic for a command-line food delivery system in C, covering authentication, admin controls, menu management, ordering and order processing.",
    description: "EVENT: Techniverse 2K25 · RGUKT IIIT Srikakulam\nPROJECT: C Code for Food Service (12-hour hackathon)\nROLE: Backend Developer\nCONTRIBUTION: User auth, admin panel, menu controls, ordering and order processing\nSCREENING: Solved 8-problem Data Structures screening round\nACTIVITY: Selected NVIDIA & finished 4th in Code Bidding activity\nRESULT: Reached the final stage (Finalist)",
    technologies: ["C", "CLI", "Data Structures"],
  },
  { 
    id: 2, 
    image: auPhoto, 
    title: "AU Hackathon", 
    date: "AU HACKATHON 2025",
    result: "Final Round",
    statement: "Advanced through DSA, problem-solving and written-response challenges to reach the final round.",
    description: "EVENT: AU Hackathon\nPROJECT: LearnYourWay\nSELECTION: DSA questions, problem-solving challenges, and written responses\nRESULT: Advanced to the final round",
    technologies: ["DSA", "EdTech", "Problem Solving"],
  },
  { 
    id: 3, 
    image: sihPhoto, 
    title: "Smart India Hackathon 2025", 
    date: "SIH 2025",
    result: "College-Level Finalist",
    statement: "Selected as a college-level finalist for the nationwide Smart India Hackathon initiative.",
    description: "EVENT: Smart India Hackathon 2025\nSTAGE: Internal institutional evaluation round\nRESULT: Selected as college-level finalist",
    technologies: ["AI/ML", "Python", "System Design"],
  },
  { 
    id: 4, 
    image: lnitPhoto, 
    title: "LNIT Summit 2026", 
    date: "LNIT SUMMIT 2026",
    result: "Final 10 Teams",
    statement: "Competed through technical problem-solving rounds to finish among the final 10 teams.",
    description: "EVENT: LNIT Summit · Hackathon 2026\nSTAGE: Multi-stage competitive technical evaluation\nRESULT: Reached the final 10 teams",
    technologies: ["React", "FastAPI", "PostgreSQL", "AI"],
  },
  { 
    id: 5, 
    image: adobePhoto, 
    title: "Unstop × Adobe Hackathon", 
    date: "UNSTOP × ADOBE 2025",
    result: "Final Round Selection",
    statement: "Advanced through competitive nationwide screening rounds to be selected for the final round.",
    description: "EVENT: Unstop × Adobe Hackathon\nSTAGE: National screening challenge & evaluation\nRESULT: Selected for the final round",
    technologies: ["Design Systems", "UI/UX", "Problem Solving"],
  },
];

export const CardStackSection: React.FC<CardStackSectionProps> = ({
  id = "hackathons",
  tag = "02 // COMPETITIVE REPERTOIRE",
  sectionTitle = "Hackathons & Technical Competitions",
  subtitle = "A curated record of high-stakes hackathons, competitive problem-solving, and algorithmic prototypes.",
  className = "",
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative bg-[#030303] text-white w-full min-h-screen py-16 md:py-20 overflow-x-hidden flex flex-col justify-between scroll-mt-0 border-t border-b border-white/10 ${className}`}
    >
      {/* 1. Massive Awwwards Parallax Stroke Watermark in Background */}
      <div className="absolute top-[6%] left-[-2vw] pointer-events-none select-none z-0 opacity-[0.035] max-h-[85vh] overflow-hidden">
        <h1
          className="text-[28vw] md:text-[20vw] lg:text-[16vw] font-black leading-none tracking-tight select-none"
          style={{
            writingMode: "vertical-rl",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.7)",
            color: "transparent",
          }}
        >
          HACKATHONS
        </h1>
      </div>

      {/* 2. Decorative Architectural Corner Crosshairs */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-white/20 pointer-events-none z-30" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-white/20 pointer-events-none z-30" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-white/20 pointer-events-none z-30" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-white/20 pointer-events-none z-30" />

      {/* 3. Subtle Architectural Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1.2px, transparent 1.2px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 4. Section Header */}
      <header className="relative z-30 px-6 md:px-12 lg:px-16 mb-6 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-widest text-white/80 uppercase">
              {tag}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase leading-tight">
            {sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-sans max-w-xl mt-1.5 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          <span>EXPANDABLE BLADES ARCHIVE • 5 VERIFIED MILESTONES</span>
        </div>
      </header>

      {/* 5. Expanding Blades View */}
      <div className="relative z-20 w-full flex-1 flex flex-col justify-center">
        <ExpandingBladesView items={HACKATHONS_DATA} />
      </div>

      {/* 6. Section Footer Telemetry Stamp */}
      <footer className="relative z-20 px-6 md:px-12 lg:px-16 mt-8 pt-4 border-t border-white/5 w-full max-w-[1600px] mx-auto flex flex-wrap items-center justify-between text-[9px] font-mono text-white/40">
        <div className="flex items-center gap-3">
          <span>COORDINATES: 42.3601° N · 71.0942° W</span>
          <span>•</span>
          <span>SECURITY CLASSIFICATION: VERIFIED DEPLOYMENT</span>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <span>ENGINEER: PONNADA JAGADISH KUMAR</span>
          <span>•</span>
          <span className="text-[#10b981]">SYSTEM STATUS: NOMINAL</span>
        </div>
      </footer>
    </section>
  );
};

export default CardStackSection;
