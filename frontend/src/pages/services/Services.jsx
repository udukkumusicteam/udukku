import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Music, Users, Sparkles, CalendarHeart } from 'lucide-react';
import WaveDivider from '../../components/WaveDivider';
import BrandIcon from '../../components/BrandIcon';

const CARDS = [
  {
    to: '/services/instruments',
    icon: Music,
    title: 'Instruments',
    body: 'Explore our full range of instruments and courses.',
    testid: 'services-card-instruments',
  },
  {
    to: '/services/music-room',
    icon: Users,
    title: 'Udukku Music Room',
    body: 'Join the Udukku Music Room community.',
    testid: 'services-card-umr',
  },
  {
    to: '/services/music-meditation',
    icon: Sparkles,
    title: 'Music Meditation',
    body: 'Reconnect through sound, breath, and stillness.',
    testid: 'services-card-meditation',
  },
  {
    to: '/services/events',
    icon: CalendarHeart,
    title: 'Events',
    body: 'Curated live musicians for every kind of gathering.',
    testid: 'services-card-events',
  },
];

const ServiceCard = ({ card, index }) => {
  const Icon = card.icon;
  return (
    <Link
      to={card.to}
      data-testid={card.testid}
      className="group card-lift block relative rounded-3xl bg-white border border-brown-dark/10 p-7 md:p-8 min-h-[220px] flex flex-col justify-between"
      style={{ animation: `udukku-rise 0.55s ease ${0.06 * index}s both` }}
    >
      <div>
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/10 border border-orange/25 text-orange">
          <Icon className="w-5 h-5" strokeWidth={1.8} />
        </span>
        <h3 className="text-display text-brown-dark text-2xl md:text-[28px] mt-6">
          {card.title}
        </h3>
        <p className="text-brown-mid text-sm md:text-base mt-2 leading-relaxed">
          {card.body}
        </p>
      </div>
      <span className="mt-8 inline-flex items-center gap-2 text-orange text-sm font-medium">
        Explore
        <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </span>
    </Link>
  );
};

export default function Services() {
  return (
    <main data-testid="services-page" className="bg-white page-fade-in">
      <style>{`
        @keyframes udukku-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
        <div className="relative udukku-section pt-28 md:pt-32 pb-16 md:pb-20">
          <span className="reveal inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/85 mb-5">
            <BrandIcon size={14} /> Our Services
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
            Whether you&apos;re discovering your first instrument, building a
            consistent practice routine, or simply reconnecting with music,
            Udukku offers experiences that nurture learning, creativity and
            wellbeing.
          </p>
        </div>
        <WaveDivider fill="#FFFFFF" />
      </section>

      {/* Four service navigation cards */}
      <section className="bg-white">
        <div className="udukku-section py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {CARDS.map((c, i) => (
              <ServiceCard key={c.to} card={c} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
