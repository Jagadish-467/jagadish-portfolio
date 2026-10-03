import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TerminalDrawer from './TerminalDrawer';
import CenterStage from './CenterStage';
import TechnicalCursor from './TechnicalCursor';
import StatusHUD from './StatusHUD';
import Magnetic from './Magnetic';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const DOMAINS = [
  { id: '01', title: 'SOFTWARE ENGINEERING', tag: 'DISTRIBUTED' },
  { id: '02', title: 'ARTIFICIAL INTELLIGENCE', tag: 'NEURAL / RL' },
  { id: '03', title: 'DISTRIBUTED SYSTEMS', tag: 'FAULT TOLERANCE' },
  { id: '04', title: 'QUANTUM COMPUTING', tag: 'QML / CIRCUITS' },
  { id: '05', title: 'CYBERSECURITY', tag: 'CRYPTOGRAPHY' },
];

export default function Hero() {
  const heroRootRef = useRef(null);
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const portraitRef = useRef(null);
  const behindTextRef = useRef(null);
  const frontTextRef = useRef(null);
  const metadataRef = useRef(null);
  const gridRef = useRef(null);

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Domain cycler: subtly rotates active discipline every 3.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDomainIndex((prev) => (prev + 1) % DOMAINS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut '~' or '`' to open systems CLI drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Normalized pointer tracking for subtle 2D parallax and ambient spotlight
  const handlePointerCoord = useCallback((normX, normY, clientX, clientY) => {
    // Keep parallax extremely subtle (max 4-8px)
    setMouseOffset({ x: normX, y: normY });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;
      containerRef.current.style.setProperty('--mouse-x', `${(x / width) * 100}%`);
      containerRef.current.style.setProperty('--mouse-y', `${(y / height) * 100}%`);
    }
  }, []);

  // GSAP ScrollTrigger Multi-Plane Parallax into Hackathons Section
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!heroRootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // 1. Large JAGADISH typography moves upward at majestic speed
      if (behindTextRef.current && frontTextRef.current) {
        tl.to([behindTextRef.current, frontTextRef.current], {
          yPercent: -45,
          opacity: 0.15,
          ease: 'none',
        }, 0);
      }

      // 2. Portrait moves subtly at differentiated rate
      if (portraitRef.current) {
        tl.to(portraitRef.current, {
          yPercent: -22,
          scale: 0.96,
          ease: 'none',
        }, 0);
      }

      // 3. Technical metadata fades and lifts
      if (metadataRef.current) {
        tl.to(metadataRef.current, {
          opacity: 0,
          y: -30,
          ease: 'none',
        }, 0);
      }

      // 4. Background technical grid compresses subtly
      if (gridRef.current) {
        tl.to(gridRef.current, {
          opacity: 0.01,
          scaleY: 0.95,
          ease: 'none',
        }, 0);
      }
    }, heroRootRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const hackathonsEl = document.getElementById('hackathons');
    if (hackathonsEl) {
      hackathonsEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (sectionId) => (e) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" ref={heroRootRef} className="portfolio-viewport-root">
      {/* 1. Precision Technical Crosshair Cursor */}
      <TechnicalCursor onPointerCoord={handlePointerCoord} />

      {/* 2. Interactive Systems CLI Drawer */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* 3. Main Stage Container */}
      <div 
        className="portfolio-canvas-frame"
        ref={containerRef}
      >
        {/* ======================================================== */}
        {/* ATMOSPHERIC LAYER: Archival Grid & Subtle Illumination   */}
        {/* ======================================================== */}

        {/* Barely-visible technical grid responding subtly to cursor */}
        <div 
          ref={gridRef}
          className="hero-technical-grid" 
          aria-hidden="true" 
          style={{
            transform: `translate3d(${mouseOffset.x * 4}px, ${mouseOffset.y * 4}px, 0)`,
          }}
        />

        {/* Subtle, restrained ambient light behind portrait */}
        <div className="ambient-studio-spotlight" aria-hidden="true" />

        {/* Four Architectural Corner Crosshairs (+) from Hackathons spec */}
        <span className="hero-corner-crosshair top-3 left-3 select-none" aria-hidden="true">+</span>
        <span className="hero-corner-crosshair top-3 right-3 select-none" aria-hidden="true">+</span>
        <span className="hero-corner-crosshair bottom-3 left-3 select-none" aria-hidden="true">+</span>
        <span className="hero-corner-crosshair bottom-3 right-3 select-none" aria-hidden="true">+</span>

        {/* Far-edge perimeter hairline guide rails */}
        <div className="hero-perimeter-rail rail-left hidden md:block" aria-hidden="true" />
        <div className="hero-perimeter-rail rail-right hidden md:block" aria-hidden="true" />

        {/* ======================================================== */}
        {/* HEADER NAVIGATION: Editorial Technical Navbar            */}
        {/* ======================================================== */}
        <header className="hero-editorial-header">
          
          {/* Top-Left: Brand Identity + Supporting Tag */}
          <div className="flex flex-col items-start select-none">
            <Magnetic strength={10}>
              <button 
                type="button"
                onClick={handleNavClick('hero')}
                className="hero-brand-button group flex items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 text-left"
                data-cursor="interactive"
                aria-label="Jagadish Portfolio - Return to Top"
              >
                <span className="font-sans font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-[#00e599] transition-colors">
                  JAGADISH
                </span>
                <span className="hero-plus-icon font-mono text-xs text-[#00e599] transition-transform duration-300 group-hover:rotate-90 group-hover:scale-125">
                  +
                </span>
              </button>
            </Magnetic>
            <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-white/45 mt-0.5">
              COMPUTER SCIENCE / BUILDER
            </span>
          </div>

          {/* Center: Editorial Capsule Navigation */}
          <nav className="hero-nav-capsule hidden md:flex items-center" aria-label="Main navigation">
            <Magnetic strength={8}>
              <a href="#hero" onClick={handleNavClick('hero')} className="nav-item active" data-cursor="link">
                ABOUT
              </a>
            </Magnetic>
            <Magnetic strength={8}>
              <a href="#hackathons" onClick={handleNavClick('hackathons')} className="nav-item" data-cursor="link">
                WORK
              </a>
            </Magnetic>
            <Magnetic strength={8}>
              <a href="#hackathons" onClick={handleNavClick('hackathons')} className="nav-item" data-cursor="link">
                HACKATHONS
              </a>
            </Magnetic>
            <Magnetic strength={8}>
              <button 
                type="button" 
                onClick={() => setIsTerminalOpen(true)} 
                className="nav-item cursor-pointer bg-transparent border-0"
                data-cursor="interactive"
              >
                LAB
              </button>
            </Magnetic>
          </nav>

          {/* Top-Right: Status HUD + Terminal Action */}
          <div className="flex items-center gap-3">
            <StatusHUD />

            <Magnetic strength={10}>
              <button 
                type="button"
                onClick={() => setIsTerminalOpen(true)}
                className="hero-terminal-btn hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl transition-all duration-300"
                data-cursor="interactive"
                aria-label="Open Systems CLI Shell"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="font-mono text-[10px] md:text-[11px] text-white/90 font-medium tracking-wider">
                  CLI ~
                </span>
              </button>
            </Magnetic>
          </div>
        </header>

        {/* ======================================================== */}
        {/* CENTER STAGE: Portrait + Spatial Depth Typography        */}
        {/* ======================================================== */}
        <CenterStage 
          stageRef={stageRef}
          portraitRef={portraitRef}
          behindTextRef={behindTextRef}
          frontTextRef={frontTextRef}
          mouseOffset={mouseOffset}
        />

        {/* ======================================================== */}
        {/* FOREGROUND EDITORIAL CONTENT: Metadata & Statements      */}
        {/* ======================================================== */}
        <div ref={metadataRef} className="hero-foreground-overlay pointer-events-none">
          
          {/* Mid-Left Supporting Statement & Core Domains */}
          <div className="hero-statement-column pointer-events-auto">
            <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-[#00e599] uppercase mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e599]" />
              PRIMARY DOMAINS
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-none">
              I BUILD SYSTEMS.
            </h2>
            <div className="font-mono text-[10px] md:text-[11px] tracking-wider text-white/55 mt-2 max-w-sm">
              SOFTWARE / AI / SYSTEMS / QUANTUM / SECURITY
            </div>

            {/* Subtly Rotating Technical Discipline Indicator */}
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center gap-2 font-mono text-[10px] text-white/60">
              <span className="text-[#00e599] font-bold">{DOMAINS[activeDomainIndex].id}</span>
              <span className="text-white/25">/</span>
              <span className="text-white font-semibold tracking-wide transition-all duration-300">
                {DOMAINS[activeDomainIndex].title}
              </span>
              <span className="text-white/30 text-[9px] ml-auto hidden sm:inline">
                [{DOMAINS[activeDomainIndex].tag}]
              </span>
            </div>
          </div>

          {/* Horizontal Technical Domain Rail across Mid-Bottom */}
          <div className="hero-domains-rail pointer-events-auto hidden lg:flex items-center justify-between gap-6 px-12">
            {DOMAINS.map((domain, index) => {
              const isActive = index === activeDomainIndex;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setActiveDomainIndex(index)}
                  className={`service-domain-chip flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider py-1 px-2.5 rounded transition-all duration-300 border bg-transparent cursor-pointer ${
                    isActive 
                      ? 'border-[#00e599]/40 text-[#00e599] bg-[#00e599]/[0.04]' 
                      : 'border-transparent text-white/45 hover:text-white hover:border-white/10'
                  }`}
                  data-cursor="interactive"
                >
                  <span className={isActive ? 'text-[#00e599]' : 'text-white/25'}>{domain.id}</span>
                  <span>/ {domain.title}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Left: Scroll Cue */}
          <div className="hero-bottom-left-action pointer-events-auto">
            <Magnetic strength={12}>
              <button 
                type="button"
                onClick={handleScrollDown}
                className="scroll-cue-btn group flex items-center gap-3 bg-transparent border-0 cursor-pointer p-0 select-none text-left"
                data-cursor="explore"
                aria-label="Scroll to explore selected work and hackathons"
              >
                <div className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.03] group-hover:border-[#00e599]/70 group-hover:bg-[#00e599]/[0.08] flex items-center justify-center transition-all duration-300">
                  <ArrowDown size={14} className="text-white/70 group-hover:text-[#00e599] transition-transform duration-300 group-hover:translate-y-0.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-white/80 group-hover:text-white uppercase transition-colors">
                    ↓ SCROLL TO EXPLORE
                  </span>
                  <span className="font-mono text-[8px] tracking-widest text-white/35 uppercase">
                    01 // SELECTED WORK
                  </span>
                </div>
              </button>
            </Magnetic>
          </div>

          {/* Bottom Right: Architectural Footer Metadata */}
          <div className="hero-bottom-right-metadata select-none text-right">
            <div className="font-sans font-bold text-sm md:text-base text-white/90 tracking-tight">
              BUILD. EXPLORE. REPEAT.
            </div>
            <div className="font-mono text-[9px] md:text-[10px] tracking-widest text-white/40 mt-1 uppercase flex items-center justify-end gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
              <span>PORTFOLIO // 2026 // 001</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
