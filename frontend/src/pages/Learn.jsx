import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Music,
  Music2,
  Music3,
  Music4,
  Mic,
  Mic2,
  Radio,
  AudioLines,
  Drum,
  Guitar,
  Wind as WindIcon,
  Piano,
  BookOpen,
  Disc,
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
      { name: 'Guitar', icon: Guitar },
      { name: 'Violin', icon: Music2 },
      { name: 'Sitar', icon: Music },
      { name: 'Ukulele', icon: Music3 },
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
      { name: 'Hindustani', icon: Mic },
      { name: 'Carnatic', icon: Mic2 },
      { name: 'Western', icon: AudioLines },
      { name: 'Playback', icon: Radio },
    ],
  },
  {
    id: 'percussion',
    name: 'Percussion',
    icon: Drum,
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1800&q=80',
    note: 'The pulse that holds every song together. Learn to listen, then play.',
    sub: [
      { name: 'Tabla', icon: Drum },
      { name: 'Drums', icon: Disc },
      { name: 'Cajon', icon: Drum },
      { name: 'Mridangam', icon: Drum },
    ],
  },
  {
    id: 'wind',
    name: 'Wind',
    icon: WindIcon,
    image:
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1800&q=80',
    note: 'Air becomes a melody. One steady breath at a time.',
    sub: [
      { name: 'Flute / Bansuri', icon: WindIcon },
      { name: 'Saxophone', icon: Music4 },
      { name: 'Harmonica', icon: AudioLines },
      { name: 'Shehnai', icon: WindIcon },
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
      { name: 'Piano', icon: Piano },
      { name: 'Harmonium', icon: Piano },
      { name: 'Keyboard', icon: Piano },
      { name: 'Music Theory', icon: BookOpen },
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

const SubCard = ({ item, index }) => {
  const Icon = item.icon;
  return (
    <div
      data-testid={`sub-card-${item.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-brown-dark/10 cursor-default"
      style={{ animation: `udukku-rise 0.7s ease ${0.05 * index}s both` }}
    >
      {/* Warm earthy gradient base */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-cream via-orange-hero3/35 to-orange/55 transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
      />
      {/* Soft glow halo behind the icon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 rounded-full bg-orange/40 blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700"
      />
      {/* Subtle grain via inner shadow + radial highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)',
        }}
      />

      {/* Icon */}
      <div className="absolute top-5 left-5 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/30 border border-white/45 backdrop-blur-md text-brown-dark shadow-[0_8px_24px_-12px_rgba(45,26,10,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
        <Icon className="w-5 h-5" strokeWidth={1.8} />
      </div>

      {/* Caption */}
      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
        <span className="text-brown-dark text-base md:text-lg font-medium tracking-tight">
          {item.name}
        </span>
        <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-brown-dark/70">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>

      {/* Hover ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-orange/40 transition-[ring] duration-500"
      />
    </div>
  );
};

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
