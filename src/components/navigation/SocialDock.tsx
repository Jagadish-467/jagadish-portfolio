import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './SocialDock.css';

interface SocialDockProps {
  isLoaded?: boolean;
}

// --------------------------------------------------------
// MAGNETIC BUTTON COMPONENT (Smooth Pull Effect)
// --------------------------------------------------------
const Magnetic: React.FC<{ children: React.ReactElement; strength?: number }> = ({ children, strength = 25 }) => {
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
      ease: 'power3.out'
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)'
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
// ICONS
// --------------------------------------------------------
const GithubIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const CodeIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const InstagramIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// --------------------------------------------------------
// GLOBAL SOCIAL DOCK (Persistent in every section)
// --------------------------------------------------------
export default function SocialDock({ isLoaded = true }: SocialDockProps) {
  if (!isLoaded) return null;

  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded || !dockRef.current) return;

    // Slide in from top to bottom on initial load
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

  return (
    <aside
      ref={dockRef}
      aria-label="Social links dock"
      className="global-social-dock pointer-events-auto"
    >
      <Magnetic strength={20}>
        <a
          href="https://github.com/Jagadish-467"
          target="_blank"
          rel="noreferrer noopener"
          className="dock-item"
          aria-label="GitHub Profile"
        >
          <GithubIcon />
        </a>
      </Magnetic>

      <div className="dock-separator"></div>

      <Magnetic strength={20}>
        <a
          href="https://www.linkedin.com/in/ponnada-jagadish-kumar/"
          target="_blank"
          rel="noreferrer noopener"
          className="dock-item"
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon />
        </a>
      </Magnetic>

      <div className="dock-separator"></div>

      <Magnetic strength={20}>
        <a
          href="https://leetcode.com/Jagadish-467"
          target="_blank"
          rel="noreferrer noopener"
          className="dock-item"
          aria-label="LeetCode Profile"
        >
          <CodeIcon />
        </a>
      </Magnetic>

      <div className="dock-separator"></div>

      <Magnetic strength={20}>
        <a
          href="https://www.instagram.com/___jagadish_kumar___/"
          target="_blank"
          rel="noreferrer noopener"
          className="dock-item"
          aria-label="Instagram Profile"
        >
          <InstagramIcon />
        </a>
      </Magnetic>
    </aside>
  );
}
