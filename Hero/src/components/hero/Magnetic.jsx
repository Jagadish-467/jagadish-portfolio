import React, { useRef, useState, useCallback } from 'react';

/**
 * Restrained Magnetic Wrapper
 * - Pulls subtly toward cursor (max 8–14px)
 * - Spring-like cubic-bezier release
 * - Disabled on touch devices and reduced motion
 */
export default function Magnetic({ children, strength = 12, className = '', style = {} }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distFromCenterX = e.clientX - centerX;
    const distFromCenterY = e.clientY - centerY;

    // Constrain pull within max distance threshold
    const maxRadius = Math.max(rect.width, rect.height) * 0.9;
    const distance = Math.hypot(distFromCenterX, distFromCenterY);

    if (distance < maxRadius) {
      const power = (1 - distance / maxRadius);
      const moveX = (distFromCenterX / (rect.width / 2)) * strength * power;
      const moveY = (distFromCenterY / (rect.height / 2)) * strength * power;
      setOffset({ x: moveX, y: moveY });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        ...style,
        transform: `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`,
        transition: offset.x === 0 
          ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
          : 'transform 0.12s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
