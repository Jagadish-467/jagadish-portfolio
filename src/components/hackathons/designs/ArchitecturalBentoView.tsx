import React, { useState } from "react";
import { HackathonItem } from "../types";
import { ShieldCheck, CheckCircle2, ArrowUpRight, X, Cpu } from "lucide-react";

interface ArchitecturalBentoViewProps {
  items: HackathonItem[];
}

export const HackathonModal: React.FC<{
  item: HackathonItem | null;
  onClose: () => void;
}> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0c1017] border border-[#10b981]/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_35px_rgba(16,185,129,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Metadata */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-[#10b981]">
            // {item.number} COMPETITIVE DOSSIER
          </span>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 uppercase">
            {item.category}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-1">
          {item.title}
        </h3>
        <p className="font-mono text-sm text-[#10b981] font-semibold mb-4">
          {item.project}
        </p>

        {/* Photo Banner */}
        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/15 mb-5">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="hackathon-scanlines absolute inset-0" />
          <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#10b981] text-black font-mono font-bold text-[10px] uppercase">
            {item.resultBadge}
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 p-3 rounded-xl bg-black/60 border border-white/10">
          {item.metrics.map((m, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[8.5px] font-mono text-white/50 uppercase">{m.label}</span>
              <span className="text-xs font-mono font-bold text-white mt-0.5 truncate">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Statement & Description */}
        <div className="space-y-3 mb-5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">
            Executive Summary
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed font-sans">{item.statement}</p>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">{item.description}</p>
        </div>

        {/* Highlights */}
        <div className="mb-5 p-4 rounded-xl bg-white/[0.03] border border-white/10">
          <h4 className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            Key Deliverables &amp; Outcomes
          </h4>
          <ul className="space-y-2">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#10b981]" />
            Technologies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {item.technologies.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ArchitecturalBentoView: React.FC<ArchitecturalBentoViewProps> = ({ items }) => {
  const [modalItem, setModalItem] = useState<HackathonItem | null>(null);

  const heroItem = items[0];
  const sideItem = items[1];
  const bottomItems = items.slice(2);

  return (
    <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-4">
      {/* Top Bento Row: 1 Large Feature Card (7 cols) + 1 Secondary Card (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">

        {/* Large Feature Bento Card: Techniverse 2K25 */}
        {heroItem && (
          <div className="lg:col-span-7 bento-card-root relative rounded-2xl bg-[#0a0a0a]/95 border border-white/15 p-6 sm:p-7 flex flex-col justify-between overflow-hidden group">
            {/* Corner brackets */}
            <span className="hud-bracket hud-bracket-tl" />
            <span className="hud-bracket hud-bracket-tr" />
            <span className="hud-bracket hud-bracket-bl" />
            <span className="hud-bracket hud-bracket-br" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#10b981]">
                    // FEATURED RECORD {heroItem.number}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                    {heroItem.category}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#10b981]/15 border border-[#10b981] text-[#10b981] font-mono font-bold text-[9px] uppercase">
                  {heroItem.resultBadge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-[#10b981] transition-colors">
                {heroItem.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-[#10b981] font-semibold mb-3">
                {heroItem.project}
              </p>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans mb-4">
                {heroItem.statement}
              </p>
            </div>

            {/* Photo Peek */}
            <div className="relative aspect-[21/9] sm:aspect-[24/9] rounded-xl overflow-hidden border border-white/10 my-2">
              <img src={heroItem.image} alt={heroItem.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="hackathon-scanlines absolute inset-0" />
            </div>

            {/* Bottom Row */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-3">
              <div className="flex flex-wrap gap-1.5">
                {heroItem.technologies.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                    {t}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setModalItem(heroItem)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-white hover:text-[#10b981] cursor-pointer transition-colors"
              >
                <span>SPEC / DOSSIER</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Secondary Bento Card: AU Hackathon */}
        {sideItem && (
          <div className="lg:col-span-5 bento-card-root relative rounded-2xl bg-[#0a0a0a]/95 border border-white/15 p-6 flex flex-col justify-between overflow-hidden group">
            <span className="hud-bracket hud-bracket-tl" />
            <span className="hud-bracket hud-bracket-tr" />
            <span className="hud-bracket hud-bracket-bl" />
            <span className="hud-bracket hud-bracket-br" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-[#10b981]">
                  // {sideItem.number} {sideItem.year}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#10b981] font-mono text-[9px] font-bold uppercase">
                  {sideItem.result}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-[#10b981] transition-colors">
                {sideItem.title}
              </h3>
              <p className="font-mono text-xs text-[#10b981] font-semibold mb-3">
                {sideItem.project}
              </p>

              <p className="text-xs text-gray-300 leading-relaxed font-sans mb-4">
                {sideItem.statement}
              </p>
            </div>

            {/* Photo */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10 my-2">
              <img src={sideItem.image} alt={sideItem.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Bottom Row */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-3">
              <div className="flex flex-wrap gap-1.5">
                {sideItem.technologies.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                    {t}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setModalItem(sideItem)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-white hover:text-[#10b981] cursor-pointer transition-colors"
              >
                <span>SPEC / DOSSIER</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Bento Row: 3 Equal Columns (SIH, LNIT, Unstop Adobe) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bottomItems.map((item) => (
          <div
            key={item.id}
            className="bento-card-root relative rounded-2xl bg-[#0a0a0a]/95 border border-white/15 p-5 sm:p-6 flex flex-col justify-between overflow-hidden group"
          >
            <span className="hud-bracket hud-bracket-tl" />
            <span className="hud-bracket hud-bracket-tr" />
            <span className="hud-bracket hud-bracket-bl" />
            <span className="hud-bracket hud-bracket-br" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#10b981]">
                  // {item.number}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/80 uppercase">
                  {item.result}
                </span>
              </div>

              <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1 group-hover:text-[#10b981] transition-colors">
                {item.title}
              </h4>
              <p className="font-mono text-xs text-[#10b981] font-semibold mb-2">
                {item.project}
              </p>
              <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-sans mb-3">
                {item.statement}
              </p>
            </div>

            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 my-2">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-2">
              <span className="text-[10px] font-mono text-white/50">{item.year}</span>
              <button
                type="button"
                onClick={() => setModalItem(item)}
                className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase text-white hover:text-[#10b981] cursor-pointer transition-colors"
              >
                <span>SPEC</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* In-depth specification modal */}
      <HackathonModal item={modalItem} onClose={() => setModalItem(null)} />
    </div>
  );
};
