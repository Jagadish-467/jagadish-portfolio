import React, { useState, useEffect, useRef } from 'react';
import { ProjectCard, ProjectData, ProjectModal } from './ProjectCard';
import { LayoutGrid, BookOpen, List, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import './Projects.css';

const PROJECTS: ProjectData[] = [
  {
    id: 'vessel-hud',
    number: '01',
    title: 'Vessel HUD Telemetry',
    subtitle: 'Interactive 3D Astrometry Simulation Engine',
    category: '3D & Creative',
    summary: 'A WebGL and Three.js accelerated orbital astrometry and telemetry visualization suite rendering real-time deep-space celestial trajectories.',
    description: [
      'Engineered an interactive 3D astrometry cockpit rendering orbital dynamics, celestial coordinates, and dynamic target acquisition rings.',
      'Utilizes custom GLSL vertex and fragment shaders for planetary atmospheres, gravitational lensing fields, and relativistic velocity indicators.',
      'Optimized with instanced rendering to simulate over 150,000 star catalog coordinates at continuous 60fps.'
    ],
    techStack: ['WebGL', 'Three.js', 'TypeScript', 'GLSL Shaders', 'Vite 7', 'Tailwind CSS'],
    architectureHighlights: [
      'Custom WebGL/GLSL shader pipeline for cosmic volumetric rendering',
      'Instanced mesh geometry handling 150K+ star catalog entities',
      'Real-time orbital physics and velocity telemetry calculus'
    ],
    year: '2026',
    techBadge: '[ WebGL • Three.js • 2026 ]',
    previewImage: '/images/projects/vessel-hud.jpg',
    keyTags: ['WebGL', 'Three.js'],
    githubUrl: 'https://github.com/jagadish-kumar/vessel-hud-telemetry',
    status: 'PRODUCTION READY'
  },
  {
    id: 'neurosphere-ai',
    number: '02',
    title: 'NeuroSphere AI Studio',
    subtitle: 'Distributed Quantum & Neural Machine Learning Framework',
    category: 'Systems & AI',
    summary: 'A benchmarking and distributed execution platform comparing classical deep neural models against quantum support vector machines across Ray compute clusters.',
    description: [
      'Features automated experiment serialization, quantum state vector caching, and circuit transpilation optimization across Ray distributed workers.',
      'Integrates directly with IBM Qiskit, Qiskit Machine Learning, and classical Scikit-learn models for seamless side-by-side performance comparisons.',
      'Includes sub-second model checkpointing and distributed hyperparameter optimization.'
    ],
    techStack: ['PyTorch', 'Ray Cluster', 'Qiskit ML', 'FastAPI', 'Docker', 'PostgreSQL'],
    architectureHighlights: [
      'Distributed Ray cluster execution for parallel quantum state evaluation',
      'Automated experiment tracking and parameter lineage logging',
      'Hybrid quantum-classical kernel optimization'
    ],
    year: '2025',
    techBadge: '[ PyTorch • Ray • 2025 ]',
    previewImage: '/images/projects/neurosphere-ai.jpg',
    keyTags: ['PyTorch', 'Ray Cluster'],
    githubUrl: 'https://github.com/jagadish-kumar/qlassify',
    status: 'RESEARCH ENGINE'
  },
  {
    id: 'onlan',
    number: '03',
    title: 'ONLAN Encrypted Mesh',
    subtitle: 'Self-Hosted LAN-First Encrypted Communication Platform',
    category: 'Systems & AI',
    summary: 'A self-hosted, zero-trust LAN communication platform with end-to-end encrypted messaging, voice/video calls, and file distribution without central telemetry.',
    description: [
      'Implements cryptographic primitives including X3DH (Extended Triple Diffie-Hellman) and Double Ratchet protocol for forward-secret session keys.',
      'Media communication is established over peer-to-peer WebRTC mesh with STUN/TURN fallback and zero server-side plaintext storage.',
      'Features outbound-only WebSocket tunneling allowing authorized endpoints to communicate securely across disjointed networks.'
    ],
    techStack: ['React 19', 'FastAPI', 'PostgreSQL', 'WebRTC', 'Double Ratchet', 'X3DH', 'TweetNaCl', 'coturn'],
    architectureHighlights: [
      'Cryptographic Double Ratchet & X3DH key agreement for forward secrecy',
      'P2P WebRTC voice/video mesh with dynamic candidate negotiation',
      'Outbound-only WebSocket tunnel for secure OffLAN inter-network routing'
    ],
    year: '2026',
    techBadge: '[ WebRTC • Double Ratchet • 2026 ]',
    previewImage: '/images/projects/onlan.jpg',
    keyTags: ['React 19', 'WebRTC'],
    githubUrl: 'https://github.com/jagadish-kumar/onlan',
    status: 'DEPLOYED // ACTIVE'
  },
  {
    id: 'clear-skys',
    number: '04',
    title: 'Clear Skys GIS Assistant',
    subtitle: 'AI & Satellite GIS Sustainable Travel Assistant',
    category: 'Fullstack',
    summary: 'An AI-powered sustainable destination discovery platform utilizing satellite GIS telemetry, real-time air quality indexing (AQI), and personalized ecological filtering.',
    description: [
      'Clear Skys analyzes geospatial satellite telemetry, ground-level environmental sensors, and weather patterns to dynamically recommend travel itineraries with minimal footprints.',
      'Includes machine-learning-driven AQI prediction models forecasting localized air quality up to 72 hours in advance.',
      'Features interactive GeoJSON overlays, pollutant breakdown charts, and personalized route scoring.'
    ],
    techStack: ['React', 'Leaflet', 'FastAPI', 'Python', 'Satellite GIS', 'OpenAQ API', 'GeoJSON', 'Tailwind CSS'],
    architectureHighlights: [
      'Real-time satellite & IoT air quality sensor telemetry ingestion',
      'Predictive time-series air quality modeling up to 72 hours ahead',
      'Dynamic geospatial travel route optimization with ecological scoring'
    ],
    year: '2025',
    techBadge: '[ Satellite GIS • FastAPI • 2025 ]',
    previewImage: '/images/projects/clear-skys.jpg',
    keyTags: ['Leaflet', 'FastAPI'],
    githubUrl: 'https://github.com/jagadish-kumar/clear-skys',
    demoUrl: 'https://clear-skys.vercel.app',
    status: 'HACKATHON WINNER'
  },
  {
    id: 'fincopilot',
    number: '05',
    title: 'FinCopilot Financial Deck',
    subtitle: 'AI-Driven Personal Financial Intelligence for Students',
    category: 'Fullstack',
    summary: 'An intelligent financial companion for students combining predictive cash flow modeling, automated expense tracking, and an algorithmic scholarship discovery database.',
    description: [
      'Constructed with a modern FastAPI and PostgreSQL backend with JWT authentication and SQLAlchemy ORM, alongside a smooth, mobile-ready React PWA.',
      'Incorporates automated financial health scoring, multi-tier budget alerts, and structured savings goal simulations.'
    ],
    techStack: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Capacitor', 'Tailwind CSS', 'Framer Motion'],
    architectureHighlights: [
      'Automated student scholarship matching engine with eligibility filtering',
      'Predictive cash flow modeling and spending burn-rate alerts',
      'High-performance async FastAPI backend with SQLAlchemy connection pooling'
    ],
    year: '2025',
    techBadge: '[ React • PostgreSQL • 2025 ]',
    previewImage: '/images/projects/fincopilot.png',
    keyTags: ['React', 'PostgreSQL'],
    githubUrl: 'https://github.com/jagadish-kumar/fincopilot',
    status: 'PRODUCTION BUILD'
  },
  {
    id: 'quantum-visualizer',
    number: '06',
    title: 'Quantum Visualizer 3D',
    subtitle: 'Interactive 3D Bloch Sphere & Gate Simulation Engine',
    category: '3D & Creative',
    summary: 'An interactive web-based mathematical visualizer for quantum computation, rendering real-time 3D Bloch sphere projections, state vector transformations, and multi-qubit gates.',
    description: [
      'Visualizes single-qubit quantum states as coordinates on a 3D unit sphere with real-time parameter tweaking of polar and azimuthal angles.',
      'Enables users to apply quantum logic gates (Pauli-X, Y, Z, Hadamard, Phase, T) and witness immediate 3D spherical rotations alongside mathematical Dirac notation.',
      'Extends into two-qubit Bell state entanglement visualizations with probability distribution histograms for measurement collapse.'
    ],
    techStack: ['Three.js', 'WebGL', 'TypeScript', 'Tailwind CSS', 'MathJax', 'React 19'],
    architectureHighlights: [
      'WebGL-accelerated 3D Bloch sphere rendering with smooth orbital controls',
      'Real-time unitary matrix operations and state vector trajectory animation',
      'Dynamic Dirac ket notation rendering with measurement collapse simulation'
    ],
    year: '2026',
    techBadge: '[ Three.js • Dirac Math • 2026 ]',
    previewImage: '/images/projects/quantum-visualizer.jpg',
    keyTags: ['Three.js', 'WebGL'],
    githubUrl: 'https://github.com/jagadish-kumar/quantum-visualizer',
    status: 'INTERACTIVE TOOL'
  },
  {
    id: 'quantum-compiler',
    number: '07',
    title: 'Distributed Quantum Compiler',
    subtitle: 'Topology-Aware Multi-QPU Circuit Synthesis',
    category: 'Systems & AI',
    summary: 'An architectural compiler for distributed quantum architectures partitioning high-depth quantum circuits across multi-core QPUs while minimizing inter-QPU entanglement costs.',
    description: [
      'Uses graph-theoretic partitioning algorithms (spectral clustering & min-cut) to segment quantum circuits, scheduling non-local two-qubit gates via teleportation.',
      'Incorporates hardware connectivity topologies and coherence decay parameters into the compilation cost function for fault-tolerant mapping.'
    ],
    techStack: ['Python', 'Qiskit', 'Graph Partitioning', 'Networkx', 'NumPy'],
    architectureHighlights: [
      'Topology-aware multi-core QPU circuit partitioning and qubit allocation',
      'Minimal EPR pair routing for non-local teleported gates',
      'Coherence-time-aware gate scheduling and SWAP gate minimization'
    ],
    year: '2026',
    techBadge: '[ Qiskit • Multi-QPU • 2026 ]',
    previewImage: '/images/projects/quantum-compiler.png',
    keyTags: ['Qiskit', 'Python'],
    githubUrl: 'https://github.com/jagadish-kumar/distributed-quantum-compiler',
    status: 'CORE RESEARCH'
  },
  {
    id: 'amazon-ml-challenge',
    number: '08',
    title: 'Amazon ML Challenge 2026',
    subtitle: 'Large-Scale Multilingual Business Entity Resolution',
    category: 'Systems & AI',
    summary: 'An industrial-scale Entity Resolution system developed for Amazon ML Challenge 2026, matching millions of noisy, multilingual business records across disparate registries.',
    description: [
      'Engineered a two-stage architecture: high-recall candidate generation via inverted index blocking, followed by high-precision gradient-boosted classification.',
      'Developed Indic transliteration dictionaries, phonetic encoding, and legal entity normalization stripping jurisdiction codes.'
    ],
    techStack: ['Python', 'PyTorch', 'Scikit-learn', 'LightGBM', 'Pandas', 'NumPy'],
    architectureHighlights: [
      'Dual-stage pipeline: Inverted index blocking + Gradient Boosted re-ranking',
      'Domain-tuned Indic transliteration dictionary covering major Indian languages',
      'Sub-second entity resolution across millions of uncurated registry records'
    ],
    year: '2026',
    techBadge: '[ Entity Resolution • PyTorch • 2026 ]',
    previewImage: '/images/projects/amazon-ml.png',
    keyTags: ['PyTorch', 'LightGBM'],
    githubUrl: 'https://github.com/jagadish-kumar/amazon-ml-challenge-2026',
    status: 'COMPETITION PROJECT'
  }
];

type CategoryFilter = 'All Projects' | '3D & Creative' | 'Fullstack' | 'Systems & AI';
type ViewMode = 'list' | 'grid' | 'editorial';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All Projects');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Hover Preview State & Mouse Lerp Physics
  const [activePreview, setActivePreview] = useState<ProjectData | null>(PROJECTS[0]);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });

    const animatePreview = () => {
      const lerpFactor = 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animatePreview);
    };

    rafId.current = requestAnimationFrame(animatePreview);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleRowMouseEnter = (project: ProjectData) => {
    setActivePreview(project);
    setIsHovering(true);
  };

  const handleRowMouseLeave = () => {
    setIsHovering(false);
  };

  const filteredProjects = activeFilter === 'All Projects' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === activeFilter);

  const filterCounts: Record<CategoryFilter, number> = {
    'All Projects': PROJECTS.length,
    '3D & Creative': PROJECTS.filter(p => p.category === '3D & Creative').length,
    'Fullstack': PROJECTS.filter(p => p.category === 'Fullstack').length,
    'Systems & AI': PROJECTS.filter(p => p.category === 'Systems & AI').length,
  };

  return (
    <section 
      id="projects" 
      className="portfolio-section-anchor projects-section-root"
      data-theme="dark"
    >
      {/* Background Architectural Dot Grid */}
      <div className="projects-dot-grid" />

      {/* Massive Awwwards Parallax Stroke Watermark */}
      <div className="projects-watermark">
        <h1 className="projects-watermark-text">
          PROJECTS
        </h1>
      </div>

      {/* Decorative Architectural Corner Crosshairs */}
      <div className="projects-crosshair projects-crosshair-tl" />
      <div className="projects-crosshair projects-crosshair-tr" />
      <div className="projects-crosshair projects-crosshair-bl" />
      <div className="projects-crosshair projects-crosshair-br" />

      {/* FLOATING CURSOR PREVIEW CARD (Lerp Mouse Physics from untitled folder project-grid-archive) */}
      <div
        ref={previewRef}
        className={`cursor-preview-card ${isHovering && viewMode === 'list' ? 'visible' : ''}`}
        aria-hidden="true"
      >
        {activePreview && (
          <>
            <div className="preview-img-wrapper">
              <img 
                src={activePreview.previewImage} 
                alt={activePreview.title}
                className="preview-img"
              />
            </div>
            <div className="preview-bottom-bar">
              <span className="preview-title">{activePreview.title}</span>
              <span className="preview-badge">{activePreview.techBadge}</span>
            </div>
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-white/80 uppercase">
              03 // SELECTED ARCHITECTURES &amp; SYSTEMS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.05]">
            ENGINEERED SYSTEMS &amp; PROJECTS
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-400 leading-relaxed font-sans">
            A curated index of production applications, 3D simulations, and design experiments.
          </p>
        </div>

        {/* Control Bar: Category Filters & View Switcher */}
        <div className="projects-controls-bar">
          {/* Category Filter Tabs */}
          <div className="projects-filter-bar">
            {(['All Projects', '3D & Creative', 'Fullstack', 'Systems & AI'] as CategoryFilter[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`projects-filter-btn ${activeFilter === tab ? 'active' : ''}`}
              >
                <span>{tab}</span>
                <span className="projects-filter-badge">({filterCounts[tab]})</span>
              </button>
            ))}
          </div>

          {/* View Switcher: Grid, Editorial, Hover List */}
          <div className="projects-view-switcher" role="radiogroup" aria-label="Project layout view switcher">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`projects-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              aria-label="Grid layout"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('editorial')}
              className={`projects-view-btn ${viewMode === 'editorial' ? 'active' : ''}`}
              aria-label="Editorial layout"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`projects-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="Hover List layout"
            >
              <List className="w-3.5 h-3.5" />
              <span>Hover List</span>
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: HOVER LIST VIEW (Matching screenshot 2) */}
        {viewMode === 'list' && (
          <div 
            className="project-list-container"
            onMouseLeave={handleRowMouseLeave}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`project-list-row ${isHovering && activePreview?.id === project.id ? 'project-list-row-active' : ''}`}
                onMouseEnter={() => handleRowMouseEnter(project)}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-list-left">
                  <span className="project-list-num">{project.number}</span>
                  <span className="project-list-title">{project.title}</span>
                </div>

                <div className="project-list-chips">
                  {project.keyTags?.map((tag) => (
                    <span key={tag} className="project-list-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-list-right">
                  <span className="project-list-year">{project.year}</span>
                  <ArrowUpRight className="project-list-arrow w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW MODE 2: GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* VIEW MODE 3: EDITORIAL VIEW */}
        {viewMode === 'editorial' && (
          <div className="project-editorial-grid">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="project-editorial-card group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="editorial-img-box">
                  <img 
                    src={project.previewImage} 
                    alt={project.title}
                  />
                </div>
                <div className="flex flex-col justify-between py-2">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-sm text-[#00f0ff] font-bold">// {project.number}</span>
                      <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-gray-500 ml-auto">{project.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-sm text-[#10b981] font-semibold mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {project.keyTags?.map(tag => (
                        <span key={tag} className="project-list-chip">{tag}</span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00f0ff] group-hover:underline"
                    >
                      <span>SPECIFICATION</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Section Footnote */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-gray-400">
          <div>
            SOURCE REPOSITORIES VERIFIED ON GITHUB • ALL SYSTEMS REPRODUCIBLE
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-ping" />
            <span className="text-white font-semibold">TOTAL ACTIVE ARCHIVES: {PROJECTS.length}</span>
          </div>
        </div>
      </div>

      {/* Shared Deep-Dive Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
