import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Brain,
  Users,
  Building2,
  TrendingUp,
  Target,
  Heart,
  Music,
  Music2,
  Wind,
  Ear,
  PenLine,
  Moon,
  BookOpen,
  Sparkles,
  Shield,
  Zap,
  Calendar,
  Clock,
  Layers,
  Video,
  Sliders,
  Award,
  Gift,
  CalendarCheck,
} from 'lucide-react';
import { bookingService, contactService } from '../../services/apiService';

/* --------------------------- CONTENT --------------------------- */

const WHY_ITEMS = [
  { icon: Brain, label: 'Better Focus' },
  { icon: Heart, label: 'Reduced Stress' },
  { icon: TrendingUp, label: 'Stronger Memory' },
  { icon: Target, label: 'Improved Performance' },
  { icon: Sparkles, label: 'Emotional Regulation' },
  { icon: Music, label: 'Music-Based Meditation' },
];

const INDIVIDUAL_ELEMENTS = [
  { icon: Wind, label: 'Bhramari (Humming Breath)' },
  { icon: Wind, label: 'Guided Breathing' },
  { icon: Music2, label: 'Vocal Exercises' },
  { icon: Music, label: 'Guided Music Meditation' },
  { icon: Ear, label: 'Active Listening' },
  { icon: PenLine, label: 'Journaling' },
  { icon: Moon, label: 'Relaxation & Sleep Practices' },
];

const INDIVIDUAL_STRUCTURE = [
  { icon: Calendar, label: 'Duration', value: '3 Months' },
  { icon: Clock, label: 'Frequency', value: 'Weekly' },
  { icon: Clock, label: 'Session Length', value: '30-40 mins' },
  { icon: Layers, label: 'Flexible Plans', value: '4 / 8 / 12 Sessions' },
];

const INDIVIDUAL_OUTCOMES = [
  'Shift from stress to calm',
  'Improve focus and productivity',
  'Re-orient and regulate your mental state',
  'Learn calming music meditation techniques',
  'Build everyday wellness habits',
];

const INDIVIDUAL_PLANS = [
  { id: 'weekly-reset', name: 'Weekly Reset', sessions: '4 Sessions / Month', price: '₹999' },
  { id: 'music-reset', name: 'Music Reset', sessions: '8 Sessions / Month', price: '₹1499' },
  { id: 'deep-practice', name: 'Deep Practice', sessions: '12 Sessions / Month', price: '₹1799' },
];

const CORPORATE_WHY = [
  { icon: Brain, label: 'Reduce Cognitive Fatigue' },
  { icon: Heart, label: 'Improve Employee Wellbeing' },
  { icon: Target, label: 'Increase Focus and Productivity' },
  { icon: Shield, label: 'Prevent Burnout' },
  { icon: Users, label: 'Build Team Cohesion' },
  { icon: Zap, label: 'Support ESG and Wellbeing Goals' },
];

const CORPORATE_JOURNEY = [
  { n: '1', title: 'RESET', body: 'Release accumulated stress.' },
  { n: '2', title: 'REGULATE', body: 'Improve attention and focus using music and breathwork.' },
  { n: '3', title: 'RESTORE', body: 'Build sustainable recovery habits with guided music practices.' },
];

const CORPORATE_OUTCOMES = [
  '4-count breathing technique',
  'Bhramari practice',
  'Personalised music playlists',
  'Daily 10-minute wellness protocol',
  'Better emotional regulation',
  'Improved recovery',
];

const CORPORATE_DELIVERY = [
  { icon: Video, label: 'Virtual only (Zoom / Google Meet)' },
  { icon: Users, label: 'Flexible group size' },
  { icon: Sliders, label: 'Customised session format' },
  { icon: Sparkles, label: 'Bespoke programs designed specifically for each organisation' },
  { icon: Award, label: 'Expert facilitators' },
  { icon: Gift, label: 'Take-home resources' },
];

const FAQS = [
  { q: 'Who can join these sessions?', a: 'Anyone looking to reduce stress, improve focus, or explore music as a wellness tool. No prior music training is required.' },
  { q: 'Do I need prior music experience?', a: 'Not at all. Everything is guided, and the sessions are designed for absolute beginners as well as experienced musicians.' },
  { q: 'Can sessions be conducted online?', a: 'Yes, all sessions run online via Zoom or Google Meet. In-person sessions are available on request.' },
  { q: 'Are corporate sessions customised?', a: 'Yes, every corporate program is tailored to the specific goals and culture of your organisation.' },
  { q: 'How do bookings work?', a: 'Pick a plan or send a corporate enquiry from the form below. Our team will reach out on WhatsApp to confirm your slot.' },
];

/* --------------------------- HELPERS --------------------------- */

const BackLink = () => (
  <Link
    to="/services"
    data-testid="back-to-services"
    className="flex w-fit items-center gap-2 text-orange hover:text-orange-dark text-sm font-medium transition-colors"
  >
    <ArrowLeft className="w-4 h-4" /> Back to Services
  </Link>
);

const scrollTo = (ref) => {
  if (ref?.current) {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/* --------------------------- COMPONENT --------------------------- */

export default function MusicMeditation() {
  const [tab, setTab] = useState('individual'); // 'individual' | 'corporate'
  const explorerRef = useRef(null);
  const bookingRef = useRef(null);

  const [kind, setKind] = useState('individual'); // booking form kind
  const [openFaq, setOpenFaq] = useState(0);

  // Individual form state
  const [ind, setInd] = useState({ name: '', email: '', phone: '', plan: '', goals: '' });
  // Corporate form state
  const [corp, setCorp] = useState({ name: '', workEmail: '', company: '', team: '', goals: '' });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  /* -------- CTA handlers -------- */
  const openExplorer = (which) => {
    setTab(which);
    setTimeout(() => scrollTo(explorerRef), 30);
  };
  const openBooking = (which, plan) => {
    setKind(which);
    if (which === 'individual' && plan) setInd((f) => ({ ...f, plan }));
    setOk(false);
    setTimeout(() => scrollTo(bookingRef), 30);
  };

  /* -------- Submit -------- */
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (kind === 'individual') {
        const planName = INDIVIDUAL_PLANS.find((p) => p.id === ind.plan)?.name || 'Not selected';
        await bookingService.create({
          name: ind.name,
          email: ind.email,
          phone: ind.phone,
          instrument: 'Music Meditation',
          experience: `Music Meditation · Individual · ${planName}`,
          preferredDate: '',
          preferredTime: '',
          notes: `Plan: ${planName}\nGoals: ${ind.goals || 'Not shared'}`,
        });
      } else {
        await contactService.create({
          name: corp.name,
          email: corp.workEmail,
          subject: `Corporate Wellness Proposal for ${corp.company || 'company'}`,
          message: [
            `Company: ${corp.company}`,
            `Team size: ${corp.team || 'Not shared'}`,
            '',
            'Goals for the team:',
            corp.goals || 'Not shared',
          ].join('\n'),
        });
      }
      setOk(true);
      toast.success(
        kind === 'individual'
          ? 'Your session request is in. We will WhatsApp you shortly.'
          : 'Proposal request received. Our team will get back within a day.',
      );
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main data-testid="music-meditation-page" className="bg-cream page-fade-in">
      <style>{`
        @keyframes udukku-rise { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:translateY(0);} }
        .tab-panel { animation: udukku-fade 0.45s ease both; }
        @keyframes udukku-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .mm-input { background:#fff; border:1px solid rgba(70,40,20,0.12); color:#1a1410; }
        .mm-input:focus { outline:none; border-color:#E8883A; box-shadow: 0 0 0 3px rgba(232,136,58,0.15); }
        .mm-input::placeholder { color: rgba(70,40,20,0.4); }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-cream">
        <div
          className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(closest-side, rgba(232,136,58,0.20), transparent 70%)' }}
          aria-hidden
        />
        <div className="relative udukku-section pt-28 md:pt-32 pb-16 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <BackLink />
            <h1 className="reveal mt-8 text-display text-brown-dark text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.02]">
              Experience the{' '}
              <span className="text-italic-serif text-orange">
                Healing Power
              </span>{' '}
              of Music
            </h1>
            <p className="reveal mt-5 max-w-xl text-brown-mid text-base md:text-lg leading-relaxed" style={{ transitionDelay: '80ms' }}>
              Discover guided music wellness experiences designed to reduce
              stress, improve focus, enhance emotional wellbeing, and help you
              reconnect with yourself or empower your team through the
              transformative power of music.
            </p>
            <div className="reveal mt-8 flex flex-wrap items-center gap-3" style={{ transitionDelay: '140ms' }}>
              <button
                type="button"
                data-testid="hero-book-individual"
                onClick={() => openExplorer('individual')}
                className="inline-flex items-center h-12 px-6 rounded-full bg-orange text-white text-[15px] font-medium hover:bg-orange-dark transition-colors"
              >
                Book Individual Session
              </button>
              <button
                type="button"
                data-testid="hero-corporate-enquiry"
                onClick={() => openExplorer('corporate')}
                className="inline-flex items-center h-12 px-6 rounded-full bg-transparent border border-orange text-orange text-[15px] font-medium hover:bg-orange/10 transition-colors"
              >
                Corporate Enquiry
              </button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-[28px] md:rounded-[36px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(102,54,20,0.28)]">
              <img
                src="/assets/images/events/community-listening-circle.jpg"
                alt="A guided music meditation session in a warm room"
                className="w-full h-full object-cover aspect-[5/4]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WHY MUSIC WELLNESS ---------------- */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <div className="uppercase tracking-[0.28em] text-xs text-orange mb-4">Why Music Wellness?</div>
            <p className="text-brown-mid text-base md:text-lg leading-relaxed">
              Music engages attention while simultaneously promoting emotional
              and physical relaxation. It helps regulate breathing, reduces
              stress levels, and enhances focus and performance through guided
              music experiences.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {WHY_ITEMS.map((w) => {
              const Icon = w.icon;
              return (
                <article
                  key={w.label}
                  className="rounded-2xl bg-white border border-brown-dark/10 p-5 flex flex-col items-center text-center min-h-[130px] justify-center"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-orange/10 text-orange">
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  </span>
                  <div className="mt-3 text-brown-dark text-sm font-medium leading-snug">
                    {w.label}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- CHOOSE YOUR WELLNESS JOURNEY ---------------- */}
      <section className="bg-white/60">
        <div className="udukku-section py-16 md:py-20">
          <h2 className="text-center text-display text-brown-dark text-2xl md:text-3xl mb-10 md:mb-12">
            CHOOSE YOUR WELLNESS JOURNEY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <ChoiceCard
              testid="choice-individual"
              icon={Users}
              title="Individual & Group Wellness"
              body="Reduce stress, improve focus and emotional balance."
              selected={tab === 'individual'}
              onClick={() => openExplorer('individual')}
            />
            <ChoiceCard
              testid="choice-corporate"
              icon={Building2}
              title="Corporate Wellness Programs"
              body="Improve employee focus, resilience and overall wellbeing."
              selected={tab === 'corporate'}
              onClick={() => openExplorer('corporate')}
            />
          </div>
        </div>
      </section>

      {/* ---------------- INTERACTIVE PROGRAM EXPLORER ---------------- */}
      <section ref={explorerRef} className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          {/* Panels */}
          {tab === 'individual' ? (
            <IndividualPanel
              key="individual"
              onBook={(planId) => openBooking('individual', planId)}
            />
          ) : (
            <CorporatePanel
              key="corporate"
              onRequest={() => openBooking('corporate')}
            />
          )}
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="bg-cream">
        <div className="udukku-section pb-16 md:pb-20">
          <h2 className="text-center text-display text-brown-dark text-3xl md:text-4xl mb-10">
            FAQ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-5xl mx-auto">
            {FAQS.map((f, i) => (
              <FaqRow
                key={f.q}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                q={f.q}
                a={f.a}
                testid={`faq-${i}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- BOOKING FORM ---------------- */}
      <section ref={bookingRef} className="bg-cream">
        <div className="udukku-section pb-16 md:pb-20">
          <div className="rounded-[28px] md:rounded-[36px] bg-brown-dark text-white p-7 sm:p-9 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange/20 border border-orange/40 text-orange">
                <CalendarCheck className="w-5 h-5" strokeWidth={1.8} />
              </span>
              <h3 className="text-display text-orange text-3xl md:text-4xl mt-5">
                BOOK YOUR SESSION
              </h3>
              <p className="mt-3 text-white/75 text-sm md:text-base leading-relaxed">
                Ready to begin your wellness journey? Tell us about yourself
                and we will recommend the right wellness experience.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/60 mb-3">
                I am interested in
              </div>
              <div
                data-testid="booking-kind-group"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"
              >
                <KindOption
                  testid="booking-kind-individual"
                  selected={kind === 'individual'}
                  label="Individual & Group Wellness"
                  onClick={() => {
                    setKind('individual');
                    setOk(false);
                  }}
                />
                <KindOption
                  testid="booking-kind-corporate"
                  selected={kind === 'corporate'}
                  label="Corporate Wellness"
                  onClick={() => {
                    setKind('corporate');
                    setOk(false);
                  }}
                />
              </div>
              <p className="text-white/50 text-xs mb-6">
                Form fields will change based on your selection.
              </p>

              {ok ? (
                <div
                  data-testid="booking-success"
                  className="rounded-2xl bg-orange/[0.1] border border-orange/40 p-6"
                >
                  <div className="flex items-center gap-3 text-orange">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-display text-2xl text-white">
                      {kind === 'individual' ? "You're in." : 'Request received.'}
                    </span>
                  </div>
                  <p className="mt-2 text-white/80 text-sm md:text-base">
                    {kind === 'individual'
                      ? 'A wellness curator will WhatsApp you shortly to confirm your slot.'
                      : 'Our corporate team will send a tailored proposal within a day.'}
                  </p>
                </div>
              ) : kind === 'individual' ? (
                <IndividualForm
                  form={ind}
                  setForm={setInd}
                  loading={loading}
                  onSubmit={submit}
                />
              ) : (
                <CorporateForm
                  form={corp}
                  setForm={setCorp}
                  loading={loading}
                  onSubmit={submit}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- BOTTOM CTA BANNER ---------------- */}
      <section className="bg-cream">
        <div className="udukku-section pb-20 md:pb-24">
          <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] bg-hero-gradient text-white p-8 md:p-12 text-center">
            <div className="absolute inset-0 hero-radial-overlay pointer-events-none" aria-hidden />
            <div className="relative max-w-3xl mx-auto">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/15 border border-white/30 text-white mb-5">
                <Music className="w-5 h-5" strokeWidth={1.8} />
              </span>
              <h2 className="text-display text-white text-3xl md:text-4xl lg:text-[44px] leading-[1.05]">
                Ready to Experience the{' '}
                <span className="text-italic-serif">Power of Music</span>?
              </h2>
              <p className="mt-4 text-white/85 text-sm md:text-base">
                Whether you&apos;re seeking personal wellbeing or a healthier,
                more focused workplace, let music guide your journey.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  data-testid="bottom-book-individual"
                  onClick={() => openBooking('individual')}
                  className="inline-flex items-center h-12 px-6 rounded-full bg-white text-brown-dark text-[15px] font-medium hover:bg-cream transition-colors"
                >
                  Book Individual Session
                </button>
                <button
                  type="button"
                  data-testid="bottom-corporate"
                  onClick={() => openBooking('corporate')}
                  className="inline-flex items-center h-12 px-6 rounded-full bg-transparent border border-white text-white text-[15px] font-medium hover:bg-white/10 transition-colors"
                >
                  Talk to Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --------------------------- SUBCOMPONENTS --------------------------- */

const ChoiceCard = ({ testid, icon: Icon, title, body, onClick, selected }) => (
  <article
    data-testid={testid}
    aria-pressed={selected}
    className={`rounded-3xl p-7 md:p-8 flex flex-col md:flex-row items-start gap-5 border-2 transition-all duration-500 ${
      selected
        ? 'bg-orange/[0.08] border-orange shadow-[0_20px_60px_-30px_rgba(232,136,58,0.55)]'
        : 'bg-white border-brown-dark/10 hover:border-orange/40'
    }`}
  >
    <span
      className={`shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full transition-colors ${
        selected ? 'bg-orange text-white' : 'bg-orange/15 text-orange'
      }`}
    >
      <Icon className="w-6 h-6" strokeWidth={1.6} />
    </span>
    <div className="flex-1">
      <h3 className="text-display text-orange text-2xl md:text-[28px] leading-tight">
        {title}
      </h3>
      <p className="mt-2 text-brown-mid text-sm md:text-base leading-relaxed">
        {body}
      </p>
      <button
        type="button"
        onClick={onClick}
        data-testid={`${testid}-cta`}
        className={`mt-5 inline-flex items-center h-11 px-6 rounded-full text-sm font-medium transition-colors ${
          selected
            ? 'bg-brown-dark text-white hover:bg-black'
            : 'bg-orange text-white hover:bg-orange-dark'
        }`}
      >
        {selected ? 'Currently Viewing' : 'Explore Program'}
      </button>
    </div>
  </article>
);

/* ----- Individual panel ----- */
const IndividualPanel = ({ onBook }) => (
  <div className="tab-panel rounded-[28px] bg-white border border-brown-dark/10 p-6 md:p-10">
    <div className="text-center max-w-3xl mx-auto mb-8">
      <div className="uppercase tracking-[0.28em] text-xs text-orange mb-3">
        Individual & Group Wellness
      </div>
      <h3 className="text-display text-brown-dark text-2xl md:text-3xl">
        Find Balance Through Music
      </h3>
      <p className="mt-4 text-brown-mid text-sm md:text-base leading-relaxed">
        Working professionals often experience significant cognitive demands,
        constant performance pressure, and ongoing stress in their daily
        lives. These sessions combine:
      </p>
    </div>

    {/* Elements grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mx-auto mb-10">
      {INDIVIDUAL_ELEMENTS.map((e) => {
        const Icon = e.icon;
        return (
          <div key={e.label} className="flex items-center gap-3 text-brown-dark text-sm">
            <Icon className="w-4 h-4 text-orange" strokeWidth={1.8} />
            <span>{e.label}</span>
          </div>
        );
      })}
    </div>

    {/* Program structure */}
    <div className="text-center uppercase tracking-[0.28em] text-xs text-orange mb-5">
      Program Structure
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
      {INDIVIDUAL_STRUCTURE.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="rounded-2xl bg-cream border border-brown-dark/10 p-4 text-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-orange mb-2">
              <Icon className="w-[16px] h-[16px]" strokeWidth={1.8} />
            </span>
            <div className="text-brown-dark text-sm font-medium">{s.label}</div>
            <div className="text-brown-mid text-xs mt-0.5">{s.value}</div>
          </div>
        );
      })}
    </div>

    {/* Outcomes */}
    <div className="text-center uppercase tracking-[0.28em] text-xs text-orange mb-5">
      What You Will Gain
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mx-auto mb-10">
      {INDIVIDUAL_OUTCOMES.map((o) => (
        <div key={o} className="flex items-start gap-2.5 text-brown-dark text-sm">
          <CheckCircle2 className="w-4 h-4 text-orange mt-[2px] shrink-0" strokeWidth={2} />
          <span>{o}</span>
        </div>
      ))}
    </div>

    {/* Pricing */}
    <div className="text-center uppercase tracking-[0.28em] text-xs text-orange mb-5">
      Choose Your Plan
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
      {INDIVIDUAL_PLANS.map((p) => (
        <div
          key={p.id}
          data-testid={`plan-${p.id}`}
          className="rounded-2xl bg-cream border border-brown-dark/10 p-5 text-center"
        >
          <div className="text-orange text-base font-semibold">{p.name}</div>
          <div className="mt-1 text-brown-mid text-xs">{p.sessions}</div>
          <div className="mt-3 text-display text-brown-dark text-3xl">{p.price}</div>
          <button
            type="button"
            onClick={() => onBook(p.id)}
            data-testid={`plan-${p.id}-choose`}
            className="mt-4 inline-flex items-center h-10 px-5 rounded-full bg-orange text-white text-sm font-medium hover:bg-orange-dark transition-colors"
          >
            Choose Plan
          </button>
        </div>
      ))}
    </div>
    <p className="text-center text-brown-mid/70 text-xs mb-8">
      International pricing available upon request.
    </p>

    <div className="text-center">
      <button
        type="button"
        onClick={() => onBook()}
        data-testid="individual-book-cta"
        className="inline-flex items-center h-12 px-8 rounded-full bg-orange text-white text-[15px] font-medium hover:bg-orange-dark transition-colors"
      >
        Book My Wellness Session
      </button>
    </div>
  </div>
);

/* ----- Corporate panel ----- */
const CorporatePanel = ({ onRequest }) => (
  <div className="tab-panel rounded-[28px] bg-white border border-brown-dark/10 p-6 md:p-10">
    <div className="text-center max-w-3xl mx-auto mb-8">
      <div className="uppercase tracking-[0.28em] text-xs text-orange mb-3">
        Corporate Wellness
      </div>
      <h3 className="text-display text-brown-dark text-2xl md:text-3xl">
        Music as a Performance Tool for Your Workforce
      </h3>
      <p className="mt-4 text-brown-mid text-sm md:text-base leading-relaxed">
        A structured, evidence-informed wellness program designed to build
        measurable cognitive and emotional regulation skills.
      </p>
    </div>

    {/* Why organisations */}
    <div className="text-center uppercase tracking-[0.28em] text-xs text-orange mb-5">
      Why Organisations Choose This
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-10">
      {CORPORATE_WHY.map((w) => {
        const Icon = w.icon;
        return (
          <div key={w.label} className="rounded-2xl bg-cream border border-brown-dark/10 p-4 text-center min-h-[120px] flex flex-col items-center justify-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-orange mb-2">
              <Icon className="w-[16px] h-[16px]" strokeWidth={1.8} />
            </span>
            <div className="text-brown-dark text-xs md:text-[13px] font-medium leading-snug">
              {w.label}
            </div>
          </div>
        );
      })}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-10">
      {/* Program journey */}
      <div>
        <div className="uppercase tracking-[0.28em] text-xs text-orange mb-4">
          Program Journey
        </div>
        <div className="space-y-4">
          {CORPORATE_JOURNEY.map((s) => (
            <div key={s.n} className="flex items-start gap-4">
              <span className="shrink-0 w-9 h-9 rounded-full bg-orange text-white text-sm font-semibold inline-flex items-center justify-center">
                {s.n}
              </span>
              <div>
                <div className="text-brown-dark text-base font-semibold tracking-wide">
                  {s.title}
                </div>
                <div className="text-brown-mid text-sm mt-0.5 leading-relaxed">
                  {s.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee outcomes */}
      <div>
        <div className="uppercase tracking-[0.28em] text-xs text-orange mb-4">
          Employee Outcomes
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {CORPORATE_OUTCOMES.map((o) => (
            <div key={o} className="flex items-start gap-2.5 text-brown-dark text-sm">
              <CheckCircle2 className="w-4 h-4 text-orange mt-[2px] shrink-0" strokeWidth={2} />
              <span>{o}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Delivery format */}
    <div className="text-center uppercase tracking-[0.28em] text-xs text-orange mb-5">
      Delivery Format
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-10">
      {CORPORATE_DELIVERY.map((d) => {
        const Icon = d.icon;
        return (
          <div
            key={d.label}
            className="rounded-2xl bg-cream border border-brown-dark/10 p-4 flex items-center gap-3"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-orange">
              <Icon className="w-[16px] h-[16px]" strokeWidth={1.8} />
            </span>
            <div className="text-brown-dark text-sm">{d.label}</div>
          </div>
        );
      })}
    </div>

    <div className="text-center">
      <button
        type="button"
        onClick={onRequest}
        data-testid="corporate-request-cta"
        className="inline-flex items-center h-12 px-8 rounded-full bg-orange text-white text-[15px] font-medium hover:bg-orange-dark transition-colors"
      >
        Request Corporate Proposal
      </button>
    </div>
  </div>
);

/* ----- FAQ row ----- */
const FaqRow = ({ q, a, open, onToggle, testid }) => (
  <div
    data-testid={testid}
    className={`rounded-2xl border transition-colors ${
      open ? 'bg-white border-orange/40' : 'bg-white border-brown-dark/10'
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 p-5 text-left"
      aria-expanded={open}
    >
      <span className="text-brown-dark text-sm md:text-base font-medium">
        {q}
      </span>
      <ChevronDown
        className={`w-4 h-4 shrink-0 text-brown-mid transition-transform ${
          open ? 'rotate-180' : ''
        }`}
        strokeWidth={2}
      />
    </button>
    {open && (
      <div className="px-5 pb-5 -mt-1 text-brown-mid text-sm leading-relaxed">
        {a}
      </div>
    )}
  </div>
);

/* ----- Booking kind option (radio pill on dark card) ----- */
const KindOption = ({ selected, label, onClick, testid }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testid}
    className={`text-left rounded-2xl px-5 py-4 border transition-all ${
      selected
        ? 'bg-orange/[0.14] border-orange text-white'
        : 'bg-white/[0.04] border-white/15 text-white/70 hover:border-white/30'
    }`}
    aria-pressed={selected}
  >
    <div className="flex items-center gap-3">
      <span
        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
          selected ? 'border-orange' : 'border-white/40'
        }`}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-orange" />}
      </span>
      <span className="text-sm md:text-[15px] font-medium">{label}</span>
    </div>
  </button>
);

/* ----- Individual form ----- */
const IndividualForm = ({ form, setForm, loading, onSubmit }) => {
  const on = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  return (
    <form
      onSubmit={onSubmit}
      data-testid="individual-form"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
    >
      <DarkField label="Full Name *" name="name" value={form.name} onChange={on} testid="ind-field-name" required />
      <DarkField label="Email *" type="email" name="email" value={form.email} onChange={on} testid="ind-field-email" required />
      <DarkField wide label="WhatsApp Number *" type="tel" name="phone" value={form.phone} onChange={on} placeholder="+91 98xxxxxxxx" testid="ind-field-phone" required />
      <label className="md:col-span-2 block">
        <span className="block text-[11px] uppercase tracking-[0.22em] text-white/60 mb-2">Preferred Plan *</span>
        <select
          name="plan"
          value={form.plan}
          onChange={on}
          required
          data-testid="ind-field-plan"
          className="mm-input w-full h-12 rounded-2xl px-4 text-sm bg-white/[0.06] border border-white/15 text-white focus:outline-none focus:border-orange"
        >
          <option value="" disabled>Select a plan</option>
          {INDIVIDUAL_PLANS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} · {p.price} · {p.sessions}
            </option>
          ))}
        </select>
      </label>
      <DarkTextarea label="Your Wellness Goals" name="goals" value={form.goals} onChange={on} rows={3} placeholder="e.g. reduce stress, improve focus, sleep better" testid="ind-field-goals" />
      <div className="md:col-span-2 mt-1">
        <button
          type="submit"
          disabled={loading}
          data-testid="ind-submit"
          className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-orange text-white text-[15px] font-medium hover:bg-orange-dark transition-colors disabled:opacity-60"
        >
          {loading ? 'Booking…' : 'Book My Session'}
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

/* ----- Corporate form ----- */
const CorporateForm = ({ form, setForm, loading, onSubmit }) => {
  const on = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  return (
    <form
      onSubmit={onSubmit}
      data-testid="corporate-form"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
    >
      <DarkField label="Contact Name *" name="name" value={form.name} onChange={on} testid="corp-field-name" required />
      <DarkField label="Work Email *" type="email" name="workEmail" value={form.workEmail} onChange={on} testid="corp-field-email" required />
      <DarkField label="Company Name *" name="company" value={form.company} onChange={on} testid="corp-field-company" required />
      <DarkField label="Team Size" name="team" value={form.team} onChange={on} placeholder="e.g. 25 to 50" testid="corp-field-team" />
      <DarkTextarea label="Goals for Your Team" name="goals" value={form.goals} onChange={on} rows={3} placeholder="e.g. reduce burnout, improve focus, build cohesion" testid="corp-field-goals" />
      <div className="md:col-span-2 mt-1">
        <button
          type="submit"
          disabled={loading}
          data-testid="corp-submit"
          className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-orange text-white text-[15px] font-medium hover:bg-orange-dark transition-colors disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Request Corporate Proposal'}
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

/* ----- Dark form fields (on brown-dark card) ----- */
const DarkField = ({ label, wide, testid, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-white/60 mb-2">{label}</span>
    <input
      {...props}
      data-testid={testid}
      className="w-full h-12 rounded-2xl bg-white/[0.06] border border-white/15 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-orange focus:bg-white/[0.1] transition-colors text-sm"
    />
  </label>
);

const DarkTextarea = ({ label, testid, ...props }) => (
  <label className="md:col-span-2 block">
    <span className="block text-[11px] uppercase tracking-[0.22em] text-white/60 mb-2">{label}</span>
    <textarea
      {...props}
      data-testid={testid}
      className="w-full rounded-2xl bg-white/[0.06] border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-orange focus:bg-white/[0.1] transition-colors resize-none text-sm"
    />
  </label>
);
