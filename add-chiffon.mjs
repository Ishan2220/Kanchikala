import fs from 'fs';

const categoriesPath = 'src/data/categories.json';
const productsPath = 'src/data/products.json';

let categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
let products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

if (!categories.find(c => c.id === 'chiffon')) {
  categories.push({
    id: "chiffon",
    name: "Chiffon Sarees",
    slug: "chiffon-sarees",
    description: "Ultra-lightweight, sheer, and gracefully flowing. Perfect for evening wear and elegant minimalist looks.",
    shortDescription: "Ultra-lightweight, sheer, and gracefully flowing.",
    coverImage: "/images/categories/chiffon/1.webp"
  });
  fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
  console.log("Added chiffon to categories.json");
}

const hasChiffonProducts = products.find(p => p.categoryId === 'chiffon');
if (!hasChiffonProducts) {
  const newProducts = [
    {
      id: "chiffon-1",
      categoryId: "chiffon",
      name: "Midnight Black Chiffon",
      slug: "midnight-black-chiffon",
      fabric: "Pure Chiffon",
      description: "A breathtaking midnight black chiffon adorned with delicate borders.",
      details: [
        "Saree Type: Chiffon Sarees",
        "Occasion: Party, Evening",
        "Colour: Midnight Black",
        "Length: 5.5 meters"
      ],
      images: [
        "/images/categories/chiffon/1.webp",
        "/images/categories/chiffon/2.webp",
        "/images/categories/chiffon/3.webp"
      ]
    },
    {
      id: "chiffon-2",
      categoryId: "chiffon",
      name: "Pastel Pink Chiffon",
      slug: "pastel-pink-chiffon",
      fabric: "Pure Chiffon",
      description: "An elegant pastel pink chiffon perfect for daytime events.",
      details: [
        "Saree Type: Chiffon Sarees",
        "Occasion: Day Event, Casual",
        "Colour: Pastel Pink",
        "Length: 5.5 meters"
      ],
      images: [
        "/images/categories/chiffon/1.webp",
        "/images/categories/chiffon/2.webp",
        "/images/categories/chiffon/3.webp"
      ]
    }
  ];
  
  products.push(...newProducts);
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
  console.log("Added chiffon products to products.json");
}
