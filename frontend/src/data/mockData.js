// All marketing copy + sample content. Single source of truth used by the
// service layer in `src/services/apiService.js`. Tone is intentionally soft,
// warm, and unhurried. No em dashes anywhere.

export const SITE = {
  brand: 'udukku',
  tagline: 'The Music In You',
  phone: '+91 96803 78292',
  email: 'udukkumusic@gmail.com',
  address: 'M-23, Income Tax Colony, Durgapura, Tonk Road, Jaipur, Rajasthan 302004',
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/udukkumusic', icon: 'instagram' },
    { label: 'Facebook', url: 'https://www.facebook.com/udukkumusic', icon: 'facebook' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/udukkumusic', icon: 'linkedin' },
  ],
};

export const HERO_PILLS = ['Keys', 'Strings', 'Vocals', 'Percussion', 'Theory & Composition'];

export const STATS = [
  {
    number: '53',
    title: 'Students Across Formats',
    body:
      'from 1:1 lessons to a 35-student exam stress workshop',
  },
  {
    number: '4',
    title: 'Events Run',
    body:
      'Successfully with 120+ attendees for workshops, open mics and more',
  },
  {
    number: '100+',
    title: 'Educators in Database',
    body:
      'Across subjects ranging from Vocals, Songwriting, Production and Instruments',
  },
];

export const VISION_MISSION = {
  image: '/assets/images/what-is-udukku.png',
  imageCaption: 'What is udukku?',
  est: '2025',
  vision: {
    title: 'Our Vision',
    body:
      'A world where music is for everyone, and expression is never out of reach.',
  },
  mission: {
    title: 'Our Mission',
    body:
      'To walk beside each student, gently, on a musical journey that is wholly their own.',
  },
};

export const TUTORS = [
  {
    id: 't1',
    name: 'Sarah',
    role: 'Keyboard & Western Vocals',
    experience: '5+ years exp.',
    image: '/assets/images/people/sarah.jpg',
    bio:
      'A certified pianist, Sarah brings technical precision and creativity to every lesson. With experience teaching learners of all ages, she builds strong musical foundations through theory, ear training, and engaging keyboard instruction.',
  },
  {
    id: 't2',
    name: 'Suchitra',
    role: 'Hindustani Vocals & Music Theory',
    experience: '10+ years exp.',
    image: '/assets/images/people/suchitra.jpg',
    bio:
      'With over a decade of experience in Hindustani Classical Music, Suchitra combines traditional Guru-Shishya training with a thoughtful, disciplined approach. She helps students build a strong foundation in sur, taal, raag, voice culture, and confident stage performance.',
  },
  {
    id: 't3',
    name: 'Payal',
    role: 'Hindustani Vocals',
    experience: '10+ years exp.',
    image: '/assets/images/people/payal.jpg',
    bio:
      'A playback singer and experienced performer, Payal blends classical training with a patient, encouraging teaching style. She has guided students of all ages while nurturing strong vocal foundations through dedicated practice and a lifelong passion for music.',
  },
  {
    id: 't4',
    name: 'Param',
    role: 'Flute',
    experience: '5+ years exp.',
    image: '/assets/images/people/param.jpg',
    bio:
      'With over a decade of training in Indian flute, Param brings a rich blend of classical tradition and contemporary expression to every lesson. He teaches students worldwide, guiding learners of all ages through classical, semi-classical, ghazals, and Bollywood music with patience and clarity.',
  },
  {
    id: 't5',
    name: 'Nitesh',
    role: 'Music Production',
    experience: 'Professional Producer',
    image: '/assets/images/people/nitesh.jpg',
    bio:
      'A music producer and beatmaker, Nitesh creates distinctive sounds by blending vintage samples with modern production techniques. His work has been featured on VH1, Lakmé Fashion Week, and acclaimed web series, while his live performances showcase his expertise with analog gear and drum machines.',
  },
  {
    id: 't6',
    name: 'Tathastu',
    role: 'Hindustani Vocals & Music Production',
    experience: '2+ years exp.',
    image: '/assets/images/people/tathastu.jpg',
    bio:
      'A singer, songwriter, and independent music producer, Tathastu bridges the worlds of classical and contemporary music. Trained in the Hindustani vocal tradition and professionally producing across multiple genres, he helps students develop both their artistic expression and technical skills.',
  },
];

export const TESTIMONIALS = [
  {
    id: 'q1',
    initials: 'AS',
    name: 'Arjun Sharma',
    role: 'Software Engineer, Mumbai',
    quote:
      'I had tried learning guitar twice before and stepped away both times. At Udukku, from the very first lesson, something felt different. Quieter. Kinder. My teacher did not push me to play. He helped me remember why I wanted to.',
  },
  {
    id: 'q2',
    initials: 'SM',
    name: 'Sunita Menon',
    role: 'Teacher, Bengaluru',
    quote:
      'I came in at forty two, convinced I had missed my window. Two years on, I sing Carnatic vocals at small community gatherings. Udukku did not give me talent. It gave me permission to try.',
  },
  {
    id: 'q3',
    initials: 'RP',
    name: 'Rajesh & Priti Kapoor',
    role: 'Parents, Pune',
    quote:
      'Our daughter was quiet and kept things inside. After six months of violin lessons here, she walks onto the school stage like she belongs there. Music gave her a language she did not have before.',
  },
];

export const COURSE_CATEGORIES = [
  'Percussion',
  'Strings',
  'Theory',
  'Wind',
  'Vocals',
  'Production',
];

export const BOTTOM_CTA = {
  heading: 'Want to try a free demo?',
  subheading:
    'No pressure. No auditions. Your first time with us is a gift. A quiet space to listen, to play, and to remember what music means to you.',
  image: '/assets/backgrounds/story-hero.jpg',
};

export const INSTRUMENTS = [
  'Piano / Keys',
  'Guitar',
  'Violin',
  'Tabla',
  'Carnatic Vocals',
  'Hindustani Vocals',
  'Flute / Bansuri',
  'Music Production',
];
