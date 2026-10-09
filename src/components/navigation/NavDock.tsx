import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './NavDock.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

interface NavDockProps {
  isLoaded?: boolean;
}

// --------------------------------------------------------
// MAGNETIC BUTTON COMPONENT (Smooth Spring Physics Matching SocialDock)
// --------------------------------------------------------
const Magnetic: React.FC<{ children: React.ReactElement; strength?: number }> = ({ children, strength = 20 }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(ref.current, {
      x: (x / width) * strength,
      y: (y / height) * strength,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });
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
// GLOBAL LEFT NAVIGATION DOCK (Persistent across all sections)
// --------------------------------------------------------

export default function NavDock({ isLoaded = true }: NavDockProps) {
  if (!isLoaded) return null;

  const [activeSection, setActiveSection] = useState<string>('hero');
  const dockRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<{ top: number; height: number; opacity: number }>({
    top: 0,
    height: 36,
    opacity: 0,
  });

  // Synchronized Spring Entrance (Matching SocialDock)
  useEffect(() => {
    if (!isLoaded || !dockRef.current) return;

    gsap.fromTo(
      dockRef.current,
      { opacity: 0, yPercent: -50, y: -40 },
      {
        opacity: 1,
        yPercent: -50,
        y: 0,
        duration: 0.9,
        ease: 'back.out(1.5)',
        delay: 0.2,
        clearProps: 'transform',
      }
    );
  }, [isLoaded]);

  // Update sliding pill position whenever active section changes
  useEffect(() => {
    const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeSection);
    const activeBtn = buttonRefs.current[activeIndex];
    const dockEl = dockRef.current;

    if (activeBtn && dockEl) {
      const btnRect = activeBtn.getBoundingClientRect();
      const dockRect = dockEl.getBoundingClientRect();
      const relativeTop = btnRect.top - dockRect.top;

      setPillStyle({
        top: relativeTop,
        height: btnRect.height,
        opacity: 1,
      });
    }
  }, [activeSection]);

  // Track active section based on viewport
  useEffect(() => {
    let rafId: number | null = null;

    const checkScroll = () => {
      rafId = null;
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
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(checkScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    checkScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setActiveSection(id);

    const targetY = element.getBoundingClientRect().top + window.scrollY;

    gsap.to(window, {
      duration: 1.0,
      scrollTo: { y: targetY, autoKill: false },
      ease: 'power3.inOut',
      overwrite: 'auto',
    });
  };

  return (
    <aside
      ref={dockRef}
      aria-label="Section navigation dock"
      className="global-nav-dock pointer-events-auto"
    >
      {/* Smooth Gliding Active Indicator Pill */}
      <div
        className="nav-dock-active-pill"
        style={{
          transform: `translateY(${pillStyle.top}px)`,
          height: `${pillStyle.height}px`,
          opacity: pillStyle.opacity,
        }}
        aria-hidden="true"
      >
        <div className="nav-dock-pip" />
      </div>

      {NAV_ITEMS.map((item, index) => {
        const isActive = activeSection === item.id;

        return (
          <React.Fragment key={item.id}>
            {index > 0 && <div className="nav-dock-separator" />}
            <Magnetic strength={20}>
              <button
                ref={(el) => (buttonRefs.current[index] = el)}
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
