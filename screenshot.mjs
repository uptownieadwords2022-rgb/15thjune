import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 600, height: 900, deviceScaleFactor: 2 });

const file = path.resolve(__dirname, 'raglan-tee-email.html');
await page.goto(`file://${file}`, { waitUntil: 'networkidle2', timeout: 30000 });

// Full page height
const height = await page.evaluate(() => document.body.scrollHeight);
await page.setViewport({ width: 600, height, deviceScaleFactor: 2 });
await page.goto(`file://${file}`, { waitUntil: 'networkidle2', timeout: 30000 });

await page.screenshot({ path: path.resolve(__dirname, 'preview.png'), fullPage: true });
await browser.close();
console.log('Done');
