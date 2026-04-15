# Sizwe Express Taxi Website

A professional, mobile-first website for a South African minibus taxi business based in Cape Town.

## Project Structure

```
sizwe-express/
├── index.html              ← Main HTML (structure only, no inline styles or scripts)
├── README.md
└── src/
    ├── css/
    │   ├── variables.css   ← CSS custom properties
    │   ├── reset.css       ← Reset, base styles, shared components
    │   ├── navbar.css      ← Navigation bar styles
    │   ├── hero.css        ← Hero section
    │   ├── marquee.css     ← Scrolling banner
    │   ├── services.css    ← Services grid
    │   ├── why.css         ← Why us section
    │   ├── routes.css      ← Routes grid
    │   ├── reviews.css     ← Testimonials
    │   ├── contact.css     ← Contact / WhatsApp CTA
    │   ├── footer.css      ← Footer
    │   ├── animations.css  ← Keyframes and fade-up class
    │   └── responsive.css  ← All media queries
    └── js/
        ├── data.js         ← All site content (edit this to update the site)
        ├── navbar.js       ← Scroll effect and mobile menu
        ├── marquee.js      ← Builds the scrolling marquee
        ├── render.js       ← Renders all sections from data.js
        ├── animations.js   ← Intersection observer scroll reveal
        └── main.js         ← Entry point, scroll-to-top, smooth scroll
```

## Tech Stack

- HTML5 (semantic, no inline styles)
- CSS3 (custom properties, Grid, Flexbox, animations)
- Vanilla JavaScript (modular, no frameworks)
- Font Awesome 6 icons
- Google Fonts (Bebas Neue + Barlow)

## Features

- ✅ Fully responsive — mobile first
- ✅ Animated hero section
- ✅ Scrolling marquee banner
- ✅ 6 service cards with hover effects
- ✅ South African minibus taxi image
- ✅ 8 Cape Town route cards with fares
- ✅ Passenger reviews section
- ✅ WhatsApp booking CTA (no form — direct to WhatsApp)
- ✅ Floating WhatsApp button
- ✅ Scroll reveal animations
- ✅ SEO meta tags

## How to Run

Just open `index.html` in any browser — no build step or server needed.

## How to Deploy Free

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the entire `sizwe-express` folder
3. Live in 60 seconds
