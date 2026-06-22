import React from 'react';

// Inline SVG wordmark – soft hand-set look for "udukku"
export const Logo = ({ color = '#FFFFFF', className = '', size = 28 }) => (
  <div
    className={`flex items-center gap-2 select-none ${className}`}
    data-testid="brand-logo"
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="16" cy="11" rx="9" ry="4" stroke={color} strokeWidth="1.6" />
      <path
        d="M7 11v10c0 2.2 4 4 9 4s9-1.8 9-4V11"
        stroke={color}
        strokeWidth="1.6"
      />
      <path
        d="M11 13c1 4 9 4 10 0"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.6"
      />
    </svg>
    <span
      style={{ color, fontFamily: 'Hanken Grotesk' }}
      className="text-2xl font-semibold tracking-tight lowercase"
    >
      udukku
    </span>
  </div>
);

export default Logo;
