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
 *
 * Sizing modes:
 *   - `width`  → fixes the rendered width (height auto). Best for cross-fading
 *                between the two variants since their aspect ratios differ.
 *   - `size`   → fallback: fixes height. The cream variant is scaled to 1.5×
 *                so its wordmark visually matches the orange variant.
 *
 * Variants:
 *   - 'light' → cream logo, used on dark/orange backgrounds (hero, footer)
 *   - 'dark'  → orange logo, used on light/cream/white backgrounds
 */
export const Logo = ({
  variant = 'light',
  className = '',
  size,
  width,
  style = {},
}) => {
  const src = variant === 'dark' ? LOGO_ORANGE : LOGO_CREAM;
  const sizeStyle =
    width != null
      ? { width, height: 'auto' }
      : {
          height:
            variant === 'light'
              ? Math.round((size ?? 32) * 1.5)
              : size ?? 32,
          width: 'auto',
        };
  return (
    <img
      src={src}
      alt="udukku"
      data-testid="brand-logo"
      className={`select-none block ${className}`}
      style={{ ...sizeStyle, ...style }}
      draggable={false}
    />
  );
};

export default Logo;
