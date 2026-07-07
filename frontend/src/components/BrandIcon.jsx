import React from 'react';

/**
 * Udukku brand icon — the hourglass / damru mark.
 * Rendered as a CSS-mask so it always inherits the surrounding text color
 * via `currentColor`. Drop in anywhere a small lucide icon would go.
 */
export const BrandIcon = ({ className = '', size = 14, style = {} }) => (
  <span
    aria-hidden="true"
    data-testid="brand-icon"
    className={`inline-block shrink-0 ${className}`}
    style={{
      width: size,
      height: size,
      backgroundColor: 'currentColor',
      maskImage: 'url(/assets/icons/brand-icon.png)',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      maskSize: 'contain',
      WebkitMaskImage: 'url(/assets/icons/brand-icon.png)',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      WebkitMaskSize: 'contain',
      ...style,
    }}
  />
);

export default BrandIcon;
