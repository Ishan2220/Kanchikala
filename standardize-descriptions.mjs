import fs from 'fs';
import path from 'path';

const categoriesPath = path.resolve('src/data/categories.json');
const productsPath = path.resolve('src/data/products.json');

const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const categorySpecialities = {
  "banarasi": {
    shortDescription: "Royal Mughal-inspired gold zari brocades on pure katan silk.",
    description: "Renowned for royal Mughal-inspired gold and silver zari brocades, elaborate floral meenakari weaving, and sumptuous pure katan silk. Each piece is an authentic heirloom handwoven in the holy city of Varanasi.",
    fabric: "Pure Katan Silk with Zari Brocade",
    details: [
      "Collection: Banarasi Heritage",
      "Speciality: Intricate Mughal Zari Brocade & Meenakari Weave",
      "Occasion: Royal Weddings, Grand Celebrations & Festive Wear",
      "Craftsmanship: Authentic Handwoven Varanasi Artistry",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "kanjeevaram": {
    shortDescription: "Bold temple borders and lustrous pure mulberry silk.",
    description: "The queen of South Indian handlooms, celebrated for bold contrast Korvai temple borders, heavy lustrous mulberry silk, and rich zari pallus. Woven by master artisans in Kanchipuram for unmatched durability and majesty.",
    fabric: "Pure Mulberry Silk with Traditional Zari",
    details: [
      "Collection: Kanjeevaram Royal Silk",
      "Speciality: Traditional Korvai Temple Borders & Heavy Pallu",
      "Occasion: Bridal Wear, Traditional Ceremonies & Temple Festivities",
      "Craftsmanship: Handwoven Kanchipuram Heritage",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "kanjeevaram-2gm-gold": {
    shortDescription: "Lustrous temple silks handwoven with authentic 2-gram gold zari.",
    description: "An exclusive showcase of royal Kanjeevaram sarees handwoven with genuine 2-gram gold dipped zari threads. Designed for grand bridal receptions and connoisseurs seeking pure luxury and timeless heirloom value.",
    fabric: "Pure Katan Silk with 2-Gram Gold Dipped Zari",
    details: [
      "Collection: 2 Gram Gold Edition",
      "Speciality: Authentic 2-Gram Gold Dipped Zari Weaving",
      "Occasion: Grand Weddings, Royal Receptions & Couture Events",
      "Craftsmanship: Master Artisan Certified Gold Weave",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "kanjeevaram-pure-silver": {
    shortDescription: "Handwoven Kanjeevarams featuring genuine pure silver zari motifs.",
    description: "A magnificent fusion of traditional Kanjeevaram weaving with pure tested silver zari motifs. Known for its sophisticated metallic luster, intricate zari brocade, and dignified drape.",
    fabric: "Pure Mulberry Silk with Pure Silver Zari",
    details: [
      "Collection: Pure Silver Edition",
      "Speciality: Tested Pure Silver Zari Brocade & Motifs",
      "Occasion: Elite Gatherings, Evening Receptions & Weddings",
      "Craftsmanship: Handwoven Silver Zari Heritage",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "pochampally": {
    shortDescription: "Intricate geometric double-ikkat patterns with feather-light drape.",
    description: "Famous for mesmerizing geometric double-ikkat patterns where yarn is resist-dyed before weaving. Woven in Bhoodan Pochampally, these sarees offer a distinct visual rhythm and feather-light drape.",
    fabric: "Pure Ikkat Silk",
    details: [
      "Collection: Pochampally Ikkat",
      "Speciality: Intricate Geometric Resist-Dyed Double Ikkat",
      "Occasion: Cultural Events, Festive Gatherings & Premium Daywear",
      "Craftsmanship: Handwoven Telangana Ikkat Artistry",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "bandhani": {
    shortDescription: "Intricate artisanal tie-and-dye patterns on flowing luxury silk.",
    description: "Crafted using the ancient tie-and-dye technique of Gujarat and Rajasthan, featuring thousands of intricate hand-tied knots that create delicate geometric and floral patterns on flowing silk.",
    fabric: "Pure Modal / Gajji Silk",
    details: [
      "Collection: Royal Bandhani",
      "Speciality: Intricate Hand-Tied Resist Dyeing (Khatri Craft)",
      "Occasion: Traditional Festivities, Mehendi & Celebrations",
      "Craftsmanship: Authentic Artisanal Tie & Dye Heritage",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "leheriya": {
    shortDescription: "Distinctive diagonal wave patterns with dynamic flow and lightness.",
    description: "Distinctive diagonal wave patterns created through traditional Rajasthani resist-dyeing techniques. Celebrated for dynamic visual flow, feather-light weight, and graceful movement.",
    fabric: "Pure Chiffon / Georgette Silk",
    details: [
      "Collection: Rajasthani Leheriya",
      "Speciality: Traditional Diagonal Wave Resist Dyeing",
      "Occasion: Festive Celebrations, Day Events & Cultural Gatherings",
      "Craftsmanship: Hand-Dyed Jaipur Craftsmanship",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "paithani": {
    shortDescription: "Tapestry-woven peacock and lotus zari pallus from Maharashtra.",
    description: "A pride of Maharashtra, characterized by oblique square borders and majestic peacock or lotus motif pallus woven in pure gold zari. Crafted with tapestry weaving techniques without reverse float threads.",
    fabric: "Pure Paithani Silk with Gold Zari",
    details: [
      "Collection: Royal Paithani",
      "Speciality: Tapestry Weaved Peacock & Lotus Zari Pallu",
      "Occasion: Maharashtrian Weddings, Festive Ceremonies & Grand Occasions",
      "Craftsmanship: Authentic Yeola & Paithan Handloom",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "gadwal": {
    shortDescription: "Lightweight cotton body with contrasting rich pure silk zari borders.",
    description: "Renowned for their unique Kuttu technique combining a breathable cotton body with rich contrasting pure silk zari borders and pallu. Offers supreme comfort without compromising on ceremonial grandeur.",
    fabric: "Silk-Cotton (Sico) with Pure Silk Borders",
    details: [
      "Collection: Gadwal Heritage",
      "Speciality: Interlocked Kuttu Technique (Cotton Body with Silk Border)",
      "Occasion: Religious Ceremonies, Traditional Weddings & Festivals",
      "Craftsmanship: Handwoven Gadwal Artistry",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "chanderi": {
    shortDescription: "Sheer woven air texture adorned with delicate traditional buttis.",
    description: "Known for their sheer texture, lightweight luxury, and glossy transparency known as 'woven air'. Adorned with delicate zari motifs like swans, gold coins, and florals inspired by nature.",
    fabric: "Pure Chanderi Silk Cotton / Katan Silk",
    details: [
      "Collection: Chanderi Woven Air",
      "Speciality: Sheer Texture & Delicate Zari Buttis",
      "Occasion: Elegant Day Gatherings, Summer Festivities & Soirees",
      "Craftsmanship: Traditional Madhya Pradesh Handloom",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "maheshwari": {
    shortDescription: "Distinctive reversible Bugdi borders and elegant zari stripe pallus.",
    description: "Originating from the royal town of Maheshwar, featuring distinctive reversible borders (Bugdi), sophisticated stripes or checks, and a unique pallu with five elegant bands.",
    fabric: "Pure Maheshwari Silk Cotton",
    details: [
      "Collection: Maheshwari Royal Weave",
      "Speciality: Distinctive Reversible Bugdi Borders & Zari Pallu",
      "Occasion: Sophisticated Workwear, Cultural Events & Festive Wear",
      "Craftsmanship: Handwoven Maheshwar Heritage",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "muga-silk": {
    shortDescription: "Rare natural golden glow Assam silk with legendary durability.",
    description: "Woven from rare wild Assam silk known for its natural extreme luster and durability that actually increases after every wash. A symbol of royalty and pride of Assamese heritage.",
    fabric: "Pure Assam Muga Silk",
    details: [
      "Collection: Assam Muga Silk",
      "Speciality: Rare Natural Golden Glow & High Durability",
      "Occasion: Traditional Assamese Weddings & Prestige Gatherings",
      "Craftsmanship: Authentic Assam Handloom",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "dharmavaram": {
    shortDescription: "Broad solid brocade borders and elaborate heavy zari weaves.",
    description: "Famed for broad solid borders and elaborate brocade patterns woven in heavy mulberry silk. Features striking contrast pallus and intricate temple designs inspired by South Indian architecture.",
    fabric: "Heavy Mulberry Silk with Zari Brocade",
    details: [
      "Collection: Dharmavaram Silk",
      "Speciality: Broad Contrast Brocade Borders & Heavy Zari Weaving",
      "Occasion: Bridal Ceremonies, Weddings & Temple Festivals",
      "Craftsmanship: Handwoven Andhra Pradesh Heritage",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "georgette": {
    shortDescription: "Sheer fluid crepe texture with effortless drape and bounce.",
    description: "Crafted from highly twisted yarns creating a sheer, lightweight crepe texture with exquisite fluidity and bounce. Perfect for contemporary silhouettes and effortless draping.",
    fabric: "Pure Khaddi Georgette Silk",
    details: [
      "Collection: Pure Georgette",
      "Speciality: Sheer Fluid Crepe Texture & Effortless Drape",
      "Occasion: Cocktail Parties, Reception Evenings & Festive Celebrations",
      "Craftsmanship: Handwoven Khaddi Artistry",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  },
  "chiffon": {
    shortDescription: "Feather-light softness with graceful fluidity and sheer elegance.",
    description: "Celebrated for feather-light softness, sheer elegance, and graceful fluidity. Adorned with subtle zari work or fine borders, offering unmatched comfort and modern sophistication.",
    fabric: "Pure Khaddi Chiffon Silk",
    details: [
      "Collection: Pure Chiffon",
      "Speciality: Feather-Light Softness & Graceful Fluid Drape",
      "Occasion: Evening Soirees, Summer Weddings & Contemporary Wear",
      "Craftsmanship: Handwoven Artisan Silk",
      "Care: Dry clean only. Store in muslin cloth."
    ]
  }
};

// Update categories
categories.forEach(cat => {
  const spec = categorySpecialities[cat.id];
  if (spec) {
    cat.description = spec.description;
    cat.shortDescription = spec.shortDescription;
  } else {
    console.warn(`Warning: No speciality mapping found for category id: ${cat.id}`);
  }
});

// Update products
products.forEach(prod => {
  const spec = categorySpecialities[prod.categoryId];
  if (spec) {
    prod.description = spec.description;
    prod.fabric = spec.fabric;
    prod.details = spec.details;
  } else {
    console.warn(`Warning: No speciality mapping found for product id: ${prod.id} with categoryId: ${prod.categoryId}`);
  }
});

fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2), 'utf8');
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');

console.log('Successfully standardized all category and product descriptions across categories.json and products.json.');
