import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ArrowUpRight,
  Repeat,
  Users,
  ClipboardCheck,
  Heart,
  LineChart,
  Gift,
  CheckCircle2,
} from 'lucide-react';
import WaveDivider from '../../components/WaveDivider';
import BrandIcon from '../../components/BrandIcon';
import { bookingService } from '../../services/apiService';

const FEATURES = [
  { icon: Repeat, title: 'Consistent Practice', body: "Bring your own practice, or follow the teacher's." },
  { icon: Users, title: 'Community Network', body: 'Warm gatherings with people who love music.' },
  { icon: ClipboardCheck, title: 'Accountability', body: 'An Udukku teacher, learning exactly what you want as you need.' },
  { icon: Heart, title: '1-on-1 Checks', body: 'An individual touchpoint with the Udukku team.' },
  { icon: LineChart, title: 'Progress Plotting', body: 'Re-evaluation and planning to make progress tangible.' },
];

const PLANS = [
  {
    id: 'habit-12',
    name: 'Habit 12-Day',
    price: '₹999',
    strike: '₹1,200',
    per: 'month',
    rows: [
      ['Sessions', '3 days / week'],
      ['Practice type', 'Any instrument or style'],
      ['Community events', 'Yes'],
      ['Max savings', 'Up to 90% back'],
    ],
    tiers: [
      { label: 'No refund', range: '0–6 lessons' },
      { label: '50% refund', range: '7–10 lessons' },
      { label: '90% refund', range: '11–12 lessons' },
    ],
  },
  {
    id: 'habit-24',
    name: 'Habit 24-Day',
    price: '₹1,899',
    strike: '₹2,400',
    per: 'month',
    featured: true,
    rows: [
      ['Sessions', '6 days / week'],
      ['Practice type', 'Any instrument or style'],
      ['Community events', 'Yes'],
      ['Max savings', 'Up to 90% back'],
    ],
    tiers: [
      { label: 'No refund', range: '0–12 lessons' },
      { label: '50% refund', range: '14–20 lessons' },
      { label: '90% refund', range: '20–24 lessons' },
    ],
  },
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

const PlanCard = ({ plan, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(plan.id)}
    data-testid={`plan-${plan.id}`}
    className={`text-left rounded-3xl p-7 md:p-8 border transition-all duration-500 ${
      selected
        ? 'bg-orange/10 border-orange shadow-[0_18px_46px_-24px_rgba(232,136,58,0.45)]'
        : 'bg-white border-brown-dark/10 hover:border-orange/40'
    } relative`}
  >
    {plan.featured && (
      <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brown-dark text-white text-[10px] uppercase tracking-[0.22em]">
        Most popular
      </span>
    )}
    <h3 className="text-display text-brown-dark text-2xl md:text-3xl">
      {plan.name}
    </h3>
    <div className="mt-4 flex items-baseline gap-3">
      <span className="text-display text-orange text-4xl md:text-5xl">{plan.price}</span>
      <span className="text-brown-mid text-sm">/ {plan.per}</span>
      <span className="text-brown-mid/60 text-sm line-through">{plan.strike}</span>
    </div>
    <dl className="mt-6 space-y-3">
      {plan.rows.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between text-sm border-b border-brown-dark/5 pb-2 last:border-0">
          <dt className="text-brown-mid">{k}</dt>
          <dd className="text-brown-dark font-medium">{v}</dd>
        </div>
      ))}
    </dl>
    <div className="mt-6">
      <div className="text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">
        Cashback / refund
      </div>
      <ul className="space-y-2">
        {plan.tiers.map((t) => (
          <li key={t.range} className="flex items-center gap-3 text-sm text-brown-dark">
            <CheckCircle2 className="w-4 h-4 text-orange shrink-0" />
            <span className="flex-1">{t.range}</span>
            <span className="text-brown-mid">{t.label}</span>
          </li>
        ))}
      </ul>
    </div>
    {selected && (
      <span className="absolute top-5 right-5 text-orange text-xs font-medium">
        Selected
      </span>
    )}
  </button>
);

export default function MusicRoom() {
  const [selected, setSelected] = useState('habit-12');
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    instrument: '',
    slot: '',
    notes: '',
  });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await bookingService.create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        instrument: form.instrument,
        experience: `UMR · ${PLANS.find((p) => p.id === selected)?.name}`,
        preferredDate: '',
        preferredTime: form.slot,
        notes: form.notes,
      });
      setOk(true);
      toast.success('Reservation received. We will be in touch.');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main data-testid="music-room-page" className="bg-white page-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
        <div className="relative udukku-section pt-28 md:pt-32 pb-16 md:pb-20">
          <BackLink />
          <span className="reveal mt-6 inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/85 mb-4">
            <BrandIcon size={14} /> Udukku Music Room
          </span>
          <h1 className="reveal text-display text-white text-4xl sm:text-5xl lg:text-[60px] leading-[1.05] max-w-4xl" style={{ transitionDelay: '80ms' }}>
            You didn&apos;t stop loving music.{' '}
            <span className="text-italic-serif text-white/95">
              You just stopped having a place for it.
            </span>
          </h1>
          <p className="reveal mt-6 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed" style={{ transitionDelay: '160ms' }}>
            Monthly online practice sessions and a real community, with
            structure built to hold your riyaz. Every session is yours to use.
            The teacher is present, the structure is there, but your practice
            and your pace remain yours.
          </p>
        </div>
        <WaveDivider fill="#FFFFFF" />
      </section>

      {/* Feature cards */}
      <section className="bg-white">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              What you sign up for
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-brown-dark">
              Five{' '}
              <span className="text-italic-serif text-orange">quiet promises</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <article key={f.title} className="card-lift rounded-3xl p-7 bg-cream border border-brown-dark/10">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/10 border border-orange/25 text-orange">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-display text-brown-dark text-xl mt-5">{f.title}</h3>
                  <p className="mt-2 text-brown-mid text-sm leading-relaxed">{f.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Choose your plan
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-brown-dark">
              Two{' '}
              <span className="text-italic-serif text-orange">gentle ways in</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {PLANS.map((p) => (
              <PlanCard key={p.id} plan={p} selected={selected === p.id} onSelect={setSelected} />
            ))}
          </div>
        </div>
      </section>

      {/* Cashback + referral */}
      <section className="bg-brown-dark text-white">
        <div className="udukku-section py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div className="rounded-3xl p-8 md:p-10 bg-white/[0.04] border border-white/12">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/15 border border-orange/30 text-orange">
              <LineChart className="w-5 h-5" strokeWidth={1.8} />
            </span>
            <h3 className="text-display text-white text-2xl md:text-3xl mt-5">
              Cashback Offer
            </h3>
            <p className="text-white/80 mt-3 leading-relaxed">
              At full attendance, you get 90% of your subscription fee back. You
              would be paying ₹99 a month. No, this is not a typo. The cashback
              scales from 60% upward, because we genuinely believe showing up
              should feel like it counts for something.
            </p>
          </div>
          <div className="rounded-3xl p-8 md:p-10 bg-white/[0.04] border border-white/12">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/15 border border-orange/30 text-orange">
              <Gift className="w-5 h-5" strokeWidth={1.8} />
            </span>
            <h3 className="text-display text-white text-2xl md:text-3xl mt-5">
              Referrals
            </h3>
            <p className="text-white/80 mt-3 leading-relaxed">
              Bring someone into Music Room. A week free for you and an easy
              entry point for them, with zero pressure on either end. Students
              who have stayed the longest are not the most talented. They are
              the ones who found a room they trusted enough to keep coming back
              to.
            </p>
          </div>
        </div>
      </section>

      {/* Reservation form */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Start your journey today
            </span>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[48px] text-brown-dark">
              Reserve your{' '}
              <span className="text-italic-serif text-orange">spot</span>.
            </h2>
            <p className="text-brown-mid mt-3 text-sm">
              Selected plan: <span className="text-brown-dark font-medium">
                {PLANS.find((p) => p.id === selected)?.name}
              </span>{' '}
              , change above anytime.
            </p>
          </div>

          {ok ? (
            <div data-testid="umr-success" className="rounded-3xl bg-white border border-orange/40 p-8 max-w-xl">
              <div className="flex items-center gap-3 text-orange">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-display text-2xl">You&apos;re in.</span>
              </div>
              <p className="mt-3 text-brown-mid">
                We&apos;ll reach out within a day to confirm your slot and
                answer any questions.
              </p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              data-testid="umr-form"
              className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-3xl"
            >
              <Field label="Full name *" name="name" value={form.name} onChange={onChange} required />
              <Field label="Email *" name="email" type="email" value={form.email} onChange={onChange} required />
              <Field label="Phone" name="phone" value={form.phone} onChange={onChange} />
              <Select
                label="Your instrument"
                name="instrument"
                value={form.instrument}
                onChange={onChange}
                options={['', 'Tabla', 'Sitar', 'Guitar', 'Violin', 'Vocals', 'Flute', 'Other']}
              />
              <Field label="Preferred session slot" name="slot" value={form.slot} onChange={onChange} placeholder="e.g. Weekday evenings" />
              <Textarea label="Anything else?" name="notes" value={form.notes} onChange={onChange} rows={4} wide />
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="umr-submit"
                  className="btn-glow inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark disabled:opacity-60"
                >
                  {loading ? 'Reserving…' : 'Join Now'}
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

/* ---------- shared field bits (visually match existing forms) ---------- */
const Field = ({ label, wide, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">{label}</span>
    <input
      {...props}
      className="w-full h-12 rounded-full bg-white border border-brown-dark/15 px-5 text-brown-dark placeholder:text-brown-mid/50 focus:outline-none focus:border-orange transition-colors"
    />
  </label>
);
const Select = ({ label, options, wide, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">{label}</span>
    <select
      {...props}
      className="w-full h-12 rounded-full bg-white border border-brown-dark/15 px-5 text-brown-dark focus:outline-none focus:border-orange transition-colors"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o || 'Select instrument'}</option>
      ))}
    </select>
  </label>
);
const Textarea = ({ label, wide, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">{label}</span>
    <textarea
      {...props}
      className="w-full rounded-3xl bg-white border border-brown-dark/15 px-5 py-4 text-brown-dark placeholder:text-brown-mid/50 focus:outline-none focus:border-orange transition-colors"
    />
  </label>
);
