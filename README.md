# xenolabs.dev

Portfolio / services site for Xeno Labs, built with [Astro](https://astro.build) + Tailwind CSS, deployed as a static site on Cloudflare Pages with one Pages Function backing the contact form.

## Stack

- **Astro** (static output) with built-in i18n routing — `/en/*` and `/es/*`
- **Tailwind CSS**
- **Cloudflare Pages Function** (`functions/api/contact.ts`) for the contact form, using the [Resend](https://resend.com) API to send an email notification
- No client framework — interactive bits (language switcher, tech marquee, project carousel, contact form) are plain Astro + vanilla `<script>`

## Getting started

```bash
npm install
npm run dev
```

The site starts at `http://localhost:4321` and redirects `/` to `/en/` or `/es/` based on the browser's saved/detected language.

## Project structure

```
src/
  components/      Nav, Footer, LanguageSwitcher, TechMarquee, ProjectCarousel, ProjectMockup
  data/projects.ts  Shared bilingual project content (used by the homepage carousel and /projects)
  i18n/             ui.ts (nav/footer strings) + utils.ts (locale helpers)
  layouts/          BaseLayout.astro (head, nav, footer, hreflang tags)
  pages/
    index.astro     Client-side locale redirect (see "Language detection" below)
    en/             English pages: index, about, services, projects, contact
    es/             Spanish pages (Mexican Spanish): same structure
functions/
  api/contact.ts    Cloudflare Pages Function — receives the contact form POST, emails via Resend
```

## Language detection

Astro's i18n routing generates static `/en/*` and `/es/*` pages — there's no server to read the `Accept-Language` header at request time on a fully static Cloudflare Pages deploy. Instead, `src/pages/index.astro` is a tiny static page that, on load:

1. Checks `localStorage` for a previously chosen locale (set whenever someone uses the language switcher).
2. Falls back to the browser's `navigator.languages`.
3. Defaults to English.

It then redirects to `/en/` or `/es/`. A `<meta http-equiv="refresh">` fallback covers no-JS clients (defaults to English). This is a client-side approximation of the original "Accept-Language + fallback" behavior — the practical option on Cloudflare Pages' static hosting without adding a second Pages Function just for redirects.

## Contact form

The form on `/en/contact/` and `/es/contact/` posts JSON to `/api/contact`, handled by `functions/api/contact.ts`. It:

- Validates name / email / message are present and the email looks valid
- Sends a formatted HTML email via the Resend API to `CONTACT_EMAIL`
- Never exposes `CONTACT_EMAIL` or `RESEND_API_KEY` to the browser — both are Cloudflare Pages environment variables read only inside the Function
- Returns JSON (`{ ok: true }` or `{ error: ... }`); the frontend shows an inline "thanks, I'll be in touch" message on success, with no page navigation

The "request a 30-minute intro call" checkbox reveals a `datetime-local` picker. It's collected as a **preference**, not a live booking — there's no calendar availability check. You confirm manually by replying to the email.

### Environment variables

Set these in the Cloudflare Pages dashboard (Settings → Environment variables) for both Production and Preview:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | The inbox that should receive form submissions |

For local testing of the Function, copy `.dev.vars.example` to `.dev.vars` and fill in real values (this file is gitignored), then:

```bash
npm run build
npm run pages:dev
```

`wrangler pages dev` serves the built `dist/` output plus the `functions/` folder together, so the form can be tested end to end locally. Note the Resend "from" address in `functions/api/contact.ts` (`contact@xenolabs.dev`) needs a verified sending domain in Resend before it will actually deliver — update it if you're sending from a different domain.

## Deployment (Cloudflare Pages)

1. Push this repo to GitHub.
2. In Cloudflare Pages, create a new project connected to the repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Functions directory:** `functions` (Cloudflare Pages detects this automatically at the repo root)
4. Add the `RESEND_API_KEY` and `CONTACT_EMAIL` environment variables (see above).
5. Deploy. Point the `xenolabs.dev` domain at the Pages project once it's live.

## Content notes

- Project screenshots are placeholder SVG mockups (`ProjectMockup.astro`) — swap these for real screenshots once available.
- Project copy lives in `src/data/projects.ts`, shared between the homepage carousel and the `/projects` page, in both languages.
- No email address or phone number appears anywhere in the frontend — contact is form-only.
