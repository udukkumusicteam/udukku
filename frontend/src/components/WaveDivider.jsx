import React from 'react';

/**
 * Wave divider used to transition the orange hero into the next section.
 * `fill` should match the background color of the section directly below it.
 *  - cream sections → #F5F0E5
 *  - white sections → #FFFFFF
 */
export const WaveDivider = ({ fill = '#F5F0E5', className = '' }) => (
  <svg
    aria-hidden="true"
    data-testid="hero-wave-divider"
    className={`relative block w-full h-[60px] sm:h-[80px] md:h-[100px] -mb-px ${className}`}
    viewBox="0 0 1440 110"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0,38
         C 240,78 460,82 700,55
         C 940,28 1180,22 1440,48
         L 1440,110 L 0,110 Z"
      fill={fill}
    />
  </svg>
);

export default WaveDivider;
