import React, { useState } from 'react';
import { SkillItem } from './types';
import { KineticStreamView } from './views/KineticStreamView';
import { Search, X, CheckCircle2 } from 'lucide-react';
import './Skills.css';

export default function SkillsSection() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const [inspectedSkill, setInspectedSkill] = useState<SkillItem | null>(null);

  return (
    <section
      id="skills"
      className="portfolio-section-anchor skills-section-root w-full min-h-screen py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-14 select-none relative flex flex-col justify-between"
      data-theme="dark"
    >
      {/* Corner Crosshairs */}
      <div className="skills-crosshair skills-crosshair-tl" />
      <div className="skills-crosshair skills-crosshair-tr" />
      <div className="skills-crosshair skills-crosshair-bl" />
      <div className="skills-crosshair skills-crosshair-br" />

      {/* ------------------------------------------------------------- */}
      {/* 1. TOP HEADER & SEARCH COMMAND BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 max-w-7xl mx-auto w-full mb-3 lg:mb-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          {/* Section Branding & Titles */}
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-mono text-[10px] font-bold tracking-widest text-white/80 uppercase">
                04 // CAPABILITY SPECTRUM &amp; STACK
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase leading-none">
              TECHNICAL ARSENAL &amp; PROFICIENCIES
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 font-sans max-w-xl mt-1.5 leading-snug">
              A kinetic index of low-level systems, quantum computing, distributed ML frameworks, sovereign protocols, and creative web technologies.
            </p>
          </div>

          {/* Real-Time Live Search Input */}
          <div className="relative shrink-0 w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 35+ technologies..."
              className="w-full pl-8 pr-7 py-1.5 text-xs font-mono bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DYNAMIC KINETIC STREAM RUNNER */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-1">
        <KineticStreamView
          searchQuery={searchQuery}
          hoveredPillar={hoveredPillar}
          setHoveredPillar={setHoveredPillar}
          onSelectSkill={(skill) => setInspectedSkill(skill)}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. SECTION BOTTOM STATUS & TELEMETRY FOOTER */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 font-mono text-[10px] text-gray-400 mt-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-400">TELEMETRY:</span>
          <span className="text-white font-bold">35+ ACTIVE RUNTIMES</span>
          <span className="text-white/20">•</span>
          <span className="text-emerald-400 font-bold">RANK 135 AMAZON ML</span>
          <span className="text-white/20">•</span>
          <span className="text-purple-400 font-bold">QISKIT MINOR</span>
          <span className="text-white/20">•</span>
          <span className="text-amber-400 font-bold">425+ LEETCODE</span>
          <span className="text-white/20">•</span>
          <span className="text-cyan-400 font-bold">60 FPS WEBGL</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
          <span className="text-white font-semibold">PONNADA JAGADISH KUMAR // TECH ARSENAL</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. MODAL INSPECTOR (CLICK ANY TECH TO INSPECT ARCHITECTURE) */}
      {/* ------------------------------------------------------------- */}
      {inspectedSkill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setInspectedSkill(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-[#0c0c10] border border-white/20 p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInspectedSkill(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div
                className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0"
                style={{ borderColor: inspectedSkill.brandColor }}
              >
                {inspectedSkill.logo}
              </div>
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
                  {inspectedSkill.domain.toUpperCase()} DOMAIN // {inspectedSkill.proficiency || 'Mastery'}
                </span>
                <h3 className="text-xl font-black text-white">
                  {inspectedSkill.name}
                </h3>
                <span className="font-mono text-xs text-gray-400">
                  {inspectedSkill.category}
                </span>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3.5 mb-3.5">
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block mb-1">
                ARCHITECTURAL SPECIFICATION
              </span>
              <p className="text-xs text-gray-200 font-sans leading-relaxed">
                {inspectedSkill.description}
              </p>
            </div>

            {inspectedSkill.projectAssociation && (
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 mb-4">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block mb-1">
                  PROJECT / COMPETITIVE ARCHIVE
                </span>
                <span className="font-mono text-xs font-bold text-[#10b981] block">
                  {inspectedSkill.projectAssociation}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-gray-400">
              <span>EXPERIENCE: {inspectedSkill.experience || 'Continuous'}</span>
              <button
                onClick={() => setInspectedSkill(null)}
                className="px-3 py-1 rounded bg-[#10b981] text-black font-bold text-[11px] hover:bg-[#0ea572] transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
