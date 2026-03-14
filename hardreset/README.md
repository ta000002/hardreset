# Hard Reset — Demo Website

This is a small responsive HTML demo site for Hard Reset (company profile, performance charts, and team listing).

How to run locally:

1. Place the `hardreset` folder inside your web server document root (e.g., XAMPP `htdocs`).
2. Open `http://localhost/hardreset/` in your browser.

Files added:
- `index.html` — main page
- `assets/css/styles.css` — styles
- `assets/js/script.js` — demo data + Chart.js setup

Notes:
- Charts use Chart.js via CDN. No build step required.
- Replace sample data in `assets/js/script.js` with real metrics or a backend endpoint as needed.

### Recent UI Enhancements
- Header logo redesigned (SVG with reset arrow icon) and resized; tagline hidden for cleaner look.
- Sticky tabbed navigation now toggles section visibility; only the chosen tab content displays.
  - "About" tab shows both hero banner + about copy.
  - Switching to "Services", "Subscriptions", "Performance", "Team" or "Contact" hides other content.
- Services description separated from subscription plans; there is now a dedicated "Subscriptions" tab.
- Services section now displays individual cards with overviews. Click the "Start" button to open a floating carousel that guides users through: (1) Roadmap & Process, (2) Terms & Conditions, (3) Get Started Form. Next/Previous buttons navigate between steps.
- Subscription plans displayed as prominent cards with CTAs; selecting a plan shows a note in contact section.
- Navigation no longer scrolls to sections; we simply show/hide to prevent long scrolling.
