// build-partials.mjs — stamps shared partials into every page.
//
// Usage:  node build-partials.mjs
//
// For each file in partials/ (e.g. partials/navbar.html), every page gets the
// partial's content stamped between marker comments:
//   <!-- PARTIAL:navbar:START ... --> ... <!-- PARTIAL:navbar:END -->
//
// Edit the partial, re-run this script, and every page is updated identically.
// NEVER edit the stamped block in a page directly — it gets overwritten.
//
// First-run adoption: if a page has no markers yet but has a matching
// element (navbar -> <header id="navbar">...</header>), that element is
// replaced with the stamped block.
//
// Active-page highlighting is handled at runtime by site.js, so the stamped
// navbar is byte-identical on every page.
import fs from 'fs';

const SKIP = ['_shared.html', 'color-preview.html', 'test.html', 'our-work.html', 'review.html', 'thankyou.html'];

// element matchers for first-run adoption, per partial name
const ADOPT = {
  navbar: /<header id="navbar"[\s\S]*?<\/header>/,
  footer: /<footer id="footer"[\s\S]*?<\/footer>/,
};

if (!fs.existsSync('partials')) { console.error('No partials/ folder.'); process.exit(1); }
const partials = {};
for (const p of fs.readdirSync('partials').filter(f => f.endsWith('.html'))) {
  partials[p.replace('.html', '')] = fs.readFileSync('partials/' + p, 'utf8').trim();
}
if (!Object.keys(partials).length) { console.error('partials/ is empty.'); process.exit(1); }

const pages = fs.readdirSync('.').filter(f => f.endsWith('.html') && !SKIP.includes(f));
for (const f of pages) {
  let src = fs.readFileSync(f, 'utf8');
  const done = [];
  for (const [name, content] of Object.entries(partials)) {
    const stamped = `<!-- PARTIAL:${name}:START — do not edit here; edit partials/${name}.html then run: node build-partials.mjs -->\n${content}\n<!-- PARTIAL:${name}:END -->`;
    const markerRe = new RegExp(`<!-- PARTIAL:${name}:START[\\s\\S]*?<!-- PARTIAL:${name}:END -->`);
    if (markerRe.test(src)) {
      src = src.replace(markerRe, stamped);
      done.push(name);
    } else if (ADOPT[name] && ADOPT[name].test(src)) {
      src = src.replace(ADOPT[name], stamped);
      done.push(name + ' (adopted)');
    }
  }
  fs.writeFileSync(f, src);
  console.log(`${f}: ${done.join(', ') || 'no partials found'}`);
}
console.log('\nDone. Pages stamped from partials/: ' + Object.keys(partials).join(', '));
