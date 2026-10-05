# Coreline Web – Modern High-Conversion Web Architecture

> **Brand:** Coreline Web  
> **Author & Lead Developer:** Sheikh Naim ([GitHub Profile](https://github.com/snaimio) | [LinkedIn](https://www.linkedin.com/in/sheikh-naim-704655384/) | [CodePen](https://codepen.io/Sheikh-Naim))  
> **Tagline:** *Web Development & Solutions — Designed by Humans, Powered by AI*

---

## 🌟 Overview & Transformation

This repository contains the reconstructed, modernized, and high-performance frontend for **Coreline Web**. Migrated and upgraded from the WordPress site into a clean, zero-dependency, ultra-fast modern web application.

### Key Highlights & Fixes:
1. **Corrected GitHub URL:** Fixed all header, about section, and footer links to point to the active GitHub profile: **[`https://github.com/snaimio`](https://github.com/snaimio)**.
2. **The Three Golden Systems:**
   - **Verified Badges:** Interactive badge showcases representing licensed, insured, certified, and security-hardened standards.
   - **Staff Spotlight:** Humanizing client interactions with real team bios, skills, and regional presence.
   - **Review Requester:** Live social proof stream with star ratings and an interactive review submission modal with real-time DOM updates.
3. **Interactive Booking Engine:**
   - Client-side date and time-slot appointment booking with built-in validation.
   - Generates and downloads `.ics` calendar invites for Apple Calendar, Google Calendar, and Outlook.
4. **Enhanced Performance & Accessibility (WCAG 2.1 AA):**
   - Pure semantic HTML5 (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`).
   - Accessible keyboard focus states, ARIA roles, skip-to-content navigation, and dark mode palette.
5. **SEO & Structured Data:**
   - Pre-configured OpenGraph meta tags, Twitter card tags, and Schema.org `ProfessionalService` JSON-LD data.

---

## 📁 Project Architecture

```
Wordpress/
├── index.html              # Main multi-page SPA entrypoint with semantic sections & JSON-LD
├── assets/
│   ├── css/
│   │   └── styles.css      # Modern dark-theme responsive design & component styles
│   └── js/
│       └── app.js          # Client-side router, booking engine, review stream & FAQ accordion
└── README.md               # Project documentation & deployment guides
```

---

## 🚀 Quick Local Preview

To preview the project locally, run any standard web server in the project directory:

### Option 1: Using Python (Built-in)
```bash
python3 -m http.server 8000
```
Then visit [`http://localhost:8000`](http://localhost:8000) in your browser.

### Option 2: Using Node.js / npx
```bash
npx serve .
```

---

## 🌐 Deployment Options

### 1. GitHub Pages
1. Push this repository to GitHub: `https://github.com/snaimio/corelineweb`
2. Go to **Settings > Pages** and select `main` branch root.

### 2. Vercel / Netlify / Cloudflare Pages
1. Import repository into Vercel or Netlify.
2. Set build command to `None` and publish directory to `.`. Instant zero-config edge deployment.
