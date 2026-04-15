# 🚀 My Projects

Welcome to my project repository! This README highlights my work and will continue to grow as I add more projects.

---

## 📌 Project 1: Portfolio Website

### 🔍 Overview

This is my personal portfolio website built to showcase my skills, projects, and contact information. It acts as a central platform where potential employers and collaborators can learn more about my work and experience.

### 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- React.js

### ✨ Features

- Fully responsive design (optimized for mobile, tablet, and desktop)
- Clean and modern user interface
- Dedicated contact section for easy communication
- Smooth navigation and user-friendly experience

---

## 📌 Project 2:

# CRM Lead Manager

A full-stack CRM application to manage client leads from website contact forms.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT (JSON Web Tokens)

## Project Structure

```
crm-app/
├── backend/
│   ├── models/       # MongoDB schemas (User, Lead, Note)
│   ├── routes/       # API routes (auth, leads, notes)
│   ├── middleware/   # JWT auth middleware
│   ├── server.js     # Express server entry point
│   ├── .env.example  # Environment variable template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/  # Sidebar, LeadModal
    │   ├── context/     # AuthContext
    │   ├── pages/       # Dashboard, Leads, LeadDetail, Login, Register
    │   ├── utils/       # Axios API instance
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

## Prerequisites

- Node.js v18+
- MongoDB (local install or free MongoDB Atlas cloud)

## Features

- ✅ Secure JWT login / register
- ✅ Lead listing with search + filters + pagination
- ✅ Add / edit / delete leads
- ✅ Lead status updates (new → contacted → qualified → converted → lost)
- ✅ Notes & activity log per lead (note, call, email, meeting, follow_up)
- ✅ Dashboard with stats and recent leads
- ✅ Follow-up date tracking
- ✅ Deal value in ZAR

---

## 📌 Project 3: Coming Soon

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

---

## 📬 Contact

- Email: babalonogqala2003@gmail.com
- LinkedIn: https://www.linkedin.com/in/babalo-nogqala/
