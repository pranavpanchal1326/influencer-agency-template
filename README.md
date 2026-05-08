# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Influencer Agency Website (`artifacts/adcker`)

- **Type**: react-vite
- **Preview Path**: `/`
- **Description**: Generic influencer marketing agency template — beauty, fashion & wellness industries. Originally cloned from adcker.com, fully de-branded and converted to a reusable template.
- **Stack**: React + Vite, Wouter routing, Framer Motion, Tailwind v4, Lenis smooth scroll, Kumbh Sans
- **Colors**: Cream `#EFEDEA` background / Dark `#191919` text, zero border-radius, editorial typography

### Pages & Routes

| Route | Component | Notes |
|---|---|---|
| `/` | `Home.tsx` | Hero, services teaser, stats, logo marquee, portfolio grid, Instagram feed, CTA |
| `/services` | `Services.tsx` | 01–05 animated swiper + process timeline |
| `/our-work` | `OurWork.tsx` | 6-project masonry grid + brand logos + stats |
| `/about` | `About.tsx` | Story, staggered images, testimonial carousel, team grid |
| `/work/:slug` | `CaseStudy.tsx` | Dynamic case study — hero, overview, metrics, gallery, quote, prev/next |
| `/admin` | `Admin.tsx` | Password-gated contact submissions table (outside Layout) |

### Key Files

| File | Purpose |
|---|---|
| `src/config.ts` | **Single config** — agency name, email, Instagram handle/URL, year, meta. Change here, updates everywhere. |
| `src/data/caseStudies.ts` | 6 generic case studies (campaign-01–06). Each has slug, images, results, quote. |
| `public/sitemap.xml` | Static sitemap — update domain before deploying |
| `public/robots.txt` | Blocks `/admin`, points to sitemap |

### UI Components

- `Nav.tsx` — Fixed nav with full-screen dark overlay menu; logo mark + agency name from config
- `Footer.tsx` — 4-column grid; email/Instagram from config
- `ContactModal.tsx` — Slide-up form → `/api/contact` POST; email from config
- `VideoModal.tsx` — Full-screen showreel slideshow; Instagram from config
- `Loader.tsx` — Animated loading screen (asterisk + bracket + counter)
- `PageTransition.tsx` — Full-screen dark panel wipe between routes
- `Cursor.tsx` — Custom magnetic cursor with context labels
- `LogoMarquee.tsx` — Infinite scroll marquee (used for client logos)
- `ParallaxImage.tsx` / `ParallaxBg.tsx` — Scroll parallax wrappers
- `TextReveal.tsx` — Line-by-line hero text animation
- `MagneticBtn.tsx` — Spring-physics magnetic CTA button

### Images

All images served from **Unsplash** (no CDN dependency). Swap any `src` URL in the component or `caseStudies.ts` to use your own images.

### Template Customisation Checklist

1. **`src/config.ts`** — Update `name`, `email`, `instagramHandle`, `instagramUrl`, `year`
2. **`index.html`** — Update `<title>` and `<meta name="description">` manually
3. **`public/sitemap.xml`** — Replace `https://youragency.com` with real domain
4. **`public/robots.txt`** — Replace `https://youragency.com` with real domain
5. **`src/data/caseStudies.ts`** — Replace 6 generic campaigns with real work
6. **`src/pages/About.tsx`** — Update `team` array with real names, roles, and photo URLs
7. **Images** — Swap Unsplash URLs with your own CDN/hosted images

---

### API Server (`artifacts/api-server`)

- **Type**: Express 5 API
- **Preview Path**: `/api`

#### Routes

| Method | Path | Description |
|---|---|---|
| GET | `/api/healthz` | Health check |
| POST | `/api/contact` | Submit contact form (Zod validated, saves to DB, fires email) |
| GET | `/api/admin/contacts` | Fetch all submissions (Bearer auth via SESSION_SECRET) |

#### Database

- Table: `contacts` — id, name, brand, email, service, message, createdAt
- Schema: `src/lib/db/schema.ts`
- Auth: `SESSION_SECRET` env var used as admin bearer token

#### Email Notifications

Contact form submissions trigger an email notification via **Resend**. Requires two env vars:

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | API key from [resend.com](https://resend.com) (free tier: 3 000 emails/month) |
| `NOTIFY_EMAIL` | Yes | Inbox address to receive notifications |
| `NOTIFY_FROM` | No | Sender address — defaults to `Agency <onboarding@resend.dev>` (Resend sandbox). Set to your verified domain for production, e.g. `Agency <hello@youragency.com>` |

If `RESEND_API_KEY` or `NOTIFY_EMAIL` are not set the server skips sending and logs a warning — the contact form still saves to the DB without error.

Email template: `artifacts/api-server/src/lib/email.ts` — on-brand dark HTML email with reply-to set to the submitter's address.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
