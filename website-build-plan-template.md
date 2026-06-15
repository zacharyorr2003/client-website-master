# Website Build Plan Template

> **How to use:** Fill out the Client Info block below, then paste this entire file into a new conversation and say: "Generate the full website build plan from this template."

---

## ★ CLIENT INFO — FILL THIS OUT ★

```
Business Name (full legal):      
Brand/Short Name (for display):  
Owner Name:                      
Phone:                           
Email:                           
Hours:                           
Emergency Service (Yes/No):      
Languages:                       
Financing (Yes/No, details):     
Payment Methods:                 
Warranty:                        
Year Founded:                    
Years Operating:                 
Existing Website URL:            
Live Domain (for launch):        
Logo File (filename in Branding folder): 
Primary Brand Color (hex):       
Primary City:                    
State:                           

Stats (3 numbers for hero):
  - Stat 1 label + number (e.g. "400+ Jobs Completed"):
  - Stat 2 label + number (e.g. "10 Years in Business"):
  - Stat 3 label + number (e.g. "5★ Star Rating"):

Differentiators (3 things that set them apart):
  1.
  2.
  3.

About Blurb (1-2 sentences, use their own words if possible):


Services (list all, we'll assign slugs):
  1.
  2.
  3.
  4.
  5.
  6.
  7.
  8.
  9.
  10.

Service Areas (list all cities):
  1.  (Primary city)
  2.
  3.
  4.
  5.
  6.
  7.
  8.
  9.
  10.

Blog Topics (6 post ideas, or leave blank to auto-generate):
  1.
  2.
  3.
  4.
  5.
  6.

GHL Form Webhook URL (if known, else leave blank):  
Google Analytics ID (if known, else leave blank):   
Google Review Link (if known, else leave blank):    
Social Media (Facebook, Instagram, Yelp URLs):      
License Number (if applicable):                    
```

---

## ★ GENERATION INSTRUCTIONS (for Claude) ★

When given a filled-out Client Info block above, generate a complete build plan following this structure exactly. Replace every `[VARIABLE]` with the actual client data. Derive the color palette from the primary brand color. Auto-generate blog topics if none are provided (local SEO focused, mix of service comparisons, guides, and differentiator spotlights). Assign slugs to services (lowercase, hyphens). Number service pages service-1 through service-N and area pages area-1 through area-N.

---

## ★ BUILT-IN QUALITY STANDARDS ★

> These were learned from the Blackhawk Landscaping build. Every item below must be done as part of the phase it belongs to — not fixed afterward. Check each one during the relevant phase, not at the end.

### Logo (Phase 1)
- [ ] Navbar logo uses the **full brand lockup**: eagle SVG absolutely positioned on the shelf of the B (`position:absolute; height:26px; top:-10px; left:-16px; z-index:2`), "BLACKHAWK" equivalent in Playfair Display 900, "LANDSCAPING" equivalent in Libre Franklin 200 at 7.5px with gold color and decorative flanking lines
- [ ] Eagle SVG gradient colors updated to match site palette (`#[GOLD] → #[SIGNAL]`), not the original Illustrator export colors
- [ ] Logo links to `index.html` on every page including `review.html`
- [ ] `review.html` logo uses `logo.svg` — never `logo.png` (it doesn't exist)
- [ ] Google Fonts import includes **Playfair Display:wght@900** and **Libre Franklin:wght@200;300** on every page

### Mobile Nav (Phase 1)
- [ ] Services and Service Areas in mobile menu are **collapsible accordions**, not flat expanded lists
- [ ] `toggleMobAcc(id, icoId)` JS function injected before `</body>` on every page with a full navbar
- [ ] Service area dropdown items show city name only — no state abbreviation (e.g. "Danville" not "Danville, CA")

### Hero Form — index.html (Phase 2)
- [ ] Quote form card has **solid dark background** (`background:#1A0C05` or darkest ink variant) — never transparent/glass that lets the hero image bleed through
- [ ] Form border uses a subtle signal-color tint, not the default white/gray

### Service Area Copy (Phases 4 & 5)
- [ ] All non-area pages (index, services, gallery, contact, blog, service pages) reference **all service areas**, not just the primary city
- [ ] Hero descriptions say "throughout [City1], [City2], [City3], and the [Region]" — not "throughout [Primary City] and the [Region]"
- [ ] Review taglines say "see why [Region] homeowners trust [Brand]" — not "see why [Primary City] trusts [Brand]"
- [ ] Page titles on service pages include multiple cities: "X in [City1], [City2] & [Region] [State]"
- [ ] Area pages (area-1 through area-N) ARE intentionally city-specific — do not broaden these

### Service Pages (Phase 4)
- [ ] **Service-page body = 4 "deep-dive" capability blocks** (`<section class="divider deep-dive">`, shipped pre-built in the master). Alternating image/text, numbered photo badges (01-04), punchy uppercase headline per block, and 4 bold-label feature bullets per block. This replaced the old "sub-services checklist" — do not reintroduce the checklist. Fill every `[SERVICE N BLOCK B …]` token; the `.deep-grid` stacks to one column under 820px (rule already in each page's inline `<style>`).
- [ ] Every service page includes a **"SERVICE AREAS WE COVER"** section with all [N] cities as linked pill buttons, placed before the CTA banner
- [ ] Each city pill links to its corresponding area page

### QA Script — qa.mjs (Phase 9)
- [ ] Check for `img[src="logo.svg"]` — not `logo.png`
- [ ] Allow `tel:` hrefs on `btn-primary` buttons (phone CTAs are valid)
- [ ] Verify all [N] service pages and all [N] area pages load (not just a subset)

### Performance Conventions (every phase — baked into the template)
- [ ] **The navbar is a stamped partial** — edit `partials/navbar.html`, run `node build-partials.mjs`; never edit a navbar inside a page file (verify: exactly 1 navbar variant across all pages)
- [ ] **Never add the Tailwind CDN** — the template is plain CSS; all shared styles live in `site.css`
- [ ] Every page links `site.css` (in head, after the fonts link) and `site.js` (`defer`, before `</body>`) exactly once
- [ ] Page-specific styles go in a small inline `<style>` block AFTER the site.css link; page-specific JS stays inline
- [ ] Images: navbar/footer logo eager; first content image `fetchpriority="high"`; all others `loading="lazy" decoding="async"` with explicit `width`/`height`
- [ ] Elfsight reviews: place only the `<div class="elfsight-app-...">` container — `site.js` lazy-loads platform.js; never paste the platform.js script tag
- [ ] Google Fonts: load only used variants (no italics, no unused weights)

---

## ★ MORE STANDARDS: learned from the Red Electric build ★

> Same rule as above: handle each during its phase, not as a cleanup afterward.

### No Em Dashes (every phase, Zachary hard rule)
- [ ] ZERO em dashes in any visible client copy, ever. Use colons, periods, or "and". Verify before done: `grep -oE ">[^<]*—[^<]*<" *.html` returns nothing in client copy (the standard legal templates are the only allowed exception).

### Content & Data Integrity (Phases 0, 3-6)
- [ ] Service-area cities: if the existing site does not list specific cities, DO NOT silently guess. Pick a defensible list (anchor on the phone area code + the cities named in real reviews), tell the user, and add "confirm cities with client" to Pending Items.
- [ ] Reviews: use only real reviews from their site or Google listing. If you must fill the grid, list the invented ones under Pending Items. Never present fabricated reviews as verified.
- [ ] Owner name and hours: never invent. Write around them (no fake owner; "24/7 emergency" or generic hours).
- [ ] Source-site contradictions (e.g. "60+ years" vs "15+ years"): standardize on one, then flag it for the client to confirm. Do not silently average.

### Theme Tokens, Not Template Leftovers (Phase 0/1)
> The base template ships with COOL blue-grey chrome that does NOT follow `--ink`. After applying the brand palette, sweep these or the client will spot the blue tint:
- [ ] Navbar `rgba(10,10,15,.92)` → theme-tinted ink at .92 (e.g. `rgba(18,8,8,.92)`)
- [ ] Dropdown panels `#141418`, mobile menu `#0f0f14`, footer `#0d0d12` → theme-tinted darks (footer can use `var(--ink)`)
- [ ] Consent/terms links and cookie banner links use `var(--gold)` and a hardcoded `#FF6A3D` → change to `var(--signal)` so links match the brand
- [ ] Flatten leftover blue literals site-wide after theming: grep for `#1252CC #0A2F82 #3DA5FF #60BFFF #1B7FE0 #0B1D3A` and `rgba(18,82,204` — none should remain
- [ ] Native `<select>` dropdowns render white-on-white (invisible options) on dark themes. Add to `site.css`: `select { color-scheme: dark; } select option { background:[dark ink]; color:[paper]; }`

### AI Photo Rules (Phases 2-5)
- [ ] No people, no logos, no readable text in any generated photo. The work itself is the subject.
- [ ] Vehicles: explicitly prompt "unbranded, no manufacturer badges or emblems, blank grille." Generators add Ford/Chevy badges by default; reject and re-roll if any appear.
- [ ] No text on shirts or signage (the Merino lesson). Plain work shirts only.
- [ ] Area-page heroes are CITY OVERVIEW shots (skyline/aerial/street), not generic job photos.
- [ ] Generate with Nano Banana 2 (~2 credits/image, renders correct US hardware). Z Image is far cheaper (~0.15) but draws European/wrong gear. Convert PNG → JPG, max 1600px wide, quality 82.

### SEO Schema (Phase 8)
- [ ] JSON-LD on EVERY page, not just index: `Service` on service pages (with the full areaServed array), `Service`+city on area pages, `BlogPosting` on posts, `FAQPage` on the FAQ page (wins rich results), `ContactPage`/`CollectionPage` on the rest.
- [ ] og:image on every page (its own hero photo). Titles ≤ 60 chars, meta descriptions 120-160 chars, exactly one H1 per page (watch for a second H1 when transplanting a form onto contact.html).

### Pre-Launch Placeholder Gate (Phase 9, hard gate before "ready to deploy")
- [ ] `[DOMAIN]` in canonicals, og:url, og:image, sitemap.xml, robots.txt → live domain
- [ ] `[GA_MEASUREMENT_ID]` → Google Analytics ID (or remove the GA block)
- [ ] `[REVIEW_LINK]` → Google "leave a review" URL
- [ ] `[GHL_FORM_SUBMIT_URL]` → GHL webhook (forms are dead leads without it)
- [ ] Netlify: disable post-processing + add `_redirects` (pretty-URL bug corrupts inline styles)
- [ ] Submit sitemap in Search Console once the domain is live

### Git Gotcha
- [ ] If the project `site/` folder was cloned from this master, it carries the master's nested `.git`. Commits land in that nested repo, NOT the vault. Run `git` commands from inside `site/` and confirm with `git log` that the history is the project's, not the vault's.

---

## ★ STANDARD BUILD PLAN STRUCTURE ★

> The generated plan must follow every phase below. Do not skip phases or merge tasks.

---

# [BUSINESS_NAME] — Website Build Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full, SEO-optimized production website for [BUSINESS_NAME] ([OWNER_NAME]) by cloning the Client Website Master template, applying their brand colors, and populating all [N] service pages, [N] area pages, 6 blog posts, and supporting pages.

> **SEO is not a post-build pass — it is baked into every page as it is built.** Every page must have a unique title, meta description, canonical tag, one H1, proper H2/H3 hierarchy, descriptive alt text on all images, and internal links to relevant service and area pages before it is considered done.

**Architecture:** Clone `Client Website Master/` into a new `CLIENT PROJECTS/[BRAND_NAME]/website/` folder, apply brand tokens site-wide via the shared `_shared.html` component kit, then populate content page by page using the clone-and-swap method.

**Tech Stack:** Plain HTML/CSS — shared core in `site.css` + shared behavior in `site.js` (every page links both), page-specific styles inline per page. **No Tailwind — never add the Tailwind CDN.** Google Fonts trimmed to used variants only (Bebas Neue, Rajdhani 700, JetBrains Mono 400/700, Inter 400/500, plus any client-specific display fonts). Node.js serve.mjs + screenshot.mjs (Puppeteer), Netlify deployment.

---

## Client Reference Sheet

| Field | Value |
|---|---|
| Business Name | [BUSINESS_NAME] |
| Brand Name | [BRAND_NAME] |
| Owner | [OWNER_NAME] |
| Phone | [PHONE] |
| Email | [EMAIL] |
| Hours | [HOURS] |
| Emergency Service | [EMERGENCY] |
| Languages | [LANGUAGES] |
| Financing | [FINANCING] |
| Payment | [PAYMENT] |
| Warranty | [WARRANTY] |
| Year Founded | [YEAR_FOUNDED] |
| Years Operating | [YEARS_OPERATING] |
| Existing Site | [EXISTING_SITE] |
| Live Domain | [DOMAIN] |
| Logo | [LOGO_FILE] |
| Color Theme | [PRIMARY_COLOR] |
| Primary City | [PRIMARY_CITY], [STATE] |

**Stats:**
- [STAT_1]
- [STAT_2]
- [STAT_3]

**Differentiators:**
1. [DIFF_1]
2. [DIFF_2]
3. [DIFF_3]

**About:** [ABOUT_BLURB]

**Services ([N]):**
[SERVICE_LIST with slugs]

**Service Areas ([N]):**
[AREA_LIST with slugs]

**Pending (add when received):**
- GHL form webhook URL (use `[GHL_FORM_URL]` placeholder)
- Google Analytics ID (use `[GA_ID]` placeholder)
- Netlify Site ID (use `[NETLIFY_ID]` placeholder)
- Google Review link (use `[REVIEW_LINK]` placeholder)
- Social media URLs ([SOCIAL_NOTE])

---

## Custom Color Palette

[PRIMARY_COLOR_NAME]'s primary: `[PRIMARY_COLOR]`. Derive full palette:

```css
:root {
  --ink:    [DERIVED — darkest near-black tint of primary];
  --paper:  #FAFAF7;
  --void:   [DERIVED — deep dark accent];
  --gold:   [DERIVED — light/bright accent];
  --amber:  [DERIVED — mid accent];
  --ember:  [DERIVED — dark accent];
  --signal: [PRIMARY_COLOR];
  --logo-a: [DERIVED — gradient start, darker];
  --logo-b: [DERIVED — gradient end, lighter];
  --fire:   linear-gradient(135deg, [logo-a], [signal], [ember], [gold]);
}
```

Signal RGB for rgba() replacements: `[R,G,B]`

---

## File Manifest

```
CLIENT PROJECTS/[BRAND_NAME]/website/
  index.html
  services.html
  gallery.html
  contact.html
  faq.html
  blog.html
  our-work.html
  review.html
  privacy.html
  terms.html
  thankyou.html
  robots.txt
  sitemap.xml
  site.css        ← shared core styles (brand tokens live here)
  site.js         ← shared behavior (nav, FAQ, consent, Elfsight lazy-load, active-link highlighting)
  partials/
    navbar.html   ← THE navbar — edit here, then run build-partials.mjs
  build-partials.mjs
  _shared.html
  serve.mjs
  screenshot.mjs
  qa.mjs
  qa-mobile.mjs

  [SERVICE_PAGE_LIST — service-1.html through service-N.html]

  [AREA_PAGE_LIST — area-1.html through area-N.html]

  blog-1.html   ← [BLOG_TITLE_1]
  blog-2.html   ← [BLOG_TITLE_2]
  blog-3.html   ← [BLOG_TITLE_3]
  blog-4.html   ← [BLOG_TITLE_4]
  blog-5.html   ← [BLOG_TITLE_5]
  blog-6.html   ← [BLOG_TITLE_6]
```

---

## Phase 0 — Pre-Build Setup

### Task 1: Create website folder and clone template

- [ ] Create `CLIENT PROJECTS/[BRAND_NAME]/website/` folder
- [ ] Copy all files from `Client Website Master/` into it (excluding node_modules, temporary screenshots, client-intake.txt)
- [ ] Verify the file list matches the manifest above
- [ ] Run `node serve.mjs` from the new website folder — confirm `http://localhost:3000` serves
- [ ] Commit: `git add . && git commit -m "Bootstrap [BRAND_NAME] website from Client Website Master"`

---

### Task 2: Place brand assets

- [ ] Copy logo from `CLIENT PROJECTS/[BRAND_NAME]/Branding/[LOGO_FILE]` → `website/logo.svg`
- [ ] Copy all photos from `CLIENT PROJECTS/[BRAND_NAME]/photos/` → `website/photos/`
- [ ] Confirm `logo.svg` loads at `http://localhost:3000/logo.svg`
- [ ] Commit: `git commit -m "Add brand assets to [BRAND_NAME] website"`

---

### Task 3: Fetch existing website for content

- [ ] Fetch `[EXISTING_SITE]` with WebFetch
- [ ] Extract: tagline, services, about copy, testimonials, trust signals, license number
- [ ] Note any copy that can be reused vs. needs rewriting

---

### Task 4: Apply custom color palette site-wide

- [ ] **Update the `:root` tokens in `site.css` first** — this is the single source of truth for the brand palette; every page inherits it
- [ ] Then sweep inline styles: replace all `rgba(18,82,204,...)` with `rgba([SIGNAL_RGB],...)` across all HTML files **and site.css**
- [ ] Replace #1252CC → [SIGNAL], #0A2F82 → [LOGO-A], #3DA5FF/#60BFFF → [GOLD] across all HTML files **and site.css**
- [ ] `our-work.html` and `review.html` are standalone designs with their own inline tokens — update their `:root` blocks separately
- [ ] Commit: `git commit -m "Apply [PRIMARY_COLOR_NAME] brand palette to all pages"`

---

## Phase 1 — Foundation (Shared Components)

### Task 5: Build the navbar ONCE in `partials/navbar.html`

> The navbar is a stamped partial — you edit ONE file and `node build-partials.mjs` stamps it into every page between `PARTIAL:navbar` markers. Never edit a navbar inside an individual page.

- [ ] Edit `partials/navbar.html`: logo `src` → `logo.svg`, alt `[BRAND_NAME]`
- [ ] Replace placeholder phone with `[PHONE]`
- [ ] Name all [N] services in the nav dropdown
- [ ] Name all [N] areas in the nav dropdown — **city name only, no state abbreviation**
- [ ] Build navbar logo as full brand lockup (if client style calls for it): logo SVG absolutely positioned, brand name in display serif, subline with decorative lines
- [ ] Keep all links in their NEUTRAL state in the partial — active-page highlighting is applied at runtime by `site.js`
- [ ] Mobile nav Services and Service Areas as **collapsible accordions** — `toggleMobAcc` lives in `site.js`
- [ ] Run `node build-partials.mjs` — every page now has the identical navbar
- [ ] Fix `review.html` logo to use `logo.svg` with full brand lockup (not `logo.png`) — review.html is standalone and not stamped

---

### Task 6: Update footer in every page file

- [ ] Business name, phone, email, hours, payment, languages, copyright in all pages
- [ ] All [N] service and area links in footers across all pages

---

### Task 7: Update shared blocks across all page files

- [ ] Quote Form, Reviews, Process steps, Areas Strip, CTA Banner populated in each page

---

### Task 8: Phase 1 screenshot check

- [ ] Start server: `node serve.mjs`
- [ ] Screenshot index.html — check brand colors, logo renders, phone/email correct
- [ ] Fix issues. Re-screenshot until clean.
- [ ] Commit: `git commit -m "Bootstrap [BRAND_NAME] site — template copied, assets placed"`

---

> ## ▶ START PROMPT — Phase 2
> **"Build the [BRAND_NAME] website. Start with Phase 2: build `index.html`. Working dir: `CLIENT PROJECTS/[BRAND_NAME]/website/` inside the Brain folder. Folder created, template files copied, logo.svg placed, photos in `website/photos/`, `_shared.html` has the full brand palette (use as reference only — never served directly). Build index.html now using the plan at `CLIENT PROJECTS/[BRAND_NAME]/website-build-plan.md`. When Phase 2 is done, stop."**

---

## Phase 2 — Home Page

### Task 9: Build `index.html`

Sections in order:
- [ ] Navbar (from shared kit)
- [ ] **Hero:** Punchy H1 tagline · subtext references **all service areas** (not just primary city) · CTA button + phone · hero.jpg background with gradient overlay · Quote form with **solid dark background** (`background:#[INK_VARIANT]`) — no transparent/glass look
- [ ] **About blurb:** [ABOUT_BLURB] + 3 differentiators
- [ ] **Hero Stats:** [STAT_1] · [STAT_2] · [STAT_3]
- [ ] **Services Overview:** [N] cards — one per service, each linking to its page
- [ ] **Our Process** (shared block)
- [ ] **Our Work Preview:** 6 gallery images from `photos/` + "See All Work" → `gallery.html`
- [ ] **Reviews** (shared block)
- [ ] **FAQ:** Generate 8 Q&As for the [TRADE] niche
- [ ] **Service Areas Strip** (shared block — all [N] cities)
- [ ] **CTA Banner** (shared block)
- [ ] Footer (from shared kit)
- [ ] Add JSON-LD LocalBusiness schema in `<head>`
- [ ] Add unique `<title>` and meta description
- [ ] Commit: `git commit -m "Build index.html — home page"`

---

### Task 10: Phase 2 screenshot check

- [ ] `node screenshot.mjs http://localhost:3000/index.html home`
- [ ] Read screenshot — verify hero, stats, [N] service cards, colors
- [ ] Fix. Re-screenshot. Ship only when clean.

---

> ## ▶ START PROMPT — Phase 3
> **"Build the [BRAND_NAME] website. Start with Phase 3: build `contact.html`, `services.html`, and `gallery.html`. Working dir: `CLIENT PROJECTS/[BRAND_NAME]/website/`. `index.html` is already built. Use `_shared.html` as reference. Brand palette: `--signal: [PRIMARY_COLOR]`. When Phase 3 is done, stop."**

---

## Phase 3 — Core Pages

### Task 11: Build `contact.html`

- [ ] H1: "Contact Us"
- [ ] Phone, email, hours prominent
- [ ] Quote Form (shared block)
- [ ] Reviews, Process, Areas Strip (shared blocks)
- [ ] Unique title + meta description
- [ ] Commit: `git commit -m "Build contact.html"`

---

### Task 12: Build `services.html`

- [ ] H1: "Our Services"
- [ ] One large card per service (all [N]): name, 2-3 sentence description, sub-services list, "Learn More" link
- [ ] CTA Banner + Footer
- [ ] Unique title + meta
- [ ] Commit: `git commit -m "Build services.html"`

---

### Task 13: Build `gallery.html`

- [ ] H1: "Our Work"
- [ ] Grid of all photos from `photos/` with category labels
- [ ] Reviews, Process, Areas Strip, CTA Banner
- [ ] Unique title + meta
- [ ] Commit: `git commit -m "Build gallery.html"`

---

### Task 14: Phase 3 screenshot check

- [ ] Screenshot contact, services, gallery
- [ ] Fix layout/color/content issues. Re-screenshot.

---

> ## ▶ START PROMPT — Phase 4
> **"Build the [BRAND_NAME] website. Start with Phase 4: build all [N] service pages (`service-1.html` through `service-[N].html`). Working dir: `CLIENT PROJECTS/[BRAND_NAME]/website/`. Core pages are already built. Build service-1.html first as the master template, verify it, then clone for services 2–[N]. Use the plan at `CLIENT PROJECTS/[BRAND_NAME]/website-build-plan.md`. When Phase 4 is done, stop."**

---

## Phase 4 — Service Pages

### Task 15: Build `service-1.html` ([SERVICE_1_NAME]) — the master template

- [ ] Hero: H1 "[SERVICE_1_NAME] Services in [PRIMARY_CITY], [STATE]" · CTA button + phone
- [ ] **4 "deep-dive" capability blocks** (the service-page body — this is the standard layout, NOT a sub-services checklist). The master ships these pre-built as `<section class="divider deep-dive">` with alternating image/text. Each block has: a 1-2 word eyebrow `[SERVICE N BLOCK B LABEL]`, a short punchy uppercase headline `[SERVICE N BLOCK B HEADLINE]` (e.g. "FIND THE FAULT FAST."), a 1-2 sentence intro `[SERVICE N BLOCK B INTRO]`, a numbered square photo (`[SERVICE+N+BLOCK+B+PHOTO]`, badge 01-04, alternating left/right), and **4 bold-label feature bullets** (`[SERVICE N BLOCK B POINT p]` = uppercase label, `[SERVICE N BLOCK B DETAIL p]` = the rest). Write block content that covers distinct facets of the service (e.g. the core work, the details, the process/schedule, the trust/guarantee angle).
- [ ] 3-4 gallery images from `photos/`
- [ ] Reviews, Process, Areas Strip, CTA Banner (shared blocks)
- [ ] **"SERVICE AREAS WE COVER" section** with all [N] cities as linked pill buttons, placed before the CTA banner — each pill links to its area page
- [ ] Unique title: "[SERVICE_1_NAME] in [PRIMARY_CITY], [CITY_2] & [REGION] [STATE] | [BRAND_NAME]" — always include multiple cities
- [ ] Meta description: 150-160 chars, keyword-rich, mentions multiple cities not just primary
- [ ] Hero description says "throughout [City1], [City2], [City3], and the [Region]" — not just primary city
- [ ] Review tagline: "see why [Region] homeowners trust [Brand_Name]" — never "see why [Primary City] trusts"
- [ ] Commit: `git commit -m "Build service-1.html ([SERVICE_1_NAME]) — service page template"`

---

### Task 16: Screenshot service-1.html and verify

- [ ] `node screenshot.mjs http://localhost:3000/service-1.html [SERVICE_1_SLUG]`
- [ ] Verify hero, photos, shared blocks, colors all correct
- [ ] Fix. Re-screenshot. Confirm clean before cloning.

---

### Task 17: Clone and populate service-2.html through service-[N].html

For each, clone `service-1.html` and swap only: H1, the 4 deep-dive blocks (eyebrow + headline + intro + 4 bold-label points each), block photos, page title, meta description.

[SERVICE_PAGES_LIST — each with H1, the 4 deep-dive block themes, title]

- [ ] Commit: `git commit -m "Build service pages 2–[N] (clone and populate)"`

---

### Task 18: Phase 4 screenshot check

- [ ] Screenshot all [N] service pages — spot-check name, sub-services, title are unique per page
- [ ] Fix errors. Commit.

---

> ## ▶ START PROMPT — Phase 5
> **"Build the [BRAND_NAME] website. Start with Phase 5: build all [N] area pages (`area-1.html` through `area-[N].html`). Working dir: `CLIENT PROJECTS/[BRAND_NAME]/website/`. All core and service pages are already built. Clone `service-1.html` as the base. Build area-1.html ([PRIMARY_CITY]) first as the master template, verify it, then clone for areas 2–[N]. Use the plan at `CLIENT PROJECTS/[BRAND_NAME]/website-build-plan.md`. When Phase 5 is done, stop."**

---

## Phase 5 — Service Area Pages

### Task 19: Build `area-1.html` ([PRIMARY_CITY]) — the master template

- [ ] Hero H1: "Your Dependable [PRIMARY_CITY] [TRADE] Contractor"
- [ ] Intro paragraph: 2-3 sentences weaving in [PRIMARY_CITY], region, business expertise
- [ ] Full services list: all [N] services with links to their pages
- [ ] Reviews, Process, Areas Strip, CTA Banner (shared blocks)
- [ ] Title: "[TRADE] Contractor in [PRIMARY_CITY] [STATE] | [BRAND_NAME]"
- [ ] Meta: 150-160 chars
- [ ] Commit: `git commit -m "Build area-1.html ([PRIMARY_CITY]) — area page template"`

---

### Task 20: Screenshot area-1.html and verify

- [ ] `node screenshot.mjs http://localhost:3000/area-1.html [CITY_1_SLUG]`
- [ ] Confirm layout, city name in hero, services list all linked
- [ ] Fix. Re-screenshot. Confirm clean.

---

### Task 21: Clone and populate area-2.html through area-[N].html

Clone `area-1.html` — only the H1, intro paragraph, page title, and meta change.

[AREA_PAGES_LIST — each with H1, title]

- [ ] Commit: `git commit -m "Build area pages 2–[N] (clone and populate)"`

---

### Task 22: Phase 5 screenshot check

- [ ] Screenshot all [N] area pages — spot-check city name in H1 is unique and correct
- [ ] Fix errors. Commit.

---

> ## ▶ START PROMPT — Phase 6
> **"Build the [BRAND_NAME] website. Start with Phase 6: build `blog.html` and `blog-1.html` through `blog-6.html`. Working dir: `CLIENT PROJECTS/[BRAND_NAME]/website/`. All core, service, and area pages are already built. Build blog.html index first, then blog-1 through blog-6 (800-1000 words each). Use the plan at `CLIENT PROJECTS/[BRAND_NAME]/website-build-plan.md`. When Phase 6 is done, stop."**

---

## Phase 6 — Blog

### Task 23: Build `blog.html` (index)

- [ ] Navbar + H1: "Blog"
- [ ] 6 cards: title + excerpt + "Read Article" link
- [ ] CTA Banner + Footer
- [ ] Commit: `git commit -m "Build blog.html index"`

---

### Task 24-25: Build `blog-1.html` through `blog-6.html`

For each post: 800-1000 words, 4+ H2 sections, internal links to relevant service and area pages, CTA Banner, "Related Services" links.

[BLOG_POSTS_LIST — each with title, H2 outline, internal links]

- [ ] Commit: `git commit -m "Build blog posts 1–6"`

---

### Task 26: Phase 6 screenshot check

- [ ] Screenshot blog.html and blog-1.html
- [ ] Click every "Read Article" link from blog.html — confirm all 6 resolve
- [ ] Fix. Commit.

---

> ## ▶ START PROMPT — Phase 7
> **"Build the [BRAND_NAME] website. Start with Phase 7: build `privacy.html` and `terms.html`. Working dir: `CLIENT PROJECTS/[BRAND_NAME]/website/`. Clone `contact.html` as the shell. Fetch privacy and terms from GHL preview URLs. Use the plan at `CLIENT PROJECTS/[BRAND_NAME]/website-build-plan.md`. When Phase 7 is done, stop."**

---

## Phase 7 — Legal Pages

### Task 27: Build `privacy.html`

- [ ] Clone `contact.html` shell
- [ ] H1: "Privacy Policy" + last updated date
- [ ] Two-column layout: sticky sidebar with jump-links, wide prose column
- [ ] Standard sections: Definitions · Data Collection · Use · Sharing · Retention · Security · Contact
- [ ] Commit: `git commit -m "Build privacy.html"`

---

### Task 28: Build `terms.html`

- [ ] Clone `privacy.html` — same two-column layout
- [ ] H1: "Terms & Conditions"
- [ ] A2P/SMS consent sections required: Messaging Consent · Message Types · Data Rates · Opt-Out · Privacy Reference
- [ ] Commit: `git commit -m "Build terms.html"`

---

### Task 29: Wire up footer privacy/terms links

- [ ] Find-and-replace placeholder `href="#"` on Terms and Privacy links across all HTML files
- [ ] Commit: `git commit -m "Wire up terms and privacy links across all pages"`

---

> ## ▶ START PROMPT — Phase 8
> **"Build the [BRAND_NAME] website. Start with Phase 8: post-build passes — SEO, colors, favicon, proofreading. Working dir: `CLIENT PROJECTS/[BRAND_NAME]/website/`. All pages are fully built. Run all 4 passes. Use the plan at `CLIENT PROJECTS/[BRAND_NAME]/website-build-plan.md`. When Phase 8 is done, stop."**

---

## Phase 8 — Post-Build Passes

### Task 30: SEO pass — all files

- [ ] Every file: unique `<title>` (verify no duplicates)
- [ ] Every file: `<meta name="description">` 150-160 chars
- [ ] Every file: Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`)
- [ ] Every file: `<link rel="canonical" href="https://[DOMAIN]/[page].html">`
- [ ] Every file: one H1 only, proper H2/H3 hierarchy, descriptive `alt=""` on every `<img>`
- [ ] `index.html`: JSON-LD LocalBusiness schema (name, phone, email, address, hours, services)
- [ ] `sitemap.xml`: homepage entry must be `https://[DOMAIN]/` (root URL, NOT `/index.html`); all service pages (service-1 through service-N) at priority 0.9, area pages (area-1 through area-N) at 0.8, blog posts at 0.65, legal pages at 0.4
- [ ] `robots.txt`: `Allow: /` for all crawlers; Disallow: `/thankyou.html`, `/test.html`, `/color-preview.html`, `/form.html`, `/our-work.html`, `/intake-form-EN.html`, `/intake-form-ES.html`, `/intake-form.html`; `Sitemap: https://[DOMAIN]/sitemap.xml` at bottom
- [ ] Submit sitemap in Google Search Console: Indexing → Sitemaps → paste `https://[DOMAIN]/sitemap.xml` → Submit
- [ ] Commit: `git commit -m "SEO pass — titles, meta, OG, schema, sitemap, robots.txt"`

---

### Task 31: Colors pass

- [ ] Search all HTML files for `rgba(18,82,204` — replace with `rgba([SIGNAL_RGB]`
- [ ] Search for `#1252CC` — replace with `[SIGNAL]`
- [ ] Search for `#0A2F82` — replace with `[LOGO-A]`
- [ ] Search for `#3DA5FF` — replace with `[GOLD]`
- [ ] Commit: `git commit -m "Colors pass — verify brand palette across all files"`

---

### Task 32: Favicon pass

- [ ] Add `<link rel="icon" href="logo.svg" type="image/svg+xml">` to `<head>` on every page
- [ ] Commit: `git commit -m "Favicon pass — add SVG favicon to all pages"`

---

### Task 33: Proofreading pass

- [ ] Read every HTML file — fix spelling, grammar, awkward phrasing
- [ ] Report a summary of corrections made
- [ ] Commit: `git commit -m "Proofreading pass — copy corrections"`

---

> ## ▶ START PROMPT — Phase 9
> **"Build the [BRAND_NAME] website. Start with Phase 9: final QA. Working dir: `CLIENT PROJECTS/[BRAND_NAME]/website/`. All pages are built and all post-build passes are done. Start `node serve.mjs`, run `node qa.mjs`, click every nav link, every service and area link, every Get Free Quote button, all 6 blog article links. Screenshot index.html, service-1.html, and area-1.html. Fix any 404s or broken links. Use the plan at `CLIENT PROJECTS/[BRAND_NAME]/website-build-plan.md`. When done, report what's ready for Netlify deploy."**

---

## Phase 9 — Final QA

### Task 34: Full QA pass

- [ ] Start server: `node serve.mjs`
- [ ] Run `node qa.mjs` — review all output (script must check `logo.svg` not `logo.png`, must allow `tel:` on btn-primary, must check all [N] service and area pages)
- [ ] Verify every page links `site.css` and `site.js` exactly once, and no page loads the Tailwind CDN or a direct Elfsight platform.js tag
- [ ] Click every navbar link from index.html — no 404s
- [ ] Open Services dropdown — all [N] service links work
- [ ] Open Service Areas dropdown — all [N] area links work
- [ ] Click every "Get Free Quote" button — all route to `contact.html`
- [ ] Verify logo.svg renders on every page
- [ ] Spot-check mobile nav: accordions open/close for Services and Service Areas
- [ ] Verify Google Fonts load (not system fallbacks)
- [ ] Click all 6 "Read Article" links from blog.html
- [ ] Check footer: service links, area links, Blog, Contact, Terms, Privacy all resolve
- [ ] Screenshot index.html, service-1.html, area-1.html — verify colors and layout
- [ ] Commit: `git commit -m "Final QA complete"`

---

> ## ▶ START PROMPT — Phase 10
> **"Run the Phase 10 build retrospective for the [BRAND_NAME] site. Working dir: `CLIENT PROJECTS/[BRAND_NAME]/website/`. The build is done and signed off. Review every correction this build needed and feed each lesson back into the master template, qa.mjs, or the plan's standards checklist. Do not just write notes, change the source. Use the plan at `CLIENT PROJECTS/[BRAND_NAME]/website-build-plan.md`."**

---

## Phase 10 — Build Retrospective (feed lessons back into the template)

> Run this AFTER the client signs off, while the build is fresh. The goal is simple: the NEXT build should need fewer corrections than this one. A lesson that only lives in your memory is worthless. Every lesson must land as a concrete change to the template source, `qa.mjs`, or this checklist.

### Task 35: Collect every correction
- [ ] List every moment the user asked you to change, fix, or redo something you had already called "done," plus every defect you caught yourself.
- [ ] If you still have the build conversation, re-read it. If not, read `git log` for this project: every commit whose message starts with "Fix", "Change", or redoes earlier work is a correction. The commit trail IS the list of what went wrong.
- [ ] For each, write one line: what was wrong, and why it shipped wrong.

### Task 36: Triage each lesson into one of three buckets
- [ ] **Template defect** (it shipped broken from the master): fix the actual source file in `Client Website Master/` so it never ships broken again. (e.g. cool-grey chrome, white-on-white select, off-center checkbox.)
- [ ] **Automatable check** (a script could have caught it): add a check to `qa.mjs` that fails the build with a non-zero exit. (e.g. em dashes, stray placeholders, duplicate H1.)
- [ ] **Judgment call** (data or taste dependent, no script can catch it): add a one-line item to the "MORE STANDARDS" section of this template. (e.g. confirm service-area cities, only use real reviews, a phrasing the client kept asking for.)

### Task 37: Apply the changes (change the source, do not just document)
- [ ] Make the Task 36 edits to `Client Website Master/` (page templates, `site.css`, `partials/`, `qa.mjs`) and to this template's standards section.
- [ ] Record any new recurring user preference in memory (a color, a layout, a phrasing they keep correcting toward).

### Task 38: Confirm the loop closed
- [ ] Re-run `node qa.mjs` on the finished build: it must pass with exit 0.
- [ ] State plainly: "These N corrections are now prevented at the source / caught by qa.mjs / on the checklist." If a lesson cannot be prevented by any of the three, say why.
- [ ] Commit: `git commit -m "Phase 10 retrospective: fed [N] lessons back into the template"`

---

## Photo Swap Guide

All photos are sourced from `website/photos/` and referenced by filename. To swap any placeholder photo for a real client photo:

1. Drop the new image into `website/photos/`
2. Rename it to match the existing filename — no code changes needed
3. If using a different filename, find-and-replace the old filename across all HTML files
4. Update the `alt` attribute to describe the actual image (accessibility + SEO)

**Standard placeholder filenames:**

| Filename | Used On |
|---|---|
| `hero.jpg` | index.html hero background |
| `about.jpg` | index.html about section |
| `team.jpg` | index.html / about section |
| `avatar.jpg` | Reviews section (owner photo) |
| `gallery-1.jpg` through `gallery-6.jpg` | gallery.html, index.html our-work preview |
| `service-hardscape.jpg` | Hard surface service pages |
| `service-lawn.jpg` | Lawn/turf service pages |
| `service-design.jpg` | Design/feature service pages |
| `service-irrigation.jpg` | Drainage/irrigation service pages |

---

## Pending Items (Do Before Launch)

| Item | Status |
|---|---|
| GHL form webhook URL | Waiting — replace `[GHL_FORM_URL]` |
| Google Analytics ID | Waiting — replace `[GA_ID]` |
| Netlify Site ID | Waiting — set up Netlify site |
| Google Review link | Waiting — replace `[REVIEW_LINK]` |
| Real client reviews | Waiting — replace placeholder reviews |
| Social media URLs | [SOCIAL_NOTE] |

---

*Template version: 2026-06-09. Based on BlackHawk Landscaping build. Updated for the optimized template architecture: site.css/site.js shared core, no Tailwind, lazy images, lazy Elfsight, trimmed fonts.*
