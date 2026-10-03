import React, { useRef, useEffect, useState } from 'react';
import './NavDock.css';

interface NavDockProps {
  isLoaded?: boolean;
}

// --------------------------------------------------------
// MAGNETIC BUTTON COMPONENT (Smooth Pull Effect)
// --------------------------------------------------------
const Magnetic: React.FC<{ children: React.ReactElement; strength?: number }> = ({ children, strength = 18 }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    ref.current.style.transform = `translate(${(x / width) * strength}px, ${(y / height) * strength}px)`;
    ref.current.style.transition = 'transform 0.15s ease-out';
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center justify-center"
    >
      {children}
    </div>
  );
};

// --------------------------------------------------------
// SECTION ICONS
// --------------------------------------------------------
const HeroIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AboutIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HackathonsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const SkillsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ContactIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

interface NavItem {
  id: string;
  label: string;
  tooltip: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Hero', tooltip: '// 00 HERO', icon: <HeroIcon /> },
  { id: 'about', label: 'About', tooltip: '// 01 ABOUT', icon: <AboutIcon /> },
  { id: 'hackathons', label: 'Hackathons', tooltip: '// 02 HACKATHONS', icon: <HackathonsIcon /> },
  { id: 'projects', label: 'Projects', tooltip: '// 03 PROJECTS', icon: <ProjectsIcon /> },
  { id: 'skills', label: 'Skills', tooltip: '// 04 ARSENAL', icon: <SkillsIcon /> },
  { id: 'contact', label: 'Contact', tooltip: '// 05 TRANSMISSION', icon: <ContactIcon /> },
];

// --------------------------------------------------------
// --------------------------------------------------------
// GLOBAL LEFT NAVIGATION DOCK
// Panel 1 (hero): Visible
// Panel 2 (about): Hidden
// Panel 3 (hackathons) to Panel 4 (projects): Keep left dock
// Panel 5 (skills): Hide left dock
// Panel 6 (contact): Appear left dock
// --------------------------------------------------------
const PANEL_VISIBILITY: Record<string, boolean> = {
  hero: true,        // 1st panel: visible
  about: false,      // 2nd panel: hidden
  hackathons: true,  // 3rd panel: visible (keep left dock)
  projects: true,    // 4th panel: visible (keep left dock)
  skills: false,     // 5th panel: hidden (hide it in 5th panel)
  contact: true,     // 6th panel: visible (appear in 6th panel)
};

export default function NavDock({ isLoaded = true }: NavDockProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Track active section and panel visibility based on viewport
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const dockY = windowHeight * 0.5; // Dock is vertically centered at 50%

      const sections = [
        { id: 'hero', el: document.getElementById('hero') },
        { id: 'about', el: document.getElementById('about') },
        { id: 'hackathons', el: document.getElementById('hackathons') },
        { id: 'projects', el: document.getElementById('projects') },
        { id: 'skills', el: document.getElementById('skills') },
        { id: 'contact', el: document.getElementById('contact') },
      ];

      let detectedActive = 'hero';

      for (const sec of sections) {
        if (!sec.el) continue;
        const rect = sec.el.getBoundingClientRect();
        // Check if this section actively overlaps the vertical midpoint of the screen where the dock sits
        if (rect.top <= dockY && rect.bottom >= dockY) {
          detectedActive = sec.id;
          break;
        }
      }

      // Handle edge bounds: bottom of page is contact, top is hero
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        detectedActive = 'contact';
      } else if (window.scrollY < 120) {
        detectedActive = 'hero';
      }

      setActiveSection(detectedActive);
      setIsVisible(PANEL_VISIBILITY[detectedActive] ?? false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Section navigation dock"
      className={`global-nav-dock ${isLoaded && isVisible ? 'nav-dock-visible' : 'nav-dock-hidden'}`}
    >
      {NAV_ITEMS.map((item, index) => {
        const isActive = activeSection === item.id;

        return (
          <React.Fragment key={item.id}>
            {index > 0 && <div className="nav-dock-separator" />}
            <Magnetic strength={16}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`nav-dock-item ${isActive ? 'nav-dock-item-active' : ''}`}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.icon}
                <span className="nav-dock-tooltip">
                  <span className="text-[#10b981] mr-1.5">//</span>
                  {item.label.toUpperCase()}
                </span>
              </button>
            </Magnetic>
          </React.Fragment>
        );
      })}
    </aside>
  );
}
