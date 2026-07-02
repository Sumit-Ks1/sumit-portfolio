# Sumit Kumar Singh — Portfolio

My personal portfolio, designed around one idea: **a recruiter should get the full picture in 30 seconds, and anyone curious should have something to play with.**

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · deployed on Vercel.

No UI kits, no animation libraries — every interaction is hand-rolled, so the client bundle stays tiny and the whole page is statically rendered.

## What's interesting about it

- **⌘K / Ctrl+K command palette** — jump to any section, copy my email or phone, open GitHub/LinkedIn, toggle the theme. Works everywhere on the page (floating button on mobile).
- **Live peer-to-peer mesh in the hero** — a canvas simulation of nodes exchanging encrypted packets, a nod to my WebRTC file-transfer project. Your cursor joins the network; clicking broadcasts a transfer.
- **"For recruiters" TL;DR strip** — who I am, what I've shipped, and my stack in four scannable cells, with one-click copy for email/phone.
- Dark/light theme with no flash on load, scroll-spy nav, subtle reveal animations (all disabled for `prefers-reduced-motion`), and a print stylesheet so the page prints like a clean résumé.
- Full SEO pass: Open Graph image generated at build, JSON-LD person schema, sitemap, robots, canonical URLs.

## Run it

```bash
npm install
npm run dev
```

## Edit content

Everything on the page lives in **`src/data/profile.ts`** — copy, links, jobs, projects, skills. Change it there and redeploy.

Two optional drop-in files (picked up automatically at build time):

- `public/profile.jpg` (or `.jpeg` / `.png` / `.webp`) — portrait shown in the hero
- `public/resume.pdf` — enables the résumé download buttons

After the first deploy, set `site.url` in `src/data/profile.ts` (or the `NEXT_PUBLIC_SITE_URL` env var) to the real domain so canonical/OG URLs are correct.

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com/new) — no configuration needed.
