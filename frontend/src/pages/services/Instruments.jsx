import React from 'react';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceCTA from '../../components/services/ServiceCTA';

/* ------------------------------------------------------------------
   Instrument visuals
   ------------------------------------------------------------------
   Emoji are used for the instrument art so the page needs zero image
   assets — they render everywhere, including after you push to GitHub
   and host on your own domain.

   The four below default to *text* presentation, so they carry the emoji
   variation selector (U+FE0F) explicitly to force the colour glyph.

   Every item also keeps an `image` field. Set it to a file you commit to
   /public (e.g. '/assets/images/instruments/guitar.jpg') and that card
   switches to the photo automatically — same layout, same text overlay.
   ------------------------------------------------------------------ */
const VISUAL = {
  studioMic: '\u{1F399}\uFE0F',
  speakingHead: '\u{1F5E3}\uFE0F',
  controlKnobs: '\u{1F39B}\uFE0F',
  levelSlider: '\u{1F39A}\uFE0F',
};

const GROUPS = [
  {
    name: 'Vocal',
    // Vocals are styles of singing, not instruments — override the heading suffix.
    suffix: 'Styles',
    moreText: "and many more...",
    moreSubtext: "Name it and we'll teach you",
    items: [
      { name: 'Hindustani Classical', description: 'North Indian classical vocal tradition', emoji: VISUAL.studioMic, image: "/assets/instruments/hindustaniclassical.jpeg" },
      { name: 'Carnatic Classical', description: 'South Indian classical vocal tradition', emoji: '🎶', image: "/assets/instruments/carnatic.jpeg" },
      { name: 'Western Rock & Pop', description: 'Contemporary Western vocal styles', emoji: '🎤', image: "/assets/instruments/westrocknpop.jpeg" },
      { name: 'Light Vocal Music', description: 'Film songs and contemporary light music', emoji: '🎵', image: "/assets/instruments/lightmusic.jpeg" },
      { name: 'Bhajans & Kirtans', description: 'Devotional music forms', emoji: '📿', image: "/assets/instruments/bhajankirtan.jpeg"},
      { name: 'Vocal Techniques', description: 'Training in vocal control and technique', emoji: VISUAL.speakingHead, image: "/assets/instruments/vocal techniques.png" },
    ],
  },
  {
    name: 'String and Keys',
    moreText: "and many more...",
    moreSubtext: "Name it and we'll teach you.",
    items: [
      { name: 'Guitar', description: 'Acoustic and electric', emoji: '🎸', image: "/assets/instruments/guitar.jpeg" },
      { name: 'Violin', description: 'Western classical bowed string', emoji: '🎻', image: "/assets/instruments/violin.jpeg" },
      { name: 'Sitar', description: 'Plucked classical Indian instrument', emoji: '🪕', image: "/assets/instruments/sitar.jpeg" },
      { name: 'Tanpura', description: 'Traditional Indian drone instrument', emoji: '🎼', image: "/assets/instruments/tanpura.jpeg" },
      { name: 'Sarangi', description: 'Short-necked bowed instrument', emoji: '🎻', image: "/assets/instruments/sarangi.jpeg" },
      { name: 'Santoor', description: 'Hammered dulcimer of Kashmir', emoji: '🪕', image: "/assets/instruments/santoor.jpeg" },
      { name: 'Keyboard / Piano', description: 'Keyboard and piano-based music', emoji: '🎹', image: "/assets/instruments/keyboard.jpeg" },
    ],
  },
  {
    name: 'Wind',
    moreText: "and many more...",
    moreSubtext: "Name it and we'll teach you",
    items: [
      { name: 'Flute', description: 'Classical Indian bansuri', emoji: '🪈', image: "/assets/instruments/flute.jpeg" },
      { name: 'Harmonium', description: 'Bellows-driven keyboard', emoji: '🪗', image: "/assets/instruments/harmonium.jpeg" },
      { name: 'Harmonica', description: 'Free-reed wind instrument', emoji: '🎵', image: "/assets/instruments/harmonica.jpeg" },
      { name: 'Saxophone', description: 'Western jazz and classical', emoji: '🎷', image: "/assets/instruments/saxophone.jpeg" },
      { name: 'Oboe', description: 'Double-reed woodwind instrument.', emoji: '🎺', image: "/assets/instruments/oboe.jpeg" },
    ],
  },
  {
    name: 'Percussion',
    moreText: "and many more...",
    moreSubtext: "Name it and we'll teach you",
    items: [
      { name: 'Tabla', description: 'Classical Indian hand drum', emoji: '🪘', image: "/assets/instruments/tabla.jpeg" },
      { name: 'Mridangam', description: 'South Indian double-headed drum', emoji: '🥁', image: "/assets/instruments/mridangam.jpeg" },
      { name: 'Dholak', description: 'Folk double-headed drum', emoji: '🥁', image: "/assets/instruments/dholak.jpeg" },
      { name: 'Cajon', description: 'Box-shaped percussion instrument', emoji: '📦', image: "/assets/instruments/cajon.jpeg" },
      { name: 'Djembe', description: 'West African rope-tuned drum', emoji: '🪘', image: "/assets/instruments/djembe.jpeg" },
      { name: 'Khol', description: 'Clay drum of Bengal', emoji: '🏺', image: "/assets/instruments/khol.jpeg" },
    ],
  },
  {
    name: 'Production and Composition',
    moreText: "and many more...",
    moreSubtext: "Name it and we'll teach you",
    items: [
      { name: 'Music Production', description: 'DAW and digital production', emoji: VISUAL.controlKnobs, image: "/assets/instruments/music production.jpeg" },
      { name: 'Mixing & Mastering', description: 'Professional audio finishing', emoji: VISUAL.levelSlider, image: "/assets/instruments/mixing and mastering.jpeg" },
      { name: 'Songwriting & Composition', description: 'Writing and arranging original music', emoji: '📝', image: "/assets/instruments/songwriting.jpeg" },
      { name: 'Recording', description: 'Studio recording techniques', emoji: VISUAL.studioMic, image: "/assets/instruments/recording.jpeg" },
      { name: 'Beat Making', description: 'Rhythm and groove creation', emoji: '🥁', image: "/assets/instruments/beatmaking.jpeg" },
      { name: 'Sound Design', description: 'Crafting unique sounds', emoji: '🔊', image: "/assets/instruments/SoundDesign.jpeg" },
    ],
  },
];

const InstrumentTile = ({ item }) => (
  <article className="group shrink-0 snap-start relative w-[240px] md:w-[260px] aspect-[4/5] rounded-2xl border border-brown-dark/10 bg-cream overflow-hidden hover:border-orange/40 transition-colors">
    {/* Instrument visual — fills the card */}
    {item.image ? (
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    ) : (
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pb-20"
      >
        <span className="text-7xl md:text-8xl leading-none select-none transition-transform duration-500 group-hover:scale-105">
          {item.emoji}
        </span>
      </div>
    )}

    {/* Scrim — keeps the text legible on top of the visual */}
    <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-brown-dark via-brown-dark/85 to-transparent" />

    <div className="relative h-full flex flex-col justify-end p-5">
      <h4 className="text-display text-white text-xl">{item.name}</h4>
      <p className="text-white/70 text-sm mt-1 leading-relaxed">
        {item.description}
      </p>
    </div>
  </article>
);

export default function Instruments() {
  return (
    <main data-testid="instruments-page" className="bg-white page-fade-in">
      <style>{`
        @keyframes udukku-rise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes udukku-drift {
          0% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-14px) rotate(-2deg);
          }
          100% {
            transform: translateY(0px) rotate(-2deg);
          }
        }
      `}</style>

      <ServiceHero
        testId="instruments-hero"
        eyebrow="Music Classes"
        headline={
          <>
            Find your{' '}
            <span className="text-italic-serif text-orange">instrument</span>.
          </>
        }
        description="From ancient classical forms to modern production, explore every instrument we teach at Udukku."
        pills={['Percussion', 'Strings', 'Wind', 'Vocals', 'Production']}
        imageSrc="/assets/images/events/indian-classical-evening.jpg"
        imageAlt="A musician mid-performance"
        //chipTitle="Music Has No Limits"
        //chipSubtitle="Neither should your learning"
      />

      {/* Categories — dark editorial band */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20 space-y-14 md:space-y-16">
          {GROUPS.map((group) => (
            <div
              key={group.name}
              data-testid={`group-${group.name.toLowerCase()}`}
            >
              <h2 className="text-3xl md:text-4xl mb-6">
                <span className="text-italic-serif text-orange">
                  {group.name}
                </span>{' '}
                <span className="text-display text-white not-italic">
                  {group.suffix || 'Instruments'}
                </span>
              </h2>

              <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {group.items.map((it) => (
                    <InstrumentTile key={it.name} item={it} />
                  ))}

                  <div className="shrink-0 snap-start flex flex-col justify-center pl-2 pr-6 min-w-[200px]">
                    <span className="text-orange text-italic-serif text-xl md:text-2xl">
                      {group.moreText}
                    </span>

                    <span className="text-white/50 text-xs mt-1">
                      {group.moreSubtext}
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
        headline={
          <>
            Ready to start{' '}
            <span className="text-italic-serif text-orange">playing</span>?
          </>
        }
        description="Book your first instrument lesson with an Udukku teacher today."
        ctaLabel="Book Now"
        ctaTo="/booking"
        testId="instruments-book-cta"
      />
    </main>
  );
}
