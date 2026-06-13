import fs from 'fs';

const categoriesPath = 'src/data/categories.json';
let categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

categories = categories.map(cat => {
  // If id is muga-silk, folder is muga-silk
  const folderId = cat.id;
  return {
    ...cat,
    images: [
      `/images/categories/${folderId}/1.webp`,
      `/images/categories/${folderId}/2.webp`,
      `/images/categories/${folderId}/3.webp`
    ]
  };
});

fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
console.log('Added images array to categories.json');
