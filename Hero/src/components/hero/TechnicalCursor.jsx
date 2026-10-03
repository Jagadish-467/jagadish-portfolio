import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TechnicalCursor.css';

/**
 * Precision Technical Instrument Cursor
 * - Hardware center dot (zero-latency 1:1)
 * - Trailing spring-damped crosshair / reticle
 * - Contextual modes: link, explore, portrait focus, click feedback
 * - Disables on touch and prefers-reduced-motion
 */
export default function TechnicalCursor({ onPointerCoord }) {
  const [cursorState, setCursorState] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef(null);
  const reticleRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Disable on touch screens or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('technical-cursor-active');

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Hardware zero-lag dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Normalized coordinates for subtle parallax [-1, 1]
      if (onPointerCoord) {
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normY = (e.clientY / window.innerHeight - 0.5) * 2;
        onPointerCoord(normX, normY, e.clientX, e.clientY);
      }

      // Element context inspection
      const target = e.target.closest('[data-cursor], a, button, [role="button"], .hero-silhouette-img, .service-domain-chip');
      if (target) {
        const customType = target.getAttribute('data-cursor');
        if (customType) {
          setCursorState(customType);
          setCursorText(target.getAttribute('data-cursor-text') || '');
        } else if (target.matches('.hero-silhouette-img, [data-cursor="portrait"]')) {
          setCursorState('portrait');
          setCursorText('TARGET // 01');
        } else if (target.matches('.scroll-down-circle, [data-cursor="explore"]')) {
          setCursorState('explore');
          setCursorText('EXPLORE');
        } else if (target.matches('a, button, [role="button"]')) {
          setCursorState('link');
          setCursorText('');
        }
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 240);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 60fps Spring physics for smooth reticle tracking
    const tick = () => {
      smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * 0.22;
      smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * 0.22;

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${smoothPos.current.x}px, ${smoothPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('technical-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible, onPointerCoord]);

  if (!isVisible) return null;

  return (
    <div className="technical-cursor-root" aria-hidden="true">
      {/* 1. Hardware Pinpoint Center Dot (Zero Latency) */}
      <div ref={dotRef} className="cursor-dot-layer">
        <span className={`cursor-dot ${isClicking ? 'clicking' : ''} ${cursorState === 'link' ? 'dot-accent' : ''}`} />
      </div>

      {/* 2. Spring-Damped Precision Reticle */}
      <div 
        ref={reticleRef} 
        className={`cursor-reticle-layer state-${cursorState} ${isClicking ? 'is-clicking' : ''}`}
      >
        {/* Fine technical crosshair lines */}
        <div className="crosshair-hairs">
          <span className="hair hair-v" />
          <span className="hair hair-h" />
        </div>

        {/* Framing brackets or focus ring */}
        <div className="reticle-brackets">
          <span className="bracket b-tl" />
          <span className="bracket b-tr" />
          <span className="bracket b-bl" />
          <span className="bracket b-br" />
        </div>

        {/* Contextual Technical Badge */}
        {cursorText && (
          <div className="cursor-context-badge">
            <span>{cursorText}</span>
          </div>
        )}

        {/* Click radial feedback ripple */}
        {isClicking && <span className="click-pulse-ring" />}
      </div>
    </div>
  );
}
