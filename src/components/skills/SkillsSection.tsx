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
  CiscoLogo,
  RaspberryPiLogo,
  LeetCodeLogo,
  SecurityShieldLogo,
  AppleMPSLogo,
} from './TechLogos';
import { Cpu, ShieldCheck, Network, Layers, Sparkles, ArrowUpRight } from 'lucide-react';
import './Skills.css';

// --------------------------------------------------------------------------
// 1. LANGUAGES & SYSTEMS (Track 1 - Left)
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
  {
    name: 'LeetCode 425+',
    category: 'Competitive DSA',
    logo: <LeetCodeLogo size={28} />,
    brandColor: '#FFA116',
    brandGlow: 'rgba(255, 161, 22, 0.45)',
  },
];

// --------------------------------------------------------------------------
// 2. QUANTUM COMPUTING & MATHEMATICAL PHYSICS (Track 2 - Right)
// --------------------------------------------------------------------------
const QUANTUM_ITEMS: SkillItem[] = [
  {
    name: 'IBM Qiskit',
    category: 'Quantum Computing Minor',
    logo: <QiskitLogo size={28} />,
    brandColor: '#6929C4',
    brandGlow: 'rgba(105, 41, 196, 0.45)',
  },
  {
    name: 'Quantum Kernels & QSVM',
    category: 'Quantum Algorithms',
    logo: <QiskitLogo size={28} />,
    brandColor: '#00F0FF',
    brandGlow: 'rgba(0, 240, 255, 0.45)',
  },
  {
    name: 'Multi-QPU Synthesis',
    category: 'Distributed Compilers',
    logo: <QiskitLogo size={28} />,
    brandColor: '#A855F7',
    brandGlow: 'rgba(168, 85, 247, 0.45)',
  },
  {
    name: '3D Bloch Sphere',
    category: 'State Vector Math',
    logo: <ThreejsLogo size={28} />,
    brandColor: '#10B981',
    brandGlow: 'rgba(16, 185, 129, 0.45)',
  },
  {
    name: 'Dirac Ket Notation',
    category: 'Unitary Operations',
    logo: <TSLogo size={28} />,
    brandColor: '#EC4899',
    brandGlow: 'rgba(236, 72, 153, 0.45)',
  },
  {
    name: 'Qiskit ML',
    category: 'Kernel Transpilation',
    logo: <QiskitLogo size={28} />,
    brandColor: '#6929C4',
    brandGlow: 'rgba(105, 41, 196, 0.45)',
  },
  {
    name: 'EPR Pair Teleportation',
    category: 'Min-Cut Circuit Partition',
    logo: <SecurityShieldLogo size={28} />,
    brandColor: '#3B82F6',
    brandGlow: 'rgba(59, 130, 246, 0.45)',
  },
];

// --------------------------------------------------------------------------
// 3. MACHINE LEARNING & INTELLIGENT SYSTEMS (Track 3 - Left)
// --------------------------------------------------------------------------
const AI_ML_ITEMS: SkillItem[] = [
  {
    name: 'PyTorch',
    category: 'Deep Learning Core',
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
    name: 'Entity Resolution',
    category: 'Amazon ML Challenge (Rank 135)',
    logo: <PyTorchLogo size={28} />,
    brandColor: '#F59E0B',
    brandGlow: 'rgba(245, 158, 11, 0.45)',
  },
  {
    name: 'Local LLMs & Inference',
    category: 'Edge & Open Models',
    logo: <PythonLogo size={28} />,
    brandColor: '#FFD43B',
    brandGlow: 'rgba(255, 212, 59, 0.45)',
  },
  {
    name: 'Apple MPS Silicon',
    category: 'Hardware Acceleration',
    logo: <AppleMPSLogo size={28} />,
    brandColor: '#A2AAAD',
    brandGlow: 'rgba(162, 170, 173, 0.45)',
  },
  {
    name: 'Scikit-learn',
    category: 'Classical Benchmarks',
    logo: <PythonLogo size={28} />,
    brandColor: '#F97316',
    brandGlow: 'rgba(249, 115, 22, 0.45)',
  },
];

// --------------------------------------------------------------------------
// 4. BACKEND, DISTRIBUTED PROTOCOLS & NETWORKS (Track 4 - Right)
// --------------------------------------------------------------------------
const NETWORKS_BACKEND_ITEMS: SkillItem[] = [
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
    name: 'WebRTC P2P',
    category: 'Audio/Video Mesh',
    logo: <WebRTCLogo size={28} />,
    brandColor: '#10B981',
    brandGlow: 'rgba(16, 185, 129, 0.45)',
  },
  {
    name: 'WebSockets & STUN/TURN',
    category: 'Real-time Transport',
    logo: <WebRTCLogo size={28} />,
    brandColor: '#00ADD8',
    brandGlow: 'rgba(0, 173, 216, 0.45)',
  },
  {
    name: 'Double Ratchet & X3DH',
    category: 'End-to-End Cryptography',
    logo: <SecurityShieldLogo size={28} />,
    brandColor: '#10B981',
    brandGlow: 'rgba(16, 185, 129, 0.45)',
  },
  {
    name: 'Cisco Packet Tracer',
    category: 'Enterprise VLAN Mesh',
    logo: <CiscoLogo size={28} />,
    brandColor: '#049FD9',
    brandGlow: 'rgba(4, 159, 217, 0.45)',
  },
  {
    name: 'Cisco IOS CLI',
    category: 'Router ACL Validator',
    logo: <CiscoLogo size={28} />,
    brandColor: '#00BCEB',
    brandGlow: 'rgba(0, 188, 235, 0.45)',
  },
  {
    name: 'MongoDB',
    category: 'NoSQL Document Store',
    logo: <MongoDBLogo size={28} />,
    brandColor: '#47A248',
    brandGlow: 'rgba(71, 162, 72, 0.45)',
  },
];

// --------------------------------------------------------------------------
// 5. DEVOPS, INFRASTRUCTURE & CREATIVE FRONTEND (Track 5 - Left)
// --------------------------------------------------------------------------
const DEVOPS_CREATIVE_ITEMS: SkillItem[] = [
  {
    name: 'Docker',
    category: 'Containerization & Deploy',
    logo: <DockerLogo size={28} />,
    brandColor: '#2496ED',
    brandGlow: 'rgba(36, 150, 237, 0.45)',
  },
  {
    name: 'Linux / Unix',
    category: 'Kernel & Shell Sovereignty',
    logo: <LinuxLogo size={28} />,
    brandColor: '#FCC624',
    brandGlow: 'rgba(252, 198, 36, 0.45)',
  },
  {
    name: 'Git & GitHub',
    category: 'CI/CD & Version Control',
    logo: <GitLogo size={28} />,
    brandColor: '#F05032',
    brandGlow: 'rgba(240, 80, 50, 0.45)',
  },
  {
    name: 'Raspberry Pi 5',
    category: 'Embedded & Self-Hosting',
    logo: <RaspberryPiLogo size={28} />,
    brandColor: '#C51A4A',
    brandGlow: 'rgba(197, 26, 74, 0.45)',
  },
  {
    name: 'React 19',
    category: 'Component Architecture',
    logo: <ReactLogo size={28} />,
    brandColor: '#61DAFB',
    brandGlow: 'rgba(97, 218, 251, 0.45)',
  },
  {
    name: 'Three.js & WebGL',
    category: '3D Creative Graphics',
    logo: <ThreejsLogo size={28} />,
    brandColor: '#10B981',
    brandGlow: 'rgba(16, 185, 129, 0.45)',
  },
  {
    name: 'GSAP Animation',
    category: 'ScrollTrigger Physics',
    logo: <GSAPLogo size={28} />,
    brandColor: '#88CE02',
    brandGlow: 'rgba(136, 206, 2, 0.45)',
  },
  {
    name: 'Tailwind CSS v4',
    category: 'Modern Utility Styling',
    logo: <TailwindLogo size={28} />,
    brandColor: '#06B6D4',
    brandGlow: 'rgba(6, 182, 212, 0.45)',
  },
  {
    name: 'Vite 7',
    category: 'Next-Gen Bundling & DX',
    logo: <ViteLogo size={28} />,
    brandColor: '#646CFF',
    brandGlow: 'rgba(100, 108, 255, 0.45)',
  },
];

// --------------------------------------------------------------------------
// 4 CORE ARCHITECTURAL PILLARS (Fills space with authentic high-value depth)
// --------------------------------------------------------------------------
interface DomainPillar {
  number: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metricLabel: string;
  metricValue: string;
  accentColor: string;
}

const DOMAIN_PILLARS: DomainPillar[] = [
  {
    number: '01',
    icon: <Cpu className="w-5 h-5 text-[#6929C4]" />,
    title: 'Quantum & Computational Physics',
    subtitle: 'IBM Qiskit Minor • Multi-QPU Synthesis',
    description: 'Academic minor in Quantum Computing at Lendi IET. Building topology-aware circuit compilers, quantum kernel machines, and 3D interactive Dirac statevisualizers.',
    tags: ['QISKIT', 'QSVM', '3D BLOCH', 'MIN-CUT PARTITIONING'],
    metricLabel: 'PROGRAM',
    metricValue: 'B.TECH MINOR // 3 ARCHIVES',
    accentColor: '#6929C4',
  },
  {
    number: '02',
    icon: <ShieldCheck className="w-5 h-5 text-[#10B981]" />,
    title: 'Distributed Protocols & Security',
    subtitle: 'WebRTC P2P • Zero-Trust Cryptography',
    description: 'Architecting zero-trust, LAN-first sovereign networks. End-to-end encrypted messaging via Double Ratchet + X3DH, P2P media meshes, and Cisco VLAN segmentation.',
    tags: ['WEBRTC P2P', 'OFFLAN TUNNEL', 'DOUBLE RATCHET', 'CISCO IOS'],
    metricLabel: 'LATENCY',
    metricValue: 'SUB-10MS P2P // ZERO CLOUD',
    accentColor: '#10B981',
  },
  {
    number: '03',
    icon: <Sparkles className="w-5 h-5 text-[#F59E0B]" />,
    title: 'Intelligence & High-Dimensional ML',
    subtitle: 'Amazon ML Challenge • Ray Clusters',
    description: 'Rank 135 in Amazon ML Challenge 2026 with ~0.9863 Macro F0.5 score. Distributed hyperparameter sweeps on Ray clusters, phonetic entity resolution, and local Apple MPS inference.',
    tags: ['PYTORCH', 'RAY CLUSTER', 'SCORE ~0.9863', 'APPLE MPS'],
    metricLabel: 'GLOBAL RANK',
    metricValue: 'RANK 135 // TOP 0.2%',
    accentColor: '#F59E0B',
  },
  {
    number: '04',
    icon: <Layers className="w-5 h-5 text-[#61DAFB]" />,
    title: 'High-Performance Creative Web',
    subtitle: 'React 19 • WebGL Math • GSAP Physics',
    description: 'Crafting bespoke, physics-driven digital interfaces. WebGL 3D math simulations, GSAP ScrollTrigger orchestration, and resilient React 19 + TypeScript component systems.',
    tags: ['REACT 19', 'THREE.JS', 'GSAP SCROLLTRIGGER', 'TAILWIND V4'],
    metricLabel: 'RENDER RATE',
    metricValue: '60 FPS WEBGL // 100% TYPED',
    accentColor: '#61DAFB',
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full mb-6">
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
            A comprehensive, kinetic index of low-level systems, quantum computing toolchains, distributed machine learning frameworks, sovereign network protocols, and creative web technologies.
          </p>
        </div>
      </div>

      {/* 5 KINETIC MARQUEE RUNNERS WITH OFFICIAL COLORFUL LOGOS */}
      <div className="space-y-3 py-4 relative z-10">
        {/* Track 1: Languages & Core Systems (Left) */}
        <SkillsMarquee items={LANGUAGES_ITEMS} direction="left" speedSeconds={44} />

        {/* Track 2: Quantum Computing & Physics (Right) */}
        <SkillsMarquee items={QUANTUM_ITEMS} direction="right" speedSeconds={40} />

        {/* Track 3: Machine Learning & Intelligence (Left) */}
        <SkillsMarquee items={AI_ML_ITEMS} direction="left" speedSeconds={42} />

        {/* Track 4: Backend, Distributed Protocols & Networks (Right) */}
        <SkillsMarquee items={NETWORKS_BACKEND_ITEMS} direction="right" speedSeconds={46} />

        {/* Track 5: DevOps, Systems, Hardware & Creative Frontend (Left) */}
        <SkillsMarquee items={DEVOPS_CREATIVE_ITEMS} direction="left" speedSeconds={38} />
      </div>

      {/* ARCHITECTURAL CAPABILITY PILLARS MATRIX (Fills bottom void with real substance) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full mt-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-white/70 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span>CORE ARCHITECTURAL PILLARS</span>
          </div>
          <span className="font-mono text-xs text-gray-500 uppercase tracking-wider hidden sm:inline-block">
            04 SPECIALIZED DOMAINS • GROUNDED RESEARCH
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DOMAIN_PILLARS.map((pillar) => (
            <div 
              key={pillar.number}
              className="skills-domain-card group"
              style={{ '--pillar-accent': pillar.accentColor } as React.CSSProperties}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="skills-pillar-icon-box">
                  {pillar.icon}
                </div>
                <span className="font-mono text-xs font-bold text-gray-500 group-hover:text-white transition-colors">
                  // {pillar.number}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[var(--pillar-accent)] transition-colors tracking-tight">
                {pillar.title}
              </h3>

              <p className="font-mono text-xs text-gray-400 mb-3 font-semibold">
                {pillar.subtitle}
              </p>

              <p className="text-xs text-gray-400 leading-relaxed font-sans mb-5 flex-1">
                {pillar.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {pillar.tags.map((tag) => (
                  <span key={tag} className="skills-domain-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-gray-400">
                <span className="text-gray-500">{pillar.metricLabel}</span>
                <span className="text-white font-semibold group-hover:text-[#10b981] transition-colors">
                  {pillar.metricValue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Bottom Metadata Note */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full mt-10">
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-gray-500">
          <div>
            OFFICIAL BRAND ASSETS • 5 CONTINUOUS MARQUEE RUNNERS PAUSE ON HOVER
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
