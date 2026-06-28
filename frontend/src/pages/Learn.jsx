import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  GraduationCap,
  Music,
  TrendingUp,
  Users,
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
  Heart,
  Leaf,
  Trophy,
  CheckCircle2,
  Gift,
  Repeat,
  ClipboardCheck,
  LineChart,
} from 'lucide-react';
import WaveDivider from '../components/WaveDivider';
import BrandIcon from '../components/BrandIcon';

/* ---------------------------------- Data ---------------------------------- */

const JOURNEY = [
  { icon: Compass, label: 'Discover' },
  { icon: GraduationCap, label: 'Learn' },
  { icon: Music, label: 'Practice' },
  { icon: TrendingUp, label: 'Grow' },
  { icon: Users, label: 'Connect' },
];

const FILTERS = ['All', 'Strings', 'Percussion', 'Keyboard', 'Wind', 'Vocals'];

// Flat instrument list. `cat` is the filter-chip label, `curated: true` marks
// the picks we always surface. Everything else lives behind the "and more..."
// cue and is taught on request.
const INSTRUMENTS = [
  // Strings
  { name: 'Guitar', cat: 'Strings', icon: Guitar, desc: 'Strum chords and find the song hiding in your fingertips.', curated: true },
  { name: 'Violin', cat: 'Strings', icon: Music2, desc: 'Express emotion through timeless music.', curated: true },
  { name: 'Sitar', cat: 'Strings', icon: Music, desc: 'Step into a tradition that bends time with every note.', curated: true },
  { name: 'Ukulele', cat: 'Strings', icon: Music3, desc: 'Travel light. Let four strings carry your joy.' },
  // Vocals
  { name: 'Hindustani', cat: 'Vocals', icon: Mic, desc: 'Wander through ragas at your own breath\u2019s pace.', curated: true },
  { name: 'Carnatic', cat: 'Vocals', icon: Mic2, desc: 'Sing the rhythms passed down through generations.', curated: true },
  { name: 'Western', cat: 'Vocals', icon: AudioLines, desc: 'Sing the songs you already hum inside.', curated: true },
  { name: 'Playback', cat: 'Vocals', icon: Radio, desc: 'Step up to the mic with quiet confidence.' },
  // Percussion
  { name: 'Tabla', cat: 'Percussion', icon: Drum, desc: 'Discover rhythm, focus and tradition.', curated: true },
  { name: 'Drums', cat: 'Percussion', icon: Disc, desc: 'Let the room feel your heartbeat.', curated: true },
  { name: 'Cajon', cat: 'Percussion', icon: Drum, desc: 'Carry a beat anywhere you sit.', curated: true },
  { name: 'Mridangam', cat: 'Percussion', icon: Drum, desc: 'A south Indian pulse, ancient and warm.' },
  // Wind
  { name: 'Flute / Bansuri', cat: 'Wind', icon: WindIcon, desc: 'Breathe, relax and create beautiful melodies.', curated: true },
  { name: 'Saxophone', cat: 'Wind', icon: Music4, desc: 'Pour soul into every long, warm note.', curated: true },
  { name: 'Harmonica', cat: 'Wind', icon: AudioLines, desc: 'Make a pocket-sized melody anywhere.', curated: true },
  { name: 'Shehnai', cat: 'Wind', icon: WindIcon, desc: 'Welcome each beginning with a soaring tone.' },
  // Keyboard
  { name: 'Piano', cat: 'Keyboard', icon: Piano, desc: 'Touch a key, and a story begins.', curated: true },
  { name: 'Harmonium', cat: 'Keyboard', icon: Piano, desc: 'A warm hum to ground every song.', curated: true },
  { name: 'Keyboard', cat: 'Keyboard', icon: Piano, desc: 'Endless sounds, one place to play.', curated: true },
  { name: 'Music Theory', cat: 'Keyboard', icon: BookOpen, desc: 'Understand the language behind the songs you love.' },
];

const PLANS = [
  {
    id: 'habit-12',
    name: 'Habit 12-Day',
    price: '\u20B9999',
    strike: '\u20B91,200',
    cadence: '3 sessions / week',
    cashbackTiers: [
      { range: '0\u20136 sessions', refund: 'No cashback' },
      { range: '7\u201310 sessions', refund: '50% cashback' },
      { range: '11\u201312 sessions', refund: '90% cashback' },
    ],
  },
  {
    id: 'habit-24',
    name: 'Habit 24-Day',
    price: '\u20B91,899',
    strike: '\u20B92,400',
    cadence: '6 sessions / week',
    featured: true,
    cashbackTiers: [
      { range: '0\u201312 sessions', refund: 'No cashback' },
      { range: '14\u201320 sessions', refund: '50% cashback' },
      { range: '20\u201324 sessions', refund: '90% cashback' },
    ],
  },
];

const ROOM_FEATURES = [
  { icon: Repeat, title: 'Consistent practice', body: 'Bring your own riyaz, or follow the teacher\u2019s. Either way, you show up.' },
  { icon: Users, title: 'A real community', body: 'Warm gatherings with people who love music as much as you do.' },
  { icon: ClipboardCheck, title: 'Accountability', body: 'An Udukku teacher present in every session, gently keeping you on track.' },
  { icon: Heart, title: '1-on-1 checks', body: 'Personal touchpoints with the Udukku team, just for you.' },
  { icon: LineChart, title: 'Progress plotting', body: 'Re-evaluation and planning so progress feels tangible, not theoretical.' },
  { icon: Gift, title: 'Referral benefits', body: 'Bring someone in. A free week for you, an easy entry point for them.' },
];

const WHY = [
  { icon: Leaf, title: 'Music for Wellbeing', body: 'Experience the calming and therapeutic benefits of making music part of your daily life.' },
  { icon: Heart, title: 'Learn Without Pressure', body: 'Progress at your own pace in a welcoming and supportive environment.' },
  { icon: Users, title: 'A Community That Inspires', body: 'Connect, practice and grow alongside fellow music lovers.' },
  { icon: Trophy, title: 'Build a Lifelong Habit', body: 'Develop consistency through structured guidance that makes practice enjoyable and sustainable.' },
];

/* ----------------------------- Sub-components ----------------------------- */

const JourneyFlow = () => (
  <div
    data-testid="learn-journey"
    className="mt-12 md:mt-14 grid grid-cols-5 sm:flex sm:items-center sm:justify-between gap-y-8 gap-x-2 md:gap-x-4 max-w-3xl"
    aria-label="Your Udukku journey"
  >
    {JOURNEY.map((step, i) => {
      const Icon = step.icon;
      return (
        <React.Fragment key={step.label}>
          <div
            className="flex flex-col items-center text-center min-w-0"
            style={{ animation: `udukku-rise 0.7s ease ${0.08 * i}s both` }}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 border border-white/35 backdrop-blur-md text-white">
              <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.7} />
            </span>
            <span className="mt-3 text-white text-[11px] md:text-xs tracking-[0.18em] uppercase">
              {step.label}
            </span>
          </div>
          {i < JOURNEY.length - 1 && (
            <span
              aria-hidden="true"
              className="hidden sm:flex items-center text-white/55"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
            </span>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const InstrumentCard = ({ item, index }) => {
  const Icon = item.icon;
  return (
    <div
      data-testid={`instrument-${item.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
      className="group relative overflow-hidden rounded-2xl border border-brown-dark/10 p-5 md:p-6 cursor-default"
      style={{ animation: `udukku-rise 0.55s ease ${0.04 * (index % 12)}s both` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-cream via-orange-hero3/30 to-orange/45 transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-orange/35 blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700"
      />
      <div className="relative">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/35 border border-white/55 backdrop-blur-md text-brown-dark">
          <Icon className="w-5 h-5" strokeWidth={1.8} />
        </span>
        <h3 className="mt-4 text-display text-brown-dark text-xl md:text-2xl leading-tight">
          {item.name}
        </h3>
        <p className="mt-2 text-brown-mid text-sm leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );
};

const PlanCard = ({ plan }) => (
  <div
    data-testid={`plan-${plan.id}`}
    className={`relative rounded-3xl p-7 md:p-8 border ${
      plan.featured
        ? 'bg-orange/10 border-orange/40'
        : 'bg-white/[0.03] border-white/15'
    }`}
  >
    {plan.featured && (
      <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange text-white text-[10px] uppercase tracking-[0.22em]">
        <BrandIcon size={12} /> Most chosen
      </span>
    )}
    <h3 className="text-display text-white text-2xl md:text-3xl">{plan.name}</h3>
    <p className="text-white/65 text-sm mt-1">{plan.cadence}</p>

    <div className="mt-6 flex items-baseline gap-3">
      <span className="text-display text-white text-4xl md:text-5xl">
        {plan.price}
      </span>
      <span className="text-white/55 text-sm">/ month</span>
      <span className="text-white/35 text-sm line-through">{plan.strike}</span>
    </div>

    <div className="mt-6 rounded-2xl border border-orange/40 bg-orange/10 px-5 py-4">
      <p className="text-white text-sm leading-relaxed">
        At full attendance,{' '}
        <span className="text-orange font-semibold">up to 90% cashback</span>.
        Pay as little as{' '}
        <span className="text-orange font-semibold">₹99/mo</span>.
      </p>
    </div>

    <ul className="mt-6 space-y-2.5">
      {plan.cashbackTiers.map((t) => (
        <li key={t.range} className="flex items-center gap-3 text-white/85 text-sm">
          <CheckCircle2 className="w-4 h-4 text-orange shrink-0" />
          <span className="flex-1">{t.range}</span>
          <span className="text-white/70">{t.refund}</span>
        </li>
      ))}
    </ul>
  </div>
);

/* --------------------------------- Page ---------------------------------- */

export default function Learn() {
  const [filter, setFilter] = useState('All');

  const filteredInstruments = useMemo(() => {
    const curated = INSTRUMENTS.filter((i) => i.curated);
    if (filter === 'All') return curated;
    return curated.filter((i) => i.cat === filter);
  }, [filter]);

  // Whether at least one non-curated instrument exists in the visible scope —
  // drives the soft "and more..." hint below the grid.
  const hasMore = useMemo(() => {
    if (filter === 'All') return INSTRUMENTS.some((i) => !i.curated);
    return INSTRUMENTS.some((i) => i.cat === filter && !i.curated);
  }, [filter]);

  return (
    <main data-testid="learn-page" className="bg-white page-fade-in">
      <style>{`
        @keyframes udukku-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ───── HERO ───── */}
      <section
        data-testid="learn-hero"
        className="relative overflow-hidden bg-hero-gradient text-white"
      >
        <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
        <div className="relative udukku-section pt-28 md:pt-32 pb-16 md:pb-20">
          <span className="reveal inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/85 mb-5">
            <BrandIcon size={14} />
            Our Services
          </span>

          <h1
            className="reveal text-display text-white text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px] leading-[1.05] max-w-4xl"
            style={{ transitionDelay: '80ms' }}
          >
            Music education designed around{' '}
            <span className="text-italic-serif text-white/95">
              every stage of your journey
            </span>
            .
          </h1>

          <p
            className="reveal mt-6 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed"
            style={{ transitionDelay: '160ms' }}
          >
            Whether you're discovering your first instrument, building a
            consistent practice routine, or simply reconnecting with music,
            Udukku offers experiences that nurture learning, creativity and
            wellbeing.
          </p>

          <JourneyFlow />
        </div>
        <WaveDivider fill="#FFFFFF" />
      </section>

      {/* ───── LEARN AN INSTRUMENT ───── */}
      <section
        data-testid="learn-instruments"
        className="relative bg-white"
      >
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-3xl mb-8 md:mb-10">
            <span className="reveal uppercase tracking-[0.28em] text-xs text-brown-mid">
              Learn an instrument
            </span>
            <h2
              className="reveal text-display mt-4 text-4xl sm:text-5xl lg:text-[52px] text-brown-dark"
              style={{ transitionDelay: '80ms' }}
            >
              Pick a sound that{' '}
              <span className="text-italic-serif text-orange">calls</span> to
              you.
            </h2>
          </div>

          {/* Filter chips */}
          <div
            data-testid="instrument-filters"
            className="reveal flex flex-wrap gap-2 mb-10"
            style={{ transitionDelay: '140ms' }}
          >
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  data-testid={`filter-${f.toLowerCase()}`}
                  className={`inline-flex items-center h-10 px-5 rounded-full text-sm transition-all duration-300 border ${
                    active
                      ? 'bg-orange text-white border-orange'
                      : 'bg-cream text-brown-dark border-brown-dark/15 hover:border-orange hover:text-orange'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Cards grid */}
          <div
            key={filter} // re-trigger entrance anim on filter change
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {filteredInstruments.map((item, i) => (
              <InstrumentCard key={item.name} item={item} index={i} />
            ))}
          </div>

          {hasMore && (
            <p
              data-testid="and-more"
              className="mt-8 md:mt-10 text-orange text-italic-serif text-xl md:text-2xl"
            >
              and more...
            </p>
          )}
        </div>
      </section>

      {/* ───── UDUKKU MUSIC ROOM ───── */}
      <section
        data-testid="music-room"
        className="relative bg-brown-dark text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-orange/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-orange-hero3/15 blur-3xl"
        />

        <div className="relative udukku-section py-16 md:py-24">
          {/* Intro + plan cards */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start">
            <div>
              <span className="reveal uppercase tracking-[0.28em] text-[11px] text-orange">
                Udukku Music Room
              </span>
              <h2
                className="reveal text-display mt-4 text-white text-4xl sm:text-5xl lg:text-[60px] leading-[1.05]"
                style={{ transitionDelay: '80ms' }}
              >
                You didn't stop loving{' '}
                <span className="text-italic-serif text-orange">music</span>.
                You just stopped having a place for it.
              </h2>
              <p
                className="reveal mt-6 text-white/85 text-base md:text-lg leading-relaxed max-w-xl"
                style={{ transitionDelay: '160ms' }}
              >
                Monthly online practice sessions, a real community, with
                structure built to hold your riyaz. The teacher is present, the
                structure is there, but your practice and your pace remain
                yours.
              </p>
              <Link
                to="/booking"
                data-testid="music-room-cta"
                className="reveal btn-glow mt-9 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark"
                style={{ transitionDelay: '220ms' }}
              >
                Join Music Room
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <ul
                className="reveal mt-9 space-y-3 max-w-md"
                style={{ transitionDelay: '280ms' }}
              >
                {[
                  'Any instrument or any style, bring what you love',
                  'Month to month, no long term commitment',
                  'Cashback that quietly rewards your consistency',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-white/80 text-sm md:text-base leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-orange mt-1 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <figure
                className="reveal mt-10 max-w-lg pl-5 border-l-2 border-orange/60"
                style={{ transitionDelay: '340ms' }}
              >
                <blockquote className="text-italic-serif text-white/90 text-lg md:text-xl leading-relaxed">
                  The students who stay the longest are not the most talented.
                  They are the ones who found a room they trusted enough to
                  keep coming back to.
                </blockquote>
                <figcaption className="mt-3 text-white/55 text-[11px] uppercase tracking-[0.24em]">
                  A quiet truth, from the Music Room
                </figcaption>
              </figure>
            </div>

            <div className="space-y-5">
              {PLANS.map((p) => (
                <PlanCard key={p.id} plan={p} />
              ))}
              <p className="text-[11px] text-white/45 leading-relaxed">
                * Cashback scales from 60% upward based on attendance.
              </p>
            </div>
          </div>

          {/* Feature grid */}
          <div className="mt-16 md:mt-20">
            <h3 className="text-display text-white text-2xl md:text-3xl mb-8 max-w-xl">
              What you sign up for.
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ROOM_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    data-testid={`room-feature-${i}`}
                    className="rounded-2xl p-6 md:p-7 bg-white/[0.04] border border-white/12 hover:bg-white/[0.07] transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-orange/15 border border-orange/30 text-orange mb-4">
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </span>
                    <h4 className="text-display text-white text-lg md:text-xl">
                      {f.title}
                    </h4>
                    <p className="mt-2 text-white/75 text-sm leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-12 text-white/65 text-base md:text-lg max-w-2xl text-italic-serif">
            The room is open. Your riyaz is waiting.
          </p>
        </div>
      </section>

      {/* ───── WHY CHOOSE UDUKKU ───── */}
      <section data-testid="why-udukku" className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-3xl mb-10 md:mb-14">
            <span className="reveal uppercase tracking-[0.28em] text-xs text-brown-mid">
              Why choose Udukku
            </span>
            <h2
              className="reveal text-display mt-4 text-4xl sm:text-5xl lg:text-[52px] text-brown-dark"
              style={{ transitionDelay: '80ms' }}
            >
              The Udukku{' '}
              <span className="text-italic-serif text-orange">philosophy</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w, i) => {
              const Icon = w.icon;
              return (
                <article
                  key={w.title}
                  data-testid={`why-${i}`}
                  className="card-lift rounded-3xl p-7 bg-white border border-brown-dark/10"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/10 border border-orange/25 text-orange">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-display text-brown-dark text-xl mt-5">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-brown-mid text-sm leading-relaxed">
                    {w.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section data-testid="learn-final-cta" className="bg-brown-dark text-white">
        <div className="udukku-section py-20 md:py-24 text-center flex flex-col items-center">
          <span className="reveal uppercase tracking-[0.28em] text-xs text-white/70">
            Start today
          </span>
          <h2
            className="reveal text-display mt-4 text-4xl sm:text-5xl lg:text-[60px] max-w-3xl"
            style={{ transitionDelay: '80ms' }}
          >
            Ready to begin your{' '}
            <span className="text-italic-serif text-orange">musical journey</span>?
          </h2>
          <div
            className="reveal mt-9 flex flex-wrap items-center justify-center gap-3"
            style={{ transitionDelay: '160ms' }}
          >
            <Link
              to="/booking"
              data-testid="final-cta-explore"
              className="btn-glow inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark"
            >
              Explore Courses
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/booking"
              data-testid="final-cta-join"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white/10 border border-white/30 backdrop-blur-md text-white text-base font-medium hover:bg-white/15 transition-colors"
            >
              Join Music Room
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
