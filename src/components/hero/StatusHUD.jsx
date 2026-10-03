import React, { useState, useRef, useEffect } from 'react';
import Magnetic from './Magnetic';

/**
 * StatusHUD
 * Technical indicator showing:
 * "● CURRENTLY BUILDING"
 * On interaction, smoothly reveals:
 * - CURRENTLY BUILDING: QLASSIFY (Distributed Quantum ML)
 * - EXPLORING: AI / SYSTEMS / QUANTUM
 */
export default function StatusHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative select-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Magnetic strength={8}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`status-pill-trigger group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 backdrop-blur-xl ${
            isOpen 
              ? 'bg-white/[0.08] border-[#00e599]/60 shadow-[0_0_20px_rgba(0,229,153,0.15)]' 
              : 'bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
          }`}
          data-cursor="interactive"
          aria-expanded={isOpen}
          aria-label="Toggle Current Focus & Systems Disclosure"
        >
          {/* Pulsing emerald beacon */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e599] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e599]" />
          </span>

          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
            CURRENTLY BUILDING
          </span>

          {/* Tiny chevron indicator */}
          <span className={`text-white/40 text-[9px] font-mono transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00e599]' : ''}`}>
            ▼
          </span>
        </button>
      </Magnetic>

      {/* Technical Archival HUD Disclosure Popover */}
      {isOpen && (
        <div 
          className="status-hud-popover absolute top-[calc(100%+8px)] right-0 w-[270px] md:w-[290px] rounded-lg border border-white/15 bg-[#09090b]/95 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-200"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Technical Corner Crosshairs (+) */}
          <span className="absolute top-1.5 left-2 text-white/30 font-mono text-[9px] select-none">+</span>
          <span className="absolute top-1.5 right-2 text-white/30 font-mono text-[9px] select-none">+</span>
          <span className="absolute bottom-1.5 left-2 text-white/30 font-mono text-[9px] select-none">+</span>
          <span className="absolute bottom-1.5 right-2 text-white/30 font-mono text-[9px] select-none">+</span>

          {/* Section 1: CURRENTLY BUILDING */}
          <div className="mb-3.5">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                // ACTIVE SYSTEM
              </span>
              <span className="font-mono text-[9px] text-[#00e599] flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#00e599]" />
                LIVE WORKSPACE
              </span>
            </div>
            <div className="font-sans font-bold text-sm text-white tracking-tight">
              QLASSIFY
            </div>
            <div className="font-mono text-[11px] text-[#00e599] mt-0.5 font-medium tracking-wide">
              Distributed Quantum ML
            </div>
            <p className="text-[10px] text-white/50 leading-relaxed mt-1 font-sans">
              Benchmarking variational quantum circuits for distributed edge telemetry.
            </p>
          </div>

          {/* Hairline Separator */}
          <div className="h-[1px] w-full bg-white/[0.08] my-2.5" />

          {/* Section 2: EXPLORING */}
          <div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-1">
              // EXPLORING &amp; RESEARCH
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/80">
                AI SYSTEMS
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/80">
                DISTRIBUTED
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/80">
                QUANTUM
              </span>
            </div>
          </div>

          {/* Bottom Telemetry Timestamp */}
          <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[8px] font-mono text-white/30 tracking-widest">
            <span>NODE // IN-BLR</span>
            <span>SYS // VERIFIED</span>
          </div>
        </div>
      )}
    </div>
  );
}
