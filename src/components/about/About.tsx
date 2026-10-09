import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textContent = [
  { word: "I", highlight: false },
  { word: "AM", highlight: false },
  { word: "A", highlight: false },
  { word: "THIRD-YEAR", highlight: false },
  { word: "COMPUTER", highlight: false },
  { word: "SCIENCE", highlight: false },
  { word: "STUDENT,", highlight: false },
  { word: "MULTIDISCIPLINARY", highlight: true },
  { word: "ENGINEER,", highlight: true },
  { word: "BUILDER,", highlight: false },
  { word: "DESIGNER,", highlight: false },
  { word: "PROBLEM", highlight: true },
  { word: "SOLVER", highlight: true },
  { word: "AND", highlight: false },
  { word: "TECHNOLOGY", highlight: true },
  { word: "EXPLORER.", highlight: true },
  { word: "I", highlight: false },
  { word: "DO", highlight: false },
  { word: "NOT", highlight: false },
  { word: "RESTRICT", highlight: false },
  { word: "MYSELF", highlight: false },
  { word: "TO", highlight: false },
  { word: "A", highlight: false },
  { word: "SINGLE", highlight: false },
  { word: "AREA", highlight: false },
  { word: "OF", highlight: false },
  { word: "COMPUTER", highlight: false },
  { word: "SCIENCE.", highlight: false },
  { word: "MY", highlight: false },
  { word: "BROADER", highlight: false },
  { word: "IDENTITY", highlight: false },
  { word: "IS", highlight: false },
  { word: "A", highlight: false },
  { word: "MULTIDISCIPLINARY", highlight: true },
  { word: "COMPUTER", highlight: true },
  { word: "SCIENCE", highlight: true },
  { word: "BUILDER.", highlight: true },
];

export default function About() {
  const containerRef = React.useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Awwwards 3D Perspective Text Reveal & Scroll Line
      gsap.set('.about-word', { opacity: 0.08, y: 50, rotateX: -40, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          end: 'bottom 85%',
          scrub: 1.2, // Ultra-smooth buttery scrub
        }
      });

      tl.to('.manifesto-progress', {
        scaleY: 1,
        ease: 'none',
        duration: 1
      }, 0);

      tl.to('.about-word', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        color: (i, target) => target.dataset.highlight === 'true' ? '#10b981' : '#000000',
        stagger: 0.03,
        ease: 'power3.out',
        duration: 1
      }, 0);

      // 2. Infinite rotating badge
      gsap.to('.awwwards-badge', {
        rotate: 360,
        duration: 25,
        repeat: -1,
        ease: 'none'
      });

      // 3. Parallax Watermark
      gsap.to('.awwwards-watermark', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: '-20vh',
        ease: 'none'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="portfolio-section-anchor relative w-full bg-[#ffffff] pt-24 md:pt-32 pb-8 px-8 md:px-16 lg:px-20 flex flex-col overflow-hidden perspective-[1000px]"
    >
      {/* 1. Brutalist Editorial Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
      ></div>

      {/* 2. Massive Awwwards Parallax Stroke Watermark */}
      <div className="awwwards-watermark absolute top-[10%] right-[-2vw] pointer-events-none select-none z-0 opacity-[0.04]">
        <h1 className="text-[28vw] md:text-[22vw] lg:text-[18vw] font-black leading-none tracking-tight select-none" style={{ writingMode: 'vertical-rl', WebkitTextStroke: '2px black', color: 'transparent' }}>
          MANIFESTO
        </h1>
      </div>

      {/* 3. Decorative Architectural Corner Crosshairs */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black/40 pointer-events-none"></div>
      <div className="absolute top-8 right-8 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-black/40 pointer-events-none"></div>
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-black/40 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black/40 pointer-events-none"></div>

      {/* 4. Awwwards Rotating Typographic Badge (Full 360-degree continuous loop) */}
      <div className="absolute top-28 right-8 lg:right-16 z-20 pointer-events-none hidden md:block">
        <div className="awwwards-badge relative w-36 h-36 opacity-85">
          <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible">
            <path id="circlePath" d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="transparent" />
            <text className="text-[7.2px] font-mono tracking-[0.08em] fill-black font-semibold uppercase">
              <textPath href="#circlePath" textLength="263" lengthAdjust="spacing">
                PONNADA JAGADISH KUMAR • PONNADA JAGADISH KUMAR •
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
        </div>
      </div>

      {/* 4.5. Dynamic Manifesto Scroll Line */}
      <div className="absolute left-8 lg:left-12 top-36 md:top-48 bottom-32 w-[1px] bg-black/10 hidden md:block z-0">
        <div className="manifesto-progress w-full bg-[#10b981] origin-top h-full scale-y-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
      </div>
      <div className="absolute left-10 lg:left-14 top-36 md:top-48 text-[9px] font-mono text-black/40 rotate-90 origin-left hidden md:block whitespace-nowrap tracking-widest">
        [ SYS.REQ // MANIFESTO_01 ]
      </div>

      {/*
        5. The Core Manifesto Text - Perfectly Symmetrical Top & Bottom Spacing
      */}
      <h2 className="font-sans font-bold leading-[0.88] tracking-[-0.035em] uppercase relative z-10 text-[3.6rem] sm:text-[4.6rem] md:text-[5.8rem] lg:text-[7.2rem] max-w-[56%] pt-12 md:pt-16 pb-12 md:pb-16 md:pl-8 lg:pl-12">
        {textContent.map((item, i) => (
          <span
            key={i}
            id={i === 35 ? "manifesto-computer-science" : undefined}
            data-highlight={item.highlight}
            style={item.highlight ? {
              fontFamily: "'Caveat', cursive",
              fontStyle: 'normal',
              fontWeight: 700
            } : {}}
            className={`about-word inline-block mr-[0.2em] ${i === textContent.length - 1 ? 'mb-0' : 'mb-2'} text-[#e5e7eb] origin-bottom ${
              item.highlight
                ? 'font-normal tracking-normal normal-case not-italic drop-shadow-sm z-20 relative'
                : 'z-10 relative'
            }`}
          >
            {item.word}
          </span>
        ))}
      </h2>

      {/* 5.5 Symmetrical Bottom Spacer: Matches the exact measurement of the top gap */}
      <div className="w-full h-24 md:h-32 pointer-events-none select-none"></div>

      {/* 6. Structured Details Footer placed in natural flow right after the bottom gap */}
      <div className="relative w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t-[1.5px] border-black/10 pt-6 pb-2 z-10 gap-8">
        <div className="text-[0.65rem] font-mono uppercase tracking-widest leading-relaxed text-gray-500">
          <span className="block mb-1 text-black font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full inline-block animate-pulse"></span>
            LOCATION
          </span>
          VIZIANAGARAM, INDIA
        </div>

        <div className="text-[0.65rem] font-mono uppercase tracking-widest leading-relaxed text-left md:text-center text-gray-500">
          <span className="block mb-1 text-black font-bold">EDUCATION</span>
          LENDI INSTITUTE OF ENGINEERING & TECH<br/>
          B.TECH CSE
        </div>

        <div className="text-[0.65rem] font-mono uppercase tracking-widest leading-relaxed text-left md:text-right text-gray-500">
          <span className="block mb-1 text-black font-bold">AGE</span>
          NINETEEN (19)
        </div>
      </div>
    </section>
  );
}
