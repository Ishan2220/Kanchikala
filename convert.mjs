import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const categoriesDir = path.join(publicDir, 'images', 'categories');

async function main() {
  const files = fs.readdirSync(publicDir);
  const pngFiles = files.filter(f => f.endsWith('.png') && f !== 'next.png');

  for (const file of pngFiles) {
    const match = file.match(/^([a-z-]+)-(\d)\.png$/);
    if (!match) continue;
    
    let [_, category, num] = match;
    
    // Fix muga to muga-silk
    if (category === 'muga') category = 'muga-silk';

    const targetDir = path.join(categoriesDir, category);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(targetDir, `${num}.webp`);

    console.log(`Converting ${file} to ${outputPath}...`);
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    // Delete original uploaded file
    fs.unlinkSync(inputPath);
  }
  
  console.log('Done converting images!');
}

main().catch(console.error);
