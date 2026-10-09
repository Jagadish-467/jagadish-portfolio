import React from 'react';
import { SkillItem } from './types';

interface SkillsMarqueeProps {
  items: SkillItem[];
  direction?: 'left' | 'right';
  speedSeconds?: number;
  speedMultiplier?: number;
  activeKeywords?: string[] | null;
  onSelectSkill?: (skill: SkillItem) => void;
}

export const SkillsMarquee: React.FC<SkillsMarqueeProps> = ({
  items,
  direction = 'left',
  speedSeconds = 40,
  speedMultiplier = 1,
  activeKeywords = null,
  onSelectSkill,
}) => {
  // Duplicate array 3 times for a completely seamless, gap-free infinite scroll
  const repeatedItems = [...items, ...items, ...items];

  const trackClass = direction === 'left' ? 'marquee-track-left' : 'marquee-track-right';
  const calculatedDuration = Math.max(10, speedSeconds / (speedMultiplier || 1));

  return (
    <div className="marquee-track-container my-1">
      <div
        className={`marquee-inner ${trackClass}`}
        style={{
          animationDuration: `${calculatedDuration}s`,
          animationPlayState: speedMultiplier === 0 ? 'paused' : undefined
        }}
      >
        {repeatedItems.map((skill, index) => {
          const isSpotlightActive = !!activeKeywords && activeKeywords.length > 0;
          const isMatch = isSpotlightActive && activeKeywords.some(kw =>
            skill.name.toLowerCase().includes(kw.toLowerCase()) ||
            skill.category.toLowerCase().includes(kw.toLowerCase()) ||
            (skill.badge && skill.badge.toLowerCase().includes(kw.toLowerCase()))
          );

          let dynamicClass = "skill-pill";
          if (isSpotlightActive) {
            dynamicClass += isMatch ? " skill-pill-spotlight" : " skill-pill-dimmed";
          }

          return (
            <div
              key={`${skill.id || skill.name}-${index}`}
              onClick={() => onSelectSkill?.(skill)}
              className={dynamicClass}
              style={{
                '--brand-color': skill.brandColor || '#10b981',
                '--brand-glow': skill.brandGlow || 'rgba(16, 185, 129, 0.35)',
              } as React.CSSProperties}
            >
              {/* Brand Logo with Glow Frame */}
              <div className="skill-logo-box">
                {skill.logo}
              </div>

              {/* Title & Category Info */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="skill-name">{skill.name}</span>
                  {skill.badge && (
                    <span className="skill-badge-tag">
                      {skill.badge}
                    </span>
                  )}
                </div>
                <span className="skill-pill-category">// {skill.category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
