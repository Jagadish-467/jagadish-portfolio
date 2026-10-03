import React, { useEffect, useState } from 'react';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import CardStackSection from './components/hackathons/CardStackSection';
import ProjectsSection from './components/projects/ProjectsSection';
import SkillsSection from './components/skills/SkillsSection';
import ContactSection from './components/contact/ContactSection';
import SocialDock from './components/navigation/SocialDock';
import NavDock from './components/navigation/NavDock';
import { Toaster } from 'sonner';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(true);

  // Prevent browser from remembering previous scroll position on reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  return (
    <div className="portfolio-scroll-root min-h-screen bg-[#060606] text-white">
      {/* Global Left Navigation Dock (Darkmode only with horizontal slide transition) */}
      <NavDock isLoaded={isLoaded} />

      {/* Global Persistent Social Dock (Right side with border, active across all sections) */}
      <SocialDock isLoaded={isLoaded} />

      {/* 00 // HERO SEQUENCE (DARK MODE) */}
      <section id="hero" className="portfolio-section-anchor">
        <Hero isLoaded={isLoaded} />
      </section>
      
      {/* 01 // ABOUT MANIFESTO (LIGHT MODE) */}
      <About />

      {/* 02 // HACKATHONS & COMPETITIONS (DARK MODE) */}
      <section 
        id="hackathons"
        className="portfolio-section-anchor relative"
        data-hackathons-section="true"
      >
        <CardStackSection 
          id="hackathons" 
          tag="02 // COMPETITIVE REPERTOIRE"
          sectionTitle="Hackathons & Technical Competitions"
          subtitle="A curated record of high-stakes hackathons, competitive problem-solving, and algorithmic prototypes."
        />
      </section>

      {/* 03 // MAJOR PROJECTS & ARCHITECTURES (LIGHT MODE) */}
      <ProjectsSection />

      {/* 04 // TECHNICAL ARSENAL & SKILLS (DARK MODE) */}
      <SkillsSection />

      {/* 05 // CONTACT & DIRECT NETWORK (LIGHT MODE) */}
      <ContactSection />

      {/* Global Toast Notifications */}
      <Toaster 
        position="bottom-right" 
        theme="light"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            color: '#111111',
            backdropFilter: 'blur(16px)',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '12px',
          }
        }}
      />
    </div>
  );
}
