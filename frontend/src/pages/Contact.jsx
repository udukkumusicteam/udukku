import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, MapPin, Phone, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import BrandIcon from '../components/BrandIcon';
import { contactService } from '../services/apiService';
import { SITE } from '../data/mockData';
import WaveDivider from '../components/WaveDivider';

const initial = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Name, email, and message are required.');
      return;
    }
    setLoading(true);
    try {
      await contactService.create(form);
      setForm(initial);
      setSent(true);
      toast.success('Message sent. Expect a reply within a day.');
    } catch (err) {
      toast.error(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="contact-page" className="bg-white page-fade-in">
      <section className="bg-hero-gradient text-white">
        <div className="udukku-section pt-28 md:pt-32 pb-14 md:pb-16">
          <span className="uppercase tracking-[0.28em] text-[11px] text-white/80">
            Contact
          </span>
          <h1 className="text-display mt-4 text-5xl sm:text-6xl lg:text-[88px]">
            Say hello.{' '}
            <span className="text-italic-serif">We're listening.</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/85 text-italic-serif text-xl md:text-2xl leading-relaxed">
            Every connection begins with a conversation.
          </p>
        </div>
        <WaveDivider fill="#FFFFFF" />
      </section>

      <section className="udukku-section py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-12">
          {/* Info column */}
          <div>
            <h2 className="text-display text-3xl md:text-4xl text-brown-dark">
              Have a question, an idea, or want to know more about{' '}
              <span className="text-italic-serif text-orange">Udukku</span>?
            </h2>
            <p className="mt-4 text-brown-mid text-base leading-relaxed max-w-md">
              We'd love to hear from you. Whether you're a student, teacher,
              musician, parent, or music enthusiast, reach out and we'll get
              back to you as soon as we can.
            </p>

            <div className="mt-10 space-y-6">
              <InfoLine
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                value={
                  <a href={`mailto:${SITE.email}`} className="hover:text-orange">
                    {SITE.email}
                  </a>
                }
              />
              <InfoLine
                icon={<Phone className="w-5 h-5" />}
                label="Phone"
                value={SITE.phone}
              />
              <InfoLine
                icon={<MapPin className="w-5 h-5" />}
                label="Studio"
                value={SITE.address}
              />
            </div>

            <div className="mt-10 rounded-3xl p-8 md:p-9 bg-cream border border-brown-dark/10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange/10 blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-orange">
                  <BrandIcon size={16} />
                  <span className="text-xs uppercase tracking-[0.22em]">
                    Looking to learn?
                  </span>
                </div>
                <h3 className="text-display mt-3 text-2xl md:text-[28px] text-brown-dark leading-tight">
                  Hoping to book a session{' '}
                  <span className="text-italic-serif text-orange">instead</span>?
                </h3>
                <p className="mt-3 text-brown-mid text-sm leading-relaxed max-w-sm">
                  Lessons, trial classes, and quiet first steps live on a
                  separate page. Step in and we'll find a time that feels right.
                </p>
                <Link
                  to="/booking"
                  data-testid="contact-book-cta"
                  className="mt-6 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark transition-colors"
                >
                  Book a session
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Form column */}
          <form
            onSubmit={submit}
            data-testid="contact-form"
            className="bg-cream rounded-3xl p-8 md:p-10 border border-brown-dark/10"
          >
            <h3 className="text-display text-2xl md:text-3xl text-brown-dark">
              Tell us about your idea.
            </h3>
            <p className="text-brown-mid mt-2 text-sm">
              Collaborations, events, partnerships, press, or just a thought.
              We read every word.
            </p>

            <div className="grid grid-cols-1 gap-5 mt-7">
              <Field label="Your name" htmlFor="ct-name">
                <input
                  id="ct-name"
                  data-testid="ct-name"
                  value={form.name}
                  onChange={onChange('name')}
                  className={inputCls}
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Email" htmlFor="ct-email">
                <input
                  id="ct-email"
                  type="email"
                  data-testid="ct-email"
                  value={form.email}
                  onChange={onChange('email')}
                  className={inputCls}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Subject (optional)" htmlFor="ct-subject">
                <input
                  id="ct-subject"
                  data-testid="ct-subject"
                  value={form.subject}
                  onChange={onChange('subject')}
                  className={inputCls}
                  placeholder="Collaboration, event, partnership..."
                />
              </Field>
              <Field label="Message" htmlFor="ct-message">
                <textarea
                  id="ct-message"
                  data-testid="ct-message"
                  rows={6}
                  value={form.message}
                  onChange={onChange('message')}
                  className={`${inputCls} resize-none`}
                  placeholder="Tell us a little about what you have in mind..."
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={loading}
              data-testid="ct-submit"
              className="mt-8 inline-flex items-center gap-2 h-12 px-8 rounded-full bg-brown-dark text-white text-base font-medium hover:bg-black transition-colors disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send message'}
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {sent && (
              <div
                data-testid="contact-success"
                className="mt-6 flex items-start gap-3 text-brown-dark"
              >
                <CheckCircle2 className="w-5 h-5 text-orange mt-0.5" />
                <p className="text-sm leading-relaxed">
                  Thank you. We've received your note and will reply shortly.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

const inputCls =
  'w-full h-12 px-4 rounded-xl bg-white border border-brown-dark/15 text-brown-dark placeholder:text-brown-light/80 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition';

const Field = ({ label, htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block">
    <span className="block text-xs uppercase tracking-[0.18em] text-brown-mid mb-2">
      {label}
    </span>
    {children}
  </label>
);

const InfoLine = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="w-11 h-11 rounded-full bg-cream border border-brown-dark/15 flex items-center justify-center text-orange shrink-0">
      {icon}
    </div>
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-brown-mid">
        {label}
      </div>
      <div className="text-brown-dark mt-1 text-base">{value}</div>
    </div>
  </div>
);
