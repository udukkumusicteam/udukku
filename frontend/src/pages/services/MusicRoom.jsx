import React, { useState } from 'react';
import { toast } from 'sonner';
import {
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
import ServiceHero from '../../components/services/ServiceHero';
import ServiceCTA from '../../components/services/ServiceCTA';
import BrandIcon from '../../components/BrandIcon';
import { sessionBookingsService } from '../../services/supabase';

const FEATURES = [
  { icon: Repeat, title: 'Consistent Practice', body: "Bring your own practice, or follow the teacher's." },
  { icon: Users, title: 'Community Network', body: 'Warm gatherings with people who love music.' },
  { icon: ClipboardCheck, title: 'Accountability', body: 'An Udukku teacher; learn exactly what you want as you need.' },
  { icon: Heart, title: '1-on-1 Checks', body: 'An individual touchpoint with the Udukku team.' },
  { icon: LineChart, title: 'Progress Plotting', body: 'Revaluation and planning to make progress tangible.' },
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

const PlanCard = ({ plan, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(plan.id)}
    data-testid={`plan-${plan.id}`}
    className={`relative text-left rounded-3xl p-7 md:p-8 transition-all duration-500 ${
      selected
        ? 'bg-white border-2 border-orange shadow-[0_25px_70px_-20px_rgba(200,75,26,0.45)] -translate-y-1.5 hover:-translate-y-2 hover:shadow-[0_35px_90px_-20px_rgba(200,75,26,0.55)]'
        : 'bg-cream border border-brown-dark/10 hover:border-orange/40 hover:-translate-y-0.5'
    }`}
  >

    {plan.featured && (
      <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange text-white text-[11px] font-semibold uppercase tracking-[0.22em] shadow-[0_10px_22px_-6px_rgba(200,75,26,0.6)]">
        Most popular
      </span>
    )}

    {selected && (
      <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-white pl-1 pr-3 py-1 rounded-full shadow-[0_4px_14px_-2px_rgba(200,75,26,0.25)] ring-1 ring-orange/20">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange text-white">
          <Check className="w-3 h-3" strokeWidth={3} />
        </span>
        <span className="text-orange text-xs font-medium">Selected</span>
      </span>
    )}

    <div className="flex items-start justify-between gap-6">
      <h3 className="text-display text-brown-dark text-2xl md:text-3xl">
        {plan.name}
      </h3>
      <div className="text-right">
        <div className="text-brown-mid/60 text-xs line-through">{plan.strike}</div>
        <div className="flex items-baseline gap-1 justify-end">
          <span
            className={`text-display text-3xl md:text-4xl ${
              selected ? 'text-orange' : 'text-brown-dark'
            }`}
          >
            {plan.price}
          </span>
          <span className="text-brown-mid text-xs">/{plan.per}</span>
        </div>
      </div>
    </div>

    <dl className="mt-7 space-y-3.5">
      {plan.rows.map(([k, v]) => (
        <div
          key={k}
          className="flex items-center justify-between text-sm border-b border-brown-dark/10 pb-3 last:border-0"
        >
          <dt className="text-brown-mid">{k}</dt>
          <dd className="text-brown-dark font-medium">{v}</dd>
        </div>
      ))}
    </dl>

    <div className="mt-7">
      <div className="text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-3">
        Cashback / refund
      </div>
      <ul className="space-y-2.5">
        {plan.tiers.map((t) => (
          <li key={t.range} className="flex items-center justify-between text-sm">
            <span className="text-orange">{t.label}</span>
            <span className="text-brown-mid">{t.range}</span>
          </li>
        ))}
      </ul>
    </div>
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
    if (loading) return;
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
    <main data-testid="music-room-page" className="bg-white page-fade-in">
      <style>{`
        @keyframes udukku-rise { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:translateY(0);} }
        @keyframes udukku-drift { 0% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-14px) rotate(-2deg); } 100% { transform: translateY(0px) rotate(-2deg); } }
      `}</style>

      <ServiceHero
        testId="music-room-hero"
        eyebrow="Udukku Music Room"
        headline={
          <>
            You didn&apos;t stop loving music.{' '}
            <span className="text-italic-serif text-orange">
              You just stopped having a place for it.
            </span>
          </>
        }
        description="Monthly online practice sessions, a real community, with structure built to hold your riyaz. Every session is yours to use."
        pills={['Habit 12', 'Habit 24', 'Community', 'Cashback', 'Referrals']}
        imageSrc="/assets/images/services/music-room-hero.jpg"
        imageAlt="A laptop showing an Udukku Music Room online session"
        chipTitle="Show Up, Every Week"
        chipSubtitle="Community and structure for your riyaz"
      />

      {/* About the room — dark editorial band */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-10 md:mb-14">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-orange mb-4">
                <BrandIcon size={14} /> The room, explained
              </span>
              <h2 className="text-display text-white text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                A quiet promise to keep{' '}
                <span className="text-italic-serif text-orange">showing up</span>.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 text-white/75 text-base md:text-lg leading-relaxed space-y-4">
              <p>
                Udukku Music Room is a monthly practice home for anyone who
                has ever loved music and quietly hoped to come back to it. Not
                a course. Not a class. A steady, warm place to keep showing
                up, at your own pace, alongside people who care about the
                same thing.
              </p>
              <p>
                The teacher is present. The structure is there. Your practice,
                your songs, and the shape of your riyaz stay entirely yours.
                We only hold the room.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <article className="rounded-2xl p-7 bg-cream border border-brown-dark/10">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-brown-dark/10 text-orange">
                <BrandIcon size={16} />
              </span>
              <p className="text-display text-brown-dark text-xl md:text-2xl leading-tight mt-5">
                Structure without{' '}
                <span className="text-italic-serif text-orange">pressure</span>.
              </p>
              <p className="mt-2 text-brown-mid text-sm leading-relaxed">
                Teachers who sit beside you, never above you. Everything moves
                at the tempo you can honour.
              </p>
            </article>
            <article className="rounded-2xl p-7 bg-cream border border-brown-dark/10">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-brown-dark/10 text-orange">
                <BrandIcon size={16} />
              </span>
              <p className="text-display text-brown-dark text-xl md:text-2xl leading-tight mt-5">
                Your songs.{' '}
                <span className="text-italic-serif text-orange">Our room</span>.
              </p>
              <p className="mt-2 text-brown-mid text-sm leading-relaxed">
                You bring the practice. We hold the space, the rhythm, and the
                gentle company you need to keep it going.
              </p>
            </article>
            <article className="rounded-2xl p-7 bg-cream border border-brown-dark/10">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-brown-dark/10 text-orange">
                <BrandIcon size={16} />
              </span>
              <p className="text-display text-brown-dark text-xl md:text-2xl leading-tight mt-5">
                A place to{' '}
                <span className="text-italic-serif text-orange">return</span>.
              </p>
              <p className="mt-2 text-brown-mid text-sm leading-relaxed">
                For everyone who has ever put music down and quietly hoped to
                find their way back. The room stays open.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* What you sign up for — cream */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <h2 className="text-display text-brown-dark text-3xl md:text-4xl mb-6">
            What you sign up for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <article
                  key={f.title}
                  data-testid={`umr-feature-${f.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                  className="rounded-2xl border border-brown-dark/10 bg-white p-6 hover:border-orange/40 transition-colors min-h-[200px] flex flex-col"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-cream border border-brown-dark/10 text-orange">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-display text-brown-dark text-xl mt-5">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-brown-mid text-sm leading-relaxed">
                    {f.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Choose your plan — dark editorial band */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
          <h2 className="text-display text-white text-3xl md:text-4xl mb-6">
            Choose your plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
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

      {/* Cashback + Referrals — cream */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <article className="rounded-2xl p-8 bg-white border border-brown-dark/10">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-cream border border-brown-dark/10 text-orange">
              <Percent className="w-5 h-5" strokeWidth={1.8} />
            </span>
            <h3 className="text-display text-brown-dark text-2xl md:text-3xl mt-5">
              Cashback Offer
            </h3>
            <p className="mt-3 text-brown-mid leading-relaxed">
              At full attendance, you get 90% of your subscription fee back.
              You would be paying ₹99 a month. No, this is not a typo. The
              cashback scales from 60% upward, because we genuinely believe
              showing up should feel like it counts for something.
            </p>
          </article>
          <article className="rounded-2xl p-8 bg-white border border-brown-dark/10">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-cream border border-brown-dark/10 text-orange">
              <Gift className="w-5 h-5" strokeWidth={1.8} />
            </span>
            <h3 className="text-display text-brown-dark text-2xl md:text-3xl mt-5">
              Referrals
            </h3>
            <p className="mt-3 text-brown-mid leading-relaxed">
              Bring someone into Music Room. A week free for you and an easy
              entry point for them, with zero pressure on either end. Students
              who have stayed the longest are not the most talented. They are
              the ones who found a room they trusted enough to keep coming
              back to.
            </p>
          </article>
        </div>
      </section>

      {/* Booking form — dark editorial band, form wrapped in cream card */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-8 md:mb-10">
            <div className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-orange mb-4">
              Reserve your spot
            </div>
            <h2 className="text-display text-white text-3xl sm:text-4xl md:text-[44px] leading-[1.05]">
              Start your{' '}
              <span className="text-italic-serif text-orange">riyaz</span>.
            </h2>
            <p className="mt-4 text-white/75 text-sm md:text-base">
              Selected plan:{' '}
              <span className="text-white font-medium">
                {PLANS.find((p) => p.id === selected)?.name}
              </span>
              . Change above anytime.
            </p>
          </div>

          <div className="rounded-[28px] md:rounded-[36px] bg-cream border border-brown-dark/10 p-8 md:p-12">
            {ok ? (
              <div
                data-testid="umr-success"
                className="rounded-2xl bg-white border border-orange/40 p-7 max-w-xl"
              >
                <div className="flex items-center gap-3 text-orange">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="text-display text-2xl text-brown-dark">
                    You&apos;re in.
                  </span>
                </div>
                <p className="mt-3 text-brown-mid">
                  A curator from Udukku will WhatsApp you within a day to
                  confirm your slot and answer any questions.
                </p>
              </div>
            ) : (
            <form
              onSubmit={submit}
              data-testid="umr-form"
              className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-3xl"
            >
              <LightField
                label="Name *"
                name="name"
                testid="umr-field-name"
                value={form.name}
                onChange={onChange}
                required
              />
              <LightField
                label="WhatsApp number *"
                name="whatsapp"
                type="tel"
                testid="umr-field-whatsapp"
                value={form.whatsapp}
                onChange={onChange}
                placeholder="+91 98xxxxxxxx"
                required
              />
              <LightField
                label="City, Country *"
                name="location"
                testid="umr-field-location"
                value={form.location}
                onChange={onChange}
                placeholder="e.g. Bengaluru, India"
                required
                wide
              />

              <div className="md:col-span-2">
                <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-3">
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
                          ? 'bg-white border-orange text-brown-dark'
                          : 'bg-white border-brown-dark/10 text-brown-mid hover:border-orange/40'
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
                              : 'border-brown-dark/30'
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
                <p className="mt-2 text-brown-mid/70 text-xs">
                  We currently host up to 3 sessions per week. More slots
                  coming soon.
                </p>
              </div>

              <div className="md:col-span-2">
                <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-3">
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
                            ? 'bg-white border-orange text-brown-dark'
                            : 'bg-white border-brown-dark/10 text-brown-mid hover:border-orange/40'
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
                            form.time === slot.value ? 'text-orange' : 'text-brown-mid'
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

              <div className="md:col-span-2 mt-1">
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="umr-submit"
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-orange text-white text-[15px] font-medium hover:bg-orange-dark disabled:opacity-60 transition-colors"
                >
                  {loading ? 'Reserving…' : 'Join Now'}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
          </div>
        </div>
      </section>

      <ServiceCTA
        eyebrow="The room is open"
        headline={<>Your <span className="text-italic-serif text-orange">riyaz</span> is waiting.</>}
        description="Reserve your spot in Music Room and let the practice hold you."
        ctaLabel="Reserve My Spot"
        ctaTo="/booking"
        testId="umr-book-cta"
      />
    </main>
  );
}

/* ---------- Light form fields ---------- */
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
