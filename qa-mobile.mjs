import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, 'temporary screenshots');
if (!existsSync(dir)) mkdirSync(dir);

const existing = readdirSync(dir).filter(f => f.endsWith('.png'));
const next = existing.length + 1;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

const pages = [
  ['index.html', 'mobile-index'],
  ['service-1.html', 'mobile-service'],
  ['area-1.html', 'mobile-area'],
];

for (let i = 0; i < pages.length; i++) {
  const [p, label] = pages[i];
  await page.goto(`http://localhost:3000/${p}`, { waitUntil: 'networkidle2' });
  const path = join(dir, `screenshot-${next + i}-${label}.png`);
  await page.screenshot({ path, fullPage: true });
  console.log(`Saved: ${path}`);
}

await browser.close();
