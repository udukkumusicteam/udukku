import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Music, Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { SITE, COURSE_CATEGORIES } from '../data/mockData';

const iconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  music: Music,
};

/* ------------------------------------------------------------------
   The four services pages.
   Confirm these `to` paths match the routes in your App router — they
   are the only thing in this file you may need to edit.
   Consider moving this array into src/data/mockData.js alongside
   COURSE_CATEGORIES if other components need it too.
   ------------------------------------------------------------------ */
const SERVICES = [
  { label: 'Music Classes', to: '/services/instruments' },
  { label: 'Udukku Music Room', to: '/services/music-room' },
  { label: 'Music Meditation', to: '/services/music-meditation' },
  { label: 'Events & Experiences', to: '/services/events' },
];

export const Footer = () => (
  <footer
    data-testid="site-footer"
    className="bg-orange-dark text-white border-t border-white/15"
  >
    <div className="udukku-section py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        {/* Brand */}
        <div className="space-y-6">
          <Logo variant="light" size={36} />
          <p className="text-italic-serif text-white/85 text-lg">
            {SITE.tagline}
          </p>
          <div className="flex items-center gap-3">
            {SITE.social.map((s) => {
              const Icon = iconMap[s.icon] || Music;
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  data-testid={`footer-social-${s.icon}`}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-orange-dark transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Site nav */}
        <div>
          <h4 className="text-sm uppercase tracking-[0.18em] text-white/70 mb-5">
            Explore
          </h4>
          <ul className="space-y-3 text-[15px]">
            <li>
              <Link to="/" data-testid="footer-link-home" className="hover:text-white text-white/90">
                Home
              </Link>
            </li>
            <li>
              <Link to="/booking" data-testid="footer-link-booking" className="hover:text-white text-white/90">
                Booking
              </Link>
            </li>
            <li>
              <Link to="/services" data-testid="footer-link-learn" className="hover:text-white text-white/90">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/about" data-testid="footer-link-about" className="hover:text-white text-white/90">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" data-testid="footer-link-contact" className="hover:text-white text-white/90">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h4 className="text-sm uppercase tracking-[0.18em] text-white/70 mb-5">
            Courses
          </h4>
          <ul className="space-y-3 text-[15px]">
            {COURSE_CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  to="/booking"
                  data-testid={`footer-course-${c.toLowerCase()}`}
                  className="hover:text-white text-white/90"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services — sits directly next to the Courses list */}
        <div>
          <h4 className="text-sm uppercase tracking-[0.18em] text-white/70 mb-5">
            Services
          </h4>
          <ul className="space-y-3 text-[15px]">
            {SERVICES.map((s) => (
              <li key={s.label}>
                <Link
                  to={s.to}
                  data-testid={`footer-service-${s.label
                    .toLowerCase()
                    .replace(/[^a-z]+/g, '-')}`}
                  className="hover:text-white text-white/90"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm uppercase tracking-[0.18em] text-white/70 mb-5">
            Reach Us
          </h4>
          <ul className="space-y-3 text-[15px] text-white/90">
            <li data-testid="footer-phone" className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-1 shrink-0 text-white/70" />
              <span>{SITE.phone}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-1 shrink-0 text-white/70" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white" data-testid="footer-email">
                {SITE.email}
              </a>
            </li>
            <li data-testid="footer-address" className="flex items-start gap-3 leading-relaxed">
              <MapPin className="w-4 h-4 mt-1 shrink-0 text-white/70" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/70">
        <span>© {new Date().getFullYear()} udukku. The music in you.</span>
        <span className="text-italic-serif">A Place to Pause, Play and Grow.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
