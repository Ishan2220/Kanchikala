import fs from 'fs';
import path from 'path';

const categoriesPath = path.resolve('src/data/categories.json');
const productsPath = path.resolve('src/data/products.json');

let categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
let products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Ensure Gadwal Sarees category exists
if (!categories.find(c => c.id === 'gadwal')) {
  const chanderiIndex = categories.findIndex(c => c.id === 'chanderi');
  const insertIndex = chanderiIndex !== -1 ? chanderiIndex : categories.length;
  categories.splice(insertIndex, 0, {
    id: "gadwal",
    name: "Gadwal Sarees",
    folderName: "Gadwal Sarees",
    slug: "gadwal-sarees",
    description: "Renowned for their contrasting kuttu borders and rich zari pallu, Gadwal handcrafted sarees combine lightweight cotton body with sumptuous silk borders.",
    shortDescription: "Lightweight body with contrasting rich silk zari borders.",
    coverImage: "/Gadwal Sarees/ChatGPT Image Jun 27, 2026, 11_07_54 PM.png"
  });
}

// Ensure Chanderi Sarees has explicit folderName
const chanderiCat = categories.find(c => c.id === 'chanderi');
if (chanderiCat && !chanderiCat.folderName) {
  chanderiCat.folderName = "Chanderi Sarees";
}

function getSimpleProductTitle(cat) {
  let base = cat.name;
  if (/ Sarees$/i.test(base)) {
    return base.replace(/ Sarees$/i, ' Saree');
  }
  if (/ Edition$/i.test(base)) {
    return base.replace(/ Edition$/i, ' Saree');
  }
  if (!/ Saree$/i.test(base)) {
    return `${base} Saree`;
  }
  return base;
}

let newProductsAddedCount = 0;

categories = categories.map(cat => {
  const possibleDirs = [
    cat.folderName ? path.join('public', cat.folderName) : null,
    path.join('public', cat.name),
    path.join('public', cat.name.replace(/ Sarees$| Edition$/i, '')),
    path.join('public', cat.slug),
    path.join('public', 'images', 'categories', cat.id)
  ].filter(Boolean);

  let foundDir = null;
  let maxFiles = 0;
  let files = [];

  for (const d of possibleDirs) {
    if (fs.existsSync(d)) {
      const imgs = fs.readdirSync(d).filter(file => /\.(webp|png|jpg|jpeg|gif)$/i.test(file));
      if (imgs.length > maxFiles) {
        maxFiles = imgs.length;
        foundDir = d;
        files = imgs;
      }
    }
  }

  if (!foundDir || files.length === 0) {
    return cat;
  }

  // Sort files naturally
  files.sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return a.localeCompare(b);
  });

  const relFromPublic = path.relative('public', foundDir).replace(/\\/g, '/');
  const urlPrefix = relFromPublic.startsWith('/') ? relFromPublic : `/${relFromPublic}`;

  const imagePaths = files.map(f => `${urlPrefix}/${f}`);
  const standardTitle = getSimpleProductTitle(cat);

  // Get existing products for this category
  let catProducts = products.filter(p => p.categoryId === cat.id);
  
  // If we have more products than images, remove the extra duplicate products
  if (files.length > 0 && catProducts.length > files.length) {
    const extraIds = new Set(catProducts.slice(files.length).map(p => p.id));
    products = products.filter(p => !extraIds.has(p.id));
    catProducts = catProducts.slice(0, files.length);
  }

  // If we have more images than products, add new product objects
  if (files.length > catProducts.length) {
    for (let i = catProducts.length; i < files.length; i++) {
      const cleanSlugSuffix = cat.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const slug = `${cleanSlugSuffix}-${i + 1}`;

      const newProd = {
        id: `${cat.id}-${i + 1}`,
        categoryId: cat.id,
        name: standardTitle,
        slug: slug,
        fabric: cat.id.includes("silver") ? "Pure Mulberry Silk with Pure Silver Zari" : cat.id.includes("gold") ? "Pure Katan Silk with 2gm Gold Dipped Zari" : "Pure Traditional Silk",
        description: `Exquisite handwoven ${standardTitle} featuring authentic luxury zari weaving, rich temple borders, and heirloom craftsmanship.`,
        details: [
          `Collection: ${cat.name}`,
          "Occasion: Grand Weddings, Royal Receptions, Exclusive Bridal Wear",
          "Craftsmanship: Authentic Master Artisan Weave",
          "Certificate: Guaranteed Authenticity & Weave Mark"
        ],
        images: [imagePaths[i]]
      };

      products.push(newProd);
      catProducts.push(newProd);
      newProductsAddedCount++;
    }
  }

  // Update all products for this category to ensure clean uniform names without Type X and distinct images
  catProducts.forEach((prod, idx) => {
    const primaryImg = imagePaths[idx % imagePaths.length];
    prod.name = standardTitle;
    prod.images = [primaryImg];
    
    // Ensure slug has clean numbered identifier without Type X
    const cleanSlugSuffix = cat.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    prod.slug = `${cleanSlugSuffix}-${idx + 1}`;
  });

  const updatedCoverImage = imagePaths[0] || cat.coverImage;

  return {
    ...cat,
    coverImage: updatedCoverImage,
    images: imagePaths
  };
});

// Final cleanup to ensure NO product anywhere has "Type X" in its name or slug
products.forEach(p => {
  p.name = p.name.replace(/^Type \d+\s+-\s+|^Type \d+\s+/i, '');
  p.slug = p.slug.replace(/^type-\d+-/i, '');
});

fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2), 'utf8');
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');

console.log(`[Sync Complete] Updated categories.json & products.json. Added ${newProductsAddedCount} new product cards.`);
