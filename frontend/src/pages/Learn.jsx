import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Music,
  Mic,
  Drum,
  Wind as WindIcon,
  Piano,
  Clock,
  Home as HomeIcon,
  UserCheck,
} from 'lucide-react';
import WaveDivider from '../components/WaveDivider';

/* ---------------------------------- Data ---------------------------------- */

const LEARN_STATS = [
  { num: '8+', label: 'Instruments' },
  { num: '15+', label: 'Mentors' },
  { num: '500+', label: 'Students' },
];

const CATEGORIES = [
  {
    id: 'strings',
    name: 'Strings',
    icon: Music,
    image:
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1800&q=80',
    note:
      'Six strings, four, or one. Find the voice that resonates with yours.',
    sub: [
      {
        name: 'Guitar',
        image:
          'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Violin',
        image:
          'https://images.unsplash.com/photo-1567619822659-2094d3ebef04?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Sitar',
        image:
          'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/6csi50ns_DSC05863%20%281%29.jpg',
      },
      {
        name: 'Ukulele',
        image:
          'https://images.unsplash.com/photo-1535359056830-d4badde79747?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 'vocals',
    name: 'Vocals',
    icon: Mic,
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1800&q=80',
    note:
      'The most personal instrument of all. Your breath, gently shaped into sound.',
    sub: [
      {
        name: 'Hindustani',
        image:
          'https://images.unsplash.com/photo-1547357812-4a336d835928?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Carnatic',
        image:
          'https://images.unsplash.com/photo-1566913485242-694e995731b4?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Western',
        image:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Playback',
        image:
          'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 'percussion',
    name: 'Percussion',
    icon: Drum,
    image:
      'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/w74xnqq6_DSC05418%20%281%29.jpg',
    note: 'The pulse that holds every song together. Learn to listen, then play.',
    sub: [
      {
        name: 'Tabla',
        image:
          'https://images.unsplash.com/photo-1524230659092-07f99a75c013?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Drums',
        image:
          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Cajon',
        image:
          'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Mridangam',
        image:
          'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 'wind',
    name: 'Wind',
    icon: WindIcon,
    image:
      'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/6mwlqdin_IMG_3251.jpg',
    note: 'Air becomes a melody. One steady breath at a time.',
    sub: [
      {
        name: 'Flute / Bansuri',
        image:
          'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/iqyui4mw_c3d6cce6-82d4-430c-a2d1-4075625e9fc6.JPG',
      },
      {
        name: 'Saxophone',
        image:
          'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Harmonica',
        image:
          'https://images.unsplash.com/photo-1488376986648-2512dfc6f736?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Shehnai',
        image:
          'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 'keys',
    name: 'Keys',
    icon: Piano,
    image:
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1800&q=80',
    note:
      'Eighty eight keys, infinite stories. The gentle way music begins for many.',
    sub: [
      {
        name: 'Piano',
        image:
          'https://images.unsplash.com/photo-1561447920-aa5c68129cff?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Harmonium',
        image:
          'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/6mwlqdin_IMG_3251.jpg',
      },
      {
        name: 'Keyboard',
        image:
          'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Music Theory',
        image:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
];

const EXPERIENCE = [
  {
    icon: Clock,
    title: 'Flexible',
    body: 'Pick a time that fits inside your week. No rigid timetables.',
  },
  {
    icon: HomeIcon,
    title: 'Convenient',
    body: 'Step into our space, or stay home. Online or in person, both are gentle.',
  },
  {
    icon: UserCheck,
    title: 'Tailored Instruction',
    body: 'A mentor matched to you, who shapes each lesson around your pace.',
  },
];

/* ------------------------------ Components -------------------------------- */

const PARTICLES = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: `${(i * 53) % 100}%`,
  top: `${(i * 37) % 100}%`,
  size: 4 + ((i * 13) % 8),
  delay: (i % 9) * 0.7,
  duration: 9 + (i % 6),
  opacity: 0.18 + ((i % 5) * 0.06),
}));

const FloatingParticles = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    {PARTICLES.map((p) => (
      <span
        key={p.id}
        className="absolute rounded-full bg-white blur-[1px]"
        style={{
          left: p.left,
          top: p.top,
          width: p.size,
          height: p.size,
          opacity: p.opacity,
          animation: `udukku-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
        }}
      />
    ))}
  </div>
);

const SubCard = ({ item, index }) => (
  <div
    data-testid={`sub-card-${item.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
    className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-brown-dark/10 bg-cream"
    style={{ animation: `udukku-rise 0.7s ease ${0.05 * index}s both` }}
  >
    <img
      src={item.image}
      alt={item.name}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 sepia-soft"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/85 via-brown-dark/25 to-transparent" />
    <div className="absolute inset-x-4 bottom-3 flex items-center justify-between">
      <span className="text-white text-sm md:text-base font-medium tracking-wide drop-shadow">
        {item.name}
      </span>
      <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500 text-white/90">
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </div>
    <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      style={{
        boxShadow: '0 0 60px 0 rgba(232,136,58,0.45) inset',
      }}
    />
  </div>
);

const CategoryBlock = ({ category, index }) => {
  const Icon = category.icon;
  const flip = index % 2 === 1;
  return (
    <article
      data-testid={`category-${category.id}`}
      className="relative"
    >
      {/* Feature hero card */}
      <div
        className={`relative overflow-hidden rounded-[28px] border border-brown-dark/10 shadow-[0_30px_60px_-30px_rgba(168,61,20,0.35)] ${
          flip ? 'lg:ml-auto' : ''
        }`}
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover sepia-soft transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
            loading="lazy"
          />
          {/* Layered warmth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-dark/70 via-orange/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/85 via-brown-dark/15 to-transparent" />
          {/* soft glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-orange-hero3/30 blur-3xl" />

          {/* Glassmorphism title plate */}
          <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10 max-w-xl">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/25 text-white/95">
              <Icon className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-[0.24em]">
                {String(index + 1).padStart(2, '0')} · {category.name}
              </span>
            </div>
            <h3 className="text-display text-white text-4xl sm:text-5xl lg:text-[56px]">
              {category.name}{' '}
              <span className="text-italic-serif text-white/95">
                instruments
              </span>
            </h3>
            <p className="mt-3 text-white/85 text-sm md:text-base max-w-md leading-relaxed">
              {category.note}
            </p>
          </div>
        </div>
      </div>

      {/* Sub instrument grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
        {category.sub.map((s, i) => (
          <SubCard key={s.name} item={s} index={i} />
        ))}
      </div>
    </article>
  );
};

/* --------------------------------- Page ---------------------------------- */

export default function Learn() {
  return (
    <main data-testid="learn-page" className="bg-white">
      {/* Inline keyframes (page-scoped, no global side effects) */}
      <style>{`
        @keyframes udukku-float {
          0%   { transform: translateY(0) translateX(0); }
          50%  { transform: translateY(-22px) translateX(8px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes udukku-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes udukku-pulse-soft {
          0%, 100% { opacity: 0.65; }
          50%      { opacity: 1; }
        }
      `}</style>

      {/* ───── HERO ───── */}
      <section
        data-testid="learn-hero"
        className="relative overflow-hidden bg-hero-gradient text-white"
      >
        <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
        <FloatingParticles />

        <div className="relative udukku-section pt-28 md:pt-32 pb-14 md:pb-16">
          <span className="inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/85 mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Discover your path
          </span>

          <h1 className="text-display text-white text-5xl sm:text-6xl lg:text-[88px] leading-[1.02]">
            Happy{' '}
            <span className="text-italic-serif text-white/95">learning</span>.
          </h1>

          <p className="mt-6 max-w-xl text-white/85 text-base md:text-lg leading-relaxed">
            Turn your love for music into a confident, lifelong practice.
            Guided lessons, gentle teachers, and a path shaped around the way
            you already listen.
          </p>

          {/* Stats pills */}
          <div
            data-testid="learn-hero-stats"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {LEARN_STATS.map((s) => (
              <div
                key={s.label}
                className="inline-flex items-center gap-3 h-12 pl-3 pr-5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md"
              >
                <span className="text-display text-white text-xl md:text-2xl">
                  {s.num}
                </span>
                <span className="text-white/85 text-xs md:text-sm tracking-wide">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/booking"
              data-testid="learn-hero-cta"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brown-dark text-white text-base font-medium hover:bg-black transition-colors"
            >
              Start learning now
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="#categories"
              data-testid="learn-hero-scroll"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white/10 border border-white/30 backdrop-blur-md text-white text-base font-medium hover:bg-white/15 transition-colors"
            >
              Explore instruments
            </a>
          </div>
        </div>

        <WaveDivider fill="#FFFFFF" />
      </section>

      {/* ───── CATEGORIES ───── */}
      <section
        id="categories"
        data-testid="learn-categories"
        className="relative bg-white"
      >
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-3xl mb-12 md:mb-16">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              The shelves we tend to
            </span>
            <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px] text-brown-dark">
              What you can{' '}
              <span className="text-italic-serif text-orange">learn</span>.
            </h2>
            <p className="mt-4 text-brown-mid text-base md:text-lg leading-relaxed max-w-xl">
              Five families of sound, fifteen quiet doorways in. Step through
              the one that calls to you. The rest will be there when you are
              ready.
            </p>
          </div>

          <div className="space-y-20 md:space-y-24">
            {CATEGORIES.map((c, i) => (
              <CategoryBlock key={c.id} category={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── EXPERIENCE ───── */}
      <section
        data-testid="learn-experience"
        className="relative overflow-hidden bg-hero-gradient text-white"
      >
        <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
        <FloatingParticles />

        <div className="relative udukku-section py-16 md:py-24">
          <div className="max-w-3xl mb-12">
            <span className="uppercase tracking-[0.28em] text-[11px] text-white/80">
              The way we teach
            </span>
            <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px] text-white">
              The Udukku{' '}
              <span className="text-italic-serif">experience</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {EXPERIENCE.map((e, i) => {
              const Icon = e.icon;
              return (
                <div
                  key={e.title}
                  data-testid={`experience-${e.title.toLowerCase().replace(/\s/g, '-')}`}
                  className="relative rounded-3xl p-7 md:p-9 bg-white/8 border border-white/20 backdrop-blur-md hover:bg-white/12 transition-colors"
                  style={{
                    animation: `udukku-rise 0.7s ease ${0.1 * i}s both`,
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/15 border border-white/25 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-display text-white text-2xl mb-2">
                    {e.title}
                  </h3>
                  <p className="text-white/85 text-sm md:text-base leading-relaxed">
                    {e.body}
                  </p>
                  <div
                    className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-hero3/30 blur-2xl"
                    style={{ animation: 'udukku-pulse-soft 6s ease-in-out infinite' }}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link
              to="/booking"
              data-testid="learn-experience-cta"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-orange-dark text-base font-medium hover:bg-white/90 transition-colors"
            >
              Begin with a gentle first lesson
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <span className="text-white/80 text-sm">
              The first hour is on us.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
