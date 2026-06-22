import React from 'react';

// Deterministic, lightweight floating particles. Used inside hero sections
// to add a subtle magical drift without affecting layout.
const PARTICLES = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: `${(i * 53 + 11) % 100}%`,
  top: `${(i * 37 + 7) % 100}%`,
  size: 3 + ((i * 13) % 6),
  delay: (i % 9) * 0.7,
  duration: 10 + (i % 6),
  opacity: 0.16 + ((i % 5) * 0.05),
}));

export const FloatingParticles = ({ tint = 'rgba(255, 240, 220, 0.95)' }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    {PARTICLES.map((p) => (
      <span
        key={p.id}
        className="absolute rounded-full blur-[1px]"
        style={{
          left: p.left,
          top: p.top,
          width: p.size,
          height: p.size,
          opacity: p.opacity,
          background: tint,
          animation: `udukku-float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
        }}
      />
    ))}
  </div>
);

export default FloatingParticles;
