import React from 'react';
import { SkillsMarquee, SkillItem } from './SkillsMarquee';
import {
  PythonLogo,
  JavaLogo,
  CppLogo,
  JSLogo,
  TSLogo,
  GoLogo,
  RustLogo,
  ReactLogo,
  DockerLogo,
  PostgreSQLLogo,
  FastAPILogo,
  QiskitLogo,
  PyTorchLogo,
  TailwindLogo,
  LinuxLogo,
  GitLogo,
  ThreejsLogo,
  ViteLogo,
  WebRTCLogo,
  TensorFlowLogo,
  MongoDBLogo,
  GSAPLogo,
  RayLogo,
  CLogo,
} from './TechLogos';
import './Skills.css';

// --------------------------------------------------------------------------
// 1. LANGUAGES & SYSTEMS (Colorful Logos)
// --------------------------------------------------------------------------
const LANGUAGES_ITEMS: SkillItem[] = [
  {
    name: 'Python',
    category: 'Core Language',
    logo: <PythonLogo size={28} />,
    brandColor: '#3776AB',
    brandGlow: 'rgba(55, 118, 171, 0.45)',
  },
  {
    name: 'Java',
    category: 'OOP & Concurrency',
    logo: <JavaLogo size={28} />,
    brandColor: '#EA2D2E',
    brandGlow: 'rgba(234, 45, 46, 0.45)',
  },
  {
    name: 'C++',
    category: 'Systems & CompProg',
    logo: <CppLogo size={28} />,
    brandColor: '#00599C',
    brandGlow: 'rgba(0, 89, 156, 0.45)',
  },
  {
    name: 'TypeScript',
    category: 'Type Safety',
    logo: <TSLogo size={28} />,
    brandColor: '#3178C6',
    brandGlow: 'rgba(49, 120, 198, 0.45)',
  },
  {
    name: 'JavaScript',
    category: 'Full-Stack Web',
    logo: <JSLogo size={28} />,
    brandColor: '#F7DF1E',
    brandGlow: 'rgba(247, 223, 30, 0.45)',
  },
  {
    name: 'Go (Golang)',
    category: 'High Concurrency',
    logo: <GoLogo size={28} />,
    brandColor: '#00ADD8',
    brandGlow: 'rgba(0, 173, 216, 0.45)',
  },
  {
    name: 'Rust',
    category: 'Memory Safe Systems',
    logo: <RustLogo size={28} />,
    brandColor: '#DEA584',
    brandGlow: 'rgba(222, 165, 132, 0.45)',
  },
  {
    name: 'C Language',
    category: 'Low-Level Systems',
    logo: <CLogo size={28} />,
    brandColor: '#659AD2',
    brandGlow: 'rgba(101, 154, 210, 0.45)',
  },
];

// --------------------------------------------------------------------------
// 2. QUANTUM COMPUTING & MACHINE LEARNING (Colorful Logos)
// --------------------------------------------------------------------------
const QUANTUM_AI_ITEMS: SkillItem[] = [
  {
    name: 'IBM Qiskit',
    category: 'Quantum Computing Minor',
    logo: <QiskitLogo size={28} />,
    brandColor: '#6929C4',
    brandGlow: 'rgba(105, 41, 196, 0.45)',
  },
  {
    name: 'PyTorch',
    category: 'Deep Learning',
    logo: <PyTorchLogo size={28} />,
    brandColor: '#EE4C2C',
    brandGlow: 'rgba(238, 76, 44, 0.45)',
  },
  {
    name: 'TensorFlow',
    category: 'Neural Computation',
    logo: <TensorFlowLogo size={28} />,
    brandColor: '#FF6F00',
    brandGlow: 'rgba(255, 111, 0, 0.45)',
  },
  {
    name: 'Ray Cluster',
    category: 'Distributed ML Execution',
    logo: <RayLogo size={28} />,
    brandColor: '#028CF0',
    brandGlow: 'rgba(2, 140, 240, 0.45)',
  },
  {
    name: 'Quantum Kernels & QSVM',
    category: 'Quantum Algorithms',
    logo: <QiskitLogo size={28} />,
    brandColor: '#00F0FF',
    brandGlow: 'rgba(0, 240, 255, 0.45)',
  },
  {
    name: 'Local LLMs & Inference',
    category: 'Edge & Open Models',
    logo: <PythonLogo size={28} />,
    brandColor: '#FFD43B',
    brandGlow: 'rgba(255, 212, 59, 0.45)',
  },
  {
    name: 'Entity Resolution',
    category: 'Amazon ML Challenge',
    logo: <PyTorchLogo size={28} />,
    brandColor: '#EE4C2C',
    brandGlow: 'rgba(238, 76, 44, 0.45)',
  },
];

// --------------------------------------------------------------------------
// 3. BACKEND, DATABASES & DISTRIBUTED NETWORKS (Colorful Logos)
// --------------------------------------------------------------------------
const BACKEND_DATABASE_ITEMS: SkillItem[] = [
  {
    name: 'FastAPI',
    category: 'High Performance Async',
    logo: <FastAPILogo size={28} />,
    brandColor: '#009688',
    brandGlow: 'rgba(0, 150, 136, 0.45)',
  },
  {
    name: 'PostgreSQL',
    category: 'Relational Database',
    logo: <PostgreSQLLogo size={28} />,
    brandColor: '#336791',
    brandGlow: 'rgba(51, 103, 145, 0.45)',
  },
  {
    name: 'Docker',
    category: 'Containerization',
    logo: <DockerLogo size={28} />,
    brandColor: '#2496ED',
    brandGlow: 'rgba(36, 150, 237, 0.45)',
  },
  {
    name: 'WebRTC P2P',
    category: 'Audio/Video Mesh',
    logo: <WebRTCLogo size={28} />,
    brandColor: '#10B981',
    brandGlow: 'rgba(16, 185, 129, 0.45)',
  },
  {
    name: 'MongoDB',
    category: 'NoSQL Document Store',
    logo: <MongoDBLogo size={28} />,
    brandColor: '#47A248',
    brandGlow: 'rgba(71, 162, 72, 0.45)',
  },
  {
    name: 'Linux / Unix',
    category: 'Kernel & Shell',
    logo: <LinuxLogo size={28} />,
    brandColor: '#FCC624',
    brandGlow: 'rgba(252, 198, 36, 0.45)',
  },
  {
    name: 'Git & GitHub',
    category: 'Version Control',
    logo: <GitLogo size={28} />,
    brandColor: '#F05032',
    brandGlow: 'rgba(240, 80, 50, 0.45)',
  },
];

// --------------------------------------------------------------------------
// 4. MODERN FRONTEND & CREATIVE WEB (Colorful Logos)
// --------------------------------------------------------------------------
const FRONTEND_CREATIVE_ITEMS: SkillItem[] = [
  {
    name: 'React 19',
    category: 'Component Architecture',
    logo: <ReactLogo size={28} />,
    brandColor: '#61DAFB',
    brandGlow: 'rgba(97, 218, 251, 0.45)',
  },
  {
    name: 'Tailwind CSS',
    category: 'Utility Styling',
    logo: <TailwindLogo size={28} />,
    brandColor: '#06B6D4',
    brandGlow: 'rgba(6, 182, 212, 0.45)',
  },
  {
    name: 'GSAP Animation',
    category: 'ScrollTrigger Physics',
    logo: <GSAPLogo size={28} />,
    brandColor: '#88CE02',
    brandGlow: 'rgba(136, 206, 2, 0.45)',
  },
  {
    name: 'Three.js & WebGL',
    category: '3D Math & Quantum View',
    logo: <ThreejsLogo size={28} />,
    brandColor: '#10B981',
    brandGlow: 'rgba(16, 185, 129, 0.45)',
  },
  {
    name: 'Vite 7',
    category: 'Next-Gen Bundling',
    logo: <ViteLogo size={28} />,
    brandColor: '#646CFF',
    brandGlow: 'rgba(100, 108, 255, 0.45)',
  },
  {
    name: 'TypeScript',
    category: 'Type Safety & DX',
    logo: <TSLogo size={28} />,
    brandColor: '#3178C6',
    brandGlow: 'rgba(49, 120, 198, 0.45)',
  },
  {
    name: 'WebSockets & STUN/TURN',
    category: 'Real-time Transport',
    logo: <WebRTCLogo size={28} />,
    brandColor: '#00ADD8',
    brandGlow: 'rgba(0, 173, 216, 0.45)',
  },
];

export default function SkillsSection() {
  return (
    <section 
      id="skills" 
      className="portfolio-section-anchor skills-section-root"
      data-theme="dark"
    >
      {/* Background Cyber Grid */}
      <div className="skills-cyber-grid" />

      {/* Massive Awwwards Parallax Stroke Watermark */}
      <div className="skills-watermark">
        <h1 className="skills-watermark-text">
          ARSENAL
        </h1>
      </div>

      {/* Corner Crosshairs */}
      <div className="skills-crosshair skills-crosshair-tl" />
      <div className="skills-crosshair skills-crosshair-tr" />
      <div className="skills-crosshair skills-crosshair-bl" />
      <div className="skills-crosshair skills-crosshair-br" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full mb-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-white/80 uppercase">
              04 // CAPABILITY SPECTRUM &amp; STACK
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.05]">
            TECHNICAL ARSENAL &amp; PROFICIENCIES
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-400 leading-relaxed font-sans">
            A vibrant, kinetic showcase of languages, quantum computing tools, machine learning frameworks,
            distributed protocols, and modern frontend technologies.
          </p>
        </div>
      </div>

      {/* KINETIC MARQUEE RUNNERS WITH OFFICIAL COLORFUL LOGOS */}
      <div className="space-y-3 py-6 relative z-10">
        {/* Track 1: Languages & Core (Left) */}
        <SkillsMarquee items={LANGUAGES_ITEMS} direction="left" speedSeconds={42} />

        {/* Track 2: Quantum Computing & AI (Right) */}
        <SkillsMarquee items={QUANTUM_AI_ITEMS} direction="right" speedSeconds={38} />

        {/* Track 3: Backend, DBs & Cloud (Left) */}
        <SkillsMarquee items={BACKEND_DATABASE_ITEMS} direction="left" speedSeconds={44} />

        {/* Track 4: Frontend & Creative 3D (Right) */}
        <SkillsMarquee items={FRONTEND_CREATIVE_ITEMS} direction="right" speedSeconds={40} />
      </div>

      {/* Skills Bottom Metadata Note */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full mt-10">
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-gray-500">
          <div>
            OFFICIAL BRAND ASSETS • ALL CONTINUOUS MARQUEES PAUSE ON HOVER
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-ping" />
            <span className="text-white font-semibold">PONNADA JAGADISH KUMAR // TECH ARSENAL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
