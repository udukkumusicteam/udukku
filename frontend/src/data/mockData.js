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

export const HERO_PILLS = ['Keys', 'Strings', 'Vocals', 'Percussion', 'Violin', 'Theory'];

export const STATS = [
  {
    number: '500+',
    title: 'Lives touched by music',
    body:
      'From quiet first-timers to soulful performers, every story here began with a single, gentle note.',
  },
  {
    number: '15+',
    title: 'Mentors who truly listen',
    body:
      'Our teachers do not just instruct. They sit beside you. Each one brings patience, warmth, and a love for sound that you can feel in the room.',
  },
  {
    number: '8',
    title: 'Instruments, one home',
    body:
      'Keys, strings, voice, percussion, and more. Whatever sound calls to you, there is a path waiting here, ready in its own time.',
  },
];

export const VISION_MISSION = {
  image:
    'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/0rr8yyrl_Screenshot%202026-04-25%20at%2012.44.36%20PM.png',
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
    name: 'Aryan',
    role: 'Piano & Music Theory',
    experience: '12 years exp.',
    image:
      'https://images.unsplash.com/photo-1561447920-aa5c68129cff?auto=format&fit=crop&w=600&q=80',
    bio:
      'Classically trained at the Berklee College of Music. Aryan brings technical craft and warmth to every lesson.',
  },
  {
    id: 't2',
    name: 'Meera',
    role: 'Carnatic Vocals',
    experience: '9 years exp.',
    image:
      'https://images.unsplash.com/photo-1566913485242-694e995731b4?auto=format&fit=crop&w=600&q=80',
    bio:
      'A disciple of the Kiraana gharana, Meera weaves classical Carnatic tradition with quiet, contemporary storytelling.',
  },
  {
    id: 't3',
    name: 'Rohan',
    role: 'Guitar & Fingerstyle',
    experience: '8 years exp.',
    image:
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80',
    bio:
      'A self-taught guitarist who helps students find their own voice on the instrument, well beyond the scales.',
  },
  {
    id: 't4',
    name: 'Priya',
    role: 'Violin & Strings',
    experience: '11 years exp.',
    image:
      'https://images.unsplash.com/photo-1567619822659-2094d3ebef04?auto=format&fit=crop&w=600&q=80',
    bio:
      'Trained under maestros in Chennai, Priya begins every lesson the same way. By listening.',
  },
  {
    id: 't5',
    name: 'Kabir',
    role: 'Percussion & Tabla',
    experience: '14 years exp.',
    image:
      'https://images.unsplash.com/photo-1524230659092-07f99a75c013?auto=format&fit=crop&w=600&q=80',
    bio:
      'Kabir has performed across three continents, gently blending Indian classical rhythms with jazz and world music.',
  },
  {
    id: 't6',
    name: 'Ananya',
    role: 'Hindustani Vocals',
    experience: '10 years exp.',
    image:
      'https://images.unsplash.com/photo-1547357812-4a336d835928?auto=format&fit=crop&w=600&q=80',
    bio:
      'Ananya carries the legacy of the Jaipur Atrauli tradition into modern studios with quiet devotion.',
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
  'Yoga',
  'Wind',
  'Vocals',
  'Production',
];

export const BOTTOM_CTA = {
  heading: 'Want to try a free demo?',
  subheading:
    'No pressure. No auditions. Your first hour with us is a gift. A quiet space to listen, to play, and to remember what music means to you.',
  image:
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=2000&q=80',
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
