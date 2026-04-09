# FJS Holding — Project Context

## Project
Revamp of FJS Holding website — a civil engineering and construction company based in South Africa. Migrating from Node.js/Express on Render to Next.js on Vercel.

## Stack
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS (with @tailwindcss/forms plugin)
- Framer Motion for scroll animations
- Formspree for contact form submissions
- Lucide React for icons

## Architecture
- `src/app/` — App Router pages (Home, About, Services, Projects, Contact, Privacy Policy)
- `src/components/layout/` — Navbar, Footer (shared across all pages)
- `src/components/sections/` — Reusable page sections (if needed)
- `src/components/ui/` — Reusable UI components (Button, Reveal, SectionLabel)
- `src/lib/constants.ts` — Single source of truth for ALL site content, services, projects, contact info
- `src/lib/metadata.ts` — SEO metadata helper (generates per-page meta, OG tags, JSON-LD)
- `src/lib/utils.ts` — Utility functions (cn classname helper)
- `public/images/` — All static images (projects/, services/)

## Design System
- **Colors:** Dark charcoal primary (#1a1a1f) + amber/safety-yellow accent (#f59e07)
- **Fonts:** Plus Jakarta Sans (headings), DM Sans (body) — loaded via next/font
- **Dark sections:** Use `bg-surface-dark` with `text-text-inverse` and `card-dark` class
- **Light sections:** Use `bg-surface` with `text-text-primary` and `card` class
- **Animations:** Use the `<Reveal>` component to wrap content for scroll-triggered fade-in

## Conventions
- Use Next.js `<Image>` component for ALL images (never `<img>`)
- Use Next.js `<Link>` for ALL internal navigation (never `<a href="/">`)
- Use semantic HTML (nav, main, section, footer)
- Every page needs unique SEO metadata via `generatePageMetadata()`
- All components must be TypeScript with proper types
- Use `"use client"` only when needed (interactivity, hooks, form state)
- Tailwind classes only — no CSS modules, no styled-components
- Use `container-main` class for page width constraint
- Use `section-padding` or `section-padding-sm` for vertical spacing

## Git Workflow
- `main` = production (auto-deploys to Vercel)
- `develop` = staging/integration
- `feature/*` branches for new work
- Always test build before pushing: `npm run build`
- Commit message format: `type: description` (feat:, fix:, style:, refactor:, docs:)

## Business Info
- Company: FJS Holding
- Industry: Civil engineering, construction, project management
- Location: South Africa
- Email: frank@fjsholding.co.za
- Phone: 061 424 3723
- Domain: fjsholding.co.za
- Developed by: Nkosi Hut (nkosihut.co.za)

## Services (6 total)
1. Commercial Construction — offices, retail, warehouses
2. Project Management — oversight, timeline, budget
3. Engineering Services — structural, civil, electrical, mechanical
4. Construction Materials — cement, concrete, steel, lumber
5. Renovation & Remodeling — upgrades to existing structures
6. Architectural Services — design and planning

## Projects (2 current showcases)
1. Bund Wall & Oil Storage Facility Construction
2. Structural Rehabilitation

## Contact Form
- Uses Formspree (endpoint in `src/app/contact/page.tsx` line ~14)
- Fields: name, email, phone, company, service, message
- Submissions go to: frank@fjsholding.co.za
- IMPORTANT: Replace `YOUR_FORM_ID` with actual Formspree ID before going live

## Deployment
- Hosting: Vercel (connected to this GitHub repo)
- Domain: fjsholding.co.za (on GoDaddy — DNS points to Vercel after migration)
- Old site on Render stays live until DNS switchover is complete
- SSL: Auto-provisioned by Vercel

## TODO (not yet done)
- [ ] Replace YOUR_FORM_ID in contact page with actual Formspree form ID
- [ ] Add actual project images to public/images/projects/
- [ ] Add service images to public/images/services/
- [ ] Get SVG logo from client (currently using placeholder)
- [ ] Generate favicons (favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png)
- [ ] Create OG image (1200x630) for social sharing
- [ ] Enable Vercel Analytics after deployment
- [ ] Submit sitemap to Google Search Console
- [ ] Connect fjsholding.co.za domain on Vercel
- [ ] Update GoDaddy DNS (A record → 76.76.21.21, CNAME www → cname.vercel-dns.com)
- [ ] Decommission old Render deployment after DNS propagation confirmed

## Common Commands
```bash
npm run dev          # Start local dev server (localhost:3000)
npm run build        # Production build (run before every push)
npm run lint         # Check for linting errors
```
