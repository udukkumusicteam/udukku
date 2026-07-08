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
  Percent,
  CheckCircle2,
  Check,
  Sun,
  Sunset,
  Moon,
  Sunrise,
} from 'lucide-react';
import BrandIcon from '../../components/BrandIcon';
import { sessionBookingsService } from '../../services/supabase';

const FEATURES = [
  {
    icon: Repeat,
    title: 'Consistent Practice',
    body: "Bring your own practice, or follow the teacher's.",
  },
  {
    icon: Users,
    title: 'Community Network',
    body: 'Warm gatherings with people who love music.',
  },
  {
    icon: ClipboardCheck,
    title: 'Accountability',
    body: 'An Udukku teacher; learn exactly what you want as you need.',
  },
  {
    icon: Heart,
    title: '1-on-1 Checks',
    body: 'An individual touchpoint with the Udukku team.',
  },
  {
    icon: LineChart,
    title: 'Progress Plotting',
    body: 'Revaluation and planning to make progress tangible.',
  },
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
      ['Community events', '✓'],
      ['Max savings', 'Up to 90% back'],
    ],
    tiers: [
      { label: 'No refund', range: '0 to 6 lessons' },
      { label: '50% refund', range: '7 to 10 lessons' },
      { label: '90% refund', range: '11 to 12 lessons' },
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
      ['Community events', '✓'],
      ['Max savings', 'Up to 90% back'],
    ],
    tiers: [
      { label: 'No refund', range: '0 to 12 lessons' },
      { label: '50% refund', range: '14 to 20 lessons' },
      { label: '90% refund', range: '20 to 24 lessons' },
    ],
  },
];

const FREQUENCY_OPTIONS = [
  { value: 'once-twice', label: 'Once or twice a week' },
  { value: 'thrice-plus', label: 'Thrice or more a week' },
];

const TIME_SLOTS = [
  { value: 'morning', label: 'Morning', icon: Sunrise },
  { value: 'afternoon', label: 'Afternoon', icon: Sun },
  { value: 'evening', label: 'Evening', icon: Sunset },
  { value: 'night', label: 'Night', icon: Moon },
];

const BackLink = () => (
  <Link
    to="/services"
    data-testid="back-to-services"
    className="flex w-fit items-center gap-2 text-orange hover:text-orange-dark text-sm font-medium transition-colors"
  >
    <ArrowLeft className="w-4 h-4" /> Back to Services
  </Link>
);

const PlanCard = ({ plan, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(plan.id)}
    data-testid={`plan-${plan.id}`}
    className={`relative text-left rounded-3xl p-7 md:p-8 border transition-all duration-500 ${
      plan.featured || selected
        ? 'bg-orange/[0.08] border-orange shadow-[0_20px_60px_-30px_rgba(232,136,58,0.55)]'
        : 'bg-white/[0.03] border-white/12 hover:border-white/25'
    }`}
  >
    {plan.featured && (
      <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange text-white text-[10px] uppercase tracking-[0.22em]">
        Most popular
      </span>
    )}
    <div className="flex items-start justify-between gap-6">
      <h3 className="text-display text-white text-2xl md:text-3xl">
        {plan.name}
      </h3>
      <div className="text-right">
        <div className="text-white/40 text-xs line-through">{plan.strike}</div>
        <div className="flex items-baseline gap-1 justify-end">
          <span className="text-display text-white text-3xl md:text-4xl">
            {plan.price}
          </span>
          <span className="text-white/60 text-xs">/{plan.per}</span>
        </div>
      </div>
    </div>

    <dl className="mt-7 space-y-3.5">
      {plan.rows.map(([k, v]) => (
        <div
          key={k}
          className="flex items-center justify-between text-sm border-b border-white/10 pb-3 last:border-0"
        >
          <dt className="text-white/60">{k}</dt>
          <dd className="text-white font-medium">{v}</dd>
        </div>
      ))}
    </dl>

    <div className="mt-7">
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-3">
        Cashback / refund
      </div>
      <ul className="space-y-2.5">
        {plan.tiers.map((t) => (
          <li
            key={t.range}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-orange">{t.label}</span>
            <span className="text-white/70">{t.range}</span>
          </li>
        ))}
      </ul>
    </div>

    {selected && (
      <span className="absolute top-5 right-5 text-orange text-xs font-medium inline-flex items-center gap-1">
        <Check className="w-3.5 h-3.5" /> Selected
      </span>
    )}
  </button>
);

export default function MusicRoom() {
  const [selected, setSelected] = useState('habit-24');
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    location: '',
    frequency: '',
    time: '',
  });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent duplicate submissions
    if (!form.name || !form.whatsapp || !form.location || !form.frequency || !form.time) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const plan = PLANS.find((p) => p.id === selected);
      const freqLabel =
        FREQUENCY_OPTIONS.find((f) => f.value === form.frequency)?.label ||
        form.frequency;
      const timeLabel =
        TIME_SLOTS.find((t) => t.value === form.time)?.label || form.time;

      await sessionBookingsService.createUMR({
        name: form.name,
        whatsapp: form.whatsapp,
        location: form.location,
        frequency: form.frequency,
        preferredTime: timeLabel,
        notes: `Selected plan: ${plan?.name}\nFrequency (label): ${freqLabel}`,
      });
      setOk(true);
      setForm({ name: '', whatsapp: '', location: '', frequency: '', time: '' });
      toast.success('Reservation received. The room is holding a place for you.');
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      data-testid="music-room-page"
      className="bg-brown-dark text-white page-fade-in"
    >
      <style>{`
        @keyframes udukku-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .umr-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.14);
          color: #fff;
        }
        .umr-input::placeholder { color: rgba(255,255,255,0.35); }
        .umr-input:focus { outline: none; border-color: #E8883A; background: rgba(255,255,255,0.06); }
        select.umr-input option { color: #1a1410; background: #fff; }
      `}</style>

      {/* Hero */}
      <section className="relative udukku-section pt-28 md:pt-32 pb-16 md:pb-24">
        <BackLink />

        <span
          className="reveal mt-8 inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-orange mb-6"
        >
          <BrandIcon size={14} /> Udukku Music Room
        </span>

        <h1
          className="reveal text-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.02] max-w-5xl"
          style={{ transitionDelay: '80ms' }}
        >
          You didn&apos;t stop loving music.{' '}
          <span className="text-italic-serif text-orange">
            You just stopped having a place for it.
          </span>
        </h1>

        <p
          className="reveal mt-8 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed"
          style={{ transitionDelay: '160ms' }}
        >
          Monthly online practice sessions, a real community, with structure
          built to hold your riyaz. Every session is yours to use. The teacher
          is present, the structure is there, but your practice and your pace
          remain yours.
        </p>
      </section>

      {/* What you sign up for */}
      <section className="relative">
        <div className="udukku-section pb-16 md:pb-20">
          <div className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/45 mb-8">
            What you sign up for
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <article
                  key={f.title}
                  data-testid={`umr-feature-${f.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                  className="rounded-3xl p-7 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors min-h-[220px] flex flex-col"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/15 border border-orange/30 text-orange">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-display text-white text-xl md:text-2xl mt-6">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-white/65 text-sm md:text-base leading-relaxed">
                    {f.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Choose your plan */}
      <section className="relative">
        <div className="udukku-section pb-16 md:pb-20">
          <div className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/45 mb-8">
            Choose your plan
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {PLANS.map((p) => (
              <PlanCard
                key={p.id}
                plan={p}
                selected={selected === p.id}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cashback + Referrals */}
      <section className="relative">
        <div className="udukku-section pb-16 md:pb-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          <article className="rounded-3xl p-8 md:p-10 bg-white/[0.03] border border-white/10">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/15 border border-orange/30 text-orange">
              <Percent className="w-5 h-5" strokeWidth={1.8} />
            </span>
            <h3 className="text-display text-white text-2xl md:text-3xl mt-6">
              Cashback Offer
            </h3>
            <p className="mt-3 text-white/70 leading-relaxed">
              At full attendance, you get 90% of your subscription fee back.
              You would be paying ₹99 a month. No, this is not a typo. The
              cashback scales from 60% upward, because we genuinely believe
              showing up should feel like it counts for something.
            </p>
          </article>
          <article className="rounded-3xl p-8 md:p-10 bg-white/[0.03] border border-white/10">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/15 border border-orange/30 text-orange">
              <Gift className="w-5 h-5" strokeWidth={1.8} />
            </span>
            <h3 className="text-display text-white text-2xl md:text-3xl mt-6">
              Referrals
            </h3>
            <p className="mt-3 text-white/70 leading-relaxed">
              Bring someone into Music Room. A week free for you and an easy
              entry point for them, with zero pressure on either end. Students
              who have stayed the longest are not the most talented. They are
              the ones who found a room they trusted enough to keep coming
              back to.
            </p>
          </article>
        </div>
      </section>

      {/* Booking form */}
      <section className="relative">
        <div className="udukku-section pb-20 md:pb-24">
          <div className="max-w-2xl mb-8 md:mb-10">
            <div className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/45 mb-4">
              Reserve your spot
            </div>
            <h2 className="text-display text-white text-3xl sm:text-4xl md:text-[48px] leading-[1.05]">
              Start your{' '}
              <span className="text-italic-serif text-orange">riyaz</span>.
            </h2>
            <p className="mt-4 text-white/65 text-sm md:text-base">
              Selected plan:{' '}
              <span className="text-white font-medium">
                {PLANS.find((p) => p.id === selected)?.name}
              </span>
              . Change above anytime.
            </p>
          </div>

          {ok ? (
            <div
              data-testid="umr-success"
              className="rounded-3xl bg-orange/[0.08] border border-orange/40 p-8 max-w-xl"
            >
              <div className="flex items-center gap-3 text-orange">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-display text-2xl text-white">
                  You&apos;re in.
                </span>
              </div>
              <p className="mt-3 text-white/70">
                A curator from Udukku will WhatsApp you within a day to confirm
                your slot and answer any questions.
              </p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              data-testid="umr-form"
              className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-3xl"
            >
              <Field
                label="Name *"
                name="name"
                testid="umr-field-name"
                value={form.name}
                onChange={onChange}
                required
              />
              <Field
                label="WhatsApp number *"
                name="whatsapp"
                type="tel"
                testid="umr-field-whatsapp"
                value={form.whatsapp}
                onChange={onChange}
                placeholder="+91 98xxxxxxxx"
                required
              />
              <Field
                label="City, Country *"
                name="location"
                testid="umr-field-location"
                value={form.location}
                onChange={onChange}
                placeholder="e.g. Bengaluru, India"
                required
                wide
              />

              {/* Practice frequency */}
              <div className="md:col-span-2">
                <span className="block text-[11px] uppercase tracking-[0.22em] text-white/50 mb-3">
                  How often would you like to practice? *
                </span>
                <div
                  data-testid="umr-frequency-group"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {FREQUENCY_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      data-testid={`umr-frequency-${opt.value}`}
                      className={`cursor-pointer rounded-2xl px-5 py-4 border transition-all ${
                        form.frequency === opt.value
                          ? 'bg-orange/[0.1] border-orange text-white'
                          : 'bg-white/[0.03] border-white/12 text-white/75 hover:border-white/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="frequency"
                        value={opt.value}
                        checked={form.frequency === opt.value}
                        onChange={onChange}
                        required
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            form.frequency === opt.value
                              ? 'border-orange'
                              : 'border-white/30'
                          }`}
                        >
                          {form.frequency === opt.value && (
                            <span className="w-2 h-2 rounded-full bg-orange" />
                          )}
                        </span>
                        <span className="text-sm md:text-base font-medium">
                          {opt.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-white/40 text-xs">
                  We currently host up to 3 sessions per week. More slots
                  coming soon.
                </p>
              </div>

              {/* Preferred time */}
              <div className="md:col-span-2">
                <span className="block text-[11px] uppercase tracking-[0.22em] text-white/50 mb-3">
                  Preferred time *
                </span>
                <div
                  data-testid="umr-time-group"
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                  {TIME_SLOTS.map((slot) => {
                    const Icon = slot.icon;
                    return (
                      <label
                        key={slot.value}
                        data-testid={`umr-time-${slot.value}`}
                        className={`cursor-pointer rounded-2xl px-5 py-4 border transition-all flex items-center gap-3 ${
                          form.time === slot.value
                            ? 'bg-orange/[0.1] border-orange text-white'
                            : 'bg-white/[0.03] border-white/12 text-white/75 hover:border-white/25'
                        }`}
                      >
                        <input
                          type="radio"
                          name="time"
                          value={slot.value}
                          checked={form.time === slot.value}
                          onChange={onChange}
                          required
                          className="sr-only"
                        />
                        <Icon
                          className={`w-4 h-4 ${
                            form.time === slot.value ? 'text-orange' : 'text-white/60'
                          }`}
                          strokeWidth={1.8}
                        />
                        <span className="text-sm md:text-base font-medium">
                          {slot.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="umr-submit"
                  className="btn-glow inline-flex items-center gap-2 h-12 px-8 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark disabled:opacity-60 transition-colors"
                >
                  {loading ? 'Reserving…' : 'Join Now'}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Closing */}
      <section className="relative border-t border-white/10">
        <div className="udukku-section py-20 md:py-24 text-center flex flex-col items-center">
          <h2 className="text-display text-white text-4xl sm:text-5xl lg:text-[56px] max-w-3xl leading-[1.05]">
            The room is open.{' '}
            <span className="text-italic-serif text-orange">
              Your riyaz is waiting.
            </span>
          </h2>
        </div>
      </section>
    </main>
  );
}

/* ---------- Dark-theme field ---------- */
const Field = ({ label, wide, testid, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-white/50 mb-2">
      {label}
    </span>
    <input
      {...props}
      data-testid={testid}
      className="umr-input w-full h-12 rounded-full px-5 text-sm md:text-base transition-colors"
    />
  </label>
);
