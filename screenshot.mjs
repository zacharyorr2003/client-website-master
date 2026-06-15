import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const [,, url = 'http://localhost:3000', label = ''] = process.argv;

const dir = join(__dirname, 'temporary screenshots');
if (!existsSync(dir)) mkdirSync(dir);

const n = readdirSync(dir).filter(f => f.endsWith('.png')).length + 1;
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const outPath = join(dir, filename);

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });

// Scroll through the page so loading="lazy" images and IntersectionObserver
// widgets fire before the full-page capture, then return to top.
await page.evaluate(async () => {
  await new Promise(resolve => {
    let y = 0;
    const step = () => {
      y += 800;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 60);
      else { window.scrollTo(0, 0); setTimeout(resolve, 250); }
    };
    step();
  });
});
// Wait until every image has actually finished loading (10s cap)
await page.evaluate(() => Promise.race([
  Promise.all(Array.from(document.images)
    .filter(img => !img.complete)
    .map(img => new Promise(res => { img.onload = img.onerror = res; }))),
  new Promise(res => setTimeout(res, 10000)),
]));

await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log(`Saved: ${outPath}`);
