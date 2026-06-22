# FJS Holding — generated brand assets

All abstract/brand only. No fabricated project photography. Brand colours: blue `#2A8FCB`, green `#2E7D52`, brass `#C68A2E`, charcoal `#141719`.

## Raster
- `og-cover.jpg` (1200×630) — social share image. Already referenced by `og:image` / `twitter:image` (currently pointed at this filename via the absolute URL `…/assets/og-cover.jpg`).
- `favicon-16.png`, `favicon-32.png`, `../favicon.ico` — browser favicons (FJS monogram).
- `../apple-touch-icon.png` (180×180) — iOS home-screen icon.
- `icon-192.png`, `icon-512.png` — PWA icons referenced by `site.webmanifest`.

## SVG textures (lightweight, theme-able)
- `blueprint.svg` — tileable engineering grid. Use as a repeating `background-image` on dark sections at low opacity, e.g. `background:#141719 url(assets/blueprint.svg) repeat;` then layer content above.
- `topo-divider.svg` — full-bleed contour divider between sections (`width:100%;height:auto`). The `.topo-lead` path is the longest line — animate its `stroke-dashoffset` on scroll for a "draw-on" survey effect.
- `hero-mesh.svg` — abstract engineering constellation for hero/section backdrops. Self-animates via SMIL; place behind a dark gradient overlay. For a richer effect, re-create the same node set on a `<canvas>` in `site.js` and pause it off-screen / under `prefers-reduced-motion`.
- `grain.svg` — film-grain overlay. Layer at `opacity:.05–.09; mix-blend-mode:overlay` over hero imagery for a premium textured finish.

All motion must respect `prefers-reduced-motion: reduce`.
