const sharp = require('sharp');

const SRC = String.raw`C:\Users\ikeac\AI\ai-brain\assets\discord-server\server-icon.png`;
const OUT = String.raw`C:\Users\ikeac\Documents\AI\Agentic\Claude\Personal\Personal OS\projects\xenolabs_dev\public\logos\hive-mind-logo.webp`;

sharp(SRC)
  .resize({ width: 240, height: 240 })
  .webp({ quality: 90 })
  .toFile(OUT)
  .then(() => console.log('done'));
