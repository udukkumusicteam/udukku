import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import WaveDivider from '../components/WaveDivider';

// ---------------------------------------------------------------------------
// IMAGE ASSETS — replace these placeholder URLs with the studio's own photos.
// Each one is independent; aspect ratios are preserved by the layout.
// ---------------------------------------------------------------------------
const IMAGE_FOUNDER =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80';
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
                  className="absolute inset-0 w-full h-full object-cover sepia-soft"
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
                A note from the founder
              </span>
              <h2 className="text-display mt-3 text-4xl sm:text-5xl lg:text-[56px] text-brown-dark">
                Ishita Parakh
              </h2>
              <p className="text-italic-serif text-orange text-lg mt-1">
                Founder & Artistic Director
              </p>

              <div className="mt-7 space-y-5 text-brown-mid text-base md:text-lg leading-relaxed max-w-2xl">
                <p>
                  I grew up loving music in spaces that did not always love me
                  back. Classes that measured everything except joy. Recitals
                  that rewarded the polished few and quietly dismissed the rest.
                  I kept playing anyway, but I never forgot how that felt.
                </p>
                <p>
                  Udukku is what I wish I had walked into when I was eleven and
                  trying to find my voice. A room that begins with patience. A
                  mentor who listens before they correct. The freedom to be a
                  beginner for as long as you need to.
                </p>
                <p>
                  I do not believe music belongs to anyone. I believe music
                  belongs to whoever is brave enough to reach for it. Our work
                  is simply to keep that door wide open.
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
                Why we exist
              </span>
              <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px] text-white">
                Every voice was{' '}
                <span className="text-italic-serif text-orange">once afraid</span>.
              </h2>
            </div>

            <div className="space-y-6 text-white/85 text-base md:text-lg leading-relaxed">
              <p>
                Somewhere along the way, music became a thing you had to earn.
                You had to be young enough, talented enough, disciplined enough,
                brave enough. So most of us learned to listen, and very few of
                us ever learned to play.
              </p>
              <p>
                We think that is a loss worth fixing. Not by lowering the
                ceiling, but by softening the door. Our students arrive with
                every kind of story. Some are eight. Some are sixty eight. Some
                are returning to an instrument they left behind in school. Some
                are starting for the very first time, terrified that it is too
                late.
              </p>
              <p>
                It is not too late. It is never too late.
              </p>
              <p>
                At Udukku, every voice is met where it is. Not where the
                curriculum expects it to be. The first lesson is not about
                scales. It is about trust. The rest is built on top of that,
                slowly, lovingly, and at your pace.
              </p>
              <p className="text-italic-serif text-orange text-xl md:text-2xl pt-4">
                You did not fail at music. Music has been waiting for you.
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
