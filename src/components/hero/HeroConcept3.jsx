import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroConcept3.css';

// CONCEPT 3: LIQUID GRADIENT MESH & 3D FROSTED GLASS
// 100% Polished. Incredible morphing gradient using layered CSS and a 3D tilting glass card.

export default function HeroConcept3() {
  const cardRef = useRef(null);
  
  useEffect(() => {
    // 1. Mouse tracking for the mesh
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      gsap.to('.hc3-orb-1', { x: x * 150, y: y * 150, duration: 2, ease: 'power2.out' });
      gsap.to('.hc3-orb-2', { x: x * -150, y: y * -150, duration: 3, ease: 'power2.out' });
      gsap.to('.hc3-orb-3', { x: x * 100, y: y * -200, duration: 2.5, ease: 'power2.out' });
      
      // 3D Glass Card Tilt
      if (cardRef.current) {
        const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
        const yAxis = (window.innerHeight / 2 - e.clientY) / 25;
        gsap.to(cardRef.current, {
          rotateY: -xAxis,
          rotateX: yAxis,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power1.out'
        });
      }
    };

    const handleMouseLeave = () => {
      if (cardRef.current) {
        gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 1, ease: 'power3.out' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // 2. Infinite Marquee Seamless Loop
    gsap.to('.hc3-marquee-track', {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1
    });

    // 3. Image Glass Hover Reveal
    const card = cardRef.current;
    const img = document.querySelector('.hc3-image');
    
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { backdropFilter: 'blur(0px)', backgroundColor: 'rgba(255,255,255,0)', duration: 0.5 });
      gsap.to(img, { scale: 1.05, filter: 'grayscale(0%)', opacity: 1, duration: 0.5 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255,255,255,0.03)', duration: 0.5 });
      gsap.to(img, { scale: 1, filter: 'grayscale(100%)', opacity: 0.4, duration: 0.5 });
    });

    // Entrance Animation
    gsap.fromTo('.hc3-marquee-track', { opacity: 0 }, { opacity: 1, duration: 2, delay: 0.5 });
    gsap.fromTo(card, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 1 });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="hc3-wrapper">
      
      {/* Global Background Liquid Mesh (Fixed) */}
      <div className="hc3-global-mesh">
        <div className="hc3-orb hc3-orb-1"></div>
        <div className="hc3-orb hc3-orb-2"></div>
        <div className="hc3-orb hc3-orb-3"></div>
      </div>

      {/* Hero Content */}
      <div className="hc3-centerpiece">
        
        {/* Infinite Marquee */}
        <div className="hc3-marquee">
          <div className="hc3-marquee-track">
            <span>CREATIVE ENGINEER — POLYMATH — </span>
            <span>CREATIVE ENGINEER — POLYMATH — </span>
          </div>
        </div>

        {/* Central 3D Frosted Glass Card */}
        <div className="hc3-glass-card" ref={cardRef}>
          <img src="/jagadish_cinematic_hero.jpg" alt="Jagadish" className="hc3-image" />
          <div className="hc3-glare"></div>
        </div>

        <div className="hc3-instruction">HOVER TO REVEAL</div>

      </div>

    </div>
  );
}
