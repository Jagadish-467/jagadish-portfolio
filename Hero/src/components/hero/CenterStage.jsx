import React from 'react';

/**
 * CenterStage Component
 * - Features the existing isolated transparent portrait (/imagenobg.png)
 * - Scaled commanding and prominent, anchored naturally to viewport bottom
 * - Multi-plane spatial interaction with giant editorial JAGADISH typography:
 *     Layer 10: Solid filled JAGADISH behind portrait
 *     Layer 20: Isolated portrait with subtle atmospheric halo
 *     Layer 30: Hairline spatial stroke outline in front of portrait + "I BUILD SYSTEMS."
 */
export default function CenterStage({ 
  stageRef, 
  portraitRef, 
  behindTextRef, 
  frontTextRef,
  mouseOffset = { x: 0, y: 0 }
}) {
  return (
    <div className="hero-center-stage" ref={stageRef}>
      
      {/* ======================================================== */}
      {/* LAYER 1: Subtle Atmospheric Studio Halo (Restrained)    */}
      {/* ======================================================== */}
      <div 
        className="hero-subject-ambient-halo" 
        aria-hidden="true" 
        style={{
          transform: `translate3d(calc(-50% + ${mouseOffset.x * 6}px), ${mouseOffset.y * 6}px, 0)`,
        }}
      />

      {/* ======================================================== */}
      {/* LAYER 2 (Z-Index 10): Giant Solid Typography BEHIND      */}
      {/* ======================================================== */}
      <div 
        ref={behindTextRef}
        className="hero-editorial-name-layer hero-name-behind" 
        aria-hidden="true"
        style={{
          transform: `translate3d(${mouseOffset.x * -12}px, ${mouseOffset.y * -8}px, 0)`,
        }}
      >
        <span className="name-letter-span">JAGADISH</span>
      </div>

      {/* ======================================================== */}
      {/* LAYER 3 (Z-Index 20): Isolated High-Fidelity Silhouette  */}
      {/* ======================================================== */}
      <div 
        ref={portraitRef}
        className="hero-portrait-stage"
        data-cursor="portrait"
        style={{
          transform: `translate3d(${mouseOffset.x * 10}px, ${mouseOffset.y * 6}px, 0)`,
        }}
      >
        <img 
          src="/imagenobg.png" 
          alt="Jagadish — Computer Science & Systems Builder"
          className="hero-silhouette-cutout-img"
          loading="eager"
          decoding="async"
        />

        {/* Seamless bottom dissolve feather blending into pure black */}
        <div className="hero-portrait-ground-feather" aria-hidden="true" />
      </div>

      {/* ======================================================== */}
      {/* LAYER 4 (Z-Index 30): Spatial Foreground Hairline Stroke */}
      {/* ======================================================== */}
      <div 
        ref={frontTextRef}
        className="hero-editorial-name-layer hero-name-front" 
        aria-hidden="true"
        style={{
          transform: `translate3d(${mouseOffset.x * -12}px, ${mouseOffset.y * -8}px, 0)`,
        }}
      >
        <span className="name-letter-stroke-span">JAGADISH</span>
      </div>

    </div>
  );
}
