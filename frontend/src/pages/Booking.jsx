import React, { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { bookingService } from '../services/apiService';
import { INSTRUMENTS } from '../data/mockData';
import WaveDivider from '../components/WaveDivider';

const initial = {
  name: '',
  email: '',
  phone: '',
  instrument: '',
  experience: 'Complete beginner',
  preferredDate: '',
  preferredTime: '10:00',
  notes: '',
};

export default function Booking() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(null);

  const onChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Please add your name and email so we can reach you.');
      return;
    }
    setLoading(true);
    try {
      const record = await bookingService.create(form);
      setDone(record);
      setForm(initial);
      toast.success('Session reserved. We\'ll be in touch shortly.');
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="booking-page" className="bg-cream page-fade-in">
      {/* Page hero */}
      <section className="bg-hero-gradient text-white">
        <div className="udukku-section pt-28 md:pt-32 pb-14 md:pb-16">
          <span className="uppercase tracking-[0.28em] text-[11px] text-white/80">
            Book a session
          </span>
          <h1 className="text-display mt-4 text-5xl sm:text-6xl lg:text-[88px] max-w-[14ch]">
            Reserve your{' '}
            <span className="text-italic-serif">first lesson</span>.
          </h1>
          <p className="mt-6 max-w-xl text-white/85 text-base md:text-lg leading-relaxed">
            Your first session is on us. No auditions. No pressure. Just a
            quiet hour with a mentor who will help you find your sound.
          </p>
        </div>
        <WaveDivider fill="#F5F0E5" />
      </section>

      <section className="udukku-section py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-12">
          {/* Form */}
          <form
            onSubmit={submit}
            data-testid="booking-form"
            className="bg-white rounded-3xl p-8 md:p-10 border border-brown-dark/10 shadow-[0_30px_80px_-40px_rgba(45,26,10,0.25)]"
          >
            <h2 className="text-display text-3xl md:text-4xl text-brown-dark">
              Tell us a little about you.
            </h2>
            <p className="text-brown-mid mt-2">
              These details are simply how we will reach you with your session
              note.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              <Field label="Your name" htmlFor="bk-name">
                <input
                  id="bk-name"
                  data-testid="bk-name"
                  value={form.name}
                  onChange={onChange('name')}
                  placeholder="Aanya Iyer"
                  className={inputCls}
                />
              </Field>
              <Field label="Email" htmlFor="bk-email">
                <input
                  id="bk-email"
                  type="email"
                  data-testid="bk-email"
                  value={form.email}
                  onChange={onChange('email')}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </Field>
              <Field label="Phone (optional)" htmlFor="bk-phone">
                <input
                  id="bk-phone"
                  data-testid="bk-phone"
                  value={form.phone}
                  onChange={onChange('phone')}
                  placeholder="+91 ..."
                  className={inputCls}
                />
              </Field>
              <Field label="Instrument of interest" htmlFor="bk-instrument">
                <select
                  id="bk-instrument"
                  data-testid="bk-instrument"
                  value={form.instrument}
                  onChange={onChange('instrument')}
                  className={inputCls}
                >
                  <option value="">Choose one</option>
                  {INSTRUMENTS.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Experience level" htmlFor="bk-exp">
                <select
                  id="bk-exp"
                  data-testid="bk-experience"
                  value={form.experience}
                  onChange={onChange('experience')}
                  className={inputCls}
                >
                  <option>Complete beginner</option>
                  <option>Some practice</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </Field>
              <Field label="Preferred date" htmlFor="bk-date">
                <input
                  id="bk-date"
                  type="date"
                  data-testid="bk-date"
                  value={form.preferredDate}
                  onChange={onChange('preferredDate')}
                  className={inputCls}
                />
              </Field>
              <Field label="Preferred time" htmlFor="bk-time">
                <input
                  id="bk-time"
                  type="time"
                  data-testid="bk-time"
                  value={form.preferredTime}
                  onChange={onChange('preferredTime')}
                  className={inputCls}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Anything you'd like us to know?" htmlFor="bk-notes">
                  <textarea
                    id="bk-notes"
                    data-testid="bk-notes"
                    rows={4}
                    value={form.notes}
                    onChange={onChange('notes')}
                    placeholder="Goals, instruments you've tried, hesitations..."
                    className={`${inputCls} resize-none`}
                  />
                </Field>
              </div>
            </div>

            <button
              type="submit"
              data-testid="bk-submit"
              disabled={loading}
              className="mt-8 inline-flex items-center gap-2 h-12 px-8 rounded-full bg-brown-dark text-white text-base font-medium hover:bg-black transition-colors disabled:opacity-60"
            >
              {loading ? 'Reserving...' : 'Reserve My Free Session'}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

          {/* Side panel */}
          <aside className="space-y-6">
            {done && (
              <div
                data-testid="booking-success"
                className="bg-white border border-orange/30 rounded-3xl p-7"
              >
                <CheckCircle2 className="w-7 h-7 text-orange" />
                <h3 className="text-display text-2xl mt-3 text-brown-dark">
                  We've got you.
                </h3>
                <p className="text-brown-mid mt-2 text-sm leading-relaxed">
                  Booking <span className="font-medium">#{done.id}</span> has
                  been recorded. A mentor will reach out within 24 hours to
                  confirm a slot.
                </p>
              </div>
            )}
            <div className="bg-brown-dark text-white rounded-3xl p-7">
              <h3 className="text-italic-serif text-2xl">What happens next</h3>
              <ul className="mt-5 space-y-4 text-sm text-white/85">
                <Step n="1" t="Tell us what you're looking for." />
                <Step n="2" t="We pair you with a mentor who fits your learning style." />
                <Step n="3" t="We reach out with the next steps." />
              </ul>
            </div>
            <div className="bg-cream border border-brown-dark/10 rounded-3xl p-7">
              <h3 className="text-italic-serif text-xl text-brown-dark">
                Not sure yet?
              </h3>
              <p className="mt-2 text-brown-mid text-sm">
                You can also write to us. We answer every message personally.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-orange font-medium"
              >
                Contact us instead <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

const inputCls =
  'w-full h-12 px-4 rounded-xl bg-cream border border-brown-dark/15 text-brown-dark placeholder:text-brown-light/80 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition';

const Field = ({ label, htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block">
    <span className="block text-xs uppercase tracking-[0.18em] text-brown-mid mb-2">
      {label}
    </span>
    {children}
  </label>
);

const Step = ({ n, t }) => (
  <li className="flex gap-3">
    <span className="w-7 h-7 shrink-0 rounded-full bg-orange text-white text-xs inline-flex items-center justify-center font-semibold">
      {n}
    </span>
    <span className="leading-relaxed">{t}</span>
  </li>
);
