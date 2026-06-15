import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(__dirname, 'raglan-tee-email.html');

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

async function shot(width, out) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 2 });
  await page.goto(`file://${file}`, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.screenshot({ path: path.resolve(__dirname, out), fullPage: true });
  await page.close();
}

await shot(600, 'preview.png');       // desktop
await shot(375, 'preview-mobile.png'); // mobile
await browser.close();
console.log('Done');
