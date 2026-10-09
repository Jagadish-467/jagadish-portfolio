import React, { useState, useMemo } from 'react';
import { SkillsMarquee } from '../SkillsMarquee';
import {
  TRACK_1_LANGUAGES,
  TRACK_2_QUANTUM,
  TRACK_3_AIML,
  TRACK_4_PROTOCOLS_WEB,
  DOMAIN_PILLARS,
  PILLAR_KEYWORDS
} from '../skillsData';
import { SkillItem, DomainPillar } from '../types';
import { KineticCard3D } from '../KineticCard3D';
import { KineticConstellationCanvas } from '../KineticConstellationCanvas';
import {
  Cpu,
  ShieldCheck,
  Sparkles,
  Layers,
  Play,
  Pause,
  FastForward,
  Flame,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface KineticStreamViewProps {
  searchQuery: string;
  hoveredPillar: string | null;
  setHoveredPillar: (id: string | null) => void;
  onSelectSkill: (skill: SkillItem) => void;
}

export const KineticStreamView: React.FC<KineticStreamViewProps> = ({
  searchQuery,
  hoveredPillar,
  setHoveredPillar,
  onSelectSkill,
}) => {
  // Speed multiplier: 0 = paused, 0.5 = chill, 1.0 = normal, 1.8 = warp
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  // Active domain filter button
  const [focusedDomain, setFocusedDomain] = useState<string | null>(null);
  // Pinned pillar
  const [pinnedPillar, setPinnedPillar] = useState<string | null>(null);

  // Combine pillar hover/focus, domain filters, and search query keywords
  const activeKeywords = useMemo(() => {
    const list: string[] = [];

    const activePillarNumber = pinnedPillar || hoveredPillar;
    if (activePillarNumber && PILLAR_KEYWORDS[activePillarNumber]) {
      list.push(...PILLAR_KEYWORDS[activePillarNumber]);
    }

    if (focusedDomain) {
      if (focusedDomain === 'quantum') list.push(...PILLAR_KEYWORDS['01']);
      if (focusedDomain === 'protocols') list.push(...PILLAR_KEYWORDS['02']);
      if (focusedDomain === 'aiml') list.push(...PILLAR_KEYWORDS['03']);
      if (focusedDomain === 'web') list.push(...PILLAR_KEYWORDS['04'], 'c++', 'python', 'java', 'rust', 'go');
    }

    if (searchQuery.trim().length > 0) {
      list.push(searchQuery.trim().toLowerCase());
    }

    return list.length > 0 ? list : null;
  }, [hoveredPillar, pinnedPillar, focusedDomain, searchQuery]);

  // Active accent color for constellation particles and glow
  const activeAccentColor = useMemo(() => {
    const target = pinnedPillar || hoveredPillar;
    if (target === '01') return '#a855f7';
    if (target === '02') return '#10b981';
    if (target === '03') return '#f59e0b';
    if (target === '04') return '#61dafb';
    return '#10b981';
  }, [hoveredPillar, pinnedPillar]);

  return (
    <div className="w-full flex flex-col justify-between gap-3.5 lg:gap-4 h-full relative">

      {/* BACKGROUND INTERACTIVE CONSTELLATION CANVAS */}
      <KineticConstellationCanvas accentColor={activeAccentColor} />

      {/* ------------------------------------------------------------- */}
      {/* 1. KINETIC COMMAND RIBBON: DOMAIN SPOTLIGHT & VELOCITY DIAL */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">

        {/* Left: Domain Spotlight Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest hidden sm:inline mr-1">
            SPOTLIGHT:
          </span>

          <button
            onClick={() => { setFocusedDomain(null); setPinnedPillar(null); }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all uppercase ${
              !focusedDomain && !pinnedPillar
                ? 'bg-white/20 text-white font-bold border border-white/30'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            ALL RUNTIMES [35]
          </button>

          <button
            onClick={() => { setFocusedDomain('quantum'); setPinnedPillar('01'); }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all uppercase flex items-center gap-1 ${
              focusedDomain === 'quantum' || pinnedPillar === '01'
                ? 'bg-purple-600 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                : 'bg-white/5 text-gray-400 hover:text-purple-300'
            }`}
          >
            <Cpu className="w-3 h-3 text-purple-400" />
            QUANTUM [7]
          </button>

          <button
            onClick={() => { setFocusedDomain('protocols'); setPinnedPillar('02'); }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all uppercase flex items-center gap-1 ${
              focusedDomain === 'protocols' || pinnedPillar === '02'
                ? 'bg-emerald-600 text-white font-bold shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : 'bg-white/5 text-gray-400 hover:text-emerald-300'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            PROTOCOLS [8]
          </button>

          <button
            onClick={() => { setFocusedDomain('aiml'); setPinnedPillar('03'); }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all uppercase flex items-center gap-1 ${
              focusedDomain === 'aiml' || pinnedPillar === '03'
                ? 'bg-amber-600 text-white font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                : 'bg-white/5 text-gray-400 hover:text-amber-300'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            NEURAL ML [7]
          </button>

          <button
            onClick={() => { setFocusedDomain('web'); setPinnedPillar('04'); }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all uppercase flex items-center gap-1 ${
              focusedDomain === 'web' || pinnedPillar === '04'
                ? 'bg-cyan-600 text-white font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                : 'bg-white/5 text-gray-400 hover:text-cyan-300'
            }`}
          >
            <Layers className="w-3 h-3 text-cyan-400" />
            CREATIVE WEB [9]
          </button>
        </div>

        {/* Right: Kinetic Stream Velocity Controller */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          <span className="font-mono text-[9px] text-gray-400 uppercase hidden md:inline mr-1">
            VELOCITY:
          </span>

          <button
            onClick={() => setSpeedMultiplier(0.5)}
            title="0.5x Chill reading velocity"
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
              speedMultiplier === 0.5 ? 'bg-white/20 text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            0.5x
          </button>

          <button
            onClick={() => setSpeedMultiplier(1.0)}
            title="1.0x Normal kinetic flow"
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
              speedMultiplier === 1.0 ? 'bg-[#10b981] text-black font-bold shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            1.0x
          </button>

          <button
            onClick={() => setSpeedMultiplier(1.8)}
            title="1.8x Fast kinetic warp"
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
              speedMultiplier === 1.8 ? 'bg-cyan-400 text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            1.8x
          </button>

          <button
            onClick={() => setSpeedMultiplier(prev => (prev === 0 ? 1.0 : 0))}
            title={speedMultiplier === 0 ? 'Resume stream' : 'Pause stream'}
            className={`p-1 rounded text-[10px] font-mono transition-all ml-1 ${
              speedMultiplier === 0 ? 'bg-amber-500 text-black font-bold' : 'bg-white/10 text-gray-300 hover:text-white'
            }`}
          >
            {speedMultiplier === 0 ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DYNAMIC KINETIC MARQUEE RUNNERS (4 LAYERED ARCHITECTURE TRACKS) */}
      {/* ------------------------------------------------------------- */}
      <div
        className="relative z-10 w-full rounded-2xl bg-[#09090d]/90 border border-white/[0.08] p-3 sm:p-4 backdrop-blur-2xl shadow-2xl flex flex-col justify-around gap-2 overflow-hidden transition-all duration-500"
        style={{
          boxShadow: `0 0 40px ${activeAccentColor}22, 0 20px 40px rgba(0,0,0,0.8)`
        }}
      >
        {/* Track 1: Languages & Core Systems */}
        <div className="relative group/track">
          <div className="flex items-center justify-between px-2 mb-0.5">
            <span className="font-mono text-[9px] tracking-widest uppercase text-white/70 flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              LAYER 01 // COMPUTATIONAL SYSTEMS &amp; LOW-LEVEL RUNTIMES
            </span>
            <span className="font-mono text-[9px] text-gray-400 hidden sm:inline">
              9 ENGINES • C++20 / RUST / GO / LEETCODE 425+
            </span>
          </div>
          <SkillsMarquee
            items={TRACK_1_LANGUAGES}
            direction="left"
            speedSeconds={44}
            speedMultiplier={speedMultiplier}
            activeKeywords={activeKeywords}
            onSelectSkill={onSelectSkill}
          />
        </div>

        {/* Track 2: Quantum Computing & Mathematical Physics */}
        <div className="relative group/track">
          <div className="flex items-center justify-between px-2 mb-0.5">
            <span className="font-mono text-[9px] tracking-widest uppercase text-white/70 flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
              LAYER 02 // QUANTUM COMPUTING &amp; HIGH-DIM HILBERT SPACES
            </span>
            <span className="font-mono text-[9px] text-gray-400 hidden sm:inline">
              QISKIT MINOR • 3D BLOCH • MULTI-QPU SYNTHESIS
            </span>
          </div>
          <SkillsMarquee
            items={TRACK_2_QUANTUM}
            direction="right"
            speedSeconds={38}
            speedMultiplier={speedMultiplier}
            activeKeywords={activeKeywords}
            onSelectSkill={onSelectSkill}
          />
        </div>

        {/* Track 3: Machine Learning & Intelligence */}
        <div className="relative group/track">
          <div className="flex items-center justify-between px-2 mb-0.5">
            <span className="font-mono text-[9px] tracking-widest uppercase text-white/70 flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
              LAYER 03 // INTELLIGENCE &amp; DISTRIBUTED NEURAL WORKERS
            </span>
            <span className="font-mono text-[9px] text-gray-400 hidden sm:inline">
              RANK 135 AMAZON ML • PYTORCH • RAY CLUSTERS • APPLE MPS
            </span>
          </div>
          <SkillsMarquee
            items={TRACK_3_AIML}
            direction="left"
            speedSeconds={42}
            speedMultiplier={speedMultiplier}
            activeKeywords={activeKeywords}
            onSelectSkill={onSelectSkill}
          />
        </div>

        {/* Track 4: Backend, Distributed Protocols & Creative Web */}
        <div className="relative group/track">
          <div className="flex items-center justify-between px-2 mb-0.5">
            <span className="font-mono text-[9px] tracking-widest uppercase text-white/70 flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              LAYER 04 // SOVEREIGN PROTOCOLS &amp; HIGH-FRAMERATE CREATIVE WEB
            </span>
            <span className="font-mono text-[9px] text-gray-400 hidden sm:inline">
              SUB-10MS P2P • DOUBLE RATCHET • REACT 19 • 60 FPS WEBGL
            </span>
          </div>
          <SkillsMarquee
            items={TRACK_4_PROTOCOLS_WEB}
            direction="right"
            speedSeconds={46}
            speedMultiplier={speedMultiplier}
            activeKeywords={activeKeywords}
            onSelectSkill={onSelectSkill}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CORE ARCHITECTURAL CAPABILITY PILLARS (3D SPRING TILT) */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 w-full">
        <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2.5">
          <div className="flex items-center gap-2 font-mono text-[11px] text-white/80 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
            <span>CORE ARCHITECTURAL PILLARS</span>
          </div>
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider hidden sm:inline-block">
            HOVER CARD TO SPOTLIGHT RUNTIMES • CLICK TO PIN DOMAIN ARCHITECTURE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3.5">
          {DOMAIN_PILLARS.map((pillar) => {
            const isHovered = hoveredPillar === pillar.number;
            const isPinned = pinnedPillar === pillar.number;
            const isActive = isHovered || isPinned;

            return (
              <KineticCard3D
                key={pillar.number}
                pillar={pillar}
                isActive={isActive}
                isPinned={isPinned}
                onMouseEnter={() => setHoveredPillar(pillar.number)}
                onMouseLeave={() => setHoveredPillar(null)}
                onClick={() => setPinnedPillar(prev => prev === pillar.number ? null : pillar.number)}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
};
