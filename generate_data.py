import json

categories = [
    {"id": "banarasi", "name": "Banarasi Sarees", "fabric": "Pure Mulberry Silk"},
    {"id": "kanjeevaram", "name": "Kanjeevaram Sarees", "fabric": "Pure Mulberry Silk"},
    {"id": "pochampally", "name": "Pochampally Ikkat", "fabric": "Pure Silk Ikkat"},
    {"id": "bandhani", "name": "Bandhani Sarees", "fabric": "Georgette / Silk"},
    {"id": "leheriya", "name": "Leheriya Sarees", "fabric": "Lightweight Chiffon"},
    {"id": "paithani", "name": "Paithani Sarees", "fabric": "Pure Silk with Gold Zari"},
    {"id": "chanderi", "name": "Chanderi Sarees", "fabric": "Silk Cotton Blend"},
    {"id": "maheshwari", "name": "Maheshwari Sarees", "fabric": "Cotton Silk"},
    {"id": "muga-silk", "name": "Muga Silk Sarees", "fabric": "Pure Muga Silk"},
    {"id": "dharmavaram", "name": "Dharmavaram Sarees", "fabric": "Heavy Silk"},
    {"id": "georgette", "name": "Georgette Sarees", "fabric": "Pure Georgette"}
]

adjectives = ["Royal", "Classic", "Vibrant", "Elegant"]
colors = ["Crimson Red", "Emerald Green", "Midnight Blue", "Golden Tissue"]

products = []

for cat in categories:
    for i in range(4):
        # We only have 1 real design per category (images 1.png, 2.png, 3.png)
        # So we'll map all products to these images to ensure the 3-image gallery works.
        name = f"{adjectives[i]} {colors[i]} {cat['name'].split()[0]}"
        slug = name.lower().replace(" ", "-")
        product = {
            "id": f"{cat['id']}-{i+1}",
            "categoryId": cat["id"],
            "name": name,
            "slug": slug,
            "fabric": cat["fabric"],
            "description": f"A breathtaking {name.lower()} adorned with intricate weaving. Handwoven by master artisans, this heirloom piece showcases centuries-old techniques.",
            "details": [
                f"Saree Type: {cat['name']}",
                "Occasion: Wedding, Festive, Reception",
                f"Colour: {colors[i]}",
                "Length: 5.5 meters (with blouse piece)"
            ],
            "images": [
                f"/images/categories/{cat['id']}/1.png",
                f"/images/categories/{cat['id']}/2.png",
                f"/images/categories/{cat['id']}/3.png"
            ]
        }
        products.append(product)

with open("src/data/products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2)

print("Created src/data/products.json")
