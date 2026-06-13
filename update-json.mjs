import fs from 'fs';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/images\/categories\/([^/]+)\/(\d)\.png/g, '/images/categories/$1/$2.webp');
  fs.writeFileSync(filePath, content);
}

replaceInFile('src/data/categories.json');
replaceInFile('src/data/products.json');

console.log('Updated JSON files.');
