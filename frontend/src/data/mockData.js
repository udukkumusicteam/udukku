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

export const HERO_PILLS = ['Music skills', 'Udukku Music Room', 'Music Meditation', 'Events'];

export const STATS = [
  {
    number: '70+',
    title: 'Music journeys shaped',
    body:
      'from 1:1 lessons to a 35-student exam stress workshop',
  },
  {
    number: '4',
    title: 'Experiences created',
    body:
      '400+ attendees across a variety of workshops, open mics, and activities',
  },
  {
    number: '100+',
    title: 'Educators to learn from',
    body:
      'Across subjects ranging from Vocals, Instruments, Production, and Songwriting',
  },
];

export const VISION_MISSION = {
  image: '/assets/images/what-is-udukku.png',
  imageCaption: 'What is udukku?',
  est: '2025',
  vision: {
    title: 'Our Vision',
    body:
      ' A world where music belongs to everyone, opening doors to learning, healing, connection, and growth.',
  },
  mission: {
    title: 'Our Mission',
    body:
      ' To break barriers to music education by connecting people with the right teachers, tools, and ways to learn.',
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
    name: 'Aditya',
    role: 'Hindustani Vocals & Music Theory',
    experience: '10+ years exp.',
    image: '/assets/images/people/suchitra.jpg',
    bio:
      'A skilled guitarist and performer with over a decade of experience playing with bands and covering songs. Trinity College London Grade 3 certified, Aditya teaches guitar and music theory through flexible online lessons tailored to each student\'s pace and interests.',
  },
  {
    id: 't3',
    name: 'Sirisha',
    role: 'Carnatic Vocals',
    experience: '10+ years exp.',
    image: '/assets/images/people/payal.jpg',
    bio:
      'With over a decade of experience, Sirisha specializes in Carnatic vocals, kritis, and bhajans. She teaches students of all ages and skill levels, preparing learners across India and abroad for recitals. A certified Carnatic music instructor, she blends traditional training with a modern, adaptable approach to teaching.',
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
    experience: '10+ years exp.',
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
    initials: 'V',
    name: 'Veeral',
    role: 'Student',
    quote:
      'I started my flute journey during lockdown, and after almost three and a half years, it’s been wonderful to get back to learning with Udukku. The online classes are incredibly convenient, and my teacher’s flexibility and guidance have made learning easy and enjoyable. It feels good to finally pick up where I left off, with the right support and a pace that works for me. I’m really glad I found my way back to music with Udukku.',
  },
  {
    id: 'q2',
    initials: 'RS',
    name: 'Raisin Saini',
    role: 'Model',
    quote:
      'I’ve been loving the classes. With every session, I feel myself improving and understanding how to catch the notes in a song better. Since I started learning how to sing, I’ve also become much more confident singing by myself, even when it’s a completely new song. The classes have become something I genuinely look forward to every week, and seeing myself improve with each one makes the whole experience even more rewarding.',
  },
  {
    id: 'q3',
    initials: 'AS',
    name: 'Anonymous Student',
    role: 'Harmonica Student',
    quote:
      'I was looking for a harmonica teacher for my first instrument and had a hard time finding good options online. Then I found Udukku. The founder personally helped me find the right teacher, and the classes turned out to be systematic, easy to follow, and great for a beginner. You can really tell they care about music and their students. They made my first music-learning experience feel easy, comfortable, and genuinely fun.',
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
  heading: 'So, What Do You Want To Learn?',
  subheading:
    'Guitar, piano, vocals, or something completely new. Start with whatever sounds like you.',
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
