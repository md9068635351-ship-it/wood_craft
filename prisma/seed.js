const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // --- Admin user ---
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@woodcraft.in";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "changeme123";

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Shop Owner",
      },
    });
    console.log(`✓ Admin created: ${adminEmail} / ${adminPassword}`);
    console.log("  IMPORTANT: Change this password after first login.");
  } else {
    console.log(`✓ Admin already exists: ${adminEmail}`);
  }

  // --- Starter categories ---
  const categoryData = [
    { name: "Kitchenware", slug: "kitchenware", woodType: "Sheesham & Mango Wood" },
    { name: "Home Decor", slug: "home-decor", woodType: "Teak & Sheesham" },
    { name: "Furniture", slug: "furniture", woodType: "Sheesham Wood" },
    { name: "Gifts & Personalised", slug: "gifts", woodType: "Mixed Wood" },
    { name: "Wall Art", slug: "wall-art", woodType: "Teak Wood" },
  ];

  for (const cat of categoryData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`✓ Seeded ${categoryData.length} categories`);

  const starterProducts = [
    ["Hand-Carved Sheesham Fruit Bowl", "hand-carved-sheesham-fruit-bowl", "A generously sized fruit bowl carved from a single block of sheesham wood.", 1299, "Sheesham", 8, "kitchenware", "photo-1605883705077-8d3d3cebe78c"],
    ["Geometric Wall Shelf Set", "geometric-wall-shelf-set", "Minimal honeycomb floating shelves for plants, books, and display pieces.", 1899, "Teak", 15, "wall-art", "photo-1594620302200-9a762244a156"],
    ["Engraved Name Keychain", "engraved-name-keychain", "A sturdy wooden keychain engraved with a name, initials, or message.", 249, "Mango Wood", 50, "gifts", "photo-1602810318383-e386cc2a3ccf"],
    ["Sheesham Wood Coffee Table", "sheesham-wood-coffee-table", "A solid coffee table with hand-finished edges and a warm honey stain.", 8999, "Sheesham", 3, "furniture", "photo-1611486212557-88be5ff6f941"],
    ["Wooden Chopping Board", "wooden-chopping-board-handle", "A thick food-safe chopping board with a comfortable carved handle.", 699, "Mango Wood", 22, "kitchenware", "photo-1594385208974-2e75f8d7bb48"],
    ["Carved Elephant Decor Pair", "carved-elephant-decor-pair", "A symbolic pair of hand-carved elephants with a smooth honey finish.", 1599, "Sheesham", 12, "home-decor", "photo-1599809275671-b5942cabc7a2"],
  ];
  for (const [name, slug, description, price, woodType, stock, categorySlug, imageId] of starterProducts) {
    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    await prisma.product.upsert({ where: { slug }, update: {}, create: {
      name, slug, description, price, woodType, stock, categoryId: category.id, isFeatured: true,
      images: { create: [{ url: `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=1200&q=80`, altText: name }] },
    } });
  }
  console.log(`Seeded ${starterProducts.length} starter products`);

  console.log("\nDone! Run `npm run dev` and log in at /admin/login");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
