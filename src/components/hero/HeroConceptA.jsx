import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroConceptA.css';

// CONCEPT A: THE INTERFERENCE PATTERN (Quantum / Systems Vibe)
// Uses an HTML5 Canvas to draw a topographic line mesh that magnetically repels the cursor.

export default function HeroConceptA() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = { x: -1000, y: -1000 };
    
    // Create the mesh lines
    const lines = [];
    const numLines = 60; // vertical lines count
    const numPoints = 80; // points per line

    const initLines = () => {
      lines.length = 0;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const spacingY = canvas.height / numLines;
      const spacingX = canvas.width / numPoints;
      
      for (let i = 0; i <= numLines; i++) {
        const line = [];
        for (let j = 0; j <= numPoints; j++) {
          line.push({
            baseX: j * spacingX,
            baseY: i * spacingY,
            x: j * spacingX,
            y: i * spacingY,
          });
        }
        lines.push(line);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // Subtle interference lines

      for (let i = 0; i < lines.length; i++) {
        ctx.beginPath();
        for (let j = 0; j < lines[i].length; j++) {
          const pt = lines[i][j];
          
          // Math for magnetic repulsion
          const dx = mouse.x - pt.baseX;
          const dy = mouse.y - pt.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 300;
          
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            // Push points away smoothly
            pt.x = pt.baseX - dx * force * 0.3;
            pt.y = pt.baseY - dy * force * 0.3;
          } else {
            // Spring back
            pt.x += (pt.baseX - pt.x) * 0.1;
            pt.y += (pt.baseY - pt.y) * 0.1;
          }

          if (j === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    initLines();
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
    window.addEventListener('resize', initLines);

    // Entrance Animation
    gsap.fromTo('.hca-content', 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 2, ease: 'power3.out', delay: 0.5 }
    );

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', initLines);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hca-wrapper">
      <canvas ref={canvasRef} className="hca-canvas"></canvas>
      
      <div className="hca-content">
        <div className="hca-badge">QUANTUM / SYSTEMS / AI</div>
        <h1 className="hca-title">PONNADA<br/>JAGADISH</h1>
        <div className="hca-image-mask">
          <img src="/image.png" alt="Jagadish" className="hca-image" />
        </div>
      </div>
    </div>
  );
}
