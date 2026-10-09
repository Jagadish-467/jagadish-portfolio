import React, { useState } from "react";
import { HackathonItem } from "../types";
import { ShieldCheck, ChevronRight, Cpu } from "lucide-react";

interface ExpandingBladesViewProps {
  items: HackathonItem[];
}

export const ExpandingBladesView: React.FC<ExpandingBladesViewProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-4">
      {/* Blade Instruction Subtitle */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-white/50 text-[10px] font-mono">
        <span className="flex items-center gap-2 text-[#10b981] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          // ARCHITECTURAL SERVER BLADES ENCLOSURE
        </span>
        <span className="hidden sm:inline">HOVER OR CLICK ANY BLADE TO EXPAND</span>
      </div>

      {/* Desktop Horizontal Blade Stage (hidden on mobile, visible on lg+) */}
      <div className="hidden lg:flex gap-3 h-[580px] w-full">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`blade-column relative rounded-2xl overflow-hidden border cursor-pointer select-none ${
                isActive
                  ? "active border-[#10b981] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(16,185,129,0.22)]"
                  : "border-white/10 hover:border-white/25 bg-[#0a0a0a]/90 opacity-80 hover:opacity-100"
              }`}
            >
              {/* Background Image with Dark Atmospheric Gradient */}
              <img
                src={item.image}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover filter transition-all duration-700 ease-out ${
                  isActive
                    ? "scale-105 contrast-[1.15] brightness-[0.45] opacity-100"
                    : "scale-100 grayscale contrast-125 brightness-[0.25] opacity-50"
                }`}
              />
              <div className="hackathon-scanlines absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none" />

              {/* Collapsed Spine Label (Shown when NOT active) */}
              {!isActive && (
                <div className="absolute inset-0 flex flex-col justify-between items-center py-8 z-10 pointer-events-none">
                  <span className="font-mono text-sm font-bold text-[#10b981]">
                    {item.number}
                  </span>

                  <div className="vertical-writing-mode font-mono text-xs font-bold uppercase tracking-widest text-white/80 whitespace-nowrap">
                    {item.title}
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[9px] font-mono text-white/50">
                      {item.year}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  </div>
                </div>
              )}

              {/* Expanded Blade Content (Shown when active) */}
              {isActive && (
                <div className="relative z-10 w-full h-full p-7 flex flex-col justify-between animate-fadeIn">
                  {/* Top HUD Row */}
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#10b981]">
                        // BLADE {item.number}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 border border-white/10 text-white/70 uppercase">
                        {item.category}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#10b981] text-black font-mono font-bold text-[10px] tracking-wider uppercase shadow-[0_0_12px_rgba(16,185,129,0.5)]">
                      {item.resultBadge}
                    </span>
                  </div>

                  {/* Center Content */}
                  <div className="my-auto max-w-xl">
                    <div className="text-[11px] font-mono text-white/60 uppercase tracking-widest mb-1">
                      {item.date}
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-mono text-sm text-[#10b981] font-semibold mt-1 mb-4">
                      {item.project}
                    </p>

                    <p className="text-sm text-gray-200 leading-relaxed font-sans mb-5 bg-black/50 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                      {item.statement}
                    </p>

                    {/* Quick Metric Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {item.metrics.map((m, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
                          <span className="text-[8.5px] font-mono text-white/50 uppercase block">
                            {m.label}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#10b981] mt-0.5 block truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Tech Arsenal */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/15">
                    <span className="font-mono text-[9px] text-white/50 uppercase flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-[#10b981]" />
                      STACK:
                    </span>
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Accordion (visible on screens < lg) */}
      <div className="lg:hidden flex flex-col space-y-3">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={item.id}
              className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                isActive ? "border-[#10b981] bg-[#0e0e0e]" : "border-white/10 bg-[#080808]"
              }`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setActiveIndex(isActive ? -1 : idx)}
                className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${isActive ? "text-[#10b981]" : "text-white/40"}`}>
                    {item.number}
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-white uppercase">{item.title}</h4>
                    <p className="text-[10px] font-mono text-[#10b981]">{item.result}</p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-white/40 transition-transform ${
                    isActive ? "rotate-90 text-[#10b981]" : ""
                  }`}
                />
              </button>

              {/* Accordion Body */}
              {isActive && (
                <div className="p-4 pt-0 border-t border-white/10 space-y-3">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 mt-3">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{item.statement}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
