import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execSync } from 'child_process';

async function convertDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await convertDirectory(fullPath);
    } else if (entry.isFile() && /\.(png|jpg|jpeg)$/i.test(entry.name)) {
      if (entry.name.startsWith('favicon') || entry.name.startsWith('apple-touch-icon')) {
        continue;
      }
      const ext = path.extname(entry.name);
      const webpPath = fullPath.slice(0, -ext.length) + '.webp';
      
      console.log(`Converting: ${fullPath} -> ${webpPath}`);
      try {
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.error(`Failed to convert ${fullPath}:`, err);
      }
    }
  }
}

async function updateReferences(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await updateReferences(fullPath);
    } else if (entry.isFile() && /\.(tsx|ts|json|css|html)$/i.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (/\.(png|jpg|jpeg)/i.test(content)) {
        const updated = content.replace(/\.(png|jpg|jpeg)/gi, '.webp');
        if (content !== updated) {
          fs.writeFileSync(fullPath, updated, 'utf8');
          console.log(`Updated image references in: ${fullPath}`);
        }
      }
    }
  }
}

async function main() {
  console.log('Starting image conversion in public/...');
  await convertDirectory(path.resolve('public'));
  console.log('Conversion finished. Updating code references...');
  await updateReferences(path.resolve('src'));
  console.log('Running sync script...');
  execSync('npm run sync', { stdio: 'inherit' });
}

main().catch(console.error);
