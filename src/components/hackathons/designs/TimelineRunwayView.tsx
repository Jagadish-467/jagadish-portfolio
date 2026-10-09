import React, { useState } from "react";
import { HackathonItem } from "../types";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";

interface TimelineRunwayViewProps {
  items: HackathonItem[];
}

export const TimelineRunwayView: React.FC<TimelineRunwayViewProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = items[activeIndex] || items[0];

  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-4">
      {/* 1. Top Cyber Chronological Track */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] tracking-widest text-[#10b981] font-bold uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            // CHRONOLOGICAL MILESTONE TRACK [2025 — 2026]
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="p-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-[#10b981] hover:text-black hover:border-[#10b981] transition-all text-white cursor-pointer"
              aria-label="Previous milestone"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-white/70 px-2">
              0{activeIndex + 1} / 0{items.length}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="p-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-[#10b981] hover:text-black hover:border-[#10b981] transition-all text-white cursor-pointer"
              aria-label="Next milestone"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Milestone Node Track Line */}
        <div className="relative flex items-center justify-between pt-2">
          {/* Horizontal connecting wire */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-[#10b981] -translate-y-1/2 z-0 transition-all duration-500 ease-out timeline-track-glow"
            style={{ width: `${(activeIndex / (items.length - 1)) * 100}%` }}
          />

          {items.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            const isPassed = idx <= activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
              >
                {/* Node Pip */}
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? "bg-[#10b981] border-white scale-125 shadow-[0_0_15px_#10b981]"
                      : isPassed
                      ? "bg-[#10b981]/80 border-[#10b981]"
                      : "bg-[#0a0a0a] border-white/20 group-hover:border-white/60"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? "bg-black" : "bg-transparent"}`} />
                </div>

                {/* Node Label Below */}
                <span
                  className={`text-[9px] sm:text-[10px] font-mono mt-2 uppercase tracking-wider transition-colors hidden sm:block ${
                    isCurrent ? "text-[#10b981] font-bold" : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  {item.number} // {item.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Landscape Blueprint Spec Card */}
      <div className="relative rounded-2xl bg-[#0a0a0a]/95 border border-white/15 p-5 sm:p-7 md:p-8 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
        {/* Precision Emerald Corner Brackets */}
        <span className="hud-bracket hud-bracket-tl" />
        <span className="hud-bracket hud-bracket-tr" />
        <span className="hud-bracket hud-bracket-bl" />
        <span className="hud-bracket hud-bracket-br" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          {/* Left: Landscape Photo Evidence Frame (5 cols on lg) */}
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden bg-black/60 border border-white/15 group">
            <img
              src={active.image}
              alt={active.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.12]"
            />
            <div className="hackathon-scanlines absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Corner Crosshairs inside image */}
            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/75 border border-white/15 text-[9px] font-mono text-white/90 uppercase">
              {active.date}
            </span>

            <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#10b981] text-black font-mono font-black text-[9px] uppercase tracking-wider shadow-lg">
              {active.resultBadge}
            </span>
          </div>

          {/* Right: Technical Architecture Specification (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono text-[#10b981] font-bold">
                  // {active.number} MILESTONE SPEC
                </span>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                  {active.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                {active.title}
              </h3>
              <p className="font-mono text-sm text-[#10b981] font-semibold mt-0.5 mb-3">
                {active.project}
              </p>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans mb-4">
                {active.statement}
              </p>
            </div>

            {/* Metric Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-black/50 border border-white/10">
              {active.metrics.map((m, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[8.5px] font-mono text-white/50 uppercase">
                    {m.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-white mt-0.5 truncate">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Key Deliverables */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <h4 className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-300 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                KEY DELIVERABLES
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {active.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Stack */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 flex items-center gap-1 mr-1">
                <Cpu className="w-3 h-3 text-[#10b981]" />
                ARSENAL:
              </span>
              {active.technologies.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
