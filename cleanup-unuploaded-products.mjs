import fs from 'fs';
import path from 'path';

const categoriesPath = path.resolve('src/data/categories.json');
const productsPath = path.resolve('src/data/products.json');

const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
let products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

let removedCount = 0;

categories.forEach(cat => {
  // Check if custom product folder exists in public
  const possibleDirs = [
    cat.folderName ? path.join('public', cat.folderName) : null,
    path.join('public', cat.name),
    path.join('public', cat.name.replace(/ Sarees$| Edition$/i, '')),
    path.join('public', cat.slug)
  ].filter(Boolean);

  let hasCustomUploads = false;
  for (const d of possibleDirs) {
    if (fs.existsSync(d)) {
      const imgs = fs.readdirSync(d).filter(file => /\.(webp|png|jpg|jpeg|gif)$/i.test(file));
      if (imgs.length > 1) {
        hasCustomUploads = true;
        break;
      }
    }
  }

  // Find all existing products for this category
  const catProducts = products.filter(p => p.categoryId === cat.id);

  // If user has not uploaded custom products (or <= 1 image uploaded), we should keep ONLY 1 single product
  if (!hasCustomUploads && catProducts.length > 1) {
    console.log(`Category "${cat.name}" has no custom uploaded product gallery. Reducing ${catProducts.length} duplicate products to 1 single product.`);
    
    // Keep only the first product
    const firstProd = catProducts[0];
    firstProd.images = [cat.coverImage];
    
    // Remove all other products of this category from main products array
    const idsToRemove = new Set(catProducts.slice(1).map(p => p.id));
    products = products.filter(p => !idsToRemove.has(p.id));
    removedCount += idsToRemove.size;
  }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`Cleanup complete. Removed ${removedCount} redundant placeholder products.`);
