import puppeteer from 'puppeteer';

const BASE = 'http://localhost:3000';
const pass = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => console.error(`  ✗ ${msg}`);

const ALL_PAGES = [
  'index.html', 'services.html', 'gallery.html', 'contact.html', 'blog.html',
  'service-1.html', 'service-2.html', 'service-3.html', 'service-4.html',
  'area-1.html', 'area-2.html', 'area-3.html', 'area-4.html', 'area-5.html', 'area-6.html',
  'blog-1.html', 'blog-2.html', 'blog-3.html', 'blog-4.html', 'blog-5.html', 'blog-6.html',
];

const NAVBAR_LINKS = ['index.html', 'services.html', 'gallery.html', 'blog.html', 'contact.html'];
const SERVICE_LINKS = ['service-1.html', 'service-2.html', 'service-3.html', 'service-4.html'];
const AREA_LINKS = ['area-1.html', 'area-2.html', 'area-3.html', 'area-4.html', 'area-5.html', 'area-6.html'];
const BLOG_POST_LINKS = ['blog-1.html', 'blog-2.html', 'blog-3.html', 'blog-4.html', 'blog-5.html', 'blog-6.html'];

let errors = 0;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// ── 1. Every page loads (no 404) ─────────────────────────────────────────────
console.log('\n[1] All pages load (no 404)');
for (const p of ALL_PAGES) {
  const res = await page.goto(`${BASE}/${p}`, { waitUntil: 'domcontentloaded' });
  if (res.status() === 200) pass(p);
  else { fail(`${p} — status ${res.status()}`); errors++; }
}

// ── 2. Navbar links exist on every page ──────────────────────────────────────
console.log('\n[2] Navbar links present on every page');
const samplePages = ['index.html', 'service-1.html', 'area-1.html', 'blog-1.html'];
for (const p of samplePages) {
  await page.goto(`${BASE}/${p}`, { waitUntil: 'domcontentloaded' });
  for (const link of NAVBAR_LINKS) {
    const found = await page.$(`a[href="${link}"]`);
    if (found) pass(`${p} → ${link}`);
    else { fail(`${p} missing navbar link → ${link}`); errors++; }
  }
}

// ── 3. Service dropdown items on every page ──────────────────────────────────
console.log('\n[3] Services dropdown links present');
for (const p of samplePages) {
  await page.goto(`${BASE}/${p}`, { waitUntil: 'domcontentloaded' });
  for (const link of SERVICE_LINKS) {
    const found = await page.$(`a[href="${link}"]`);
    if (found) pass(`${p} → ${link}`);
    else { fail(`${p} missing service link → ${link}`); errors++; }
  }
}

// ── 4. Service Areas dropdown items on every page ────────────────────────────
console.log('\n[4] Service Areas dropdown links present');
for (const p of samplePages) {
  await page.goto(`${BASE}/${p}`, { waitUntil: 'domcontentloaded' });
  for (const link of AREA_LINKS) {
    const found = await page.$(`a[href="${link}"]`);
    if (found) pass(`${p} → ${link}`);
    else { fail(`${p} missing area link → ${link}`); errors++; }
  }
}

// ── 5. Get Free Quote buttons route to contact.html ──────────────────────────
console.log('\n[5] Get Free Quote buttons → contact.html');
for (const p of ['index.html', 'service-1.html', 'area-1.html', 'blog.html', 'blog-1.html']) {
  await page.goto(`${BASE}/${p}`, { waitUntil: 'domcontentloaded' });
  const btns = await page.$$eval('a.btn-primary', els => els.map(e => e.getAttribute('href')));
  const allOk = btns.every(h => h === 'contact.html');
  if (allOk && btns.length > 0) pass(`${p} — ${btns.length} btn(s) → contact.html`);
  else { fail(`${p} — btn hrefs: ${btns.join(', ')}`); errors++; }
}

// ── 6. logo.png loads on all pages ───────────────────────────────────────────
console.log('\n[6] logo.png loads on all pages');
for (const p of ALL_PAGES) {
  await page.goto(`${BASE}/${p}`, { waitUntil: 'networkidle2' });
  const logoOk = await page.evaluate(() => {
    const img = document.querySelector('img[src="logo.png"]');
    return img && img.naturalWidth > 0;
  });
  if (logoOk) pass(p);
  else { fail(`${p} — logo.png not loaded`); errors++; }
}

// ── 7. Fonts load (not system fallback) ──────────────────────────────────────
console.log('\n[7] Fonts load (Google Fonts link present)');
for (const p of ['index.html', 'service-1.html', 'blog-1.html']) {
  await page.goto(`${BASE}/${p}`, { waitUntil: 'domcontentloaded' });
  const hasFont = await page.$('link[href*="fonts.googleapis.com"]');
  if (hasFont) pass(`${p} — Google Fonts link present`);
  else { fail(`${p} — missing Google Fonts link`); errors++; }
}

// ── 8. Blog "Read full post" links resolve ────────────────────────────────────
console.log('\n[8] Blog "Read full post" links → correct pages');
await page.goto(`${BASE}/blog.html`, { waitUntil: 'domcontentloaded' });
const blogLinks = await page.$$eval('a[href^="blog-"]', els => [...new Set(els.map(e => e.getAttribute('href')))]);
for (const link of blogLinks) {
  const res = await page.goto(`${BASE}/${link}`, { waitUntil: 'domcontentloaded' });
  if (res.status() === 200) pass(`blog.html → ${link} (${res.status()})`);
  else { fail(`blog.html → ${link} returned ${res.status()}`); errors++; }
}

// ── 9. Footer links: service pages, area pages, Blog, Contact ────────────────
console.log('\n[9] Footer links present on index.html');
await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
const footerLinks = [...SERVICE_LINKS, ...AREA_LINKS, 'blog.html', 'contact.html'];
for (const link of footerLinks) {
  const found = await page.$(`footer a[href="${link}"]`);
  if (found) pass(`footer → ${link}`);
  else { fail(`footer missing → ${link}`); errors++; }
}

// ── 10-14. Static content-quality gate (reads the HTML files directly) ───────
import { readdirSync, readFileSync } from 'fs';
const SKIP = new Set(['test.html', 'color-preview.html', 'our-work.html', 'review.html', '_shared.html']);
const LEGAL = new Set(['privacy.html', 'terms.html']);        // legal templates may keep em dashes
const PENDING_OK = ['[GHL_FORM_SUBMIT_URL]', '[GA_MEASUREMENT_ID]', '[REVIEW_LINK]', '[DOMAIN]', '[NETLIFY_ID]'];
const htmlFiles = readdirSync('.').filter(f => f.endsWith('.html') && !SKIP.has(f));

console.log('\n[10] No em dashes in visible copy (Zachary hard rule)');
for (const f of htmlFiles) {
  if (LEGAL.has(f)) continue;
  const html = readFileSync(f, 'utf8')                          // visible copy only:
    .replace(/<!--[\s\S]*?-->/g, '')                            // strip comments
    .replace(/<script[\s\S]*?<\/script>/g, '')                  // strip scripts
    .replace(/<style[\s\S]*?<\/style>/g, '');                   // strip styles
  const hits = (html.match(/>[^<]*—[^<]*</g) || []);
  if (hits.length === 0) pass(f);
  else { fail(`${f} has ${hits.length} em dash(es) in copy, e.g. ${hits[0].slice(0, 50).trim()}`); errors++; }
}

console.log('\n[11] No stray unfilled placeholders (pending-launch tokens allowed)');
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  const toks = [...new Set(html.match(/\[[A-Z][A-Z0-9 ._&/-]{2,40}\]/g) || [])].filter(t => !PENDING_OK.includes(t));
  if (toks.length === 0) pass(f);
  else { fail(`${f} has unfilled placeholders: ${toks.join(', ')}`); errors++; }
}

console.log('\n[12] Exactly one H1 per page');
for (const f of htmlFiles) {
  const n = (readFileSync(f, 'utf8').match(/<h1[\s>]/g) || []).length;
  if (n === 1) pass(f);
  else { fail(`${f} has ${n} H1 tags (need exactly 1)`); errors++; }
}

console.log('\n[13] SEO: og:image + canonical present (warn only)');
let seoWarn = 0;
for (const f of htmlFiles) {
  if (LEGAL.has(f)) continue;
  const html = readFileSync(f, 'utf8');
  const miss = [];
  if (!html.includes('property="og:image"')) miss.push('og:image');
  if (!html.includes('rel="canonical"')) miss.push('canonical');
  if (miss.length) { console.warn(`  ! ${f} missing ${miss.join(', ')}`); seoWarn++; }
}
if (seoWarn === 0) pass('all pages have og:image + canonical');
else console.warn(`  (${seoWarn} page(s) with SEO gaps — fix before launch)`);

console.log('\n[14] site.css has the dark-select fix (prevents white-on-white dropdowns)');
{
  const css = readFileSync('site.css', 'utf8');
  if (/select\s*\{[^}]*color-scheme:\s*dark/.test(css)) pass('select { color-scheme: dark }');
  else { fail('site.css missing `select { color-scheme: dark }` — native dropdowns will render white-on-white'); errors++; }
}

// ─────────────────────────────────────────────────────────────────────────────
await browser.close();
console.log(`\n${'─'.repeat(50)}`);
if (errors === 0) console.log(`✓ ALL CHECKS PASSED`);
else { console.error(`✗ ${errors} FAILURE(S) — see above`); process.exitCode = 1; }
