import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

// --------------------------------------------------------
// MAGNETIC BUTTON COMPONENT (Stretchable / Pull effect)
// --------------------------------------------------------
const Magnetic = ({ children, strength = 40 }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();

    // Calculate distance from center of the element
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(ref.current, {
      x: (x / width) * strength,
      y: (y / height) * strength,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return React.cloneElement(children, {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  });
};

// --------------------------------------------------------
// SVG ICONS
// --------------------------------------------------------
const GithubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const CodeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

// --------------------------------------------------------
// MAIN HERO COMPONENT
// --------------------------------------------------------
export default function Hero({ isLoaded }) {
  const containerRef = useRef(null);

  // Load animation effect
  useEffect(() => {
    if (!isLoaded) return;

    let ctx = gsap.context(() => {
      const loadTl = gsap.timeline();

      // Reset states
      gsap.set(".h-image-wrap", { height: "0%" });
      gsap.set(".h-image", {
        scale: 1.4,
        filter: "grayscale(100%) contrast(1.08)",
      });
      gsap.set(".h-char", { yPercent: 120, rotateZ: 3, opacity: 0 });
      gsap.set(".h-fade", { opacity: 0, y: 15 });
      gsap.set(".h-image-frame", { opacity: 0 });

      loadTl
        .to(".h-image-wrap", {
          height: "100%",
          duration: 2.2,
          ease: "power4.inOut",
        })
        .to(
          ".h-image",
          {
            scale: 1,
            filter: "grayscale(100%) contrast(1.08)",
            duration: 2.2,
            ease: "power3.out",
          },
          "-=1.8",
        )
        .to(
          ".h-char",
          {
            yPercent: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 1.2,
            stagger: 0.03,
            ease: "power4.out",
          },
          "-=1.5",
        )
        .to(
          ".h-fade",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.8",
        )
        .add(() => {
          // Floating movement isolated on h-card-float wrapper
          gsap.to(".h-card-float", {
            y: -12,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // --------------------------------------------------------
  // EFFECT 2: PINNED PORTRAIT TRANSITION
  // --------------------------------------------------------
  useEffect(() => {
    if (!isLoaded) return;

    let removeWindowListeners = () => {};
    let ctx = gsap.context(() => {
      // 1. Fade out the Hero text as we scroll away
      gsap.to([".h-title-row", ".h-footer"], {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        y: -50,
        ease: "none",
      });

      // 2. The Master Pinned Portrait
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          endTrigger: "#about",
          end: "bottom 90%",
          scrub: true,
          pin: ".h-image-container",
          pinSpacing: false,
          onLeave: () => {
            const container = document.querySelector(".h-image-container");
            const frame = document.querySelector(".h-image-frame");
            if (container) {
              container.style.setProperty("display", "none", "important");
              container.style.setProperty("opacity", "0", "important");
              container.style.setProperty("visibility", "hidden", "important");
              container.style.setProperty(
                "pointer-events",
                "none",
                "important",
              );
            }
            if (frame) {
              frame.style.setProperty("display", "none", "important");
              frame.style.setProperty("opacity", "0", "important");
            }
          },
          onEnterBack: () => {
            const hackEl = document.getElementById("hackathons");
            if (
              hackEl &&
              hackEl.getBoundingClientRect().top < window.innerHeight
            ) {
              return; // Strict guard: never make visible if Hackathons is on screen!
            }
            const container = document.querySelector(".h-image-container");
            const frame = document.querySelector(".h-image-frame");
            if (container) {
              container.style.removeProperty("display");
              container.style.removeProperty("visibility");
              container.style.removeProperty("pointer-events");
            }
            if (frame) {
              frame.style.removeProperty("display");
            }
          },
          onLeaveBack: () => {
            const container = document.querySelector(".h-image-container");
            const frame = document.querySelector(".h-image-frame");
            if (container) {
              container.style.removeProperty("display");
              container.style.removeProperty("visibility");
              container.style.removeProperty("pointer-events");
            }
            if (frame) {
              frame.style.removeProperty("display");
            }
          },
        },
      });

      // Travel to the right side of the screen while staying at exact 1x scale!
      tl.to(
        ".h-image-container",
        {
          x: "30vw",
          y: "2vh",
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );

      // Smoothly transition image from black & white in Hero to full color in About!
      tl.to(
        ".h-image",
        {
          filter: "grayscale(0%) contrast(1)",
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );

      // Snap the glowing neon frame into place once the image reaches the final About position
      tl.to(
        ".h-image-frame",
        {
          opacity: 0.95,
          duration: 0.35,
          ease: "power2.out",
        },
        0.85,
      );

      // Hold phase: keeps image pinned while user reads about text
      tl.to(".h-image-container", { duration: 2.2 });

      // Exit phase: smoothly fade & scale out BEFORE leaving About into Hackathons!
      tl.to(".h-image-container", {
        opacity: 0,
        scale: 0.94,
        duration: 0.6,
        ease: "power2.in",
      });

      // Rock-solid continuous scroll guard: unconditionally hide hero image if Hackathons is in or near viewport
      const handleWindowScroll = () => {
        const hackEl = document.getElementById("hackathons");
        const container = document.querySelector(".h-image-container");
        const frame = document.querySelector(".h-image-frame");
        if (!hackEl || !container) return;

        const rect = hackEl.getBoundingClientRect();
        // If the top of Hackathons is within 150px of entering the viewport, or already in view:
        if (rect.top <= window.innerHeight + 150) {
          container.style.setProperty("display", "none", "important");
          container.style.setProperty("opacity", "0", "important");
          container.style.setProperty("visibility", "hidden", "important");
          container.style.setProperty("pointer-events", "none", "important");
          if (frame) {
            frame.style.setProperty("display", "none", "important");
            frame.style.setProperty("opacity", "0", "important");
          }
        } else {
          container.style.removeProperty("display");
          container.style.removeProperty("opacity");
          container.style.removeProperty("visibility");
          container.style.removeProperty("pointer-events");
          if (frame) {
            frame.style.removeProperty("display");
            frame.style.removeProperty("opacity");
          }
        }
      };

      window.addEventListener("scroll", handleWindowScroll, { passive: true });
      window.addEventListener("resize", handleWindowScroll);
      handleWindowScroll(); // Initial check

      removeWindowListeners = () => {
        window.removeEventListener("scroll", handleWindowScroll);
        window.removeEventListener("resize", handleWindowScroll);
      };
    }, containerRef);

    return () => {
      removeWindowListeners();
      ctx.revert();
    };
  }, [isLoaded]);

  // Subtle 2D Parallax on text ONLY (No 3D on image)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Reduced the multiplier from 40 to 12 for an ultra-subtle, minimal shift
    const xOffset = (clientX / innerWidth - 0.5) * 12;
    const yOffset = (clientY / innerHeight - 0.5) * 12;

    // Move text layers slightly in opposite directions to mouse
    gsap.to(".h-title-mid", {
      x: xOffset * -0.5,
      y: yOffset * -0.5,
      duration: 2,
      ease: "power3.out",
    });
    gsap.to(".h-title-front", {
      x: xOffset * -1,
      y: yOffset * -1,
      duration: 2,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    // Reset positions
    gsap.to(".h-title-mid", { x: 0, y: 0, duration: 1.5, ease: "power3.out" });
    gsap.to(".h-title-front", {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
    });
  };

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const rotateX = -(y / (rect.height / 2)) * 7;
    const rotateY = (x / (rect.width / 2)) * 7;
    gsap.to(".h-card-stage", {
      rotateX,
      rotateY,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000,
      overwrite: "auto",
    });
  };

  const handleImageEnter = () => {
    gsap.to(".h-card-stage", {
      scale: 1.04,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleImageLeave = () => {
    gsap.to(".h-card-stage", {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="h-char-wrap">
        <span className="h-char">{char === " " ? "\u00A0" : char}</span>
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="h-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Massive Awwwards Parallax Stroke Watermark on the Left */}
      <div className="hero-watermark absolute top-[8%] left-[-2vw] pointer-events-none select-none z-0 opacity-[0.045]">
        <h1
          className="text-[28vw] md:text-[22vw] lg:text-[18vw] font-black leading-none tracking-tight select-none"
          style={{
            writingMode: "vertical-rl",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.75)",
            color: "transparent",
          }}
        >
          HERO
        </h1>
      </div>

      {/* 2. Left Typographic Awwwards Rotating Badge */}
      <div className="absolute top-24 left-8 lg:left-14 z-20 pointer-events-none hidden md:block">
        <div className="relative w-36 h-36 opacity-75">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full overflow-visible animate-spin"
            style={{ animationDuration: "28s" }}
          >
            <path
              id="heroCirclePath"
              d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
              fill="transparent"
            />
            <text className="text-[7.2px] font-mono tracking-[0.08em] fill-white/80 font-semibold uppercase">
              <textPath
                href="#heroCirclePath"
                textLength="263"
                lengthAdjust="spacing"
              >
                • 00 PROTOCOL • JAGADISH KUMAR • HERO SEQUENCE
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
        </div>
      </div>

      {/* 3. Decorative Architectural Corner Crosshairs */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-white/20 pointer-events-none z-10"></div>
      <div className="absolute top-8 right-8 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-white/20 pointer-events-none z-10"></div>
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-white/20 pointer-events-none z-10"></div>
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-white/20 pointer-events-none z-10"></div>

      {/* Main Centerpiece */}
      <div className="h-centerpiece pointer-events-none">
        <div className="h-title-row h-title-back">
          <h1 className="h-title h-stroke">{splitText("PONNADA")}</h1>
        </div>

        <div
          className="h-image-container pointer-events-auto"
          onMouseEnter={handleImageEnter}
          onMouseLeave={handleImageLeave}
          onMouseMove={handleCardMouseMove}
        >
          <div className="h-card-float">
            <div className="h-card-stage">
              {/* Glowing neon green frame rigidly surrounding the card with corner accents */}
              <div className="h-image-frame opacity-0">
                <span className="h-frame-corner h-frame-tl"></span>
                <span className="h-frame-corner h-frame-tr"></span>
                <span className="h-frame-corner h-frame-bl"></span>
                <span className="h-frame-corner h-frame-br"></span>
              </div>
              <div className="h-image-wrap relative z-10">
                <img
                  src="/jagadish_cinematic_hero.jpg"
                  alt="Jagadish"
                  className="h-image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-title-row h-title-mid">
          <h1 className="h-title h-solid">{splitText("JAGADISH")}</h1>
        </div>

        <div className="h-title-row h-title-front">
          <h1 className="h-title h-italic">{splitText("KUMAR")}</h1>
        </div>
      </div>

      {/* Bottom Editorial Grid */}
      <div className="h-footer h-footer-center pointer-events-none">
        <div className="h-scroll-wrapper h-fade">
          <span className="h-scroll-text">DISCOVER</span>
          <div className="h-scroll-indicator">
            <div className="h-scroll-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
