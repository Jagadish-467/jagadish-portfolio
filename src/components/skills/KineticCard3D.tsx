import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { DomainPillar } from './types';

interface KineticCard3DProps {
  pillar: DomainPillar;
  isActive: boolean;
  isPinned: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export const KineticCard3D: React.FC<KineticCard3DProps> = ({
  pillar,
  isActive,
  isPinned,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 260, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 260, damping: 24 });

  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
    setGlarePosition({ x: x * 100, y: y * 100, opacity: 0.25 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
    onMouseLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        '--pillar-accent': pillar.accentColor,
      } as React.CSSProperties}
      className={`skills-domain-card group cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between select-none ${
        isActive
          ? 'ring-2 ring-[var(--pillar-accent)] bg-white/[0.1] shadow-[0_12px_40px_rgba(0,0,0,0.8)] -translate-y-1.5'
          : 'bg-[#0f0f15]/85 hover:bg-[#14141d]/95'
      }`}
    >
      {/* Glare Lighting Surface Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle 180px at ${glarePosition.x}% ${glarePosition.y}%, ${pillar.glowColor}, transparent 80%)`,
          opacity: glarePosition.opacity,
        }}
      />

      {/* Top Neon Accent Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2.5px] transition-all duration-300 z-20 ${
          isActive ? 'opacity-100 shadow-[0_0_12px_var(--pillar-accent)]' : 'opacity-0'
        }`}
        style={{ background: pillar.accentColor }}
      />

      {/* Header Info */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div
            className="skills-pillar-icon-box transition-transform duration-300 group-hover:scale-110 shadow-md"
            style={{ borderColor: isActive ? pillar.accentColor : 'rgba(255,255,255,0.12)' }}
          >
            {pillar.icon}
          </div>
          <div className="flex items-center gap-1.5">
            {isPinned && (
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/20 text-white font-bold animate-pulse">
                PINNED
              </span>
            )}
            <span className="font-mono text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors">
              // {pillar.number}
            </span>
          </div>
        </div>

        <h3 className="text-sm font-black text-white mb-0.5 group-hover:text-[var(--pillar-accent)] transition-colors tracking-tight">
          {pillar.title}
        </h3>

        <p className="font-mono text-[10px] text-gray-400 mb-2 font-semibold line-clamp-1">
          {pillar.subtitle}
        </p>

        <p className="text-[11px] text-gray-300/80 font-sans leading-relaxed mb-3 line-clamp-2">
          {pillar.description}
        </p>
      </div>

      {/* Tags and Metrics */}
      <div className="relative z-10 mt-auto">
        <div className="flex flex-wrap gap-1 mb-2.5">
          {pillar.tags.map((tag) => (
            <span key={tag} className="skills-domain-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-gray-400">
          <span className="text-gray-400">{pillar.metricLabel}</span>
          <span
            className="font-bold transition-colors"
            style={{ color: isActive ? pillar.accentColor : '#ffffff' }}
          >
            {pillar.metricValue}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
