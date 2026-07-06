import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ArrowUpRight,
  Wind,
  Moon,
  Sunrise,
  HeartPulse,
  CheckCircle2,
} from 'lucide-react';
import BrandIcon from '../../components/BrandIcon';
import { contactService } from '../../services/apiService';

const OFFERINGS = [
  { icon: Wind, title: 'Breath and Sound', body: 'Synchronise your breath with music to enter a calm, receptive state. Guided by Udukku teachers.' },
  { icon: Moon, title: 'Stillness Sessions', body: 'Evening practices designed to wind down with ambient Indian classical soundscapes.' },
  { icon: Sunrise, title: 'Morning Ragas', body: 'Start your day with the healing frequencies of early morning ragas: Bhairav, Lalit, Todi.' },
  { icon: HeartPulse, title: 'Sound Healing', body: 'Explore the therapeutic power of instruments like singing bowls, tanpura drones, and flute.' },
];

const INTENTIONS = ['', 'Stress relief', 'Better sleep', 'Mindfulness', 'Creative flow', 'Emotional healing', 'Just exploring'];

const BackLink = () => (
  <Link
    to="/services"
    data-testid="back-to-services"
    className="flex w-fit items-center gap-2 text-orange hover:text-orange-dark text-sm font-medium transition-colors"
  >
    <ArrowLeft className="w-4 h-4" /> Back to Services
  </Link>
);

export default function MusicMeditation() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', time: '', intention: '', notes: '',
  });
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.create({
        name: form.name,
        email: form.email,
        subject: `Music Meditation · ${form.intention || 'General'}`,
        message: `Preferred time: ${form.time}\nPhone: ${form.phone}\n\n${form.notes}`,
      });
      setOk(true);
      toast.success('We received your request. A gentle reply is on its way.');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main data-testid="music-meditation-page" className="bg-white page-fade-in">
      {/* Hero — serene cream with warm radial glow */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: '#F5EDDE' }}
      >
        <div
          className="absolute inset-x-0 -top-24 h-[720px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 900px 560px at 62% 8%, rgba(232,136,58,0.28), transparent 70%)',
          }}
          aria-hidden
        />
        <div
          className="absolute -left-40 top-1/3 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(closest-side, rgba(232,136,58,0.12), transparent 70%)',
          }}
          aria-hidden
        />
        {/* Delicate corner detail */}
        <div className="absolute top-[42%] right-8 md:right-14 hidden md:block pointer-events-none">
          <div className="w-20 h-20 rounded-full border border-orange/30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-orange/25" />
          </div>
        </div>

        <div className="relative udukku-section pt-28 md:pt-36 pb-24 md:pb-32">
          <BackLink />

          <div className="mt-12 md:mt-16 max-w-4xl">
            <span
              className="reveal inline-flex items-center gap-2 uppercase tracking-[0.32em] text-[11px] md:text-xs text-orange mb-8"
            >
              <BrandIcon size={14} /> Music Meditation
            </span>
            <h1
              className="reveal text-display text-brown-dark text-5xl sm:text-6xl md:text-7xl lg:text-[104px] leading-[0.98] tracking-[-0.01em]"
              style={{ transitionDelay: '80ms' }}
            >
              Music as{' '}
              <span className="text-italic-serif text-orange">medicine</span>.
            </h1>

            <figure
              className="reveal mt-10 md:mt-12 max-w-xl pl-5 border-l-2 border-orange/60"
              style={{ transitionDelay: '160ms' }}
            >
              <blockquote className="text-italic-serif text-brown-dark/85 text-xl md:text-2xl leading-relaxed">
                Sound was the first medicine. It still is.
              </blockquote>
            </figure>

            <p
              className="reveal mt-8 md:mt-10 max-w-2xl text-brown-mid text-base md:text-lg leading-relaxed"
              style={{ transitionDelay: '220ms' }}
            >
              Music meditation at Udukku is not performance, it is presence. We
              guide you to use music as a vehicle for deep rest, emotional
              release, and inner stillness.
            </p>

            <div
              className="reveal mt-10 flex flex-wrap items-center gap-2.5"
              style={{ transitionDelay: '280ms' }}
            >
              {['Breath', 'Sound', 'Stillness'].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center h-9 px-4 rounded-full bg-white/70 backdrop-blur-sm border border-brown-dark/10 text-brown-dark text-xs md:text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="bg-white">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              What we offer
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-brown-dark">
              Four{' '}
              <span className="text-italic-serif text-orange">gentle doorways</span>{' '}
              in.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {OFFERINGS.map((o) => {
              const Icon = o.icon;
              return (
                <article key={o.title} className="card-lift rounded-3xl p-7 bg-cream border border-brown-dark/10">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/10 border border-orange/25 text-orange">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-display text-brown-dark text-xl md:text-2xl mt-5">{o.title}</h3>
                  <p className="mt-2 text-brown-mid text-sm md:text-base leading-relaxed">{o.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Begin your practice
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-brown-dark">
              Book a{' '}
              <span className="text-italic-serif text-orange">meditation session</span>.
            </h2>
            <p className="text-brown-mid mt-3 text-sm md:text-base">
              Share your details and we&apos;ll prepare a session just for you.
            </p>
          </div>

          {ok ? (
            <div data-testid="mm-success" className="rounded-3xl bg-white border border-orange/40 p-8 max-w-xl">
              <div className="flex items-center gap-3 text-orange">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-display text-2xl">Breath in, we heard you.</span>
              </div>
              <p className="mt-3 text-brown-mid">
                A guide from Udukku will reach out to hold space for your first
                session.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} data-testid="mm-form" className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-3xl">
              <Field label="Full name *" name="name" value={form.name} onChange={onChange} required />
              <Field label="Email *" name="email" type="email" value={form.email} onChange={onChange} required />
              <Field label="Phone" name="phone" value={form.phone} onChange={onChange} />
              <Field label="Preferred session time *" name="time" value={form.time} onChange={onChange} placeholder="e.g. Sunday mornings" required />
              <Select label="What are you hoping for?" name="intention" value={form.intention} onChange={onChange} options={INTENTIONS} wide />
              <Textarea label="Anything you'd like us to know?" name="notes" value={form.notes} onChange={onChange} rows={4} wide />
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="mm-submit"
                  className="btn-glow inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark disabled:opacity-60"
                >
                  {loading ? 'Sending…' : 'Begin my practice'}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-brown-dark text-white">
        <div className="udukku-section py-20 md:py-24 text-center flex flex-col items-center">
          <h2 className="text-display text-4xl sm:text-5xl lg:text-[52px] max-w-3xl">
            When words go quiet,{' '}
            <span className="text-italic-serif text-orange">sound speaks</span>.
          </h2>
          <p className="mt-4 text-white/80 max-w-xl leading-relaxed">
            Come sit with us for an evening. Bring nothing but your breath.
          </p>
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
      {options.map((o) => <option key={o} value={o}>{o || 'Select an intention'}</option>)}
    </select>
  </label>
);
const Textarea = ({ label, wide, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">{label}</span>
    <textarea {...props} className="w-full rounded-3xl bg-white border border-brown-dark/15 px-5 py-4 text-brown-dark placeholder:text-brown-mid/50 focus:outline-none focus:border-orange transition-colors" />
  </label>
);
