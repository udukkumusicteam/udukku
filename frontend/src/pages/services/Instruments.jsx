import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import BrandIcon from '../../components/BrandIcon';

const GROUPS = [
  {
    name: 'Percussion',
    items: [
      { name: 'Tabla', desc: 'Classical Indian hand drum' },
      { name: 'Mridangam', desc: 'South Indian double-headed drum' },
      { name: 'Dholak', desc: 'Folk double-headed drum' },
      { name: 'Cajon', desc: 'Box-shaped percussion instrument' },
      { name: 'Djembe', desc: 'West African rope-tuned drum' },
      { name: 'Khol', desc: 'Clay drum of Bengal' },
    ],
  },
  {
    name: 'Strings',
    items: [
      { name: 'Sitar', desc: 'Plucked classical Indian instrument' },
      { name: 'Guitar', desc: 'Acoustic and electric' },
      { name: 'Violin', desc: 'Western classical bowed string' },
      { name: 'Sarangi', desc: 'Short-necked bowed instrument' },
      { name: 'Santoor', desc: 'Hammered dulcimer of Kashmir' },
      { name: 'Veena', desc: 'Ancient Indian plucked string' },
    ],
  },
  {
    name: 'Wind',
    items: [
      { name: 'Flute', desc: 'Classical Indian bansuri' },
      { name: 'Shehnai', desc: 'Double-reed wind instrument' },
      { name: 'Saxophone', desc: 'Western jazz and classical' },
      { name: 'Trumpet', desc: 'Brass wind instrument' },
      { name: 'Harmonium', desc: 'Bellows-driven keyboard' },
      { name: 'Clarinet', desc: 'Single-reed woodwind' },
    ],
  },
  {
    name: 'Vocals',
    items: [
      { name: 'Hindustani Classical', desc: 'North Indian classical tradition' },
      { name: 'Carnatic Vocals', desc: 'South Indian classical tradition' },
      { name: 'Bhajans and Kirtans', desc: 'Devotional music forms' },
      { name: 'Light Music', desc: 'Film songs and pop' },
      { name: 'Ghazal', desc: 'Poetic form of music' },
      { name: 'Western Pop', desc: 'Contemporary vocal styles' },
    ],
  },
  {
    name: 'Production',
    items: [
      { name: 'Music Production', desc: 'DAW and digital production' },
      { name: 'Sound Design', desc: 'Crafting unique sounds' },
      { name: 'Mixing and Mastering', desc: 'Professional audio finishing' },
      { name: 'Beat Making', desc: 'Rhythm and groove creation' },
      { name: 'Recording', desc: 'Studio recording techniques' },
      { name: 'Composition', desc: 'Writing original music' },
    ],
  },
];

const BackLink = () => (
  <Link
    to="/services"
    data-testid="back-to-services"
    className="flex w-fit items-center gap-2 text-orange hover:text-orange-dark text-sm font-medium transition-colors"
  >
    <ArrowLeft className="w-4 h-4" /> Back to Services
  </Link>
);

const InstrumentTile = ({ item }) => (
  <article className="shrink-0 snap-start w-[240px] md:w-[260px] rounded-2xl border border-brown-dark/10 bg-cream p-5 hover:border-orange/40 transition-colors">
    <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-brown-dark/10 text-orange">
      <BrandIcon size={16} />
    </span>
    <h4 className="text-display text-brown-dark text-xl mt-4">{item.name}</h4>
    <p className="text-brown-mid text-sm mt-1 leading-relaxed">{item.desc}</p>
  </article>
);

export default function Instruments() {
  return (
    <main data-testid="instruments-page" className="bg-white page-fade-in">
      <style>{`
        @keyframes udukku-rise { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:translateY(0);} }
        @keyframes udukku-drift { 0% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-14px) rotate(-2deg); } 100% { transform: translateY(0px) rotate(-2deg); } }
      `}</style>

      {/* Hero — cream split layout with instrument imagery */}
      <section className="relative overflow-hidden bg-cream">
        <div
          className="absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(closest-side, rgba(232,136,58,0.28), transparent 70%)' }}
          aria-hidden
        />
        <div
          className="absolute -bottom-40 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(closest-side, rgba(232,136,58,0.14), transparent 70%)' }}
          aria-hidden
        />

        <div className="relative udukku-section pt-28 md:pt-32 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <BackLink />
            <span
              className="reveal mt-8 inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-orange mb-5"
            >
              <BrandIcon size={14} /> Instruments
            </span>
            <h1
              className="reveal text-display text-brown-dark text-4xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.03]"
              style={{ transitionDelay: '80ms' }}
            >
              Find your{' '}
              <span className="text-italic-serif text-orange">instrument</span>.
            </h1>
            <p
              className="reveal mt-6 max-w-xl text-brown-mid text-base md:text-lg leading-relaxed"
              style={{ transitionDelay: '160ms' }}
            >
              From ancient classical forms to modern production, explore every
              instrument we teach at Udukku.
            </p>
            <div
              className="reveal mt-8 flex flex-wrap items-center gap-2.5"
              style={{ transitionDelay: '220ms' }}
            >
              {['Percussion', 'Strings', 'Wind', 'Vocals', 'Production'].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center h-9 px-4 rounded-full bg-white border border-brown-dark/10 text-brown-dark text-xs md:text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div
                className="relative rounded-[28px] md:rounded-[36px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(102,54,20,0.35)]"
                style={{ animation: 'udukku-drift 8s ease-in-out infinite' }}
              >
                <div className="aspect-[4/5]">
                  <img
                    src="https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/amdyxgg7_IMG_5257.JPG"
                    alt="A musician mid-performance"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/55 to-transparent">
                  <span className="text-italic-serif text-white text-lg md:text-xl">
                    Every instrument holds a language.
                  </span>
                </div>
              </div>
              <div className="hidden md:flex absolute -bottom-6 -left-6 items-center gap-3 rounded-full bg-white border border-brown-dark/10 pl-3 pr-5 py-2 shadow-lg">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-orange text-white">
                  <BrandIcon size={14} />
                </span>
                <div>
                  <div className="text-brown-dark text-sm font-medium leading-tight">
                    20+ instruments
                  </div>
                  <div className="text-brown-mid text-[11px] leading-tight">
                    Taught by lineage teachers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white">
        <div className="udukku-section py-16 md:py-20 space-y-14 md:space-y-16">
          {GROUPS.map((group) => (
            <div key={group.name} data-testid={`group-${group.name.toLowerCase()}`}>
              <h2 className="text-display text-brown-dark text-3xl md:text-4xl mb-6">
                {group.name}
              </h2>
              <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {group.items.map((it) => (
                    <InstrumentTile key={it.name} item={it} />
                  ))}
                  <div className="shrink-0 snap-start flex flex-col justify-center pl-2 pr-6 min-w-[200px]">
                    <span className="text-orange text-italic-serif text-xl md:text-2xl">
                      and more...
                    </span>
                    <span className="text-brown-mid/70 text-xs mt-1">
                      Not limited to this list
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="bg-brown-dark text-white">
        <div className="udukku-section py-20 md:py-24 text-center flex flex-col items-center">
          <span className="uppercase tracking-[0.28em] text-xs text-white/70">
            Book a lesson
          </span>
          <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px] max-w-3xl">
            Ready to start{' '}
            <span className="text-italic-serif text-orange">playing</span>?
          </h2>
          <p className="mt-4 text-white/80 max-w-xl leading-relaxed">
            Book your first instrument lesson with an Udukku teacher today.
          </p>
          <Link
            to="/booking"
            data-testid="instruments-book-cta"
            className="btn-glow mt-9 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark"
          >
            Book Now <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
