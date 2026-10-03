import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

// 1. PYTHON (Official Blue & Yellow Snakes)
export const PythonLogo: React.FC<LogoProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <linearGradient id="py-a" x1="18.9" y1="18.9" x2="68.2" y2="68.2" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#387EB8"/>
      <stop offset="100%" stopColor="#366994"/>
    </linearGradient>
    <linearGradient id="py-b" x1="59.8" y1="59.8" x2="109.1" y2="109.1" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#FFE873"/>
      <stop offset="100%" stopColor="#FFD43B"/>
    </linearGradient>
    <path fill="url(#py-a)" d="M63.6 2.4c-26.6 0-25 11.5-25 11.5l.1 11.9h25.4v3.6H27.8C10.7 29.4 0 39.8 0 57.2s14.8 26.6 24.9 26.6h7.4v-10.4c0-10.3 8.8-19.4 19.4-19.4h25.2c8.4 0 15.3-6.9 15.3-15.3V17.7c0-8.4-6.6-15.3-28.6-15.3zm-13.6 8.2c2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7z"/>
    <path fill="url(#py-b)" d="M64.4 125.6c26.6 0 25-11.5 25-11.5l-.1-11.9H63.9v-3.6h36.3c17.1 0 27.8-10.4 27.8-27.8s-14.8-26.6-24.9-26.6h-7.4v10.4c0 10.3-8.8 19.4-19.4 19.4H51.1c-8.4 0-15.3 6.9-15.3 15.3v31c0 8.4 6.6 15.3 28.6 15.3zm13.6-8.2c-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7 2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7z"/>
  </svg>
);

// 2. JAVA (Official Red & Blue Coffee Cup)
export const JavaLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#EA2D2E" d="M46.7 93.6c-4.9.4-12 1.6-11.9 4.3.2 3.1 7.2 4.1 11.2 4.3 12.6.7 30.7-.7 42.4-5.2-10.4 2.7-29 4.5-41.7-3.4zM44.4 80.9c-4.9.4-10.2 1.3-10.1 3.5.2 2.7 6.1 3.5 9.5 3.7 10.7.7 26.2-.3 36.1-4.2-9 2.2-24.7 3.7-35.5-3z"/>
    <path fill="#5382A1" d="M69.8 45.4c4.3 4.9 6.4 10.2 1.8 15.4-3.7 4.2-8.5 6.6-13.4 9-7.3 3.5-15.4 6.6-20.4 13.9 7-3.6 14.8-6.1 22.8-7.9 10.7-2.4 22.2-2.1 30.6-9.6 9-8.1 7.8-17.7 3.6-26.6-4.5 2-15 3.3-25 5.8zM41.5 59.9c2.7 2.5 3.7 5.7.9 8.7-2.3 2.5-5.3 3.9-8.4 5.3-4.6 2.1-9.6 4-12.7 8.5 4.4-2.2 9.2-3.8 14.2-4.8 6.7-1.4 13.9-1.3 19.1-5.9 5.6-5 4.9-11 2.3-16.5-2.8 1.2-9.3 2-15.4 4.7z"/>
    <path fill="#5382A1" d="M78.1 78.4c17.5 1.5 25.1-4.7 23.4-11.2-1.4-5.1-10.3-6.6-15.7-7.2-2.5 1.4-4.8 2.8-7 4.4 3.7.3 10.9 1.1 12.5 3.5 1.9 2.9-4.8 6.4-13.2 10.5z"/>
    <path fill="#EA2D2E" d="M60.3 3.4c6.7 7.7 1.5 15.2-3.5 21.6-4.7 6-10.6 11.2-13.4 18.7 8.7-4.6 17.5-9.8 23.9-17.6C72.8 19.3 75.1 8.9 60.3 3.4z"/>
    <path fill="#5382A1" d="M49.6 106.3c15.1 1.1 38.3.1 52.8-6.5 4.3-1.9 8.3-4.7 10.4-8.9 1-1.9 1.4-4.2 1.4-6.4 0-11-9.8-14.8-19.1-17.1 2.4 1.7 4.8 3.7 6.4 6.2 3.1 4.7 1.8 10-2.8 13.5-11.8 8.9-34.9 8.2-49.1 7.2v12z"/>
    <path fill="#EA2D2E" d="M52.8 116.8c11.9.8 28.5-.1 39.5-4.4 3.4-1.3 7.4-3.7 7.7-7.6.2-2.8-2.6-4.6-4.9-5.7-4.1 2.3-8.8 4-13.5 5-9.3 1.9-19.4 1.9-28.8 12.7z"/>
  </svg>
);

// 3. C++ (Official Blue Hexagon)
export const CppLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#00599C" d="M117.7 32.5L67.4 3.5c-2.1-1.2-4.7-1.2-6.8 0L10.3 32.5c-2.1 1.2-3.4 3.5-3.4 5.9v58.1c0 2.4 1.3 4.7 3.4 5.9l50.3 29c2.1 1.2 4.7 1.2 6.8 0l50.3-29c2.1-1.2 3.4-3.5 3.4-5.9V38.4c0-2.4-1.3-4.7-3.4-5.9z"/>
    <path fill="#004482" d="M117.7 32.5L64 63.5v63.9c1.2-.1 2.4-.5 3.4-1.1l50.3-29c2.1-1.2 3.4-3.5 3.4-5.9V38.4c0-2.4-1.3-4.7-3.4-5.9z"/>
    <path fill="#659AD2" d="M64 63.5L10.3 32.5c2.1-1.2 4.7-1.2 6.8 0l50.3 29L64 63.5z"/>
    <path fill="#FFFFFF" d="M60.5 77.2c-7.8 0-14.1-6.3-14.1-14.1s6.3-14.1 14.1-14.1c4.8 0 9.1 2.4 11.6 6.1l6.7-4.5c-4-5.6-10.6-9.2-18.3-9.2-12 0-21.7 9.7-21.7 21.7s9.7 21.7 21.7 21.7c7.7 0 14.3-3.6 18.3-9.2l-6.7-4.5c-2.5 3.7-6.8 6.1-11.6 6.1zm24.8-19.4h4.4v4.4h-4.4v4.4h-4.4v-4.4h-4.4v-4.4h4.4v-4.4h4.4v4.4zm16 0h4.4v4.4h-4.4v4.4h-4.4v-4.4h-4.4v-4.4h4.4v-4.4h4.4v4.4z"/>
  </svg>
);

// 4. JAVASCRIPT (Official Vibrant Yellow Badge)
export const JSLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#F7DF1E" d="M0 0h128v128H0z"/>
    <path fill="#000000" d="M67.3 100c0 9-5.3 14.2-13.6 14.2-7.5 0-12-4.4-14.3-8.8l8.3-5.1c1.5 2.6 3.3 4.7 6.1 4.7 2.8 0 4.5-1.4 4.5-5.1V58h9V100zm24.1 14.6c-13.2 0-21.6-7-21.6-17.5 0-9.4 6.7-15.3 16.3-19.4l3.1-1.3c4.5-1.9 6.8-3.4 6.8-6.5 0-3.3-2.6-5.5-6.6-5.5-4.8 0-7.3 2.7-9.5 6.8l-7.7-5.1c3.8-7.2 9.5-10.7 17.6-10.7 10.3 0 17.2 5.8 17.2 15.3 0 8.7-5.3 14.2-14.7 18.2l-3.2 1.4c-4.9 2.1-7.2 3.8-7.2 7.3 0 3.7 3.1 6.3 7.8 6.3 4.8 0 8.1-2.4 10.5-6.7l7.5 4.9c-3.6 6.8-9.9 9.8-18.7 9.8z"/>
  </svg>
);

// 5. TYPESCRIPT (Official Blue Badge)
export const TSLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#3178C6" d="M0 0h128v128H0z"/>
    <path fill="#FFFFFF" d="M67.6 51.5H35.3v10.5h10.5v51.8h11.3V62h10.5V51.5zm25.9 33.6c-5.7 0-9.6-3.2-10.1-7.9l-10.7 1.8c1.3 9.4 8.7 15.6 20.8 15.6 12.3 0 20.3-6.6 20.3-16.7 0-9.5-6.6-14-15.3-17.6l-3.6-1.5c-4.4-1.8-6.6-3.5-6.6-6.6 0-3.1 2.6-5.2 6.6-5.2 4.4 0 7.4 2.2 8.3 6.1l10.1-2.8c-1.8-7.9-8.4-13-18.4-13-11.4 0-18.9 6.2-18.9 15.7 0 9.2 6.2 13.8 14.9 17.4l3.7 1.5c4.7 2 7.1 3.9 7.1 7.2 0 3.7-3.2 6.1-8.2 6.1z"/>
  </svg>
);

// 6. GO / GOLANG (Official Cyan)
export const GoLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#00ADD8" d="M33.7 44.4c-1.5.3-3.1.6-4.7 1-1.2.3-2.4.6-3.5 1-1.3-1.8-2.6-3.5-3.9-5.1 3.9-1.9 8.2-3.3 12.8-4.2 1.6-.3 3.3-.6 5-.7-.8 1.9-1.6 3.9-2.3 5.9-1.1.7-2.3 1.4-3.4 2.1zm59.6 17.7c-4.4-.2-8.8 1.1-12.4 3.7-6.2 4.4-9.3 11.2-8.5 18.9.8 7.3 5.4 13.2 12.4 15.5 8.9 2.9 18.5-.6 22.8-8.5 1.5-2.8 2.3-5.9 2.5-9.1.2-4.1-1.2-7.8-3.9-10.9-3.3-3.7-7.7-6-12.9-6.6v-3zm0 29.3c-4.9 0-8.9-3.7-9.4-8.6-.5-5.3 3.1-10.1 8.4-10.9 5.3-.8 10.3 2.7 11.1 8 .7 4.9-2.7 9.7-7.6 10.5-.8.1-1.7 1-2.5 1zM28.4 62.1c-13.4.7-24 11.8-23.7 25.1.3 13.2 11.3 23.8 24.5 23.6 7.4-.1 14.1-3.6 18.4-9.6l-8.5-5.3c-2.4 3.5-6.2 5.7-10.5 5.8-7.5.2-13.8-5.6-14.3-13.1-.5-7.7 5.2-14.3 12.9-14.9 5.4-.4 10.4 2.2 13.2 6.9h-14v9.6h25.4c.5-2.1.7-4.2.7-6.4 0-12-9.6-21.7-21.6-21.7z"/>
    <path fill="#00ADD8" d="M125.4 67.8h-23.1v8.8h23.1c1.2 0 2.2-1 2.2-2.2v-4.4c0-1.2-1-2.2-2.2-2.2zM120.9 81h-14.2v8.8h14.2c1.2 0 2.2-1 2.2-2.2v-4.4c0-1.2-1-2.2-2.2-2.2zM116.5 54.7h-9.8v8.8h9.8c1.2 0 2.2-1 2.2-2.2V57c0-1.3-1-2.3-2.2-2.3z"/>
  </svg>
);

// 7. RUST (Official Orange & Cogwheel)
export const RustLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <g fill="#DEA584">
      <path d="M64 4.5l3.5 8.1 8.8-.9 1.4 8.7 8.5 2.3-.8 8.8 7.4 4.9-2.9 8.3 5.5 6.9-4.8 7.4 3.2 8.2-6.5 6 1 8.8-7.7 4.4-1.2 8.8-8.4 2.6-3.3 8.2-8.6.6-5.1 7.2-8.3-1.6-6.8 5.7-7.4-3.7-8 3.9-6.1-6.4-8.5 1.9-4.5-7.6-8.7-.2-2.7-8.4-8.4-2.2-.7-8.8-7.6-4.2 1.4-8.7-6.3-6.2 3.4-8.1-4.6-7.5 5.3-7-2.6-8.4 7.2-5.1-1.1-8.8 8.4-2.5 1.6-8.7 8.7.7 3.7-8 8.4 1.4 5.3-7 8.2 3.5 6.6-5.9 7.6 3.6 7.8-4 6.3 6.3 8.3-2.1 4.7 7.5z"/>
      <circle cx="64" cy="64" r="48" fill="#000000"/>
      <path fill="#FFFFFF" d="M42 44h18.2c8.4 0 14.1 4.9 14.1 12.3 0 5.4-3.1 9.7-8.2 11.4l9.6 16.3h-9.8l-8.6-15.1h-7.1V84H42V44zm8.2 7.2v10.3h9.6c4.2 0 6.6-2.2 6.6-5.2 0-2.9-2.4-5.1-6.6-5.1h-9.6zM78 84V44h8.2v40H78z"/>
    </g>
  </svg>
);

// 8. REACT 19 (Official Glowing Cyan Atom)
export const ReactLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <ellipse cx="64" cy="64" rx="15" ry="46" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(30 64 64)"/>
    <ellipse cx="64" cy="64" rx="15" ry="46" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(90 64 64)"/>
    <ellipse cx="64" cy="64" rx="15" ry="46" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(150 64 64)"/>
    <circle cx="64" cy="64" r="10" fill="#61DAFB"/>
  </svg>
);

// 9. DOCKER (Official Cyan Whale)
export const DockerLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#2496ED" d="M123.4 56.4c-2.8-2-8.5-3.3-13.8-1.5-.7-7.2-5.4-12.8-12.8-15.7l-4.5 3.3c3.4 3.7 5.2 8.7 4.7 13.9-3.2 1.1-7.2 3.6-9.1 7.2H5.6c-1.4 5.3-2.1 11-2.1 16.9 0 24.3 19.7 44 44 44 28.5 0 46.8-14.8 54.4-32.9 8.7-.5 18-5.3 22.5-16.7 1.4-3.5 1.5-6.8-1-8.5zM23.2 46.8h11.4v11.4H23.2V46.8zm14.2 0h11.4v11.4H37.4V46.8zm14.3 0h11.4v11.4H51.7V46.8zm14.2 0h11.4v11.4H65.9V46.8zm-28.5-14.3h11.4v11.4H37.4V32.5zm14.3 0h11.4v11.4H51.7V32.5zm14.2 0h11.4v11.4H65.9V32.5zm0-14.2h11.4v11.4H65.9V18.3z"/>
  </svg>
);

// 10. POSTGRESQL (Official Blue Elephant)
export const PostgreSQLLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#336791" d="M64 4C30.9 4 4 30.9 4 64s26.9 60 60 60 60-26.9 60-60S97.1 4 64 4zm28.6 77.3c-.6 4-2.8 7.3-6.1 9.4-4.8 3.1-11.5 3.7-18.7 1.6-4.5-1.3-9-3.8-12.7-7-3.4 3-7.5 5.2-12 6.3-5.3 1.3-10.4.7-13.8-1.5-2.8-1.8-4.7-4.7-5.3-8.1-.8-4.7.7-10.1 4.2-14.8 3.8-5.2 9.5-9.1 16-11.1-.1-1.3-.2-2.7-.2-4.1 0-8.9 3.5-17.1 9.4-22.9 6.2-6 14.8-9.4 24.1-9.2 8.7.2 16.7 3.8 22.4 10 5.4 5.9 8.2 13.9 7.8 22.4-.4 8.7-4.1 17.5-10.5 24.1-.3 1.7-.5 3.4-.6 4.9z"/>
  </svg>
);

// 11. FASTAPI (Official Teal Lightning)
export const FastAPILogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="60" fill="#009688"/>
    <path fill="#FFFFFF" d="M69.6 18.5L34.2 67.8h26.7L49.1 109.5l44.7-54.7H66.2l15.6-36.3h-12.2z"/>
  </svg>
);

// 12. QISKIT (Official IBM Purple Quantum Core)
export const QiskitLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="60" fill="#6929C4"/>
    <circle cx="64" cy="64" r="16" fill="#FFFFFF"/>
    <circle cx="34" cy="64" r="9" fill="#00F0FF"/>
    <circle cx="94" cy="64" r="9" fill="#00F0FF"/>
    <circle cx="64" cy="34" r="9" fill="#FF7EB6"/>
    <circle cx="64" cy="94" r="9" fill="#FF7EB6"/>
    <circle cx="43" cy="43" r="7" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="85" cy="85" r="7" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="85" cy="43" r="7" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="43" cy="85" r="7" fill="#FFFFFF" opacity="0.8"/>
  </svg>
);

// 13. PYTORCH (Official Flame Logo)
export const PyTorchLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#EE4C2C" d="M72.2 15.6a6.8 6.8 0 0 0-9.6 0L44.8 33.4a43.2 43.2 0 1 0 54 54l11.4-11.4-13.6-1.5 4.3-15.6-13.6 3.1 4.7-16.5-19.8-30zM64 104.4a33.6 33.6 0 1 1 23.8-57.4l-5.6 5.6a25.7 25.7 0 1 0 5.6 33.6l6.8 6.8A33.4 33.4 0 0 1 64 104.4z"/>
    <circle cx="92.4" cy="28.8" r="6.8" fill="#EE4C2C"/>
  </svg>
);

// 14. TAILWIND CSS (Official Cyan Wave)
export const TailwindLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#06B6D4" d="M64 25.6c-25.6 0-38.4 12.8-38.4 38.4 5.1-7.7 12.8-12.8 23-15.4 5.8-1.5 12-1.5 18.2-1.5 14.7 0 30.7-3.8 35.6-21.5-5.1 7.7-12.8 12.8-23 15.4-5.8 1.5-12 1.5-18.2 1.5-14.7 0-30.7 3.8-35.6 21.5 5.1-7.7 12.8-12.8 23-15.4 5.8-1.5 12-1.5 18.2-1.5 14.7 0 30.7-3.8 35.6-21.5zM25.6 64c-25.6 0-38.4 12.8-38.4 38.4 5.1-7.7 12.8-12.8 23-15.4 5.8-1.5 12-1.5 18.2-1.5 14.7 0 30.7-3.8 35.6-21.5-5.1 7.7-12.8 12.8-23 15.4-5.8 1.5-12 1.5-18.2 1.5-14.7 0-30.7 3.8-35.6 21.5 5.1-7.7 12.8-12.8 23-15.4 5.8-1.5 12-1.5 18.2-1.5 14.7 0 30.7-3.8 35.6-21.5z"/>
  </svg>
);

// 15. LINUX (Tux Penguin)
export const LinuxLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <ellipse cx="64" cy="74" rx="36" ry="42" fill="#000000"/>
    <ellipse cx="64" cy="78" rx="26" ry="32" fill="#FFFFFF"/>
    <ellipse cx="64" cy="38" rx="22" ry="24" fill="#000000"/>
    <circle cx="56" cy="32" r="4.5" fill="#FFFFFF"/>
    <circle cx="72" cy="32" r="4.5" fill="#FFFFFF"/>
    <circle cx="57" cy="32" r="2.5" fill="#000000"/>
    <circle cx="71" cy="32" r="2.5" fill="#000000"/>
    <polygon points="64 38, 54 46, 74 46" fill="#FFA500"/>
    <ellipse cx="44" cy="116" rx="14" ry="6" fill="#FFA500"/>
    <ellipse cx="84" cy="116" rx="14" ry="6" fill="#FFA500"/>
  </svg>
);

// 16. GIT (Official Orange Branch)
export const GitLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#F05032" d="M124.6 57.5L70.5 3.4a9.1 9.1 0 0 0-12.9 0l-12.8 12.8 16.3 16.3a10.8 10.8 0 0 1 13.7 13.7l15.7 15.7a10.8 10.8 0 1 1-6.5 6.2L70 54.1v34.3a10.8 10.8 0 1 1-9.1 0V53.2a10.8 10.8 0 0 1-5.9-14.2L38.8 22.8 3.4 58.2a9.1 9.1 0 0 0 0 12.9l54.1 54.1a9.1 9.1 0 0 0 12.9 0l54.2-54.2a9.1 9.1 0 0 0 0-13.5z"/>
  </svg>
);

// 17. THREE.JS (Official Triangle)
export const ThreejsLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#FFFFFF" d="M64 12L12 102h104L64 12zm0 24l36 62H28l36-62z"/>
    <polygon points="64 56, 44 92, 84 92" fill="#10B981"/>
  </svg>
);

// 18. VITE (Purple & Yellow Thunderbolt)
export const ViteLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#646CFF" d="M118.2 18.8L66.7 121.2a3.8 3.8 0 0 1-6.8.2L9.8 19c-1.4-2.7.7-6 3.7-5.7l51.5 5.5 49.3-5.7c3.1-.3 5.3 3 3.9 5.7z"/>
    <path fill="#FFD62E" d="M72.5 18.6L44.8 62.4h22.6L54 99.4l41.2-52.6H73.6l16.2-28.2-17.3z"/>
  </svg>
);

// 19. WEBRTC (Orange / Blue / Green)
export const WebRTCLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="56" fill="#10B981" opacity="0.15"/>
    <path fill="#10B981" d="M42 46a22 22 0 0 1 44 0v16H42V46z"/>
    <circle cx="64" cy="74" r="14" fill="#00ADD8"/>
    <path stroke="#10B981" strokeWidth="6" strokeLinecap="round" d="M28 64c0-19.9 16.1-36 36-36s36 16.1 36 36"/>
    <path stroke="#00ADD8" strokeWidth="6" strokeLinecap="round" d="M16 64c0-26.5 21.5-48 48-48s48 21.5 48 48"/>
  </svg>
);

// 20. TENSORFLOW (Official Orange 3D T Cube)
export const TensorFlowLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#FF6F00" d="M64 4L18 30.5v67L41 111V44.2l23-13.3v80.2l23-13.3V57.5L110 44.2V97.5l-23 13.3v13.2L110 111V30.5L64 4z"/>
  </svg>
);

// 21. MONGODB (Official Green Leaf)
export const MongoDBLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path fill="#47A248" d="M63.5 4c-3.1 7.2-28.5 38.8-28.5 61.2 0 25.1 16.8 45.4 28.5 58.8 11.7-13.4 28.5-33.7 28.5-58.8 0-22.4-25.4-54-28.5-61.2z"/>
    <path fill="#499D4A" d="M63.5 4v120c11.7-13.4 28.5-33.7 28.5-58.8 0-22.4-25.4-54-28.5-61.2z"/>
    <path fill="#FFFFFF" d="M63.5 124c-.5 0-1-.3-1.3-.7-2.6-4.5-4.2-11.4-4.2-18.3 0-15.6 7.6-26.8 10.3-30.5l.7-1 .7 1c2.7 3.7 10.3 14.9 10.3 30.5 0 6.9-1.6 13.8-4.2 18.3-.3.4-.8.7-1.3.7h-11z" opacity="0.3"/>
  </svg>
);

// 22. GSAP (Official Green Gradient)
export const GSAPLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="60" fill="#0E100F"/>
    <circle cx="64" cy="64" r="54" fill="none" stroke="#88CE02" strokeWidth="6"/>
    <text x="64" y="74" fill="#88CE02" fontSize="32" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">GSAP</text>
  </svg>
);

// 23. RAY DISTRIBUTED (Official Blue)
export const RayLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="60" fill="#028CF0"/>
    <path fill="#FFFFFF" d="M64 24l-32 56h24l-8 24 40-48H64l8-32z"/>
  </svg>
);

// 24. RUST / GENERAL SYSTEMS (Fallback C Logo)
export const CLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="58" fill="#00599C"/>
    <path fill="#FFFFFF" d="M78 42c-4-4.2-9.6-6.6-15.8-6.6-13.2 0-23.8 10.6-23.8 23.8v9.6C38.4 82 49 92.6 62.2 92.6c6.2 0 11.8-2.4 15.8-6.6l7.4 7.4c-6 6.2-14.4 9.8-23.2 9.8C43.2 103.2 28 88 28 68.8v-9.6C28 40 43.2 24.8 62.2 24.8c8.8 0 17.2 3.6 23.2 9.8L78 42z"/>
  </svg>
);

// 25. CISCO (Official Bridge Icon)
export const CiscoLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <rect width="128" height="128" rx="24" fill="#049FD9" />
    <g fill="#FFFFFF">
      <rect x="20" y="56" width="8" height="32" rx="4" />
      <rect x="36" y="44" width="8" height="44" rx="4" />
      <rect x="52" y="32" width="8" height="56" rx="4" />
      <rect x="68" y="32" width="8" height="56" rx="4" />
      <rect x="84" y="44" width="8" height="44" rx="4" />
      <rect x="100" y="56" width="8" height="32" rx="4" />
    </g>
  </svg>
);

// 26. RASPBERRY PI (Official Raspberry Red)
export const RaspberryPiLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="58" fill="#C51A4A"/>
    <circle cx="48" cy="46" r="10" fill="#FFFFFF"/>
    <circle cx="80" cy="46" r="10" fill="#FFFFFF"/>
    <circle cx="64" cy="58" r="12" fill="#FFFFFF"/>
    <circle cx="44" cy="74" r="10" fill="#FFFFFF"/>
    <circle cx="84" cy="74" r="10" fill="#FFFFFF"/>
    <circle cx="64" cy="86" r="11" fill="#FFFFFF"/>
    <path fill="#6CC04A" d="M64 16c-6 0-12 6-12 12s12 10 12 10 12-4 12-10-6-12-12-12z"/>
  </svg>
);

// 27. LEETCODE (Official Gold / White)
export const LeetCodeLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="60" fill="#262626"/>
    <path fill="#FFA116" d="M82 42.4L54.6 69.8c-2.3 2.3-6.1 2.3-8.5 0L38 61.7c-4.4-4.4-4.4-11.6 0-16 4.4-4.4 11.6-4.4 16 0l4.2 4.2 8.5-8.5-4.2-4.2c-9.1-9.1-23.9-9.1-33 0s-9.1 23.9 0 33l8.1 8.1c6.8 6.8 17.8 6.8 24.6 0L89 50.8l-7-8.4z"/>
    <path fill="#FFFFFF" d="M96 74H58v10h38c2.8 0 5-2.2 5-5s-2.2-5-5-5z"/>
  </svg>
);

// 28. CRYPTOGRAPHY / SECURITY SHIELD (Emerald Shield)
export const SecurityShieldLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="60" fill="#064E3B"/>
    <path fill="#10B981" d="M64 22L32 36v34c0 24.8 13.6 42.3 32 48 18.4-5.7 32-23.2 32-48V36L64 22z"/>
    <circle cx="64" cy="58" r="8" fill="#FFFFFF"/>
    <rect x="58" y="58" width="12" height="16" rx="2" fill="#FFFFFF"/>
  </svg>
);

// 29. APPLE MPS / METAL (Silicon Hardware)
export const AppleMPSLogo: React.FC<LogoProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="60" fill="#1C1C1E"/>
    <path fill="#A2AAAD" d="M79.2 64.6c-.1-11.4 9.3-16.9 9.8-17.2-5.3-7.8-13.6-8.8-16.6-9-7.1-.7-13.8 4.2-17.4 4.2-3.6 0-9.1-4.1-15-4-7.7.1-14.8 4.5-18.8 11.4-8 13.8-2 34.3 5.7 45.5 3.8 5.5 8.3 11.6 14.3 11.4 5.7-.2 7.9-3.7 14.8-3.7 6.9 0 8.8 3.7 14.8 3.6 6.1-.1 10-5.5 13.7-11 4.4-6.3 6.1-12.5 6.2-12.8-.2-.1-11.5-4.4-11.5-18.4zM71.4 33.2c3.1-3.8 5.2-9.1 4.6-14.4-4.5.2-9.9 3-13.1 6.8-2.8 3.2-5.3 8.6-4.6 13.8 5 .4 10-2.4 13.1-6.2z"/>
  </svg>
);

