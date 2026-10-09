import React, { useState, useEffect } from "react";
import { HackathonItem } from "../types";
import { ShieldCheck, Terminal, Award, CheckCircle2, ChevronRight, Cpu } from "lucide-react";

interface MissionDossierViewProps {
  items: HackathonItem[];
}

export const MissionDossierView: React.FC<MissionDossierViewProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [flashKey, setFlashKey] = useState(0);

  const active = items[selectedIndex] || items[0];

  const handleSelect = (idx: number) => {
    if (idx === selectedIndex) return;
    setSelectedIndex(idx);
    setFlashKey((prev) => prev + 1);
  };

  // Keyboard navigation for power users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        setSelectedIndex((prev) => (prev + 1) % items.length);
        setFlashKey((k) => k + 1);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
        setFlashKey((k) => k + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length]);

  return (
    <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-4">
      {/* Main Grid: Left Command Ledger + Right Tactical Dossier Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

        {/* Left Column (5 cols): Flight Recorder / Interactive Ledger */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-1">
            <span className="font-mono text-[10px] tracking-widest text-[#10b981] font-bold uppercase flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#10b981]" />
              // TELEMETRY LEDGER [0{items.length} RECORDS]
            </span>
            <span className="font-mono text-[9px] text-white/40 uppercase">
              USE ↑/↓ KEYS OR CLICK
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            {items.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`dossier-list-item text-left p-3.5 sm:p-4 rounded-xl border relative cursor-pointer w-full flex items-center justify-between ${
                    isSelected
                      ? "active bg-white/[0.07] border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.18)]"
                      : "bg-[#0a0a0a]/80 border-white/10 hover:border-white/30 text-white/80"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Index + Status LED */}
                    <div className="flex flex-col items-center shrink-0">
                      <span className={`font-mono text-xs font-bold ${isSelected ? "text-[#10b981]" : "text-white/40"}`}>
                        {item.number}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1 ${
                          isSelected ? "bg-[#10b981] shadow-[0_0_6px_#10b981]" : "bg-white/20"
                        }`}
                      />
                    </div>

                    {/* Meta info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4
                          className={`text-sm sm:text-base font-extrabold tracking-tight truncate ${
                            isSelected ? "text-white" : "text-white/70"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-white/50 shrink-0">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-[#10b981]/90 truncate mt-0.5">
                        {item.project}
                      </p>
                    </div>
                  </div>

                  {/* Right result pill */}
                  <div className="shrink-0 flex items-center gap-2 pl-2">
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? "bg-[#10b981]/15 border-[#10b981] text-[#10b981]"
                          : "bg-white/5 border-white/10 text-white/40"
                      }`}
                    >
                      {item.result}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isSelected ? "text-[#10b981] translate-x-1" : "text-white/20"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Stats Pill */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 mt-2 flex items-center justify-between text-[10px] font-mono text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              STATUS: AUDITED &amp; VERIFIED
            </span>
            <span className="text-white/70">5 NATIONAL &amp; STATE CHALLENGES</span>
          </div>
        </div>

        {/* Right Column (7 cols): Tactical Dossier Stage */}
        <div className="lg:col-span-7 flex flex-col space-y-4 relative">
          {/* Subtle CRT Flash on active change */}
          <div
            key={`flash-${flashKey}`}
            className="crt-flash-overlay absolute inset-0 bg-[#10b981]/10 rounded-2xl pointer-events-none z-30"
          />

          <div className="relative rounded-2xl bg-[#0a0a0a]/95 border border-white/15 p-4 sm:p-6 backdrop-blur-xl shadow-[0_24px_65px_rgba(0,0,0,0.85)]">
            {/* Precision Emerald Corner Brackets */}
            <span className="hud-bracket hud-bracket-tl" />
            <span className="hud-bracket hud-bracket-tr" />
            <span className="hud-bracket hud-bracket-bl" />
            <span className="hud-bracket hud-bracket-br" />

            {/* Dossier Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-[#10b981] tracking-wider uppercase">
                  // RECORD {active.number} OF 0{items.length}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 uppercase">
                  {active.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/40 text-[#10b981] font-bold tracking-wider uppercase">
                  {active.resultBadge}
                </span>
              </div>
            </div>

            {/* Split Row: Photographic Proof on Left + Executive Blueprint on Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start mb-5">
              {/* Image Frame (5 cols on md) */}
              <div className="md:col-span-5 relative aspect-square sm:aspect-[4/3] md:aspect-square rounded-xl overflow-hidden bg-black/60 border border-white/15 group">
                <img
                  src={active.image}
                  alt={active.title}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.12]"
                />
                <div className="hackathon-scanlines absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

                {/* Image HUD Overlays */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[8.5px] font-mono text-white/90 uppercase tracking-wider">
                  {active.date.split("·")[0].trim()}
                </div>

                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#10b981] text-black font-mono font-black text-[9px] uppercase tracking-wider shadow-lg">
                  {active.result}
                </div>
              </div>

              {/* Title & Statement (7 cols on md) */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-tight">
                    {active.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-[#10b981] font-semibold mt-0.5 mb-2.5">
                    {active.project}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans mb-3">
                    {active.statement}
                  </p>
                </div>

                {/* 4-Grid Telemetry Metrics */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/40 border border-white/10 mt-1">
                  {active.metrics.map((m, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[8.5px] font-mono text-white/50 tracking-wider uppercase">
                        {m.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-white mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Deliverables & Pillars */}
            <div className="mb-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <h4 className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-300 mb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                KEY ENGINEERING DELIVERABLES &amp; ACHIEVEMENTS
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {active.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-300 leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Arsenal */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 flex items-center gap-1 mr-1">
                <Cpu className="w-3 h-3 text-[#10b981]" />
                TECH:
              </span>
              {active.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
