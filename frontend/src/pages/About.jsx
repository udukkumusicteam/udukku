import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import WaveDivider from '../components/WaveDivider';

// ---------------------------------------------------------------------------
// IMAGE ASSETS — replace these placeholder URLs with the studio's own photos.
// Each one is independent; aspect ratios are preserved by the layout.
// ---------------------------------------------------------------------------
const IMAGE_FOUNDER =
  'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/2zn5nfa0_Founder_photo.jpg';
const IMAGE_LEARNERS =
  'https://images.unsplash.com/photo-1519508234439-4f23643125c1?auto=format&fit=crop&w=1400&q=80';

export default function About() {
  return (
    <main data-testid="about-page" className="bg-cream">
      {/* HERO ---------------------------------------------------------------- */}
      <section className="bg-hero-gradient text-white">
        <div className="udukku-section pt-28 md:pt-32 pb-14 md:pb-20">
          <span className="uppercase tracking-[0.28em] text-[11px] text-white/80">
            About Udukku
          </span>
          <h1 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[72px] xl:text-[80px] max-w-[16ch]">
            Rooted in feeling,
            <br />
            <span className="text-italic-serif">Built for belonging.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/90 text-base md:text-lg leading-relaxed">
            Udukku began with a quiet question. What if learning music felt
            less like a test and more like coming home? Five years later, that
            question still shapes everything we do.
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
                  Ishita Parakh is a musician, educator, and creator whose life
                  orbits music, creativity, and the deep joy of helping others
                  find their voice. As a singer-songwriter, she has built a
                  following drawn to her soulful, genre-bending sound. Music
                  that feels both intimate and expansive.
                </p>
                <p>
                  Her approach to teaching is shaped by lived experience, in
                  the classroom, on stage, and within the quiet spaces where
                  music meets emotion. She honours the roots of tradition while
                  making room for personal evolution, and that philosophy is
                  woven into everything Udukku stands for.
                </p>
                <p>
                  Ishita has guided learners of every age and background, not
                  just to play better, but to feel more freely. Through Udukku,
                  she is building something she always wished existed. A place
                  where music education is warm, accessible, and genuinely
                  transformative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVERY VOICE WAS ONCE AFRAID (dark essay section) ------------------- */}
      <section data-testid="essay-section" className="bg-brown-dark text-white">
        <div className="udukku-section py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
            <div>
              <span className="uppercase tracking-[0.28em] text-xs text-white/60">
                How We Started
              </span>
              <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px] text-white">
                Every great thing starts with a{' '}
                <span className="text-italic-serif text-orange">feeling</span>.
              </h2>
            </div>

            <div className="space-y-6 text-white/85 text-base md:text-lg leading-relaxed">
              <p>
                Back in 2020, the idea was simple. Create a space where
                musicians could find each other, connect, and create something
                meaningful together. Singers could collaborate with producers,
                tabla players could meet composers, and artists from different
                backgrounds could come together through music. The idea was
                planted, and it quietly waited for the right time to grow.
              </p>
              <p>
                Then life took an unexpected turn. During the COVID years, our
                founder began teaching music online. It started with just ten
                students and one on one lessons, but it was enough to keep the
                passion alive. Even after that chapter ended, the questions
                kept coming from friends, families, and aspiring musicians.
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
                Then came the moment to celebrate that journey. On the eve of
                Mahashivratri, 14th February 2026, Udukku Music was officially
                launched. The name "Udukku" is inspired by the Damru, the
                sacred instrument associated with Lord Shiva and believed to
                have sounded at the very beginning of creation. Launching on
                such a special occasion felt less like a decision and more
                like destiny.
              </p>
              <p>
                Today, Udukku Music is more than a platform. It is a growing
                home for musicians, learners, teachers, and music lovers. A
                place where people connect, learn, collaborate, and celebrate
                the art that brings us all together.
              </p>
              <p className="text-italic-serif text-orange text-xl md:text-2xl pt-2">
                And everyone is welcome here.
              </p>
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
              Classical music{' '}
              <span className="text-italic-serif">for everyone</span>.
            </h2>
            <p className="mt-5 text-white/90 text-base md:text-lg leading-relaxed">
              These are not slogans on a wall. They are the small daily choices
              we make about how a lesson begins, how a mistake is held, and how
              a student is sent home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <article
                key={v.title}
                data-testid={`value-${i}`}
                className="bg-orange-dark/40 border border-white/15 rounded-3xl p-7"
              >
                <div className="text-white/60 text-[11px] tracking-[0.28em] uppercase">
                  0{i + 1}
                </div>
                <h3 className="text-italic-serif text-2xl md:text-[26px] mt-2">
                  {v.title}
                </h3>
                <p className="mt-3 text-white/90 text-[15px] leading-relaxed">
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MADE FOR LEARNERS (alternating image / text) ----------------------- */}
      <section data-testid="learners-section" className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
                How we teach
              </span>
              <h2 className="text-display mt-3 text-4xl sm:text-5xl lg:text-[56px] text-brown-dark">
                Made for learners to{' '}
                <span className="text-italic-serif text-orange">
                  stay learners
                </span>.
              </h2>
              <p className="mt-5 text-brown-mid text-base md:text-lg leading-relaxed max-w-xl">
                Most students leave music when the room stops being kind. We
                designed Udukku so that does not have to happen. Small class
                sizes. Mentors who teach the way they once wished to be taught.
                Practice frames that fit your week instead of crowding it.
              </p>

              <ul className="mt-7 space-y-3 text-brown-dark">
                {[
                  'One on one and small group formats, both online and in studio',
                  'Mentor matching based on temperament, not just instrument',
                  'Recitals that celebrate effort over polish',
                  'Open community jams every Tuesday evening',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                    <span className="text-[15px] leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-1 lg:order-2">
              <div
                className="relative w-full overflow-hidden rounded-3xl bg-brown-light/40"
                style={{ aspectRatio: '4 / 5' }}
              >
                <img
                  src={IMAGE_LEARNERS}
                  alt="A student practising at Udukku"
                  className="absolute inset-0 w-full h-full object-cover sepia-soft"
                />
              </div>
            </div>
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
            Your first session is on us. No auditions. No pressure. Just an
            hour to remember what music feels like.
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
    title: 'Begin with patience',
    body:
      'Every lesson starts with listening. We do not push, prescribe, or rush. The right speed is the speed you can return to next week.',
  },
  {
    title: 'Match before method',
    body:
      'You are matched with a mentor whose temperament fits yours. Method comes after trust, not before.',
  },
  {
    title: 'Effort, not polish',
    body:
      'Our recitals reward the leap, not the landing. The bravest performance in the room is always the most honest one.',
  },
  {
    title: 'No gatekeepers',
    body:
      'No auditions, no waitlist screening, no quiet messages that say you are not ready. If you want to learn, you are welcome.',
  },
  {
    title: 'Music as a habit',
    body:
      'Talent is a story. Habit is a fact. We help you build a small daily relationship with music that you can carry for a lifetime.',
  },
  {
    title: 'A community, not a classroom',
    body:
      'Open jams, listening evenings, and student showcases keep music alive between lessons. You belong to the studio, not just the schedule.',
  },
];
