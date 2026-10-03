import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroConceptB.css';

// CONCEPT B: REFRACTION LENS & KINETIC TRAIL
// A sharp geometric lens that perfectly inverts background typography, leaving geometric image trails.

export default function HeroConceptB() {
  const lensRef = useRef(null);

  useEffect(() => {
    // 1. Zero-latency sharp refraction lens
    const xTo = gsap.quickTo(lensRef.current, "x", { duration: 0.1, ease: "none" });
    const yTo = gsap.quickTo(lensRef.current, "y", { duration: 0.1, ease: "none" });

    let lastTrailTime = 0;
    
    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);

      // 2. Kinetic Geometric Trail (Fast, aggressive)
      const now = Date.now();
      if (now - lastTrailTime > 80) { 
        lastTrailTime = now;
        createKineticTrail(e.clientX, e.clientY);
      }
    };

    const createKineticTrail = (x, y) => {
      const trail = document.createElement('div');
      trail.className = 'hcb-trail-image';
      trail.style.backgroundImage = `url('/jagadish_cinematic_hero.jpg')`;
      
      document.body.appendChild(trail);

      gsap.set(trail, {
        x: x - 100, // sharp 200x200 squares
        y: y - 100, 
        scale: 0.8,
        opacity: 1,
        rotation: (Math.random() - 0.5) * 45 // sharp angular rotations
      });

      gsap.to(trail, {
        scale: 0,
        opacity: 0,
        rotation: "+=45",
        duration: 0.8,
        ease: 'power4.out',
        onComplete: () => trail.remove()
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Marquee Background
    gsap.to('.hcb-bg-text-track', {
      xPercent: -50,
      ease: 'none',
      duration: 15,
      repeat: -1
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('.hcb-trail-image').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="hcb-wrapper">
      
      {/* Deep Background Typography */}
      <div className="hcb-bg-text">
        <div className="hcb-bg-text-track">
          <span>CREATIVE ENGINEER CREATIVE ENGINEER </span>
          <span>CREATIVE ENGINEER CREATIVE ENGINEER </span>
        </div>
      </div>

      {/* Center Layout */}
      <div className="hcb-center">
        <h1 className="hcb-title">JAGADISH</h1>
        <div className="hcb-subtitle">MOVE CURSOR TO REFRACT</div>
      </div>

      {/* The Refraction Lens (Fixed) */}
      <div className="hcb-lens" ref={lensRef}></div>
      
    </div>
  );
}
