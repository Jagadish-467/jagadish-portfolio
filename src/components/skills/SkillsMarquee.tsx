import React from 'react';

export interface SkillItem {
  name: string;
  category: string;
  logo: React.ReactNode;
  brandColor?: string;
  brandGlow?: string;
  highlight?: boolean;
}

interface SkillsMarqueeProps {
  items: SkillItem[];
  direction?: 'left' | 'right';
  speedSeconds?: number;
}

export const SkillsMarquee: React.FC<SkillsMarqueeProps> = ({
  items,
  direction = 'left',
  speedSeconds = 40
}) => {
  // Duplicate array 3 times for a completely seamless, gap-free infinite scroll
  const repeatedItems = [...items, ...items, ...items];

  const trackClass = direction === 'left' ? 'marquee-track-left' : 'marquee-track-right';

  return (
    <div className="marquee-track-container my-1.5">
      <div 
        className={`marquee-inner ${trackClass}`}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {repeatedItems.map((skill, index) => (
          <div 
            key={`${skill.name}-${index}`} 
            className="skill-pill"
            style={{
              '--brand-color': skill.brandColor || '#10b981',
              '--brand-glow': skill.brandGlow || 'rgba(16, 185, 129, 0.35)',
            } as React.CSSProperties}
          >
            <div className="skill-logo-box">
              {skill.logo}
            </div>
            <div className="flex flex-col text-left">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-pill-category">// {skill.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
