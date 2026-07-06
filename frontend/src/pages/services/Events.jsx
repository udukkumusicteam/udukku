import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarHeart,
  Heart,
  Sparkles,
  GraduationCap,
  Building2,
  Flame,
  Users,
  BookOpen,
  Wand2,
  Music,
  Music2,
  Music3,
  Music4,
  Piano,
  Mic,
  Drum,
  ClipboardList,
  MessagesSquare,
  Route,
  Award,
  ShieldCheck,
  Layers,
  Palette,
  CheckCircle2,
} from 'lucide-react';
import WaveDivider from '../../components/WaveDivider';
import BrandIcon from '../../components/BrandIcon';
import { contactService } from '../../services/apiService';

const EVENT_CATEGORIES = [
  { icon: Heart, title: 'Weddings' },
  { icon: Building2, title: 'Corporate Events' },
  { icon: Flame, title: 'Cultural Festivals' },
  { icon: GraduationCap, title: 'School & College Events' },
  { icon: Sparkles, title: 'Spiritual Gatherings' },
  { icon: Music3, title: 'Private Concerts' },
  { icon: Users, title: 'Community Events' },
  { icon: BookOpen, title: 'Music Workshops' },
  { icon: Wand2, title: 'Custom Performances' },
];

const OFFERINGS = [
  { icon: Mic, title: 'Solo Artists', body: 'Intimate voices and instruments for close listening.' },
  { icon: Music2, title: 'Duos', body: 'A conversation in two, warmth held between two players.' },
  { icon: Music, title: 'Ensembles', body: 'Small groups that fill a room without crowding it.' },
  { icon: Drum, title: 'Full Bands', body: 'Rhythm sections and lead voices for larger stages.' },
  { icon: Piano, title: 'Classical Concerts', body: 'Hindustani, Carnatic, and Western classical evenings.' },
  { icon: Music4, title: 'Fusion Performances', body: 'Traditions meeting in unexpected, tasteful ways.' },
  { icon: Users, title: 'Interactive Sessions', body: 'Sing along, tap along, be part of the making.' },
  { icon: Wand2, title: 'Custom Musical Experiences', body: 'Bespoke evenings shaped around your gathering.' },
];

const STYLES = [
  'Hindustani Classical',
  'Carnatic',
  'Devotional',
  'Folk',
  'Fusion',
  'Contemporary',
  'Instrumental',
  'Vocal Performances',
];

const STEPS = [
  { icon: MessagesSquare, title: 'Share your event', body: 'Tell us about the occasion, the room, and the mood you want to hold.' },
  { icon: ClipboardList, title: 'Consultation', body: 'We listen closely and suggest the ensemble that fits your vision.' },
  { icon: Route, title: 'Curated performance plan', body: 'A tailored setlist, staging notes, and coordination on your behalf.' },
  { icon: Award, title: 'Event execution', body: 'Musicians arrive prepared. You get to enjoy the evening.' },
];

const WHY = [
  { icon: GraduationCap, title: 'Experienced musicians', body: 'Trained artists with deep repertoire and stage practice.' },
  { icon: Palette, title: 'Curated performances', body: 'Every set thoughtfully arranged for your context.' },
  { icon: ShieldCheck, title: 'Professional coordination', body: 'Logistics handled by an Udukku point person, start to end.' },
  { icon: Layers, title: 'Flexible ensembles', body: 'Solo, duo, ensemble, or band, we scale to the space.' },
  { icon: Heart, title: 'Authentic musical experiences', body: 'No shortcuts. Only music that means something.' },
];

const EVENT_TYPES = [
  '',
  'Wedding',
  'Corporate Event',
  'Cultural Festival',
  'School / College Event',
  'Spiritual Gathering',
  'Private Concert',
  'Community Event',
  'Music Workshop',
  'Custom Performance',
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
    name: '', email: '', phone: '', eventType: '', date: '',
    venue: '', city: '', audience: '', duration: '', budget: '', notes: '',
  });
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.create({
        name: form.name,
        email: form.email,
        subject: `Event enquiry · ${form.eventType || 'General'}`,
        message: [
          `Phone: ${form.phone}`,
          `Event date: ${form.date}`,
          `Venue: ${form.venue}, ${form.city}`,
          `Estimated audience: ${form.audience}`,
          `Duration: ${form.duration}`,
          `Budget: ${form.budget || 'Not shared'}`,
          '',
          form.notes,
        ].join('\n'),
      });
      setOk(true);
      toast.success('Event request received. Our team will reach out shortly.');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main data-testid="events-page" className="bg-white page-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
        <div className="relative udukku-section pt-28 md:pt-32 pb-16 md:pb-20">
          <BackLink />
          <span className="reveal mt-6 inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/85 mb-4">
            <BrandIcon size={14} /> Events
          </span>
          <h1 className="reveal text-display text-white text-4xl sm:text-5xl lg:text-[60px] leading-[1.05] max-w-4xl" style={{ transitionDelay: '80ms' }}>
            Live music, thoughtfully{' '}
            <span className="text-italic-serif text-white/95">curated for your evening</span>.
          </h1>
          <p className="reveal mt-6 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed" style={{ transitionDelay: '160ms' }}>
            From intimate gatherings to large celebrations, Udukku brings
            trained musicians and considered performances to every kind of
            event. We shape each set around the room, the occasion, and the
            mood you want to hold.
          </p>
        </div>
        <WaveDivider fill="#FFFFFF" />
      </section>

      {/* Event categories */}
      <section className="bg-white">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Where we play
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-brown-dark">
              Occasions we{' '}
              <span className="text-italic-serif text-orange">love</span>{' '}
              to hold.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {EVENT_CATEGORIES.map((c) => {
              const Icon = c.icon;
              return (
                <article key={c.title} className="card-lift rounded-2xl p-6 bg-cream border border-brown-dark/10">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange/10 border border-orange/25 text-orange">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-display text-brown-dark text-lg md:text-xl mt-4">{c.title}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              What we offer
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-brown-dark">
              Ensembles for every{' '}
              <span className="text-italic-serif text-orange">setting</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {OFFERINGS.map((o) => {
              const Icon = o.icon;
              return (
                <article key={o.title} className="card-lift rounded-2xl p-6 bg-white border border-brown-dark/10">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange/10 border border-orange/25 text-orange">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-display text-brown-dark text-lg mt-4">{o.title}</h3>
                  <p className="mt-2 text-brown-mid text-sm leading-relaxed">{o.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Performance styles */}
      <section className="bg-white">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Performance styles
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-brown-dark">
              Traditions we{' '}
              <span className="text-italic-serif text-orange">carry</span>.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {STYLES.map((s) => (
              <span
                key={s}
                className="inline-flex items-center h-11 px-5 rounded-full bg-cream border border-brown-dark/10 text-brown-dark text-sm hover:border-orange hover:text-orange transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Booking process */}
      <section className="bg-brown-dark text-white">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-white/70">
              How it works
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-white">
              A gentle four-step{' '}
              <span className="text-italic-serif text-orange">process</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <article key={s.title} className="relative rounded-3xl p-7 bg-white/[0.04] border border-white/12">
                  <span className="absolute top-5 right-5 text-white/40 text-xs tracking-[0.24em]">
                    0{i + 1}
                  </span>
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange/15 border border-orange/30 text-orange">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-display text-white text-lg mt-5">{s.title}</h3>
                  <p className="mt-2 text-white/75 text-sm leading-relaxed">{s.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose Udukku */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Why Udukku
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-brown-dark">
              A quiet{' '}
              <span className="text-italic-serif text-orange">standard of care</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map((w) => {
              const Icon = w.icon;
              return (
                <article key={w.title} className="card-lift rounded-3xl p-7 bg-white border border-brown-dark/10">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/10 border border-orange/25 text-orange">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-display text-brown-dark text-xl mt-5">{w.title}</h3>
                  <p className="mt-2 text-brown-mid text-sm leading-relaxed">{w.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Booking Form */}
      <section className="bg-white">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Request a proposal
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-brown-dark">
              Tell us about your{' '}
              <span className="text-italic-serif text-orange">event</span>.
            </h2>
            <p className="text-brown-mid mt-3 text-sm md:text-base">
              Fill this in and our team will curate a proposal shaped around
              your evening.
            </p>
          </div>

          {ok ? (
            <div data-testid="events-success" className="rounded-3xl bg-cream border border-orange/40 p-8 max-w-xl">
              <div className="flex items-center gap-3 text-orange">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-display text-2xl">We&apos;ve got you.</span>
              </div>
              <p className="mt-3 text-brown-mid">
                A curator from Udukku will reach out within 24 hours with a
                thoughtful proposal for your event.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} data-testid="events-form" className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl">
              <Field label="Full name *" name="name" value={form.name} onChange={onChange} required />
              <Field label="Email *" name="email" type="email" value={form.email} onChange={onChange} required />
              <Field label="Phone number *" name="phone" value={form.phone} onChange={onChange} required />
              <Select label="Event type *" name="eventType" value={form.eventType} onChange={onChange} options={EVENT_TYPES} required />
              <Field label="Event date *" name="date" type="date" value={form.date} onChange={onChange} required />
              <Field label="Venue *" name="venue" value={form.venue} onChange={onChange} placeholder="Venue name" required />
              <Field label="City *" name="city" value={form.city} onChange={onChange} required />
              <Field label="Estimated audience *" name="audience" value={form.audience} onChange={onChange} placeholder="e.g. 80–120" required />
              <Field label="Performance duration *" name="duration" value={form.duration} onChange={onChange} placeholder="e.g. 90 minutes" required />
              <Field label="Budget (optional)" name="budget" value={form.budget} onChange={onChange} placeholder="Ballpark or range" />
              <Textarea label="Additional requirements" name="notes" value={form.notes} onChange={onChange} rows={4} wide />
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="events-submit"
                  className="btn-glow inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark disabled:opacity-60"
                >
                  {loading ? 'Sending…' : 'Request Event Proposal'}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

const Field = ({ label, wide, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">{label}</span>
    <input {...props} className="w-full h-12 rounded-full bg-white border border-brown-dark/15 px-5 text-brown-dark placeholder:text-brown-mid/50 focus:outline-none focus:border-orange transition-colors" />
  </label>
);
const Select = ({ label, options, wide, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">{label}</span>
    <select {...props} className="w-full h-12 rounded-full bg-white border border-brown-dark/15 px-5 text-brown-dark focus:outline-none focus:border-orange transition-colors">
      {options.map((o) => <option key={o} value={o}>{o || 'Select event type'}</option>)}
    </select>
  </label>
);
const Textarea = ({ label, wide, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">{label}</span>
    <textarea {...props} className="w-full rounded-3xl bg-white border border-brown-dark/15 px-5 py-4 text-brown-dark placeholder:text-brown-mid/50 focus:outline-none focus:border-orange transition-colors" />
  </label>
);
