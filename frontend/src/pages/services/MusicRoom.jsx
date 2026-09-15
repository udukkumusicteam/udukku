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
  Info,
  Video,
} from 'lucide-react';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceCTA from '../../components/services/ServiceCTA';
import BrandIcon from '../../components/BrandIcon';
import { sessionBookingsService } from '../../services/supabase';

const FEATURES = [
  { icon: Heart, title: 'Regular Check-ins', body: "We check in on you, one on one, so your practice never goes unnoticed. Showing up is easier when someone's actually paying attention." },
  { icon: Users, title: 'Community Network', body: "You're never practicing alone. It's a room full of musicians, all showing up for the same thing, at the same time, learning, sharing, and growing together." },
  { icon: ClipboardCheck, title: 'Cashback and Rewards', body: "Show up, and earn cashback. Or trade it in for a session with our teachers, on production, songwriting, or whatever you've been wanting to work on." },
  //{ icon: Heart, title: '1-on-1 Checks', body: 'An individual touchpoint with the Udukku team.' },
  //{ icon: LineChart, title: 'Progress Plotting', body: 'Revaluation and planning to make progress tangible.' },
  //{ icon: Video, title: 'Session Replays', body: 'Missed a session? Every practice hour is recorded and yours to keep.' },
];

const PLANS = [
  {
    id: 'casual',
    name: 'Casual',
    //price: 'Free',
    strike: null,
    per: null,
    sessions: 'Flexible',
    practiceType: 'Any instrument or style',
    community: false,
    savings: null,
    benefits: false,
  },
  {
    id: 'habit-8',
    name: 'Habit 8-Day',
    price: '₹799',
    strike: null,
    per: 'month',
    sessions: '2 days / week',
    practiceType: 'Any instrument or style',
    community: true,
    savings: 'Around 60% back',
    benefits: true,
  },
  {
    id: 'habit-12',
    name: 'Habit 12-Day',
    price: '₹999',
    strike: '₹1,200',
    per: 'month',
    sessions: '3 days / week',
    practiceType: 'Any instrument or style',
    community: true,
    savings: 'Up to 90% back',
    benefits: true,
  },
  {
    id: 'habit-24',
    name: 'Habit 24-Day',
    price: '₹1,899',
    strike: '₹2,400',
    per: 'month',
    sessions: '6 days / week',
    practiceType: 'Any instrument or style',
    community: true,
    savings: 'Up to 90% back',
    benefits: true,
  },
];

const PLAN_ROWS = [
  { key: 'sessions', label: 'Sessions per week' },
  { key: 'practiceType', label: 'Practice type' },
  { key: 'community', label: 'Community events' },
  { key: 'savings', label: 'Maximum savings' },
  { key: 'benefits', label: 'Benefits' },
];

/* Maps a plan to the matching option in the booking form's frequency group */
const PLAN_FREQUENCY = {
  casual: 'flexible',
  'habit-8': 'twice',
  'habit-12': 'thrice',
  'habit-24': 'six',
};

const FREQUENCY_OPTIONS = [
  { value: 'flexible', label: 'Flexible, as and when' },
  { value: 'twice', label: '2 days a week' },
  { value: 'thrice', label: '3 days a week' },
  { value: 'six', label: '6 days a week' },
];

const TIME_SLOTS = [
  { value: 'morning', label: 'Morning', icon: Sunrise },
  { value: 'afternoon', label: 'Afternoon', icon: Sun },
  { value: 'evening', label: 'Evening', icon: Sunset },
  { value: 'night', label: 'Night', icon: Moon },
];

/* ---------- Plan comparison table ---------- */

/* ---------- Plan comparison table ---------- */

const renderPlanCell = (plan, key, selected) => {
  const muted = selected ? 'text-white/70' : 'text-brown-mid/60';
  const value = selected ? 'text-white font-medium' : 'text-brown-dark font-medium';

  if (key === 'price') {
    return (
      <span className="inline-flex flex-wrap items-baseline justify-center gap-x-1.5">
        {plan.strike && (
          <span className={`text-xs line-through ${muted}`}>{plan.strike}</span>
        )}
        <span
          className={`text-display text-base md:text-lg ${
            selected ? 'text-white' : 'text-brown-dark'
          }`}
        >
          {plan.price}
        </span>
        {plan.per && (
          <span className={`text-xs ${selected ? 'text-white/70' : 'text-brown-mid'}`}>
            /{plan.per}
          </span>
        )}
      </span>
    );
  }

  if (key === 'community' || key === 'benefits') {
    return plan[key] ? (
      <span className={value}>✓</span>
    ) : (
      <span className={muted}>–</span>
    );
  }

  return <span className={value}>{plan[key]}</span>;
};

const PlanTable = ({ selected, onSelect }) => {
  const [hovered, setHovered] = useState(null);

  const cellState = (id) =>
    selected === id ? 'selected' : hovered === id ? 'hovered' : 'idle';

  const columnHandlers = (id) => ({
    onClick: () => onSelect(id),
    onMouseEnter: () => setHovered(id),
    onMouseLeave: () => setHovered(null),
  });

  return (
    <div className="rounded-2xl md:rounded-3xl bg-cream border border-brown-dark/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th scope="col" className="w-[22%] px-5 py-5 text-left align-middle">
                <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid">
                  Udukku Music Room
                </span>
                <span className="sr-only">Plan details</span>
              </th>
              {PLANS.map((plan) => {
                const state = cellState(plan.id);
                const isSelected = state === 'selected';
                return (
                  <th
                    key={plan.id}
                    scope="col"
                    aria-selected={isSelected}
                    title={`Select the ${plan.name} plan`}
                    {...columnHandlers(plan.id)}
                    className={`w-[19.5%] px-4 py-5 text-center align-middle border-l cursor-pointer transition-colors duration-500 ${
                      isSelected
                        ? 'bg-orange border-white/25'
                        : `bg-cream border-brown-dark/10 ${
                            state === 'hovered' ? 'bg-white border-orange/40' : ''
                          }`
                    }`}
                  >
                    <button
                      type="button"
                      data-testid={`plan-${plan.id}`}
                      aria-pressed={isSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(plan.id);
                      }}
                      className={`inline-flex items-center justify-center w-full text-display text-lg md:text-xl rounded-full transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/50 ${
                        isSelected
                          ? 'text-white'
                          : 'text-brown-dark hover:text-orange'
                      }`}
                    >
                      {plan.name}
                    </button>

                    {isSelected && (
                      <span className="mt-2.5 inline-flex items-center gap-1.5 bg-white pl-1 pr-3 py-1 rounded-full shadow-[0_4px_14px_-2px_rgba(200,75,26,0.25)] ring-1 ring-orange/20">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange text-white">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span className="text-orange text-xs font-medium">
                          Selected
                        </span>
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {PLAN_ROWS.map((row) => (
              <tr key={row.key}>
                <th
                  scope="row"
                  className="px-5 py-4 text-left align-middle font-normal text-brown-mid border-t border-brown-dark/10"
                >
                  {row.label}
                </th>
                {PLANS.map((plan) => {
                  const state = cellState(plan.id);
                  const isSelected = state === 'selected';
                  return (
                    <td
                      key={plan.id}
                      data-testid={`plan-${plan.id}-${row.key}`}
                      title={`Select the ${plan.name} plan`}
                      {...columnHandlers(plan.id)}
                      className={`px-4 py-4 text-center align-middle border-t border-l cursor-pointer transition-colors duration-500 ${
                        isSelected
                          ? 'bg-orange border-white/25 text-white'
                          : `border-brown-dark/10 text-brown-dark ${
                              state === 'hovered'
                                ? 'bg-white border-orange/40'
                                : 'bg-cream'
                            }`
                      }`}
                    >
                      {renderPlanCell(plan, row.key, isSelected)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


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

  const selectPlan = (id) => {
    setSelected(id);
    const frequency = PLAN_FREQUENCY[id];
    if (frequency) setForm((f) => ({ ...f, frequency }));
  };

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

  const activePlan = PLANS.find((p) => p.id === selected);

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
            Your music grows when {' '}
            <span className="text-italic-serif text-orange">
            practice becomes a habit.
            </span>
          </>
        }
        description="An online music practice community that helps you practise consistently, stay accountable, and make real progress through regular sessions."
        pills={['Habit 12', 'Habit 24', 'Community', 'Cashback', 'Referrals']}
        imageSrc="/assets/images/services/music-room-hero.jpg"
        imageAlt="A laptop showing an Udukku Music Room online session"
        //chipTitle="Show Up, Every Week"
        //chipSubtitle="Community and structure for your riyaz"
      />

      {/* About the room — dark editorial band */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-10 md:mb-14">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-orange mb-4">
                <BrandIcon size={14} /> The room, open for you.
              </span>
              <h2 className="text-display text-white text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                A promise to keep{' '}
                <span className="text-italic-serif text-orange">showing up</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 text-white/75 text-base md:text-lg leading-relaxed space-y-4">
              <p>
                Udukku Music Room (UMR) is a music practice community
                designed for learners who want to build or rebuild consistency in
                their musical journey.
                
              </p>
              <p>
                Whether you're just starting out or returning
                after a long break, UMR provides structured practice sessions, 
                accountability, and a supportive environment that helps transform
                intention into regular musical practice.
              
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <article className="rounded-2xl p-7 bg-cream border border-brown-dark/10">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-brown-dark/10 text-orange">
                <BrandIcon size={16} />
              </span>
              <p className="text-display text-brown-dark text-xl md:text-2xl leading-tight mt-5">
                Accountability{' '}
                <span className="text-italic-serif text-orange"></span>
              </p>
              <p className="mt-2 text-brown-mid text-sm leading-relaxed">
                Our facilitator keeps you accountable to your practice,
                with every goal you reach earning you cashback and rewards.
                
              </p>
            </article>
            <article className="rounded-2xl p-7 bg-cream border border-brown-dark/10">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-brown-dark/10 text-orange">
                <BrandIcon size={16} />
              </span>
              <p className="text-display text-brown-dark text-xl md:text-2xl leading-tight mt-5">
                Consistency{' '}
                <span className="text-italic-serif text-orange"></span>
              </p>
              <p className="mt-2 text-brown-mid text-sm leading-relaxed">
                Build a practice that fits into your life by choosing a fixed schedule of  
                2, 3, or 6 days a week, and committing to show up for it consistently. 
                
              </p>
            </article>
            <article className="rounded-2xl p-7 bg-cream border border-brown-dark/10">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-brown-dark/10 text-orange">
                <BrandIcon size={16} />
              </span>
              <p className="text-display text-brown-dark text-xl md:text-2xl leading-tight mt-5">
                Growth & Progress{' '}
                <span className="text-italic-serif text-orange"></span>
              </p>
              <p className="mt-2 text-brown-mid text-sm leading-relaxed">
                 Your practice should have a purpose, which is why we do regular 
                 check-ins to analyse your growth and help ensure you’re always moving in the right direction.
                
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
            Choose your <span className="text-italic-serif text-orange">plan</span>
          </h2>
          <PlanTable selected={selected} onSelect={selectPlan} />

          <p
            data-testid="umr-pricing-note"
            className="mt-4 text-xs md:text-sm text-white/60"
          >
            Pricing is shared on request ; {' '}
            <a
              href="/contact"
              className="text-orange underline-offset-4 hover:underline"
            >
              contact us for pricing
            </a>{' '}
            and we&apos;ll help you pick the plan that fits.
          </p>
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
            Your consistency can pay you back. Attend{" "}
            <strong>50% or more</strong> of the classes in any batch to become eligible
            for <strong>cashback</strong>, and choose how you'd like to be rewarded.
            Take the <strong>cashback</strong>, or trade it in for a{" "}
            <strong>customised tutor session</strong> instead. The more regularly you
            attend, the <strong>more cashback you earn</strong>, and the{" "}
            <strong>longer your reward session can be</strong>. Keep showing up and let
            your commitment bring you rewards, however you'd like to receive them.
              
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
              Bring a friend to Music Room, and you both get a head start. When they join
              through you, we'll credit your account with <strong>free attendance</strong>: {" "}
              <strong> a couple of classes, or a percentage of your batch</strong>,{" "}
              <strong> depending on your Habit package</strong>. That attendance brings you
              closer to unlocking your choice of{" "}
              <strong> cashback or a reward session</strong> with one of our tutors. It's a
              simple way to grow the room together and get rewarded for it.
            </p>
          </article>
        </div>
      </section>

      {/* Booking form — dark editorial band, form wrapped in cream card */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-[960px] mx-auto">
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
                {activePlan?.name}
              </span>
              {activePlan && (
                <span className="text-white/70">
                  {' '}
                  — {activePlan.price}
                  {activePlan.per ? `/${activePlan.per}` : ''}
                </span>
              )}
              . Change in the table above anytime.
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
                  Sessions run 2, 3, or 6 days a week. We&apos;ve pre-selected
                  your plan&apos;s schedule — change it here if you&apos;d like.
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

              <div className="md:col-span-2 flex items-start gap-2.5 pt-2">
                <Info
                  className="w-4 h-4 text-orange mt-[3px] shrink-0"
                  strokeWidth={2}
                />
                <p
                  data-testid="umr-form-note"
                  className="text-brown-mid/75 text-xs md:text-sm leading-relaxed"
                >
                  We&apos;ll review your request and reach out shortly with the
                  next steps, tutor availability, and session details.
                </p>
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
        </div>
      </section>

      <ServiceCTA
        eyebrow="The room is open"
        headline={<>Your <span className="text-italic-serif text-orange">riyaz</span> is waiting.</>}
        description="Reserve your spot in Music Room and let the practice hold you."
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
