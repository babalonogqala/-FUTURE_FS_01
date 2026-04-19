// ── BUSINESS INFO ────────────────────────────────
const BUSINESS = {
  name:      'Sizwe Express',
  tagline:   'Taxi Services',
  phone:     '078 123 4567',
  whatsapp:  '27781234567',
  email:     'sizweexpress@gmail.com',
  address:   'Khayelitsha, Cape Town, 7784',
  hours:     'Daily: 5:00 AM – 10:00 PM',
};

// ── HERO STATS ────────────────────────────────────
const STATS = [
  { num: '12+',  label: 'Years Running' },
  { num: '50K+', label: 'Trips Completed' },
  { num: '4.9★', label: 'Passenger Rating' },
];

// ── MARQUEE ITEMS ─────────────────────────────────
const MARQUEE_ITEMS = [
  'Safe Rides',
  'On-Time Pickups',
  'Airport Transfers',
  'Scholar Transport',
  'Cape Town Covered',
  'WhatsApp Booking',
  'Fair Prices',
  'Vetted Drivers',
  'Daily Routes',
];

// ── SERVICES ──────────────────────────────────────
const SERVICES = [
  {
    icon:  'fas fa-route',
    title: 'Daily Commuter Runs',
    desc:  'Fixed daily routes across Cape Town\'s major townships and suburbs. Reliable pickup times so you never miss work.',
    price: 'From R15 per trip',
  },
  {
    icon:  'fas fa-plane-arrival',
    title: 'Airport Transfers',
    desc:  'Punctual pickups and drop-offs at Cape Town International Airport. Flight tracking included so we\'re always there.',
    price: 'From R250 per transfer',
  },
  {
    icon:  'fas fa-users',
    title: 'Group & Charter',
    desc:  'Need a full minibus for a group event, school trip or corporate outing? We accommodate 10–16 passengers comfortably.',
    price: 'From R800 per charter',
  },
  {
    icon:  'fas fa-moon',
    title: 'After-Hours Rides',
    desc:  'Don\'t get stranded after a late night. Our after-hours service runs until 2AM every Friday and Saturday.',
    price: 'From R80 per trip',
  },
  {
    icon:  'fas fa-briefcase-medical',
    title: 'Medical Transport',
    desc:  'Reliable transport to hospitals and clinics across Cape Town. Pre-book for early morning appointments.',
    price: 'From R120 per trip',
  },
  {
    icon:  'fas fa-graduation-cap',
    title: 'Scholar Transport',
    desc:  'Safe, scheduled school runs for learners. Parents get confirmation SMS every morning. Your child\'s safety is our priority.',
    price: 'From R600 per month',
  },
];

// ── WHY US POINTS ─────────────────────────────────
const WHY_POINTS = [
  {
    icon:  'fas fa-shield-alt',
    title: 'Safety First, Always',
    desc:  'All our drivers are licensed, vetted and trained. Vehicles are roadworthy certified every 6 months. Your safety is not negotiable.',
  },
  {
    icon:  'fas fa-clock',
    title: 'Punctual Every Time',
    desc:  'We track our routes and drivers in real time. If we\'re ever late, we give you your next ride at half price — that\'s our promise.',
  },
  {
    icon:  'fas fa-coins',
    title: 'Fair & Transparent Pricing',
    desc:  'No hidden fees. No surge pricing. What we quote is what you pay — whether it\'s raining or peak hour.',
  },
  {
    icon:  'fab fa-whatsapp',
    title: 'WhatsApp Bookings',
    desc:  'No app needed. Just WhatsApp us your pickup point and time and we handle the rest. Quick, easy, local.',
  },
];

// ── ROUTES ────────────────────────────────────────
const ROUTES = [
  { type: 'Daily Route',     from: 'Khayelitsha',    to: 'Cape Town CBD',         fare: 'R20',   fareLabel: 'per seat' },
  { type: 'Daily Route',     from: "Mitchell's Plain", to: 'Claremont / Wynberg',  fare: 'R18',   fareLabel: 'per seat' },
  { type: 'Airport Transfer', from: 'CT Airport',     to: 'Any Cape Town Area',    fare: 'R250',  fareLabel: 'per vehicle' },
  { type: 'Daily Route',     from: 'Gugulethu',       to: 'Bellville / Parow',     fare: 'R15',   fareLabel: 'per seat' },
  { type: 'Daily Route',     from: 'Langa',           to: 'Cape Town CBD',         fare: 'R15',   fareLabel: 'per seat' },
  { type: 'Intercity',       from: 'Cape Town',       to: 'Paarl / Stellenbosch',  fare: 'R80',   fareLabel: 'per seat' },
  { type: 'Daily Route',     from: 'Philippi',        to: 'Claremont',             fare: 'R20',   fareLabel: 'per seat' },
  { type: 'Charter',         from: 'Any Area',        to: 'Custom Destination',    fare: 'Quote', fareLabel: 'on request' },
];

// ── REVIEWS ───────────────────────────────────────
const REVIEWS = [
  {
    initial: 'N',
    text:    'Sizwe Express has been my go-to for 3 years. The driver is always on time and the taxi is clean. I feel safe every morning going to work in the CBD.',
    name:    'Nomsa Dlamini',
    area:    'Khayelitsha',
  },
  {
    initial: 'T',
    text:    'Used them for my airport transfer at 4AM and they were already waiting for me. Priced fairly and very professional. Will use again next trip.',
    name:    'Thabo Mokoena',
    area:    'Bellville',
  },
  {
    initial: 'F',
    text:    "My kids use their scholar transport every day. I get an SMS when they're picked up and dropped off. As a parent that peace of mind is priceless.",
    name:    'Fatima Adams',
    area:    "Mitchell's Plain",
  },
];

// ── CONTACT DETAILS ───────────────────────────────
const CONTACT_DETAILS = [
  { icon: 'fab fa-whatsapp', text: `WhatsApp: ${BUSINESS.phone}` },
  { icon: 'fas fa-envelope',  text: BUSINESS.email },
  { icon: 'fas fa-clock',     text: BUSINESS.hours },
];

// ── FOOTER NAV LINKS ──────────────────────────────
const FOOTER_NAV = [
  { href: '#services', label: 'Our Services' },
  { href: '#why',      label: 'Why Choose Us' },
  { href: '#routes',   label: 'Routes & Fares' },
  { href: '#reviews',  label: 'Passenger Reviews' },
  { href: '#contact',  label: 'Book a Ride' },
];

// ── FOOTER SERVICE LINKS ──────────────────────────
const FOOTER_SERVICES = [
  'Daily Commuter Runs',
  'Airport Transfers',
  'Group & Charter',
  'After-Hours Rides',
  'Scholar Transport',
  'Medical Transport',
];

// ── FOOTER CONTACT ────────────────────────────────
const FOOTER_CONTACT = [
  { icon: 'fab fa-whatsapp',        text: BUSINESS.phone },
  { icon: 'fas fa-envelope',        text: BUSINESS.email },
  { icon: 'fas fa-map-marker-alt',  text: BUSINESS.address },
  { icon: 'fas fa-clock',           text: BUSINESS.hours },
];
