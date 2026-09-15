import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import WaveDivider from '../components/WaveDivider';

// ---------------------------------------------------------------------------
// IMAGE ASSETS — replace these placeholder URLs with the studio's own photos.
// ---------------------------------------------------------------------------
const IMAGE_FOUNDER =
  '/assets/images/people/founder.jpg';

export default function About() {
  return (
    <main data-testid="about-page" className="bg-cream page-fade-in">
      {/* HERO ---------------------------------------------------------------- */}
      <section className="bg-hero-gradient text-white">
        <div className="udukku-section pt-28 md:pt-32 pb-14 md:pb-20">
          <span className="uppercase tracking-[0.28em] text-[11px] text-white/80">
            About Udukku
          </span>
          <h1 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[72px] xl:text-[80px] max-w-[16ch]">
            Everything here begins
            <br />
            <span className="text-italic-serif">with music.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/90 text-base md:text-lg leading-relaxed">
            A home built by a musician, for musicians who are learning, 
            creating, exploring, and finding their own sound.
            
          </p>
        </div>
        <WaveDivider fill="#F5F0E5" />
      </section>

      {/* FOUNDER SPOTLIGHT --------------------------------------------------- */}
      <section data-testid="founder-section" className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
            <div className="order-1">
              <div
                className="relative w-full overflow-hidden rounded-3xl bg-orange/30"
                style={{ aspectRatio: '4 / 5' }}
              >
                <img
                  src={IMAGE_FOUNDER}
                  alt="Ishita Parakh, founder of Udukku"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1 rounded-full bg-white/85 text-brown-dark text-[10px] uppercase tracking-widest">
                    Founder
                  </span>
                </div>
              </div>
            </div>

            <div className="order-2">
              <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
                Meet Our Founder
              </span>
              <h2 className="text-display mt-3 text-4xl sm:text-5xl lg:text-[56px] text-brown-dark">
                Ishita Parakh
              </h2>
              <p className="text-italic-serif text-orange text-lg mt-1">
                Singer-songwriter & Founder, Udukku Music
              </p>

              <div className="mt-7 space-y-5 text-brown-mid text-base md:text-lg leading-relaxed max-w-2xl">
                <p>
                  Ishita Parakh is a singer-songwriter and educator who started out in 
                  engineering before turning fully toward music. She went on to complete a
                  Master's in Cognitive Neuroscience, focusing on Music Cognition, and holds a
                  Grade 8 Rock and Pop certification from RSL, along with a Grade 6 Western
                  Classical certification from Trinity.
                </p>
                <p>
                  As an artist, she blends Pop, Rock, and RnB with touches of Hindustani
                  classical training, drawing inspiration from Rihanna, Taylor Swift, and Selena
                  Gomez. She has released nine original songs, including the official female
                  version of "Chaand Baaliyan" with Sony Music India, and has performed alongside
                  with Bollywood artists like Lisa Mishra at Beatstreet Delhi.
                </p>
                <p>
                  With 5 years of experience as an educator, her teaching approach centers on
                  customizing training to what each student needs and focusing closely on the
                  virtual music learning company she started, built on the belief that music
                  belongs to everyone, and that everyone deserves a way in.
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVERY VOICE WAS ONCE AFRAID (dark essay section) ------------------- */}
      <section data-testid="essay-section" className="bg-brown-dark text-white">
        <div className="udukku-section py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-12 items-start">
            {/* Image column — fixed 1:1 aspect ratio so the photo is never cropped.
                Sticks in view on desktop as the long story scrolls beside it. */}
            <div className="lg:sticky lg:top-24 self-start w-full">
              <div className="relative rounded-3xl overflow-hidden bg-brown-dark aspect-square">
                <img
                  src="/assets/images/about/story.jpg"
                  alt="The Udukku easel: The Music in You"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text column */}
            <div className="flex flex-col">
              <span className="uppercase tracking-[0.28em] text-xs text-white/60">
                How We Started
              </span>
              <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px] text-white">
                Every great thing starts with a{' '}
                <span className="text-italic-serif text-orange">feeling</span>.
              </h2>

              <div className="mt-8 space-y-6 text-white/85 text-base md:text-lg leading-relaxed">
                <p>
                  Back in 2020, the idea was simple. Create a space where
                  musicians could find each other, connect, and create
                  something meaningful together. Singers could collaborate with
                  producers, tabla players could meet composers, and artists
                  from different backgrounds could come together through music.
                  The idea was planted, and it quietly waited for the right
                  time to grow.
                </p>
                <p>
                  Then life took an unexpected turn. During the COVID years,
                  our founder began teaching music online. It started with
                  just ten students and one on one lessons, but it was enough
                  to keep the passion alive. Even after that chapter ended,
                  the questions kept coming from friends, families, and
                  aspiring musicians.
                </p>

                <div className="pl-5 border-l-2 border-orange/70 space-y-2 text-italic-serif text-white text-lg md:text-xl">
                  <p>"Do you know a good vocal coach?"</p>
                  <p>"Can you recommend a keyboard teacher?"</p>
                  <p>"Is there someone who teaches online?"</p>
                </div>

                <p>
                  It became clear that there was a growing need for a trusted
                  music community.
                </p>
                <p>
                  That is when everything clicked. The community already
                  existed. It simply needed a name and a place to belong.
                </p>
                <p>
                  On 20th August 2025, Udukku Music was officially registered.
                  Musicians came together, a summer camp was organised, events
                  followed, and what started as an idea began turning into
                  something much bigger.
                </p>
                <p>
                  Then came the moment to celebrate that journey. On the eve
                  of Mahashivratri, 14th February 2026, Udukku Music was
                  officially launched. The name "Udukku" is inspired by the
                  Damru, the sacred instrument associated with Lord Shiva and
                  believed to have sounded at the very beginning of creation.
                  Launching on such a special occasion felt less like a
                  decision and more like destiny.
                </p>
                <p>
                  Today, Udukku Music is more than a platform. It is a growing
                  home for musicians, learners, teachers, and music lovers. A
                  place where people connect, learn, collaborate, and
                  celebrate the art that brings us all together.
                </p>
                <p className="text-italic-serif text-orange text-xl md:text-2xl pt-2">
                  And everyone is welcome here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSICAL MUSIC FOR EVERYONE (values on orange) -------------------- */}
      <section data-testid="values-section" className="bg-orange text-white">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-3xl mb-10 md:mb-14">
            <span className="uppercase tracking-[0.28em] text-xs text-white/80">
              What we stand for
            </span>
            <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px]">
              Music{' '}
              <span className="text-italic-serif">for everyone</span>.
            </h2>
            <p className="mt-5 text-white/90 text-base md:text-lg leading-relaxed">
              Whether you're learning, creating, listening, or reconnecting with music, your journey starts here.
              These are the values that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <article
                key={v.title}
                data-testid={`value-${i}`}
                className="bg-orange-dark/40 border border-white/15 rounded-3xl p-6"
              >
                <div className="text-white/60 text-[11px] tracking-[0.28em] uppercase">
                  0{i + 1}
                </div>
                <h3 className="text-italic-serif text-2xl mt-2">
                  {v.title}
                </h3>
                <p className="mt-2 text-white/90 text-sm leading-relaxed">
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA ---------------------------------------------------------- */}
      <section data-testid="about-cta-section" className="bg-brown-dark text-white">
        <div className="udukku-section py-20 md:py-24 text-center flex flex-col items-center">
          <span className="uppercase tracking-[0.28em] text-xs text-white/70">
            Your turn
          </span>
          <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[64px] max-w-3xl">
            Ready to begin your{' '}
            <span className="text-italic-serif text-orange">journey</span>?
          </h2>
          <p className="mt-5 max-w-xl text-white/80 text-base md:text-lg leading-relaxed">
            Your first session is on us. The journey from there is yours. 
            
          </p>
          <Link
            to="/booking"
            data-testid="about-cta-button"
            className="mt-9 inline-flex items-center gap-2 h-12 px-8 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark transition-colors"
          >
            Reserve a free session <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

const VALUES = [
  {
    title: 'Match before method',
    body: 'We match you with a mentor whose teaching style complements yours.',
  },
  {
    title: 'Begin with patience',
    body: 'Every lesson opens with listening, finding your rhythm.',
  },
  {
    title: 'Effort over polish',
    body: 'We celebrate the leap, not the landing. Honesty over perfection.',
  },
  {
    title: 'Progress, Not Pressure ',
    body: 'Every lesson moves with your pace, not a fixed curriculum.',
  },
];
