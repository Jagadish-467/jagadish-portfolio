import React, { useState, useEffect, useRef } from 'react';
import { ProjectCard, ProjectData, ProjectModal } from './ProjectCard';
import { LayoutGrid, List, ArrowUpRight } from 'lucide-react';
import './Projects.css';

// --------------------------------------------------------------------------
// 11 AUTHENTIC PROJECTS DIRECTLY FROM MYDETAILS.TXT (NO DUPLICATES / NO PLACEHOLDERS)
// --------------------------------------------------------------------------
const PROJECTS: ProjectData[] = [
  {
    id: 'onlan',
    number: '01',
    title: 'ONLAN',
    subtitle: 'Self-Hosted LAN-First Encrypted Communication Platform',
    category: 'Distributed & Systems',
    summary: 'A self-hosted, zero-trust LAN communication platform with end-to-end encrypted messaging, voice/video calls, and file distribution without central telemetry.',
    description: [
      'ONLAN is built around local network sovereignty, operating over local area networks with zero-trust credentials and forward secrecy.',
      'Implements cryptographic primitives including X3DH (Extended Triple Diffie-Hellman) and Double Ratchet protocol for forward-secret session keys. Media communication is established over peer-to-peer WebRTC mesh with STUN/TURN fallback.',
      'Features an innovative OffLAN concept: an outbound-only WebSocket tunnel allows authorized endpoints to communicate securely across disjointed networks without exposing internal ports.'
    ],
    techStack: ['React 19', 'Vite 7', 'Tailwind CSS v4', 'FastAPI', 'Uvicorn', 'PostgreSQL', 'WebRTC', 'Double Ratchet', 'X3DH', 'TweetNaCl', 'Argon2id', 'coturn'],
    architectureHighlights: [
      'Cryptographic Double Ratchet & X3DH key agreement for forward secrecy',
      'P2P WebRTC voice/video mesh with dynamic candidate negotiation',
      'Outbound-only WebSocket tunnel for secure OffLAN inter-network routing',
      'Zero external telemetry; completely self-contained and self-hosted'
    ],
    year: '2026',
    techBadge: '[ WebRTC • Double Ratchet • 2026 ]',
    previewImage: '/images/projects/onlan.jpg',
    keyTags: ['React 19', 'FastAPI', 'WebRTC', 'Double Ratchet'],
    githubUrl: 'https://github.com/jagadish-kumar/onlan',
    status: 'DEPLOYED // ACTIVE RESEARCH'
  },
  {
    id: 'qlassify',
    number: '02',
    title: 'QLASSIFY',
    subtitle: 'Distributed Quantum/Classical Machine Learning Framework',
    category: 'Quantum & AI',
    summary: 'A quantum/classical ML experimentation and benchmarking framework evaluating classical vs. quantum kernels across distributed Ray compute clusters.',
    description: [
      'QLASSIFY systematically benchmarks the representational advantage of quantum kernels over classical radial basis function (RBF) and polynomial kernels in high-dimensional spaces.',
      'Features automated experiment versioning, quantum state vector caching, and circuit transpilation optimization across Ray distributed workers to parallelize high-depth circuit simulation overhead.',
      'Integrates directly with IBM Qiskit, Qiskit Machine Learning, and classical Scikit-learn models for seamless side-by-side performance comparisons.'
    ],
    techStack: ['Python', 'Qiskit', 'Qiskit ML', 'FastAPI', 'Ray Cluster', 'PostgreSQL', 'Docker', 'Scikit-learn', 'NumPy'],
    architectureHighlights: [
      'Quantum kernel fidelity matrix computation on distributed Ray clusters',
      'Comparative benchmarking: Classical SVM vs. Quantum Support Vector Machines',
      'Reproducible experiment tracking and circuit parameter serialization',
      'Extensible runner supporting statevector simulators and quantum backends'
    ],
    year: '2025',
    techBadge: '[ Qiskit ML • Ray Cluster • 2025 ]',
    previewImage: '/images/projects/neurosphere-ai.jpg',
    keyTags: ['Python', 'Qiskit ML', 'Ray Cluster', 'PostgreSQL'],
    githubUrl: 'https://github.com/jagadish-kumar/qlassify',
    status: 'RESEARCH ENGINE'
  },
  {
    id: 'quantum-compiler',
    number: '03',
    title: 'DISTRIBUTED QUANTUM COMPILER',
    subtitle: 'Topology-Aware Multi-QPU Circuit Synthesis Engine',
    category: 'Quantum & AI',
    summary: 'An architectural compiler for distributed quantum architectures that partitions high-depth quantum circuits across multi-core QPUs while minimizing inter-QPU entanglement costs.',
    description: [
      'Addresses the fundamental scaling limit of monolithic quantum processors by compiling circuits for networks of interconnected small-scale quantum processing units (QPUs).',
      'Uses graph-theoretic partitioning algorithms (spectral clustering & min-cut) to segment quantum circuits, scheduling non-local two-qubit gates (CNOT) via quantum teleportation with minimum EPR pair consumption.',
      'Incorporates hardware connectivity topologies and coherence decay parameters into the compilation cost function for fault-tolerant mapping.'
    ],
    techStack: ['Python', 'Qiskit', 'Graph Partitioning', 'NetworkX', 'NumPy', 'Quantum Teleportation'],
    architectureHighlights: [
      'Topology-aware multi-core QPU circuit partitioning and qubit allocation',
      'Minimal EPR pair routing for non-local teleported gates',
      'Coherence-time-aware gate scheduling and SWAP gate minimization',
      'Automated circuit visualization and inter-core latency analysis'
    ],
    year: '2026',
    techBadge: '[ Qiskit • Multi-QPU • 2026 ]',
    previewImage: '/images/projects/quantum-compiler.png',
    keyTags: ['Python', 'Qiskit', 'Graph Theory', 'NetworkX'],
    githubUrl: 'https://github.com/jagadish-kumar/distributed-quantum-compiler',
    status: 'ACADEMIC MINOR // CORE PROJECT'
  },
  {
    id: 'quantum-visualizer',
    number: '04',
    title: 'QUANTUM VISUALIZER',
    subtitle: 'Interactive 3D Bloch Sphere & Gate Simulation Engine',
    category: 'Quantum & AI',
    summary: 'An interactive web-based mathematical visualizer for quantum computation, rendering real-time 3D Bloch sphere projections, state vector transformations, and multi-qubit gates.',
    description: [
      'Visualizes single-qubit quantum states as coordinates on a 3D unit sphere with real-time parameter tweaking of polar and azimuthal angles (theta, phi).',
      'Enables users to apply quantum logic gates (Pauli-X, Y, Z, Hadamard, Phase, T) and witness immediate 3D spherical rotations alongside mathematical Dirac notation and density matrices.',
      'Extends into two-qubit Bell state entanglement visualizations with probability distribution histograms for measurement collapse.'
    ],
    techStack: ['Three.js', 'WebGL', 'TypeScript', 'Tailwind CSS', 'MathJax', 'React 19'],
    architectureHighlights: [
      'WebGL-accelerated 3D Bloch sphere rendering with orbital controls',
      'Real-time unitary matrix operations and state vector trajectory animation',
      'Dynamic Dirac ket notation rendering with measurement collapse simulation',
      'Interactive mode for multi-gate sequence experiments'
    ],
    year: '2026',
    techBadge: '[ Three.js • Dirac Math • 2026 ]',
    previewImage: '/images/projects/quantum-visualizer.jpg',
    keyTags: ['Three.js', 'WebGL', 'TypeScript', 'MathJax'],
    githubUrl: 'https://github.com/jagadish-kumar/quantum-visualizer',
    status: 'INTERACTIVE TOOL'
  },
  {
    id: 'clear-skys',
    number: '05',
    title: 'CLEAR SKYS',
    subtitle: 'AI & Satellite GIS Sustainable Travel Assistant',
    category: 'Fullstack & Apps',
    summary: 'An AI-powered sustainable destination discovery platform utilizing satellite GIS telemetry, real-time air quality indexing (AQI), and personalized ecological filtering.',
    description: [
      'Clear Skys analyzes geospatial satellite telemetry, ground-level environmental sensors, and weather patterns to dynamically recommend travel itineraries with minimal footprints.',
      'Includes machine-learning-driven AQI prediction models forecasting localized air quality up to 72 hours in advance.',
      'Features a responsive React map interface with interactive GeoJSON overlays, pollutant breakdown charts, and personalized route scoring.'
    ],
    techStack: ['React', 'Leaflet', 'FastAPI', 'Python', 'Satellite GIS', 'OpenAQ API', 'GeoJSON', 'Tailwind CSS'],
    architectureHighlights: [
      'Real-time satellite & IoT air quality sensor telemetry ingestion',
      'Predictive time-series air quality modeling up to 72 hours ahead',
      'Dynamic geospatial travel route optimization with ecological scoring',
      'FastAPI caching layer for instant localized tile queries'
    ],
    year: '2025',
    techBadge: '[ Satellite GIS • FastAPI • 2025 ]',
    previewImage: '/images/projects/clear-skys.jpg',
    keyTags: ['React', 'Leaflet', 'FastAPI', 'Satellite GIS'],
    githubUrl: 'https://github.com/jagadish-kumar/clear-skys',
    demoUrl: 'https://clear-skys.vercel.app',
    status: 'PRODUCTION // HACKATHON WINNER'
  },
  {
    id: 'fincopilot',
    number: '06',
    title: 'FINCOPILOT',
    subtitle: 'AI-Driven Personal Financial Intelligence for Students',
    category: 'Fullstack & Apps',
    summary: 'Developed for the LNIT Hackathon. An intelligent financial companion for students combining predictive cash flow modeling, automated expense tracking, and scholarship discovery.',
    description: [
      'FinCopilot tackles student financial insecurity by combining predictive cash flow modeling with automated expense tracking and an algorithmic scholarship discovery database.',
      'Constructed with a modern FastAPI and PostgreSQL backend with JWT authentication and SQLAlchemy ORM, alongside a smooth, mobile-ready React PWA packaged via Capacitor.',
      'Incorporates automated financial health scoring, multi-tier budget alerts, and structured savings goal simulations.'
    ],
    techStack: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Capacitor', 'Tailwind CSS', 'Framer Motion', 'React Query'],
    architectureHighlights: [
      'Automated student scholarship matching engine with eligibility filtering',
      'Predictive cash flow modeling and spending burn-rate alerts',
      'High-performance async FastAPI backend with SQLAlchemy connection pooling',
      'Cross-platform mobile PWA packaging with native push notifications'
    ],
    year: '2025',
    techBadge: '[ React • PostgreSQL • 2025 ]',
    previewImage: '/images/projects/fincopilot.png',
    keyTags: ['React', 'FastAPI', 'PostgreSQL', 'Capacitor'],
    githubUrl: 'https://github.com/jagadish-kumar/fincopilot',
    status: 'HACKATHON BUILD'
  },
  {
    id: 'learnyourway',
    number: '07',
    title: 'LEARNYOURWAY (LYW)',
    subtitle: 'Adaptive Learning Platform & Intelligent Problem-Solving Engine',
    category: 'Fullstack & Apps',
    summary: 'Developed for the AU Hackathon (Finalist). An interactive learning and teaching platform engineered to dynamically adapt curriculum difficulty to individual student progress.',
    description: [
      'Advanced through competitive DSA screening and problem-solving rounds at the AU Hackathon with the LearnYourWay project.',
      'Constructed dynamic problem-solving pathways that adapt based on a student\'s algorithmic weak points, response velocity, and cognitive retention.',
      'Engineered an intuitive teacher dashboard with real-time class comprehension analytics and auto-generated problem set recommendations.'
    ],
    techStack: ['React', 'JavaScript', 'FastAPI', 'Tailwind CSS', 'DSA Engine', 'PostgreSQL'],
    architectureHighlights: [
      'Dynamic curriculum adaptation based on real-time problem-solving analytics',
      'Diagnostic evaluation engine targeting specific algorithmic competencies',
      'Teacher oversight portal with cohort-level conceptual mastery tracking'
    ],
    year: '2025',
    techBadge: '[ React • EdTech • 2025 ]',
    previewImage: '/images/projects/learnyourway.jpg',
    keyTags: ['React', 'FastAPI', 'DSA Engine', 'EdTech'],
    githubUrl: 'https://github.com/jagadish-kumar/learnyourway',
    status: 'AU HACKATHON FINALIST'
  },
  {
    id: 'saarthi',
    number: '08',
    title: 'SAARTHI',
    subtitle: 'Strategic AI-Assisted Rail Transport Headway & Fleet Initiative',
    category: 'Distributed & Systems',
    summary: 'Developed for the Smart India Hackathon 2025 (College Finalist). An AI-assisted rail traffic management platform predicting headway delays and optimizing route clearances.',
    description: [
      'Engineered for high-density rail corridors to calculate optimal headways between trains, reducing signal holding times and energy burn.',
      'Integrates train telemetry, station track occupancy data, and predictive schedule models to dynamically recommend crossing priorities to section controllers.',
      'Features interactive schedule visualization and simulated emergency dispatch re-routing.'
    ],
    techStack: ['Python', 'AI/ML', 'FastAPI', 'System Design', 'PostgreSQL', 'Tailwind CSS'],
    architectureHighlights: [
      'Predictive headway delay modeling based on real-time rail occupancy telemetry',
      'Dynamic crossing clearance scheduling minimizing energy consumption',
      'High-throughput async backend built for sub-second controller dispatch'
    ],
    year: '2025',
    techBadge: '[ Rail AI • Fleet Telemetry • 2025 ]',
    previewImage: '/images/projects/saarthi.jpg',
    keyTags: ['Python', 'AI/ML', 'System Design', 'FastAPI'],
    githubUrl: 'https://github.com/jagadish-kumar/saarthi',
    status: 'SIH 2025 FINALIST'
  },
  {
    id: 'amazon-ml-challenge',
    number: '09',
    title: 'AMAZON ML CHALLENGE 2026',
    subtitle: 'Large-Scale Multilingual Business Entity Resolution Pipeline',
    category: 'Quantum & AI',
    summary: 'A high-precision Entity Resolution system achieving Rank 135 and Score ~0.9863 Macro F0.5 across tens of millions of noisy business registry records.',
    description: [
      'Engineered to resolve ambiguous enterprise identities across datasets with severe noise, inconsistent legal forms, and multilingual representations.',
      'Developed an extensive pipeline incorporating Indic-script transliteration dictionaries, phonetic encoding, legal entity normalization, and fuzzy string similarity metrics.',
      'Built a two-stage architecture: high-recall candidate generation via inverted index blocking, followed by high-precision gradient-boosted classification on local Apple MPS hardware.'
    ],
    techStack: ['Python', 'PyTorch', 'Scikit-learn', 'LightGBM', 'Indic Transliteration', 'Pandas', 'NumPy', 'Apple MPS'],
    architectureHighlights: [
      'Dual-stage pipeline: Inverted index blocking + Gradient Boosted re-ranking',
      'Domain-tuned Indic transliteration dictionary covering major Indian languages',
      'Final public score: ~0.9863 Macro F0.5 with best global rank 135',
      'Strict local execution on MacBook Pro under memory & compute constraints'
    ],
    year: '2026',
    techBadge: '[ Entity Resolution • Score 0.9863 • 2026 ]',
    previewImage: '/images/projects/amazon-ml.png',
    keyTags: ['Python', 'PyTorch', 'LightGBM', 'NLP'],
    githubUrl: 'https://github.com/jagadish-kumar/amazon-ml-challenge-2026',
    status: 'COMPETITION RANK 135'
  },
  {
    id: 'trace',
    number: '10',
    title: 'TRACE',
    subtitle: 'Temporal Risk & Attack Chain Estimation (Predictive Cyber Defense)',
    category: 'Distributed & Systems',
    summary: 'A predictive cybersecurity system focused on forecasting potential network compromises and attack chains before lateral movement occurs.',
    description: [
      'TRACE (Temporal Risk & Attack Chain Estimation) monitors enterprise network topology and traffic flows to anticipate adversarial trajectories.',
      'Constructs probabilistic temporal attack graphs correlating anomalous port activity, privilege escalations, and egress indicators into structured threat chains.',
      'Designed with an offline-first architecture, ensuring air-gapped security monitoring without leaking metadata to cloud telemetry.'
    ],
    techStack: ['Python', 'FastAPI', 'Network Traffic Analysis', 'Temporal Graph Models', 'Docker', 'SQLite'],
    architectureHighlights: [
      'Temporal attack chain graph forecasting lateral compromise paths',
      'Offline-first zero-telemetry architecture for air-gapped enclaves',
      'Sub-second compromise probability scoring across ingress endpoints'
    ],
    year: '2026',
    techBadge: '[ Cyber Defense • Attack Chains • 2026 ]',
    previewImage: '/images/projects/trace.jpg',
    keyTags: ['Cybersecurity', 'Temporal AI', 'Network Analysis', 'Python'],
    githubUrl: 'https://github.com/jagadish-kumar/trace',
    status: 'ACTIVE RESEARCH'
  },
  {
    id: 'smartbranch-360',
    number: '11',
    title: 'SMARTBRANCH 360',
    subtitle: 'Enterprise Cisco VLAN Architecture & Automated IOS Validator',
    category: 'Distributed & Systems',
    summary: 'A robust enterprise Cisco network architecture featuring multi-tier VLAN isolation and a custom Python CLI tool for automated Cisco IOS configuration validation.',
    description: [
      'Designed a multi-branch enterprise network topology partitioning traffic across Employee, Guest, Server, and Management VLANs with strict inter-VLAN ACLs.',
      'Engineered a Python-based configuration validation tool that parses running Cisco router/switch configurations, detects misconfigurations, and generates remediation scripts.',
      'Validated end-to-end routing protocols (OSPF, RIPv2), DHCP snooping, and NAT translation across simulated enterprise topologies.'
    ],
    techStack: ['Cisco Packet Tracer', 'Cisco IOS', 'Python CLI', 'VLANs', 'ACLs', 'OSPF', 'Network Security'],
    architectureHighlights: [
      'Multi-tier VLAN isolation separating server infrastructure and guest traffic',
      'Custom Python CLI configuration parser suggesting Cisco IOS remediation',
      'Hardened switch port security and dynamic ARP inspection configuration'
    ],
    year: '2025',
    techBadge: '[ Cisco IOS • VLAN Mesh • 2025 ]',
    previewImage: '/images/projects/smartbranch.jpg',
    keyTags: ['Cisco IOS', 'VLAN Mesh', 'Python CLI', 'Networking'],
    githubUrl: 'https://github.com/jagadish-kumar/smartbranch-360',
    status: 'NETWORKING PROJECT'
  }
];

type CategoryFilter = 'All Projects' | 'Quantum & AI' | 'Distributed & Systems' | 'Fullstack & Apps';
type ViewMode = 'grid' | 'list';

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
    'Quantum & AI': PROJECTS.filter(p => p.category === 'Quantum & AI').length,
    'Distributed & Systems': PROJECTS.filter(p => p.category === 'Distributed & Systems').length,
    'Fullstack & Apps': PROJECTS.filter(p => p.category === 'Fullstack & Apps').length,
  };

  return (
    <section 
      id="projects" 
      className="portfolio-section-anchor projects-section-root"
      data-theme="light"
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

      {/* FLOATING CURSOR PREVIEW CARD (Contrast Obsidian Glass floating over light mode) */}
      <div
        ref={previewRef}
        className={`cursor-preview-card ${isHovering && viewMode === 'list' ? 'visible' : ''}`}
        aria-hidden="true"
      >
        {activePreview && (
          <>
            <div className="preview-img-wrapper">
              <img 
                key={activePreview.id}
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
        {/* Section Header with Bold Awwwards Typography */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-black/75 uppercase">
              03 // SELECTED ARCHITECTURES &amp; SYSTEMS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase leading-[1.05]">
            ENGINEERED SYSTEMS &amp; PROJECTS
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
            A curated index of production applications, distributed protocols, quantum compilers, and algorithmic frameworks.
          </p>
        </div>

        {/* Control Bar: Category Filters & View Switcher */}
        <div className="projects-controls-bar">
          {/* Category Filter Tabs */}
          <div className="projects-filter-bar">
            {(['All Projects', 'Quantum & AI', 'Distributed & Systems', 'Fullstack & Apps'] as CategoryFilter[]).map((tab) => (
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

          {/* View Switcher: Grid vs Hover List */}
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
              onClick={() => setViewMode('list')}
              className={`projects-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="Hover List layout"
            >
              <List className="w-3.5 h-3.5" />
              <span>Hover List</span>
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: HOVER LIST VIEW (Awwwards Light Theme with Interactive Cursor Preview) */}
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
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenModal={() => setSelectedProject(project)} 
              />
            ))}
          </div>
        )}

        {/* Bottom Section Footnote */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-gray-500">
          <div>
            SOURCE REPOSITORIES VERIFIED ON GITHUB • ALL SYSTEMS REPRODUCIBLE
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-ping" />
            <span className="text-black font-semibold">TOTAL ACTIVE ARCHIVES: {PROJECTS.length}</span>
          </div>
        </div>

        {/* Connecting Conduit into 04 Arsenal */}
        <div className="mt-12 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-[1px] h-10 bg-gradient-to-b from-black/25 via-[#10b981] to-transparent animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.25em] text-gray-400 uppercase mt-2">
            DATA PIPELINE // 04 TECHNICAL ARSENAL
          </span>
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
