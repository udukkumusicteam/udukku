import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from './ui/sheet';
import { Logo } from './Logo';

const NAV = [
  { to: '/booking', label: 'Booking Page' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Use dark text on light pages (anything not Home), white on Home hero.
  const isHome = location.pathname === '/';
  const linkColor = isHome ? 'text-white/90 hover:text-white' : 'text-brown-dark hover:text-orange';
  const logoColor = isHome ? '#FFFFFF' : '#2D1A0A';

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md border-b border-white/20'
          : 'border-b border-transparent'
      }`}
      style={
        scrolled
          ? { backgroundColor: 'rgba(255, 255, 255, 0.12)' }
          : { backgroundColor: 'transparent' }
      }
    >
      <div className="udukku-section flex items-center justify-between h-[72px] md:h-[84px]">
        <Link to="/" data-testid="header-logo-link" className="flex items-center">
          <Logo color={logoColor} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-link-${n.to.replace('/', '')}`}
              className={`text-[15px] font-medium tracking-wide transition-colors ${linkColor}`}
            >
              {n.label}
            </NavLink>
          ))}
          <Link
            to="/booking"
            data-testid="header-book-now"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-brown-dark text-white text-[15px] font-medium hover:bg-black transition-colors min-w-[44px]"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile trigger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                data-testid="mobile-menu-trigger"
                className={`inline-flex items-center justify-center w-11 h-11 rounded-full border ${
                  isHome
                    ? 'border-white/40 text-white'
                    : 'border-brown-dark/30 text-brown-dark'
                }`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-cream border-l border-brown-dark/10 w-[86vw] max-w-sm p-0"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-brown-dark/10">
                <Logo color="#2D1A0A" />
                <button
                  data-testid="mobile-menu-close"
                  onClick={() => setOpen(false)}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-brown-dark/20 text-brown-dark"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-1">
                {NAV.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    data-testid={`mobile-nav-link-${n.to.replace('/', '')}`}
                    onClick={() => setOpen(false)}
                    className="py-4 text-2xl font-medium text-brown-dark border-b border-brown-dark/10 hover:text-orange transition-colors"
                  >
                    {n.label}
                  </NavLink>
                ))}
                <Link
                  to="/booking"
                  data-testid="mobile-book-now"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center justify-center h-12 px-6 rounded-full bg-brown-dark text-white text-base font-medium"
                >
                  Book Now
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
