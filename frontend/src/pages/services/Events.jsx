import React, { useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  ArrowUpRight,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  CalendarX2,
} from 'lucide-react';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceCTA from '../../components/services/ServiceCTA';
import { cityRequestsService } from '../../services/supabase';
import { fetchUpcomingEvents } from '../../data/upcomingEvents';

/* Gallery tiles.
   Ratios are not random: each column's heights are summed and balanced below,
   so the three columns end at (almost) exactly the same height. If you add or
   remove a photo, keep roughly this mix of portrait (3/4, 4/5), square (1/1)
   and landscape (4/3) tiles. */
const PHOTOS = [
  { src: '/assets/images/events/community-listening-circle.jpg', alt: 'A community listening circle in session', caption: 'Community Listening Circle', ratio: 'aspect-[4/5]' },
  { src: '/assets/images/events/indian-classical-evening.jpg', alt: 'An intimate Indian classical performance', caption: 'Indian Classical Evening', ratio: 'aspect-[1/1]' },
  { src: '/assets/images/events/gathering-in-the-round.jpg', alt: 'A gathering held around live music', caption: 'Gathering In The Round', ratio: 'aspect-[4/3]' },
  { src: '/assets/images/events/student-masterclass.jpg', alt: 'A student masterclass in progress', caption: 'Student Masterclass', ratio: 'aspect-[5/6]' },
  { src: '/assets/images/events/before-the-first-note.jpg', alt: 'A quiet moment before the concert begins', caption: 'Before The First Note', ratio: 'aspect-[3/4]' },
  { src: '/assets/images/events/cultural-evening.jpg', alt: 'A cultural performance in full swing', caption: 'Cultural Evening', ratio: 'aspect-[4/5]' },
  { src: '/assets/images/events/workshop-in-session.jpg', alt: 'A workshop with musicians and audience', caption: 'Workshop In Session', ratio: 'aspect-[4/3]' },
  { src: '/assets/images/events/the-closing-bow.jpg', alt: 'A performance closing with applause', caption: 'The Closing Bow', ratio: 'aspect-[4/3]' },
  { src: '/assets/images/events/between-the-ragas.jpg', alt: 'Musicians in conversation between sets', caption: 'Between The Ragas', ratio: 'aspect-[4/3]' },
  { src: '/assets/images/events/event1.jpeg', alt: 'Udukku community event', caption: 'Creative Music Expression', ratio: 'aspect-[1/1]' },
  { src: '/assets/images/events/event3.jpeg', alt: 'Udukku community event', caption: 'Music Brings Everyone', ratio: 'aspect-[1/1]' },
  { src: '/assets/images/events/event4.jpeg', alt: 'Udukku community event', caption: 'Painting Musical Stories', ratio: 'aspect-[4/5]' },
  { src: '/assets/images/events/event5.jpeg', alt: 'Udukku community event', caption: 'Art Meets Music', ratio: 'aspect-[3/4]' },
  { src: '/assets/images/events/event6.jpeg', alt: 'Udukku community event', caption: 'Live Musical Performance', ratio: 'aspect-[1/1]' },
  { src: '/assets/images/events/event7.jpeg', alt: 'Udukku community event', caption: 'Soulful Live Singing', ratio: 'aspect-[5/6]' },
  { src: '/assets/images/events/event2.jpeg', alt: 'Udukku community event', caption: 'Joyful Audience Participation', ratio: 'aspect-[4/3]' },
];

/* ---------- Gallery masonry ----------
   A plain CSS `columns-*` block balances by number of tiles, not by height, so
   the columns end ragged — which is exactly what was happening before. Instead
   we stack the tiles into real columns and choose the split whose columns come
   out closest to the same height, weighing every tile by its own aspect ratio.
   Result: level bottoms at 1, 2 and 3 columns. */

/* Height of each ratio, expressed in column-widths. */
const RATIO_HEIGHT = {
  'aspect-[3/4]': 4 / 3,
  'aspect-[4/5]': 5 / 4,
  'aspect-[5/6]': 6 / 5,
  'aspect-[1/1]': 1,
  'aspect-[4/3]': 3 / 4,
};

/* Rough allowance for the gap between tiles, in column-widths (~20px at 1000px). */
const GALLERY_GAP = 0.02;

const GALLERY_COLUMNS = [0, 1, 2]; // renders one column on mobile, two from sm, three from lg

const buildGalleryColumns = (photos, columnCount) => {
  if (photos.length === 0) return [];

  const heightOf = ([a, b]) => {
    let h = 0;
    for (let i = a; i < b; i += 1) h += RATIO_HEIGHT[photos[i].ratio] || 1;
    return h + Math.max(0, b - a - 1) * GALLERY_GAP;
  };

  /* Each column stays a contiguous run of tiles, so visual order is preserved
     left to right, top to bottom. That makes this a partition problem — and at
     gallery size we can simply try every split and keep the most level one. */
  let best = null;

  const split = (start, remaining, parts) => {
    if (remaining === 1) {
      const candidate = [...parts, [start, photos.length]];
      const heights = candidate.map(heightOf);
      const spread = Math.max(...heights) - Math.min(...heights);
      const tallest = Math.max(...heights);
      if (
        !best ||
        spread < best.spread - 1e-9 ||
        (Math.abs(spread - best.spread) < 1e-9 && tallest < best.tallest)
      ) {
        best = { parts: candidate, spread, tallest };
      }
      return;
    }
    const lastStart = photos.length - remaining + 1;
    for (let end = start + 1; end <= lastStart; end += 1) {
      split(end, remaining - 1, [...parts, [start, end]]);
    }
  };

  if (photos.length < columnCount) {
    return photos.map((photo, index) => [{ photo, index }]);
  }

  split(0, columnCount, []);

  return best.parts.map(([a, b]) =>
    photos.slice(a, b).map((photo, i) => ({ photo, index: a + i }))
  );
};

/* Number of columns used at the current viewport (1 mobile / 2 sm / 3 lg),
   so the balancing can happen in JS where it is measurable. */
const useGalleryColumnCount = () => {
  const [count, setCount] = useState(() =>
    typeof window === 'undefined'
      ? 3
      : window.matchMedia('(min-width: 1024px)').matches
      ? 3
      : window.matchMedia('(min-width: 640px)').matches
      ? 2
      : 1
  );

  useLayoutEffect(() => {
    const mqSm = window.matchMedia('(min-width: 640px)');
    const mqLg = window.matchMedia('(min-width: 1024px)');
    const sync = () => setCount(mqLg.matches ? 3 : mqSm.matches ? 2 : 1);

    sync();
    mqSm.addEventListener('change', sync);
    mqLg.addEventListener('change', sync);
    return () => {
      mqSm.removeEventListener('change', sync);
      mqLg.removeEventListener('change', sync);
    };
  }, []);

  return count;
};

export default function Events() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', city: '', interest: '' });
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const galleryColumns = buildGalleryColumns(PHOTOS, useGalleryColumnCount());

  const [events, setEvents] = useState([]);
  useEffect(() => {
    let live = true;
    fetchUpcomingEvents()
      .then((data) => {
        if (live) setEvents(data);
      })
      .catch(() => {
        if (live) setEvents([]);
      });
    return () => {
      live = false;
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!form.name || !form.email || !form.city) {
      toast.error('Name, email and city are required.');
      return;
    }
    setLoading(true);
    try {
      await cityRequestsService.create({
        name: form.name,
        email: form.email,
        city: form.city,
        eventInterest: form.interest,
      });
      setOk(true);
      setForm({ name: '', email: '', city: '', interest: '' });
      toast.success('Request received. We will reach out when we head your way.');
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="events-page" className="bg-white page-fade-in">
      <style>{`
        @keyframes udukku-rise { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:translateY(0);} }
        @keyframes udukku-drift { 0% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-14px) rotate(-2deg); } 100% { transform: translateY(0px) rotate(-2deg); } }
      `}</style>

      <ServiceHero
        testId="events-hero"
        eyebrow="Events"
        headline={<>Our rooms  full of <span className="text-italic-serif text-orange">music</span></>}
        description="From turning music into art to coming together for jams and immersive experiences, our events are about coming together, expressing yourself and enjoying music in all its forms."
        pills={['Art', 'Poetry', 'Creativity', 'Open mics', 'Workshops']}
        imageSrc="/assets/images/events/cultural-evening.jpg"
        imageAlt="A cultural performance in full swing"
        //chipTitle="Live, In Person"
        //chipSubtitle="Where music becomes community"
      />

      {/* Editorial gallery — dark editorial band */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
          <h2 className="text-display text-white text-3xl md:text-4xl mb-6">
            Evenings that stayed with us
          </h2>
          <div
            data-testid="events-gallery"
            className="flex items-start gap-4 md:gap-5"
          >
            {GALLERY_COLUMNS.slice(0, galleryColumns.length).map((c) => (
              <div
                key={c}
                data-testid={`events-gallery-column-${c}`}
                className="flex-1 min-w-0 flex flex-col gap-4 md:gap-5"
              >
                {galleryColumns[c].map(({ photo: p, index: i }) => (
                  <figure
                    key={p.src}
                    data-testid={`events-photo-${i}`}
                    className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5"
                    style={{ animation: `udukku-rise 0.7s ease ${0.05 * i}s both` }}
                  >
                    <div className={`${p.ratio} w-full overflow-hidden`}>
                      <img
                        src={p.src}
                        alt={p.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/55 via-black/10 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-italic-serif text-lg md:text-xl leading-tight">
                        {p.caption}
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-white/60 text-sm">
            Follow us for updates.
          </p>
        </div>
      </section>

      {/* Upcoming Events — dynamic, Supabase-ready */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10 md:mb-12">
            <h2 className="text-display text-brown-dark text-3xl md:text-4xl">
              Upcoming <span className="text-italic-serif text-orange">Events</span>
            </h2>
            <p className="mt-4 text-brown-mid text-base md:text-lg leading-relaxed">
              Discover what&apos;s happening next at Udukku. Join our upcoming
              concerts, workshops, music rooms and community experiences.
            </p>
          </div>

          {events.length > 0 ? (
            <>
              <div
                data-testid="upcoming-events-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
              >
                {events.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
              <div className="mt-10 md:mt-12 flex justify-center">
                <a
                  href="#"
                  data-testid="view-all-events"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white border border-brown-dark/15 text-brown-dark text-[15px] font-medium hover:border-orange hover:text-orange transition-colors"
                >
                  View All Events
                  <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
                </a>
              </div>
            </>
          ) : (
            <div
              data-testid="upcoming-events-empty"
              className="rounded-2xl bg-white border border-brown-dark/10 p-10 md:p-12 flex flex-col items-center text-center"
            >
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange/10 text-orange mb-4">
                <CalendarX2 className="w-6 h-6" strokeWidth={1.8} />
              </span>
              <h3 className="text-display text-brown-dark text-2xl md:text-3xl">
                No upcoming events at the moment.
              </h3>
              <p className="mt-3 text-brown-mid max-w-md leading-relaxed">
                Stay tuned, new experiences will be announced soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bring Udukku to your city — dark editorial band, form in cream card */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
          <div
            data-testid="bring-udukku-card"
            className="rounded-[28px] md:rounded-[36px] bg-cream border border-brown-dark/10 p-8 md:p-12"
          >
            <div className="max-w-3xl mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-orange mb-4">
                <MapPin className="w-4 h-4" strokeWidth={1.8} />
                Bring Udukku To You
              </span>
              <h2
                data-testid="bring-udukku-headline"
                className="text-display text-brown-dark text-3xl sm:text-4xl md:text-[44px] leading-[1.05]"
              >
                Want us to visit your{' '}
                <span className="text-italic-serif text-orange">city</span>?
              </h2>
              <p className="mt-4 text-brown-mid text-base md:text-lg leading-relaxed max-w-2xl">
                Tell us where you are and what kind of session you would love.
                We will reach out when we are heading your way.
              </p>
            </div>

            {ok ? (
              <div
                data-testid="bring-udukku-success"
                className="rounded-2xl bg-white border border-orange/40 p-7 max-w-xl"
              >
                <div className="flex items-center gap-3 text-orange">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="text-display text-2xl text-brown-dark">
                    Request received.
                  </span>
                </div>
                <p className="mt-3 text-brown-mid">
                  A curator from Udukku will reach out soon to explore what
                  we could hold together in {form.city || 'your city'}.
                </p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                data-testid="bring-udukku-form"
                className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-3xl"
              >
                <LightField
                  label="Your Name *"
                  name="name"
                  testid="bring-field-name"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={onChange}
                  required
                />
                <LightField
                  label="Email *"
                  name="email"
                  type="email"
                  testid="bring-field-email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={onChange}
                  required
                />
                <LightField
                  wide
                  label="Your City *"
                  name="city"
                  testid="bring-field-city"
                  placeholder="e.g. Bangalore, Singapore, Dubai..."
                  value={form.city}
                  onChange={onChange}
                  required
                />
                <LightTextarea
                  label="What kind of event interests you?"
                  name="interest"
                  testid="bring-field-interest"
                  rows={4}
                  placeholder="e.g. Corporate wellness workshop, music meditation session, instrument masterclass..."
                  value={form.interest}
                  onChange={onChange}
                />
                <div className="md:col-span-2 mt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="bring-submit"
                    className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white text-[15px] font-medium hover:bg-orange-dark transition-colors disabled:opacity-60"
                  >
                    {loading ? 'Sending…' : 'Send My Request'}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <ServiceCTA
        eyebrow="WANT US THERE?"
        headline={<>Bring an Udukku experience <span className="text-italic-serif text-orange">to your city</span></>}
        description="Talk to our events team to make it happen."
        //ctaLabel="Talk to our team"
        //ctaTo="/contact"
        testId="events-book-cta"
      />
    </main>
  );
}

/* ---------- Upcoming event card ---------- */
const STATUS_STYLES = {
  Upcoming: 'bg-white border-brown-dark/15 text-brown-dark',
  'Limited Seats': 'bg-orange text-white border-orange',
  'Sold Out': 'bg-brown-dark text-white border-brown-dark',
};

const formatEventDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

const EventCard = ({ event, index = 0 }) => {
  const statusClass =
    STATUS_STYLES[event.status] || STATUS_STYLES.Upcoming;
  const soldOut = event.status === 'Sold Out';
  return (
    <article
      data-testid={`event-card-${event.id}`}
      className="group rounded-2xl md:rounded-3xl bg-white border border-brown-dark/10 overflow-hidden flex flex-col hover:border-orange/40 hover:shadow-[0_25px_70px_-40px_rgba(102,54,20,0.35)] transition-all duration-500"
      style={{ animation: `udukku-rise 0.6s ease ${0.06 * index}s both` }}
    >
      {event.cover_image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={event.cover_image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          {event.status && (
            <span
              className={`absolute top-3 right-3 inline-flex items-center h-7 px-3 rounded-full border text-[11px] uppercase tracking-[0.18em] font-medium ${statusClass}`}
            >
              {event.status}
            </span>
          )}
        </div>
      ) : null}

      <div className="p-6 md:p-7 flex-1 flex flex-col">
        {event.category && (
          <span className="inline-flex self-start items-center h-7 px-3 rounded-full bg-cream border border-brown-dark/10 text-orange text-[11px] uppercase tracking-[0.22em] font-medium mb-4">
            {event.category}
          </span>
        )}

        <h3 className="text-display text-brown-dark text-xl md:text-2xl leading-tight">
          {event.title}
        </h3>

        <dl className="mt-4 grid grid-cols-1 gap-1.5 text-brown-mid text-sm">
          {event.event_date && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange shrink-0" strokeWidth={1.8} />
              <span>{formatEventDate(event.event_date)}</span>
            </div>
          )}
          {event.event_time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange shrink-0" strokeWidth={1.8} />
              <span>{event.event_time}</span>
            </div>
          )}
          {event.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange shrink-0" strokeWidth={1.8} />
              <span>{event.venue}</span>
            </div>
          )}
        </dl>

        {event.description && (
          <p className="mt-4 text-brown-mid text-sm md:text-[15px] leading-relaxed line-clamp-3">
            {event.description}
          </p>
        )}

        <div className="mt-6 pt-2">
          {soldOut ? (
            <span
              data-testid={`event-card-${event.id}-cta`}
              aria-disabled
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-brown-dark/10 text-brown-mid text-sm font-medium cursor-not-allowed"
            >
              Sold Out
            </span>
          ) : (
            <a
              href={event.cta_url || '#'}
              data-testid={`event-card-${event.id}-cta`}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-orange text-white text-sm font-medium hover:bg-orange-dark transition-colors"
            >
              {event.cta_label || 'Learn More'}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

/* ---------- Light form fields (on cream card) ---------- */
const LightField = ({ label, wide, testid, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">
      {label}
    </span>
    <input
      {...props}
      data-testid={testid}
      className="w-full h-12 rounded-2xl bg-white border border-brown-dark/15 px-4 text-brown-dark placeholder:text-brown-mid/60 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition text-sm"
    />
  </label>
);

const LightTextarea = ({ label, wide = true, testid, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">
      {label}
    </span>
    <textarea
      {...props}
      data-testid={testid}
      className="w-full rounded-2xl bg-white border border-brown-dark/15 px-4 py-3 text-brown-dark placeholder:text-brown-mid/60 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition resize-none text-sm"
    />
  </label>
);