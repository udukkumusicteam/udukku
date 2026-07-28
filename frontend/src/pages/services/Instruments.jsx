import React from 'react';
import BrandIcon from '../../components/BrandIcon';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceCTA from '../../components/services/ServiceCTA';

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

      <ServiceHero
        testId="instruments-hero"
        eyebrow="Instruments"
        headline={<>Find your <span className="text-italic-serif text-orange">instrument</span>.</>}
        description="From ancient classical forms to modern production, explore every instrument we teach at Udukku."
        pills={['Percussion', 'Strings', 'Wind', 'Vocals', 'Production']}
        imageSrc="/assets/images/events/indian-classical-evening.jpg"
        imageAlt="A musician mid-performance"
        chipTitle="Music Has No Limits"
        chipSubtitle="Neither should your learning"
      />

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

      <ServiceCTA
        eyebrow="Book a lesson"
        headline={<>Ready to start <span className="text-italic-serif text-orange">playing</span>?</>}
        description="Book your first instrument lesson with an Udukku teacher today."
        ctaLabel="Book Now"
        ctaTo="/booking"
        testId="instruments-book-cta"
      />
    </main>
  );
}
