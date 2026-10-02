import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageMeta — sets the page <title>, meta description, canonical URL and
 * social-preview tags for each route.
 *
 * HOW TO EDIT:
 * Every page has one entry in PAGE_META below, keyed by its URL path.
 * Change the text between the quotes and the page updates — no other file
 * needs touching. Keep descriptions under ~160 characters so Google does
 * not cut them off mid-sentence.
 *
 * To add a new page: copy an existing block, change the path key to the new
 * route (exactly as written in App.js) and write the new text.
 */

const SITE_URL = 'https://www.udukkumusic.com';
const OG_IMAGE = `${SITE_URL}/assets/logos/og-image.jpg`;

const PAGE_META = {
  '/': {
    title: 'Learn Music Online with Udukku',
    description:
      'Learn music online with personalised classes from skilled tutors at Udukku. Explore online music classes across vocals, guitar, piano, violin and more, with flexible learning tailored to your goals, skill level and pace. Start your musical journey from wherever you are.',
  },

  '/about': {
    title: 'About Udukku | Learn Music Online',
    description:
      'Learn about Udukku, a music-ed-tech and wellness venture making music learning simple, personalised and accessible. Udukku connects learners with skilled tutors for online music classes while creating experiences around music, wellness, meditation, community and personal growth.',
  },

  '/services': {
    title: 'Online Music Classes & Experiences | Udukku',
    description:
      'Explore Udukku’s personalised online music classes, music wellness experiences, practice groups, workshops and events. Learn vocals, guitar, piano, violin and more through flexible 1:1 music classes, or experience music for meditation, community, and creative experiences designed for different goals and learning journeys.',
  },

  '/services/instruments': {
    title: 'Online Music Classes for Instruments & Singing',
    description:
      'Learn music online with personalised 1:1 classes in guitar, piano, violin, singing, and more. Udukku connects you with skilled tutors based on your goals, skill level, pace and learning style, making music classes flexible and accessible.',
  },

  '/services/music-room': {
    title: 'Online Music Practice Community | Udukku',
    description:
      'Build consistent music practice with Udukku Music Room, an online community for musicians and music learners. Get regular practice, accountability, supportive community sessions and progress tracking, while being rewarded for showing up and staying consistent with your musical journey.',
  },

  '/services/music-meditation': {
    title: 'Music Meditation & Wellness | Udukku',
    description:
      'Music meditation and neuroscience-backed music wellness sessions designed to support relaxation, focus, stress regulation and emotional wellbeing. Udukku combines sound, guided listening, breathwork and meditation that help you slow down, reconnect and experience the wellbeing potential of music.',
  },

  '/services/events': {
    title: 'Music Events & Experiences | Udukku',
    description:
      'Discover Udukku’s offline music events, workshops, open mics, jam sessions and community experiences. From music and wellness gatherings to creative events, Udukku brings people together through meaningful, engaging experiences that celebrate music, connection and community.',
  },

  '/booking': {
    title: 'Book a Free Music Class | Udukku',
    description:
      'Book your first online music class with Udukku — your first session is free, with no auditions and no pressure. Tell us your goals and we’ll match you with the right tutor for personalised 1:1 lessons in vocals, guitar, piano, violin and more.',
  },

  '/contact': {
    title: 'Contact Udukku | Music Classes',
    description:
      'Get in touch with Udukku for personalised online music classes, music wellness experiences, workshops, events and more. Whether you want to learn music online, explore music classes or meditation from home or connect with Udukku for an experience, reach out to our team to get started.',
  },

  // Internal page — hidden from search engines.
  '/admin': {
    title: 'Admin · Udukku',
    description: '',
    noindex: true,
  },
};

/** Update a <meta> tag in <head>, creating it first if it does not exist. */
function setMeta(attr, key, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/** Update the <link rel="canonical"> tag. */
function setCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Treat "/about/" and "/about" as the same page.
    const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
    const hasOwnEntry = Object.prototype.hasOwnProperty.call(PAGE_META, path);

    // Unknown URLs fall back to the home-page entry.
    const meta = hasOwnEntry ? PAGE_META[path] : PAGE_META['/'];
    const url = hasOwnEntry ? `${SITE_URL}${path === '/' ? '/' : path}` : `${SITE_URL}/`;

    document.title = meta.title;

    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', OG_IMAGE);

    // Twitter / X
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', OG_IMAGE);

    setCanonical(url);
  }, [pathname]);

  return null;
};

export default PageMeta;
