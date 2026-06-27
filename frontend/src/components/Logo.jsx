import React from 'react';

// Official Udukku brand assets (transparent, tightly-cropped SVGs)
const LOGO_ORANGE = '/logo-orange.svg';
const LOGO_CREAM = '/logo-cream.svg';

/**
 * Renders the Udukku wordmark as a transparent SVG.
 * `variant`:
 *   - 'light' → cream logo, used on dark/orange backgrounds (hero, footer)
 *   - 'dark'  → orange logo, used on light/cream/white backgrounds
 */
/**
 * Renders the Udukku wordmark as a transparent SVG.
 * `variant`:
 *   - 'light' → cream logo, used on dark/orange backgrounds (hero, footer)
 *   - 'dark'  → orange logo, used on light/cream/white backgrounds
 *
 * The cream variant's artwork is naturally taller relative to its wordmark,
 * so we scale it up to match the orange variant's perceived size at the
 * same nominal `size`.
 */
export const Logo = ({ variant = 'light', className = '', size = 32 }) => {
  const src = variant === 'dark' ? LOGO_ORANGE : LOGO_CREAM;
  const effectiveSize = variant === 'light' ? Math.round(size * 1.5) : size;
  return (
    <img
      src={src}
      alt="udukku"
      data-testid="brand-logo"
      className={`select-none block ${className}`}
      style={{ height: effectiveSize, width: 'auto' }}
      draggable={false}
    />
  );
};

export default Logo;
