import React, { useState } from 'react';
import { toast } from 'sonner';
import { ArrowUpRight, MapPin, Send, CheckCircle2 } from 'lucide-react';
import BrandIcon from '../../components/BrandIcon';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceCTA from '../../components/services/ServiceCTA';
import { cityRequestsService } from '../../services/supabase';

const PHOTOS = [
  { src: '/assets/images/events/community-listening-circle.jpg', alt: 'A community listening circle in session', caption: 'Community Listening Circle', ratio: 'aspect-[4/5]' },
  { src: '/assets/images/events/indian-classical-evening.jpg', alt: 'An intimate Indian classical performance', caption: 'Indian Classical Evening', ratio: 'aspect-[3/4]' },
  { src: '/assets/images/events/gathering-in-the-round.jpg', alt: 'A gathering held around live music', caption: 'Gathering In The Round', ratio: 'aspect-[4/3]' },
  { src: '/assets/images/events/student-masterclass.jpg', alt: 'A student masterclass in progress', caption: 'Student Masterclass', ratio: 'aspect-[3/4]' },
  { src: '/assets/images/events/before-the-first-note.jpg', alt: 'A quiet moment before the concert begins', caption: 'Before The First Note', ratio: 'aspect-[4/3]' },
  { src: '/assets/images/events/cultural-evening.jpg', alt: 'A cultural performance in full swing', caption: 'Cultural Evening', ratio: 'aspect-[3/4]' },
  { src: '/assets/images/events/workshop-in-session.jpg', alt: 'A workshop with musicians and audience', caption: 'Workshop In Session', ratio: 'aspect-[4/5]' },
  { src: '/assets/images/events/the-closing-bow.jpg', alt: 'A performance closing with applause', caption: 'The Closing Bow', ratio: 'aspect-[4/3]' },
  { src: '/assets/images/events/between-the-ragas.jpg', alt: 'Musicians in conversation between sets', caption: 'Between The Ragas', ratio: 'aspect-[3/4]' },
];

const CATEGORIES = [
  { title: 'Corporate Events' },
  { title: 'Cultural Festivals' },
  { title: 'School & College Programs' },
  { title: 'Private Concerts' },
  { title: 'Spiritual Gatherings' },
  { title: 'Community Events' },
  { title: 'Workshops' },
  { title: 'Custom Performances' },
];

export default function Events() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', city: '', interest: '' });
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
        headline={<>Where music becomes <span className="text-italic-serif text-orange">community</span>.</>}
        description="From intimate raga listening circles to corporate wellness workshops, Udukku events bring people together through the shared experience of music."
        pills={['Corporate', 'Cultural', 'Community', 'Private', 'Workshops']}
        imageSrc="/assets/images/events/cultural-evening.jpg"
        imageAlt="A cultural performance in full swing"
        chipTitle="Live, In Person"
        chipSubtitle="Where music becomes community"
      />

      {/* Editorial gallery — dark editorial band */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
          <h2 className="text-display text-white text-3xl md:text-4xl mb-6">
            Evenings that stayed with us
          </h2>
          <div
            data-testid="events-gallery"
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 [column-fill:_balance]"
          >
            {PHOTOS.map((p, i) => (
              <figure
                key={p.src}
                data-testid={`events-photo-${i}`}
                className="mb-4 md:mb-5 break-inside-avoid group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5"
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
          <p className="mt-10 text-center text-white/60 text-sm">
            More event photos coming soon. Follow us for updates.
          </p>
        </div>
      </section>

      {/* Category cards — cream tiles matching the Instruments visual rhythm */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <h2 className="text-display text-brown-dark text-3xl md:text-4xl mb-6">
            A few kinds of evenings
          </h2>
          <p className="max-w-2xl text-brown-mid text-base md:text-lg leading-relaxed mb-10">
            Just a few examples of what we hold. If what you have in mind is
            not listed here, tell us.
          </p>
          <div
            data-testid="events-category-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {CATEGORIES.map((c, i) => {
              const slug = c.title.toLowerCase().replace(/[^a-z]+/g, '-');
              return (
                <article
                  key={c.title}
                  data-testid={`events-category-${slug}`}
                  className="rounded-2xl p-6 bg-white border border-brown-dark/10 hover:border-orange/40 transition-colors min-h-[110px] flex items-center"
                  style={{ animation: `udukku-rise 0.55s ease ${0.05 * i}s both` }}
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-cream border border-brown-dark/10 text-orange mr-4 shrink-0">
                    <BrandIcon size={16} />
                  </span>
                  <h3 className="text-display text-brown-dark text-lg md:text-xl leading-tight">
                    {c.title}
                  </h3>
                </article>
              );
            })}
          </div>
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
        eyebrow="Host an evening"
        headline={<>Ready to hold an <span className="text-italic-serif text-orange">evening</span>?</>}
        description="Talk to our events team and shape a gathering that feels distinctly yours."
        ctaLabel="Talk to our team"
        ctaTo="/contact"
        testId="events-book-cta"
      />
    </main>
  );
}

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
