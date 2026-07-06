import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  Flame,
  GraduationCap,
  Music3,
  Sparkles,
  Users,
  BookOpen,
  Wand2,
} from 'lucide-react';
import WaveDivider from '../../components/WaveDivider';
import BrandIcon from '../../components/BrandIcon';
import { contactService } from '../../services/apiService';

const PHOTOS = [
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/6csi50ns_DSC05863%20%281%29.jpg',
    alt: 'A community listening circle in session',
    caption: 'Community Listening Circle',
    ratio: 'aspect-[4/5]',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/amdyxgg7_IMG_5257.JPG',
    alt: 'An intimate Indian classical performance',
    caption: 'Indian Classical Evening',
    ratio: 'aspect-[3/4]',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/ddnac6h8_DSC06010%20%281%29.jpg',
    alt: 'A gathering held around live music',
    caption: 'Gathering In The Round',
    ratio: 'aspect-[4/3]',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/og6vi7lu_IMG_2906.jpg',
    alt: 'A student masterclass in progress',
    caption: 'Student Masterclass',
    ratio: 'aspect-[3/4]',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/3mcpimz7_DSC05252%20%281%29.jpg',
    alt: 'A quiet moment before the concert begins',
    caption: 'Before The First Note',
    ratio: 'aspect-[4/3]',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/iqyui4mw_c3d6cce6-82d4-430c-a2d1-4075625e9fc6.JPG',
    alt: 'A cultural performance in full swing',
    caption: 'Cultural Evening',
    ratio: 'aspect-[3/4]',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/6mwlqdin_IMG_3251.jpg',
    alt: 'A workshop with musicians and audience',
    caption: 'Workshop In Session',
    ratio: 'aspect-[4/5]',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/w74xnqq6_DSC05418%20%281%29.jpg',
    alt: 'A performance closing with applause',
    caption: 'The Closing Bow',
    ratio: 'aspect-[4/3]',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/4dhds8th_DSC06024%20%281%29.jpg',
    alt: 'Musicians in conversation between sets',
    caption: 'Between The Ragas',
    ratio: 'aspect-[3/4]',
  },
];

const CATEGORIES = [
  { icon: Building2, title: 'Corporate Events' },
  { icon: Flame, title: 'Cultural Festivals' },
  { icon: GraduationCap, title: 'School & College Programs' },
  { icon: Music3, title: 'Private Concerts' },
  { icon: Sparkles, title: 'Spiritual Gatherings' },
  { icon: Users, title: 'Community Events' },
  { icon: BookOpen, title: 'Workshops' },
  { icon: Wand2, title: 'Custom Performances' },
];

const BackLink = () => (
  <Link
    to="/services"
    data-testid="back-to-services"
    className="flex w-fit items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
  >
    <ArrowLeft className="w-4 h-4" /> Back to Services
  </Link>
);

export default function Events() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    interest: '',
  });
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.create({
        name: form.name,
        email: form.email,
        subject: `Bring Udukku to ${form.city}`,
        message: [
          `City: ${form.city}`,
          '',
          'Kind of event they are interested in:',
          form.interest || 'Not specified',
        ].join('\n'),
      });
      setOk(true);
      toast.success('Request received. We will reach out when we head your way.');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main data-testid="events-page" className="bg-white page-fade-in">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
        <div className="relative udukku-section pt-28 md:pt-32 pb-20 md:pb-28">
          <BackLink />
          <span
            data-testid="events-eyebrow"
            className="reveal mt-8 inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/85 mb-6"
          >
            <BrandIcon size={14} /> Events
          </span>
          <h1
            data-testid="events-headline"
            className="reveal text-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.02] max-w-5xl"
            style={{ transitionDelay: '80ms' }}
          >
            Where music becomes{' '}
            <span className="text-italic-serif text-white/95">community</span>.
          </h1>
          <p
            className="reveal mt-8 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed"
            style={{ transitionDelay: '160ms' }}
          >
            From intimate raga listening circles to corporate wellness
            workshops, Udukku events bring people together through the shared
            experience of music. Each event is a space for curiosity,
            connection, and calm.
          </p>
        </div>
        <WaveDivider fill="#FBF6EA" />
      </section>

      {/* ---------- Editorial gallery ---------- */}
      <section className="bg-cream">
        <div className="udukku-section pt-16 md:pt-20 pb-20 md:pb-28">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10 md:mb-14">
            <div>
              <span className="uppercase tracking-[0.28em] text-xs text-orange">
                From our events
              </span>
              <h2 className="text-display text-brown-dark text-3xl sm:text-4xl md:text-[52px] leading-[1.05] mt-4 max-w-2xl">
                Rooms we have{' '}
                <span className="text-italic-serif text-orange">held</span>.
              </h2>
            </div>
            <p className="text-brown-mid max-w-sm text-sm md:text-base leading-relaxed">
              A quiet archive of evenings, mornings, and afternoons that music
              gathered around itself.
            </p>
          </div>

          {/* Masonry columns — natural varied sizes */}
          <div
            data-testid="events-gallery"
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 [column-fill:_balance]"
          >
            {PHOTOS.map((p, i) => (
              <figure
                key={p.src}
                data-testid={`events-photo-${i}`}
                className="mb-4 md:mb-5 break-inside-avoid group relative overflow-hidden rounded-2xl md:rounded-3xl bg-brown-dark/5"
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

          <p className="mt-10 md:mt-12 text-center text-brown-mid/70 text-sm">
            More event photos coming soon. Follow us for updates.
          </p>
        </div>
      </section>

      {/* ---------- Category icon cards (examples, not navigational) ---------- */}
      <section className="bg-white">
        <div className="udukku-section py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 mb-12 md:mb-16">
            <div className="lg:col-span-5">
              <span className="uppercase tracking-[0.28em] text-xs text-orange">
                What we hold
              </span>
              <h2 className="text-display text-brown-dark text-3xl sm:text-4xl md:text-[52px] leading-[1.05] mt-4">
                A few kinds of{' '}
                <span className="text-italic-serif text-orange">evenings</span>.
              </h2>
            </div>
            <p className="lg:col-span-6 lg:col-start-7 text-brown-mid text-base md:text-lg leading-relaxed">
              Just a few examples of what we hold. We shape every performance
              around the room in front of us, so if what you have in mind is
              not listed here, tell us. We probably do it anyway.
            </p>
          </div>

          <div
            data-testid="events-category-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              const slug = c.title.toLowerCase().replace(/[^a-z]+/g, '-');
              return (
                <article
                  key={c.title}
                  data-testid={`events-category-${slug}`}
                  className="card-lift rounded-3xl p-7 bg-cream border border-brown-dark/10 flex flex-col items-start"
                  style={{
                    animation: `udukku-rise 0.55s ease ${0.05 * i}s both`,
                  }}
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/10 border border-orange/25 text-orange">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-display text-brown-dark text-xl md:text-2xl mt-5">
                    {c.title}
                  </h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Bring Udukku to Your City ---------- */}
      <section className="bg-cream">
        <div className="udukku-section pb-24 md:pb-32">
          <div
            data-testid="bring-udukku-card"
            className="relative overflow-hidden rounded-[28px] md:rounded-[36px] bg-hero-gradient text-white"
          >
            <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
            <div className="relative p-8 sm:p-10 md:p-14 lg:p-16">
              <div className="max-w-3xl mb-10 md:mb-12">
                <span className="inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/90 mb-5">
                  <MapPin className="w-4 h-4" strokeWidth={1.8} />
                  Bring Udukku To You
                </span>
                <h2
                  data-testid="bring-udukku-headline"
                  className="text-display text-white text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Want us to visit your{' '}
                  <span className="text-italic-serif text-white/95">city</span>?
                </h2>
                <p className="mt-5 text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
                  We are always looking to expand our events. Tell us where you
                  are and what kind of session you would love. We will reach
                  out when we are heading your way.
                </p>
              </div>

              {ok ? (
                <div
                  data-testid="bring-udukku-success"
                  className="rounded-2xl bg-white/10 border border-white/25 backdrop-blur-sm p-7 md:p-8 max-w-xl"
                >
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-display text-2xl">
                      Request received.
                    </span>
                  </div>
                  <p className="mt-3 text-white/85">
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
                  <BringField
                    label="Your Name *"
                    name="name"
                    testid="bring-field-name"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={onChange}
                    required
                  />
                  <BringField
                    label="Email *"
                    name="email"
                    type="email"
                    testid="bring-field-email"
                    placeholder="example@gmail.com"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                  <BringField
                    wide
                    label="Your City *"
                    name="city"
                    testid="bring-field-city"
                    placeholder="e.g. Bangalore, Singapore, Dubai..."
                    value={form.city}
                    onChange={onChange}
                    required
                  />
                  <BringTextarea
                    label="What kind of event interests you?"
                    name="interest"
                    testid="bring-field-interest"
                    rows={4}
                    placeholder="e.g. Corporate wellness workshop, music meditation session, instrument masterclass..."
                    value={form.interest}
                    onChange={onChange}
                  />
                  <div className="md:col-span-2 mt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      data-testid="bring-submit"
                      className="inline-flex items-center gap-2.5 h-12 md:h-[52px] px-7 rounded-full bg-brown-dark text-white text-base font-medium hover:bg-black transition-colors disabled:opacity-60"
                    >
                      {loading ? 'Sending…' : 'Send My Request'}
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Local animation for staggered photo reveals */}
      <style>{`
        @keyframes udukku-rise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

/* ---------- Bring Udukku form fields (glass on orange) ---------- */
const BringField = ({ label, wide, testid, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-white/85 mb-2">
      {label}
    </span>
    <input
      {...props}
      data-testid={testid}
      className="w-full h-12 md:h-[52px] rounded-2xl bg-white/[0.16] border border-white/30 px-5 text-white placeholder:text-white/55 focus:outline-none focus:border-white focus:bg-white/[0.22] transition-colors"
    />
  </label>
);

const BringTextarea = ({ label, wide = true, testid, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-white/85 mb-2">
      {label}
    </span>
    <textarea
      {...props}
      data-testid={testid}
      className="w-full rounded-2xl bg-white/[0.16] border border-white/30 px-5 py-4 text-white placeholder:text-white/55 focus:outline-none focus:border-white focus:bg-white/[0.22] transition-colors resize-none"
    />
  </label>
);
