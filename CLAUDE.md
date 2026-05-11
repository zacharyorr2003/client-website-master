# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/zacha/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/zacha/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Logos live in the project root: `logo.png` (color), `logo black.png`, `logo black small.png`. Use the color logo on dark backgrounds.
- Brand guidelines: `brand-guidelines.html` in the project root. Open it to verify any brand decision.

### Color Tokens
```css
--ink:    #080D18   /* primary background — deep navy */
--paper:  #FAFAF7   /* primary text / light surfaces */
--void:   #0B1D3A   /* deep navy accent */
--gold:   #60BFFF   /* sky blue */
--amber:  #2E9AF0   /* bright blue */
--ember:  #1B7FE0   /* mid blue */
--signal: #1252CC   /* primary accent / CTA — royal blue */
--logo-a: #0A2F82   /* gradient start — deep navy */
--logo-b: #3DA5FF   /* gradient end — sky blue */
--fire: linear-gradient(135deg, #0A2F82, #1252CC, #1B7FE0, #60BFFF)
```

### Typography
| Role | Font | Notes |
|------|------|-------|
| Display | Bebas Neue | uppercase, `letter-spacing: .02–.04em`, `line-height: .95–1` |
| Heading | Rajdhani | weight 700, uppercase, `letter-spacing: .03–.05em` |
| Mono / Labels | JetBrains Mono | weight 300–700, `letter-spacing: .1–.2em`, uppercase |
| Body | Inter | `font-size: .9rem`, `line-height: 1.7`, `color: rgba(250,250,247,.65)` |

- Load all four via Google Fonts (see `brand-guidelines.html` `<head>` for the exact import URL).
- Fire gradient text: `background: var(--fire); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
- Signal accent text: `color: var(--signal);`

### Surfaces & Depth
- Cards: `background: rgba(250,250,247,.03); border: 1px solid rgba(250,250,247,.07); border-radius: 8px;`
- Section dividers: `border-bottom: 1px solid rgba(250,250,247,.06);`
- Fire accent top-border on hover: `height: 2px; background: var(--fire);`
- Ambient glow: `radial-gradient(ellipse 60% 50% at 50% 60%, rgba(18,82,204,.12) 0%, transparent 70%)`

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
