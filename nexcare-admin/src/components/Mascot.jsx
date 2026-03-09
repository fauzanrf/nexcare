import React from 'react';

export const Mascot = ({ className, size = 150 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="purpleGradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c084fc" />
          <stop offset="1" stopColor="#7e22ce" />
        </linearGradient>
      </defs>
      {/* Body */}
      <path d="M100 20 C60 20 30 60 30 110 C30 160 60 190 100 190 C140 190 170 160 170 110 C170 60 140 20 100 20 Z" fill="url(#purpleGradient)" />
      
      {/* Eyes */}
      <ellipse cx="75" cy="90" rx="15" ry="20" fill="white" />
      <circle cx="75" cy="90" r="8" fill="#1f2937" />
      <circle cx="78" cy="85" r="3" fill="white" />

      <ellipse cx="125" cy="90" rx="15" ry="20" fill="white" />
      <circle cx="125" cy="90" r="8" fill="#1f2937" />
      <circle cx="128" cy="85" r="3" fill="white" />

      {/* Mouth */}
      <path d="M85 125 Q100 140 115 125" stroke="#4c1d95" strokeWidth="5" strokeLinecap="round" />
      
      {/* Hands */}
      <path d="M35 120 Q10 130 30 150" stroke="url(#purpleGradient)" strokeWidth="15" strokeLinecap="round" />
      <path d="M165 120 Q190 130 170 150" stroke="url(#purpleGradient)" strokeWidth="15" strokeLinecap="round" />
      
      {/* Hair */}
      <path d="M90 20 Q100 5 110 20" fill="#a855f7" />
    </svg>
  );
};
