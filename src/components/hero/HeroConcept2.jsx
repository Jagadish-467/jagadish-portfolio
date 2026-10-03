import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroConcept2.css';

// CONCEPT 2: MAGNETIC CANVAS GRID & EDITORIAL ARCH
// 100% Polished. Uses HTML5 Canvas for flawless 60fps grid rendering.

export default function HeroConcept2() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. High-Performance Canvas Dot Grid
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = { x: -1000, y: -1000 };
    const spacing = 35; // Space between dots
    const dots = [];

    class Dot {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = 1.2;
        this.color = 'rgba(255, 255, 255, 0.15)';
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        const dx = mouse.x - this.baseX;
        const dy = mouse.y - this.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        
        if (distance < maxDist) {
          // Magnetic pull towards cursor
          const force = (maxDist - distance) / maxDist;
          this.x = this.baseX + dx * force * 0.15;
          this.y = this.baseY + dy * force * 0.15;
          this.size = 1.2 + force * 2.5;
          // Brighter color when pulled
          this.color = `rgba(255, 255, 255, ${0.15 + force * 0.8})`;
        } else {
          // Spring back to base position smoothly
          this.x += (this.baseX - this.x) * 0.1;
          this.y += (this.baseY - this.y) * 0.1;
          this.size += (1.2 - this.size) * 0.1;
          this.color = 'rgba(255, 255, 255, 0.15)';
        }
        this.draw();
      }
    }

    const initGrid = () => {
      dots.length = 0;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const cols = Math.floor(canvas.width / spacing) + 2;
      const rows = Math.floor(canvas.height / spacing) + 2;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push(new Dot(i * spacing, j * spacing));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < dots.length; i++) {
        dots[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    initGrid();
    animate();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', initGrid);

    // 2. Cinematic Entrance Animations
    const tl = gsap.timeline();
    
    tl.fromTo('.hc2-arch-mask', 
      { scaleY: 0, transformOrigin: 'bottom' }, 
      { scaleY: 1, duration: 1.6, ease: 'power4.inOut' }
    )
    .fromTo('.hc2-image', 
      { scale: 1.3, filter: 'grayscale(100%)' }, 
      { scale: 1, filter: 'grayscale(0%)', duration: 2, ease: 'power3.out' }, 
      "-=0.8"
    )
    .fromTo('.hc2-title-line', 
      { yPercent: 120, opacity: 0 }, 
      { yPercent: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power4.out' }, 
      "-=1.5"
    )
    .fromTo('.hc2-fade', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, 
      "-=1"
    );

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', initGrid);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hc2-wrapper">
      
      {/* Global Background Grid (Canvas) */}
      <canvas className="hc2-global-grid" ref={canvasRef}></canvas>

      <div className="hc2-layout">
        
        {/* Left Typography Column */}
        <div className="hc2-left">
          <div className="hc2-tag hc2-fade">[ 02 ] — ARCHITECTURE</div>
          
          <h1 className="hc2-title">
            <div className="hc2-overflow"><div className="hc2-title-line">PONNADA</div></div>
            <div className="hc2-overflow"><div className="hc2-title-line hc2-italic">JAGADISH</div></div>
          </h1>
          
          <p className="hc2-bio hc2-fade">
            Engineering across systems, artificial intelligence, and quantum spaces.
          </p>

          <button className="hc2-btn hc2-fade">EXPLORE WORK</button>
        </div>

        {/* Right Image Mask Column */}
        <div className="hc2-right">
          <div className="hc2-arch-mask">
            <img src="/jagadish_cinematic_hero.jpg" alt="Jagadish" className="hc2-image" />
          </div>
        </div>
        
      </div>
    </div>
  );
}
