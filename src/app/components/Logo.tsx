import React from 'react';

const OriginXLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="orbit1" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="orbit2" x1="85" y1="15" x2="15" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#bae6fd" />
        <stop offset="1" stopColor="#1e40af" />
      </linearGradient>
      <radialGradient id="coreGlow" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0ea5e9" stopOpacity="0.4" />
        <stop offset="0.5" stopColor="#0284c7" stopOpacity="0.1" />
        <stop offset="1" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Subtle background glow */}
    <circle cx="50" cy="50" r="35" fill="url(#coreGlow)" />
    
    {/* Orbit 1 (Top-Left to Bottom-Right ellipse) */}
    <ellipse cx="50" cy="50" rx="38" ry="6" transform="rotate(45 50 50)" stroke="url(#orbit1)" strokeWidth="3" />
    
    {/* Orbit 2 (Top-Right to Bottom-Left ellipse) */}
    <ellipse cx="50" cy="50" rx="38" ry="6" transform="rotate(-45 50 50)" stroke="url(#orbit2)" strokeWidth="3" />
    
    {/* The Star Core */}
    <path d="M50 32 C50 48 48 50 32 50 C48 50 50 52 50 68 C50 52 52 50 68 50 C52 50 50 48 50 32 Z" fill="#ffffff" />
    <circle cx="50" cy="50" r="3" fill="#bae6fd" />
  </svg>
);

export default OriginXLogo;
