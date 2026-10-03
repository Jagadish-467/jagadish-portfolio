import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroConcept1.css';

// CONCEPT 1: INVERSION SPOTLIGHT & IMAGE TRAIL
// 100% Polished, high-performance mouse tracking, perfect typography.

export default function HeroConcept1() {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    // 1. High-Performance Spotlight Tracking using gsap.quickTo
    const xTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.3, ease: "power3" });

    let trailCount = 0;
    let lastTrailTime = 0;
    
    const handleMouseMove = (e) => {
      // Center the spotlight on the mouse
      xTo(e.clientX);
      yTo(e.clientY);

      // 2. Cinematic Image Trail
      const now = Date.now();
      if (now - lastTrailTime > 50) { // Dense trail
        lastTrailTime = now;
        createTrail(e.clientX, e.clientY);
      }
    };

    const createTrail = (x, y) => {
      const trail = document.createElement('div');
      trail.className = 'hc1-trail-image';
      trail.style.backgroundImage = `url('/jagadish_cinematic_hero.jpg')`;
      document.body.appendChild(trail);

      trailCount++;
      
      gsap.set(trail, {
        x: x - 125, // Center of 250px width
        y: y - 175, // Center of 350px height
        rotation: (Math.random() - 0.5) * 15,
        scale: 0.6,
        opacity: 0.9,
        zIndex: trailCount
      });

      gsap.to(trail, {
        y: y - 80,
        scale: 1.1,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => trail.remove()
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3. Staggered Entrance Animation
    gsap.fromTo('.hc1-title-word', 
      { yPercent: 120, opacity: 0, rotateZ: 3 },
      { yPercent: 0, opacity: 1, rotateZ: 0, stagger: 0.12, duration: 1.5, ease: 'power4.out', delay: 0.2 }
    );
    
    gsap.fromTo('.hc1-fade', 
      { opacity: 0 },
      { opacity: 1, duration: 1.5, delay: 1 }
    );

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('.hc1-trail-image').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="hc1-wrapper" ref={containerRef}>
      
      {/* Global Background Spotlight (Fixed & Inverted) */}
      <div className="hc1-global-spotlight" ref={spotlightRef}></div>

      {/* Top Header */}
      <nav className="hc1-header hc1-fade">
        <div className="hc1-logo">JAGADISH // 2026</div>
        <div className="hc1-status">
          <span className="hc1-pulse"></span>
          AVAILABLE FOR WORK
        </div>
      </nav>

      {/* Main Centerpiece Typography */}
      <div className="hc1-centerpiece">
        <div className="hc1-title-container">
          <div className="hc1-overflow">
            <h1 className="hc1-title-word">CREATIVE</h1>
          </div>
          <div className="hc1-overflow">
            <h1 className="hc1-title-word hc1-outline">ENGINEER</h1>
          </div>
        </div>
        <p className="hc1-subtitle hc1-fade">
          A multidisciplinary polymath building across AI, Quantum, and Systems.
        </p>
      </div>
      
      {/* Footer */}
      <div className="hc1-footer hc1-fade">
        <div className="hc1-footer-text">DRAG MOUSE FAST TO REVEAL</div>
      </div>

    </div>
  );
}
