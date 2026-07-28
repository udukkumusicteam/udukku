import React from 'react';
import BrandIcon from '../../components/BrandIcon';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceCTA from '../../components/services/ServiceCTA';

const GROUPS = [
  {
    name: 'Percussion',
    items: [
      { name: 'Tabla', description: 'Classical Indian hand drum', image: null },
      { name: 'Mridangam', description: 'South Indian double-headed drum', image: null },
      { name: 'Dholak', description: 'Folk double-headed drum', image: null },
      { name: 'Cajon', description: 'Box-shaped percussion instrument', image: null },
      { name: 'Djembe', description: 'West African rope-tuned drum', image: null },
      { name: 'Khol', description: 'Clay drum of Bengal', image: null },
    ],
  },
  {
    name: 'Strings',
    items: [
      { name: 'Sitar', description: 'Plucked classical Indian instrument', image: null },
      { name: 'Guitar', description: 'Acoustic and electric', image: null },
      { name: 'Violin', description: 'Western classical bowed string', image: null },
      { name: 'Sarangi', description: 'Short-necked bowed instrument', image: null },
      { name: 'Santoor', description: 'Hammered dulcimer of Kashmir', image: null },
      { name: 'Veena', description: 'Ancient Indian plucked string', image: null },
    ],
  },
  {
    name: 'Wind',
    items: [
      { name: 'Flute', description: 'Classical Indian bansuri', image: null },
      { name: 'Shehnai', description: 'Double-reed wind instrument', image: null },
      { name: 'Saxophone', description: 'Western jazz and classical', image: null },
      { name: 'Trumpet', description: 'Brass wind instrument', image: null },
      { name: 'Harmonium', description: 'Bellows-driven keyboard', image: null },
      { name: 'Clarinet', description: 'Single-reed woodwind', image: null },
    ],
  },
  {
    name: 'Vocals',
    items: [
      { name: 'Hindustani Classical', description: 'North Indian classical tradition', image: null },
      { name: 'Carnatic Vocals', description: 'South Indian classical tradition', image: null },
      { name: 'Bhajans and Kirtans', description: 'Devotional music forms', image: null },
      { name: 'Light Music', description: 'Film songs and pop', image: null },
      { name: 'Ghazal', description: 'Poetic form of music', image: null },
      { name: 'Western Pop', description: 'Contemporary vocal styles', image: null },
    ],
  },
  {
    name: 'Production',
    items: [
      { name: 'Music Production', description: 'DAW and digital production', image: null },
      { name: 'Sound Design', description: 'Crafting unique sounds', image: null },
      { name: 'Mixing and Mastering', description: 'Professional audio finishing', image: null },
      { name: 'Beat Making', description: 'Rhythm and groove creation', image: null },
      { name: 'Recording', description: 'Studio recording techniques', image: null },
      { name: 'Composition', description: 'Writing original music', image: null },
    ],
  },
];

const InstrumentTile = ({ item }) => (
  <article className="shrink-0 snap-start w-[240px] md:w-[260px] rounded-2xl border border-brown-dark/10 bg-cream overflow-hidden hover:border-orange/40 transition-colors flex flex-col">
    {item.image ? (
      // Optional banner image — rendered only when the data source provides one.
      // Card `overflow-hidden` clips the image to the matching top corners; the
      // fixed 4/3 aspect keeps every card the same height across a row.
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    ) : null}
    <div className="p-5">
      {!item.image && (
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-brown-dark/10 text-orange">
          <BrandIcon size={16} />
        </span>
      )}
      <h4
        className={`text-display text-brown-dark text-xl ${
          item.image ? '' : 'mt-4'
        }`}
      >
        {item.name}
      </h4>
      <p className="text-brown-mid text-sm mt-1 leading-relaxed">
        {item.description}
      </p>
    </div>
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

      {/* Categories — dark editorial band */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20 space-y-14 md:space-y-16">
          {GROUPS.map((group) => (
            <div key={group.name} data-testid={`group-${group.name.toLowerCase()}`}>
              <h2 className="text-display text-white text-3xl md:text-4xl mb-6">
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
                    <span className="text-white/50 text-xs mt-1">
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
