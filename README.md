# MARS — Modern Analytics and Research Solutions

Marketing site for MARS, a research partner. Static HTML/CSS/JS, hosted on
GitHub Pages at **mars-logic.com**.

## Structure

```
mars-logic/
├── index.html        Home
├── about.html        About / how we work
├── services.html     The eight services
├── values.html       Mission + three pillars
├── contact.html      Contact form (Formspree)
├── css/style.css     All styling (design tokens at the top)
├── js/main.js        Nav, scroll reveal, hero animation, form submit
├── assets/           Logos + favicons
├── CNAME             Custom domain (mars-logic.com)
├── .nojekyll         Tell GitHub Pages to serve files as-is
├── robots.txt
└── sitemap.xml
```

## Deploy to GitHub Pages

1. Put these files at the **root** of the `DataByMARS/mars-logic` repo and push:
   ```bash
   git add .
   git commit -m "Launch MARS site"
   git push origin main
   ```
2. On GitHub: **Settings → Pages**. Under *Build and deployment*, set
   **Source = Deploy from a branch**, **Branch = main**, **Folder = / (root)**. Save.
3. Still on the Pages screen, set **Custom domain = `mars-logic.com`** and save.
   (The included `CNAME` file already does this, but setting it in the UI triggers
   verification.) Tick **Enforce HTTPS** once it becomes available.

## Point the domain at GitHub (DNS)

At your domain registrar for `mars-logic.com`, add:

- Four **A** records for the apex (`@`) pointing to GitHub Pages:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- One **CNAME** record for `www` pointing to `databymars.github.io`

DNS can take up to ~24 hours. GitHub's HTTPS certificate is issued automatically
after the domain verifies. (Confirm these IPs against GitHub's current Pages docs
in case they change.)

## The contact form

`contact.html` posts to your Formspree endpoint:

```
https://formspree.io/f/myegnvqe
```

`js/main.js` submits it in the background (no page reload) and shows a success or
error message. With JS off, it still works — Formspree shows its own confirmation
page. The first real submission will ask you to confirm the endpoint in Formspree.

To change where mail goes, update the `action` on the `<form id="contact-form">`
and the `hello@mars-logic.com` fallbacks in `js/main.js` and the footers.

## Editing content

- **Text** lives directly in each `.html` file — edit and re-push.
- **Colors and type** are CSS variables at the top of `css/style.css`
  (Deep Space `#1e1853`, Martian Red `#a21e24`, Stellar Grey `#676767`,
  Star Dust `#f0eeea`, font Poppins).
- **Logos** are in `assets/`. The header uses `MARS_Logo_No_Subtext.png`,
  the footer uses `MARS_Logo_White.png`, favicons are generated from the icon.
- The email `hello@mars-logic.com` is a placeholder — swap it for your real inbox
  (it appears in each page footer and in `contact.html` / `js/main.js`).

## Preview locally

```bash
cd mars-logic
python3 -m http.server 8000
# open http://localhost:8000
```
