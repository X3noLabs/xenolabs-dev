// Generates portfolio screenshots of the Digital Gradebook for xenolabs.dev.
//
// The gradebook is a Claude Artifact (a single static HTML page with no backend
// or DB — all state lives in the browser's localStorage). Rather than driving
// the live claude.ai app shell with Playwright, this screenshots a local
// snapshot of that same static page (gradebook-snapshot.html) — faster, fully
// offline/reproducible, and structurally incapable of touching the real hosted
// artifact or the teacher's live synced copy.
//
// To refresh the snapshot after a real UI change to the gradebook, re-download
// the public template artifact's source (Claude Artifact tool, action "read",
// url https://claude.ai/code/artifact/e7e76c1f-ffda-41ec-84cb-fead99609950) and
// overwrite scripts/gradebook-snapshot.html with it, then rerun this script.
//
// Usage:
//   node scripts/screenshot-demo.js
//   (first time only: npx playwright install chromium — playwright-core has
//   no postinstall download, so the browser binary has to be fetched once)
//
// Not run in CI or on any build step — rerun by hand whenever the gradebook UI
// changes and the marketing screenshots need refreshing. Deliberately depends
// on playwright-core (not playwright) so this devDependency can't trigger a
// Chromium download during the Cloudflare Pages build.

import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildDemoState, STORE_KEY } from './seed-demo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRADEBOOK_URL = pathToFileURL(path.join(__dirname, 'gradebook-snapshot.html')).href;
const OUT_DIR = path.join(__dirname, '..', 'screenshots', 'demo', 'digital-gradebook');
const EXTRA_OUT_DIRS = [
  'C:\\Users\\ikeac\\AI\\ai-brain\\assets\\xenolabs-dev\\assets\\digital gradebook',
];

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

async function seedAndLoad(page) {
  // Land on the real page first so localStorage is scoped to the right origin,
  // then inject the fake state and reload so the app boots from it.
  await page.goto(GRADEBOOK_URL, { waitUntil: 'networkidle' });
  await page.evaluate(
    ({ key, state }) => localStorage.setItem(key, JSON.stringify(state)),
    { key: STORE_KEY, state: buildDemoState() }
  );
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#tab-setup, #tab-results', { state: 'attached' });
}

async function gotoTab(page, tab) {
  await page.click(`.tab[data-tab="${tab}"]`);
  await page.waitForTimeout(150); // synchronous re-render, but let webfonts/layout settle
}

async function shoot(page, filename) {
  const dests = [OUT_DIR, ...EXTRA_OUT_DIRS];
  for (const dir of dests) {
    await mkdir(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, filename), fullPage: false });
  }
  console.log('saved', filename);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  try {
    // ---- desktop screens ----
    const desktopCtx = await browser.newContext({ viewport: DESKTOP });
    const page = await desktopCtx.newPage();
    await seedAndLoad(page);

    await gotoTab(page, 'results');
    await shoot(page, '01-results-class.png');

    await page.selectOption('#studentSelect', { label: 'Mateo Sanchez' });
    await page.waitForTimeout(150);
    await shoot(page, '02-results-student.png');
    await page.selectOption('#studentSelect', '');
    await page.waitForTimeout(150);

    await gotoTab(page, 'attendance');
    await shoot(page, '03-attendance.png');

    await gotoTab(page, 'homework');
    await shoot(page, '04-homework.png');

    await gotoTab(page, 'roster');
    await shoot(page, '05-roster.png');

    await desktopCtx.close();

    // ---- mobile screen ----
    const mobileCtx = await browser.newContext({ viewport: MOBILE, isMobile: true });
    const mobilePage = await mobileCtx.newPage();
    await seedAndLoad(mobilePage);
    await gotoTab(mobilePage, 'results');
    await shoot(mobilePage, '06-mobile-results.png');
    await mobileCtx.close();
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
