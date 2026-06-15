/* One-off image compressor for /public/images.
   - Photos (jpg/jpeg/png-photos): cap longest side at 1600px, re-encode.
   - Logo PNG: cap at 512px, palette-optimize, keep alpha.
   Only overwrites a file when the result is actually smaller.
   Run: node scripts/compress-images.cjs
*/
const fs   = require("fs");
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(process.cwd(), "public", "images");

function kb(n) { return (n / 1024).toFixed(0).padStart(6) + " KB"; }

(async () => {
  const files = fs.readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f));
  let totalBefore = 0, totalAfter = 0;

  for (const file of files.sort()) {
    const full = path.join(DIR, file);
    const ext  = path.extname(file).toLowerCase();
    const input = fs.readFileSync(full);
    const isPng = ext === ".png";
    const maxSide = isPng ? 512 : 1600;

    let pipeline = sharp(input, { failOn: "none" })
      .rotate() // honour EXIF orientation, then strip it
      .resize(maxSide, maxSide, { fit: "inside", withoutEnlargement: true });

    pipeline = isPng
      ? pipeline.png({ compressionLevel: 9, palette: true, quality: 80, effort: 8 })
      : pipeline.jpeg({ quality: 80, mozjpeg: true });

    const output = await pipeline.toBuffer();

    totalBefore += input.length;
    if (output.length < input.length) {
      fs.writeFileSync(full, output);
      totalAfter += output.length;
      console.log(`${file.padEnd(34)} ${kb(input.length)} -> ${kb(output.length)}`);
    } else {
      totalAfter += input.length;
      console.log(`${file.padEnd(34)} ${kb(input.length)}  (kept — already optimal)`);
    }
  }

  console.log("".padEnd(60, "-"));
  console.log(`TOTAL  ${kb(totalBefore)} -> ${kb(totalAfter)}  (${files.length} files)`);
})().catch((e) => { console.error(e); process.exit(1); });
