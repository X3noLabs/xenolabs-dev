const sharp = require('sharp');
const path = require('path');

const SHOTS_DIR = String.raw`C:\Users\ikeac\AI\ai-brain\assets\xenolabs-dev\assets\hive mind`;
const OUT_DIR = String.raw`C:\Users\ikeac\Documents\AI\Agentic\Claude\Personal\Personal OS\projects\xenolabs_dev\public\screenshots`;

const W = 1440, H = 900;
const BG = '#09090b';

async function roundedImage(srcPath, targetW, targetH, radius = 12) {
  const img = await sharp(srcPath).resize(Math.round(targetW), Math.round(targetH), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const mask = Buffer.from(`<svg width="${Math.round(targetW)}" height="${Math.round(targetH)}"><rect width="${Math.round(targetW)}" height="${Math.round(targetH)}" rx="${radius}" fill="#fff"/></svg>`);
  return sharp(img).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
}

async function saveOut(name, layers) {
  await sharp({ create: { width: W, height: H, channels: 4, background: BG } })
    .composite(layers)
    .png()
    .toFile(path.join(OUT_DIR, `_${name}.png`));
  await sharp(path.join(OUT_DIR, `_${name}.png`))
    .resize({ width: 1280 })
    .webp({ quality: 84 })
    .toFile(path.join(OUT_DIR, `${name}.webp`));
  console.log('built', name);
}

// ============ SLIDE 1: OFFICE BOARD (real screenshot, direct) ============
async function buildOfficeBoard() {
  const pad = 40;
  const contentW = W - pad * 2, contentH = H - pad * 2;
  const shot = await roundedImage(path.join(SHOTS_DIR, 'Screenshot 2026-09-25 024930.png'), contentW, contentH, 14);
  const meta = await sharp(shot).metadata();
  const left = Math.round((W - meta.width) / 2);
  const top = Math.round((H - meta.height) / 2);
  await saveOut('hive-mind-01-office-board', [{ input: shot, top, left }]);
}

// ============ SLIDE 2: PANELS COMBO (real screenshots, side by side) ============
async function buildPanelsCombo() {
  const pad = 60;
  const targetH = H - pad * 2;
  const m1 = await sharp(path.join(SHOTS_DIR, 'Screenshot 2026-09-25 034538.png')).metadata();
  const m2 = await sharp(path.join(SHOTS_DIR, 'Screenshot 2026-09-25 034545.png')).metadata();

  const w1 = Math.round((m1.width / m1.height) * targetH);
  const w2 = Math.round((m2.width / m2.height) * targetH);
  const gap = 60;
  const totalW = w1 + gap + w2;
  const startX = Math.round((W - totalW) / 2);
  const top = Math.round((H - targetH) / 2);

  const shot1 = await roundedImage(path.join(SHOTS_DIR, 'Screenshot 2026-09-25 034538.png'), w1, targetH, 14);
  const shot2 = await roundedImage(path.join(SHOTS_DIR, 'Screenshot 2026-09-25 034545.png'), w2, targetH, 14);

  await saveOut('hive-mind-02-panels', [
    { input: shot1, top, left: startX },
    { input: shot2, top, left: startX + w1 + gap },
  ]);
}

(async () => {
  await buildOfficeBoard();
  await buildPanelsCombo();
  console.log('ALL DONE');
})().catch((e) => { console.error(e); process.exit(1); });
