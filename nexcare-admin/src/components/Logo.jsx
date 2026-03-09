import React from 'react';

export const Logo = ({ className, size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* N shape nodes and connections */}
      <circle cx="20" cy="80" r="10" fill="#9333ea" />
      <circle cx="20" cy="50" r="10" fill="#a855f7" />
      <circle cx="20" cy="20" r="10" fill="#d8b4fe" />
      
      <circle cx="50" cy="50" r="10" fill="#e9d5ff" />
      
      <circle cx="80" cy="20" r="10" fill="#d8b4fe" />
      <circle cx="80" cy="80" r="10" fill="#e9d5ff" />
      
      {/* Connector lines */}
      <path d="M20 70 L20 60" stroke="#9333ea" strokeWidth="6" strokeLinecap="round" />
      <path d="M20 40 L20 30" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
      
      <path d="M28 50 L42 50" stroke="#c084fc" strokeWidth="6" strokeLinecap="round" />
      <path d="M58 50 L72 30" stroke="#d8b4fe" strokeWidth="6" strokeLinecap="round" />
      
      <path d="M80 30 L80 70" stroke="#d8b4fe" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
};
