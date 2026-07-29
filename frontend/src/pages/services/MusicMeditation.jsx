import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import {
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
import ServiceHero from '../../components/services/ServiceHero';
import ServiceCTA from '../../components/services/ServiceCTA';
import { sessionBookingsService, corporateBookingsService } from '../../services/supabase';

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
  { q: 'What if I need to reschedule or miss a session?', a: 'Life happens. Let us know at least a day in advance and we will move your slot at no extra cost. Missed live sessions are shared as a recording within a day so nothing feels lost.' },
];

/* --------------------------- HELPERS --------------------------- */

const scrollTo = (ref) => {
  if (ref?.current) {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/* --------------------------- COMPONENT --------------------------- */

export default function MusicMeditation() {
  const [tab, setTab] = useState('individual'); // 'individual' | 'corporate'
  const bookingRef = useRef(null);

  const [kind, setKind] = useState('individual');
  const [openFaq, setOpenFaq] = useState(0);

  const [ind, setInd] = useState({ name: '', email: '', phone: '', plan: '', goals: '' });
  const [corp, setCorp] = useState({ name: '', workEmail: '', company: '', team: '', goals: '' });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const openBooking = (which, plan) => {
    setKind(which);
    if (which === 'individual' && plan) setInd((f) => ({ ...f, plan }));
    setOk(false);
    setTimeout(() => scrollTo(bookingRef), 30);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      if (kind === 'individual') {
        if (!ind.name || !ind.email || !ind.phone || !ind.plan) {
          toast.error('Please fill in all required fields.');
          setLoading(false);
          return;
        }
        const planName = INDIVIDUAL_PLANS.find((p) => p.id === ind.plan)?.name || 'Not selected';
        await sessionBookingsService.createMMIndividual({
          name: ind.name,
          email: ind.email,
          phone: ind.phone,
          plan: ind.plan,
          goals: ind.goals,
          notes: `Plan label: ${planName}`,
        });
        setInd({ name: '', email: '', phone: '', plan: '', goals: '' });
      } else {
        if (!corp.name || !corp.workEmail || !corp.company) {
          toast.error('Please fill in all required fields.');
          setLoading(false);
          return;
        }
        await corporateBookingsService.create({
          contactName: corp.name,
          workEmail: corp.workEmail,
          companyName: corp.company,
          teamSize: corp.team,
          goals: corp.goals,
        });
        setCorp({ name: '', workEmail: '', company: '', team: '', goals: '' });
      }
      setOk(true);
      toast.success(
        kind === 'individual'
          ? 'Your session request is in. We will WhatsApp you shortly.'
          : 'Proposal request received. Our team will get back within a day.',
      );
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="music-meditation-page" className="bg-white page-fade-in">
      <style>{`
        @keyframes udukku-rise { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:translateY(0);} }
        @keyframes udukku-drift { 0% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-14px) rotate(-2deg); } 100% { transform: translateY(0px) rotate(-2deg); } }
        .tab-panel { animation: udukku-fade 0.45s ease both; }
        @keyframes udukku-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <ServiceHero
        testId="music-meditation-hero"
        eyebrow="Music & Meditation"
        headline={
          <>
            Experience the{' '}
            <span className="text-italic-serif text-orange">healing power</span>{' '}
            of music.
          </>
        }
        description="Guided music wellness experiences designed to reduce stress, improve focus, and help you reconnect through the transformative power of music."
        pills={['Individual', 'Corporate', 'Group', 'Wellness', 'Focus']}
        imageSrc="/assets/images/events/community-listening-circle.jpg"
        imageAlt="A guided music meditation session in a warm room"
        chipTitle="Music As Medicine"
        chipSubtitle="A daily wellness practice"
      />

      {/* Why music wellness — dark editorial band */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
          <h2 className="text-display text-white text-3xl md:text-4xl mb-6">
            Why music wellness
          </h2>
          <p className="max-w-2xl text-white/75 text-base md:text-lg leading-relaxed mb-10">
            Music engages attention while promoting emotional and physical
            relaxation. It regulates breathing, reduces stress, and enhances
            focus through guided experiences.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {WHY_ITEMS.map((w) => {
              const Icon = w.icon;
              return (
                <article
                  key={w.label}
                  className="rounded-2xl bg-cream border border-brown-dark/10 p-5 flex flex-col items-center text-center min-h-[130px] justify-center"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-brown-dark/10 text-orange">
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

      {/* Choose journey — segmented toggle */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <h2 className="text-display text-brown-dark text-3xl md:text-4xl mb-6">
            Choose your wellness journey
          </h2>

          <div
            role="tablist"
            aria-label="Wellness journey"
            data-testid="journey-toggle"
            className="relative inline-flex flex-wrap sm:flex-nowrap rounded-full p-1.5 bg-white border border-brown-dark/10 shadow-[0_10px_30px_-20px_rgba(102,54,20,0.35)] max-w-full"
          >
            <ToggleOption
              active={tab === 'individual'}
              icon={Users}
              label="Individual & Group Wellness"
              onClick={() => setTab('individual')}
              testid="toggle-individual"
            />
            <ToggleOption
              active={tab === 'corporate'}
              icon={Building2}
              label="Corporate Wellness Programs"
              onClick={() => setTab('corporate')}
              testid="toggle-corporate"
            />
          </div>
          <p className="mt-3 mb-8 md:mb-10 text-brown-mid/75 text-sm">
            Select a wellness journey to explore its programs.
          </p>

          <div
            key={tab}
            data-testid="journey-cards"
            className="tab-panel grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          >
            <JourneyCard
              icon={Users}
              title="Individual & Group Wellness"
              body="Reduce stress, improve focus and emotional balance."
              selected={tab === 'individual'}
              testid="card-individual"
            />
            <JourneyCard
              icon={Building2}
              title="Corporate Wellness Programs"
              body="Improve employee focus, resilience and overall wellbeing."
              selected={tab === 'corporate'}
              testid="card-corporate"
            />
          </div>
        </div>
      </section>

      {/* Interactive explorer — dark editorial band */}
      <section className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
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

      {/* FAQ */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <h2 className="text-display text-brown-dark text-3xl md:text-4xl mb-8">
            Frequently asked
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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

      {/* Booking form — dark editorial band, form wrapped in cream card */}
      <section ref={bookingRef} className="bg-brown-dark">
        <div className="udukku-section py-16 md:py-20">
          <div className="rounded-[28px] md:rounded-[36px] bg-cream border border-brown-dark/10 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-brown-dark/10 text-orange">
                <CalendarCheck className="w-5 h-5" strokeWidth={1.8} />
              </span>
              <h3 className="text-display text-brown-dark text-3xl md:text-4xl mt-5">
                Book your session
              </h3>
              <p className="mt-3 text-brown-mid text-sm md:text-base leading-relaxed">
                Tell us about yourself and we will recommend the right
                wellness experience.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-3">
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

              {ok ? (
                <div
                  data-testid="booking-success"
                  className="rounded-2xl bg-white border border-orange/40 p-6"
                >
                  <div className="flex items-center gap-3 text-orange">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-display text-2xl text-brown-dark">
                      {kind === 'individual' ? "You're in." : 'Request received.'}
                    </span>
                  </div>
                  <p className="mt-2 text-brown-mid text-sm md:text-base">
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

      <ServiceCTA
        eyebrow="Begin your practice"
        headline={<>Let music guide your <span className="text-italic-serif text-orange">wellbeing</span>.</>}
        description="Whether you are seeking personal wellbeing or a healthier workplace, we will help you begin."
        ctaLabel="Book Now"
        ctaTo="/booking"
        testId="mm-book-cta"
      />
    </main>
  );
}

/* --------------------------- SUBCOMPONENTS --------------------------- */

const ToggleOption = ({ active, icon: Icon, label, onClick, testid }) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    data-testid={testid}
    className={`inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm md:text-[15px] font-medium transition-all duration-300 whitespace-nowrap ${
      active
        ? 'bg-orange text-white shadow-[0_8px_20px_-8px_rgba(200,75,26,0.5)]'
        : 'text-brown-mid hover:text-brown-dark'
    }`}
  >
    <Icon className="w-4 h-4" strokeWidth={1.8} />
    {label}
  </button>
);

const JourneyCard = ({ icon: Icon, title, body, selected, testid }) => (
  <article
    data-testid={testid}
    aria-hidden={!selected}
    className={`rounded-2xl p-7 md:p-8 flex flex-col md:flex-row items-start gap-5 border transition-all duration-500 ${
      selected
        ? 'bg-white border-orange shadow-[0_20px_60px_-30px_rgba(200,75,26,0.45)]'
        : 'bg-white/50 border-brown-dark/10 opacity-60 md:opacity-70'
    }`}
  >
    <span
      className={`shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full transition-colors duration-300 ${
        selected ? 'bg-orange text-white' : 'bg-cream text-brown-mid'
      }`}
    >
      <Icon className="w-6 h-6" strokeWidth={1.6} />
    </span>
    <div className="flex-1">
      <h3 className="text-display text-brown-dark text-2xl md:text-[28px] leading-tight">
        {title}
      </h3>
      <p className="mt-2 text-brown-mid text-sm md:text-base leading-relaxed">
        {body}
      </p>
    </div>
  </article>
);

const IndividualPanel = ({ onBook }) => (
  <div className="tab-panel rounded-2xl bg-cream border border-brown-dark/10 p-6 md:p-10">
    <div className="max-w-3xl mb-8">
      <div className="uppercase tracking-[0.28em] text-xs text-orange mb-3">
        Individual & Group Wellness
      </div>
      <h3 className="text-display text-brown-dark text-2xl md:text-3xl">
        Find balance through music
      </h3>
      <p className="mt-4 text-brown-mid text-sm md:text-base leading-relaxed">
        Working professionals often experience cognitive demands, performance
        pressure, and ongoing stress. These sessions combine:
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mb-10">
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

    <div className="uppercase tracking-[0.28em] text-xs text-orange mb-5">
      Program structure
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
      {INDIVIDUAL_STRUCTURE.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="rounded-2xl bg-white border border-brown-dark/10 p-4 text-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cream text-orange mb-2">
              <Icon className="w-[16px] h-[16px]" strokeWidth={1.8} />
            </span>
            <div className="text-brown-dark text-sm font-medium">{s.label}</div>
            <div className="text-brown-mid text-xs mt-0.5">{s.value}</div>
          </div>
        );
      })}
    </div>

    <div className="uppercase tracking-[0.28em] text-xs text-orange mb-5">
      What you will gain
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mb-10">
      {INDIVIDUAL_OUTCOMES.map((o) => (
        <div key={o} className="flex items-start gap-2.5 text-brown-dark text-sm">
          <CheckCircle2 className="w-4 h-4 text-orange mt-[2px] shrink-0" strokeWidth={2} />
          <span>{o}</span>
        </div>
      ))}
    </div>

    <div className="uppercase tracking-[0.28em] text-xs text-orange mb-5">
      Choose your plan
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
      {INDIVIDUAL_PLANS.map((p) => (
        <div
          key={p.id}
          data-testid={`plan-${p.id}`}
          className="rounded-2xl bg-white border border-brown-dark/10 p-5 text-center"
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
    <p className="text-brown-mid/70 text-xs mb-8">
      International pricing available upon request.
    </p>

    <div>
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

const CorporatePanel = ({ onRequest }) => (
  <div className="tab-panel rounded-2xl bg-cream border border-brown-dark/10 p-6 md:p-10">
    <div className="max-w-3xl mb-8">
      <div className="uppercase tracking-[0.28em] text-xs text-orange mb-3">
        Corporate Wellness
      </div>
      <h3 className="text-display text-brown-dark text-2xl md:text-3xl">
        Music as a performance tool for your workforce
      </h3>
      <p className="mt-4 text-brown-mid text-sm md:text-base leading-relaxed">
        A structured, evidence-informed wellness program designed to build
        measurable cognitive and emotional regulation skills.
      </p>
    </div>

    <div className="uppercase tracking-[0.28em] text-xs text-orange mb-5">
      Why organisations choose this
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-10">
      {CORPORATE_WHY.map((w) => {
        const Icon = w.icon;
        return (
          <div key={w.label} className="rounded-2xl bg-white border border-brown-dark/10 p-4 text-center min-h-[120px] flex flex-col items-center justify-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cream text-orange mb-2">
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
      <div>
        <div className="uppercase tracking-[0.28em] text-xs text-orange mb-4">
          Program journey
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

      <div>
        <div className="uppercase tracking-[0.28em] text-xs text-orange mb-4">
          Employee outcomes
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

    <div className="uppercase tracking-[0.28em] text-xs text-orange mb-5">
      Delivery format
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-10">
      {CORPORATE_DELIVERY.map((d) => {
        const Icon = d.icon;
        return (
          <div
            key={d.label}
            className="rounded-2xl bg-white border border-brown-dark/10 p-4 flex items-center gap-3"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cream text-orange">
              <Icon className="w-[16px] h-[16px]" strokeWidth={1.8} />
            </span>
            <div className="text-brown-dark text-sm">{d.label}</div>
          </div>
        );
      })}
    </div>

    <div>
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

const KindOption = ({ selected, label, onClick, testid }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testid}
    className={`text-left rounded-2xl px-5 py-4 border transition-all ${
      selected
        ? 'bg-white border-orange text-brown-dark'
        : 'bg-white border-brown-dark/10 text-brown-mid hover:border-orange/40'
    }`}
    aria-pressed={selected}
  >
    <div className="flex items-center gap-3">
      <span
        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
          selected ? 'border-orange' : 'border-brown-dark/30'
        }`}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-orange" />}
      </span>
      <span className="text-sm md:text-[15px] font-medium">{label}</span>
    </div>
  </button>
);

/* ----- Individual form (light) ----- */
const IndividualForm = ({ form, setForm, loading, onSubmit }) => {
  const on = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  return (
    <form
      onSubmit={onSubmit}
      data-testid="individual-form"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
    >
      <LightField label="Full Name *" name="name" value={form.name} onChange={on} testid="ind-field-name" required />
      <LightField label="Email *" type="email" name="email" value={form.email} onChange={on} testid="ind-field-email" required />
      <LightField wide label="WhatsApp Number *" type="tel" name="phone" value={form.phone} onChange={on} placeholder="+91 98xxxxxxxx" testid="ind-field-phone" required />
      <label className="md:col-span-2 block">
        <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">Preferred Plan *</span>
        <select
          name="plan"
          value={form.plan}
          onChange={on}
          required
          data-testid="ind-field-plan"
          className="w-full h-12 rounded-2xl bg-white border border-brown-dark/15 px-4 text-brown-dark focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition text-sm"
        >
          <option value="" disabled>Select a plan</option>
          {INDIVIDUAL_PLANS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} · {p.price} · {p.sessions}
            </option>
          ))}
        </select>
      </label>
      <LightTextarea label="Your Wellness Goals" name="goals" value={form.goals} onChange={on} rows={3} placeholder="e.g. reduce stress, improve focus, sleep better" testid="ind-field-goals" />
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

const CorporateForm = ({ form, setForm, loading, onSubmit }) => {
  const on = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  return (
    <form
      onSubmit={onSubmit}
      data-testid="corporate-form"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
    >
      <LightField label="Contact Name *" name="name" value={form.name} onChange={on} testid="corp-field-name" required />
      <LightField label="Work Email *" type="email" name="workEmail" value={form.workEmail} onChange={on} testid="corp-field-email" required />
      <LightField label="Company Name *" name="company" value={form.company} onChange={on} testid="corp-field-company" required />
      <LightField label="Team Size" name="team" value={form.team} onChange={on} placeholder="e.g. 25 to 50" testid="corp-field-team" />
      <LightTextarea label="Goals for Your Team" name="goals" value={form.goals} onChange={on} rows={3} placeholder="e.g. reduce burnout, improve focus, build cohesion" testid="corp-field-goals" />
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

/* ----- Light form fields ----- */
const LightField = ({ label, wide, testid, ...props }) => (
  <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">{label}</span>
    <input
      {...props}
      data-testid={testid}
      className="w-full h-12 rounded-2xl bg-white border border-brown-dark/15 px-4 text-brown-dark placeholder:text-brown-mid/60 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition text-sm"
    />
  </label>
);

const LightTextarea = ({ label, testid, ...props }) => (
  <label className="md:col-span-2 block">
    <span className="block text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-2">{label}</span>
    <textarea
      {...props}
      data-testid={testid}
      className="w-full rounded-2xl bg-white border border-brown-dark/15 px-4 py-3 text-brown-dark placeholder:text-brown-mid/60 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition resize-none text-sm"
    />
  </label>
);
