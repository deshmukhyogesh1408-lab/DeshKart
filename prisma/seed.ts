import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
      description: "Latest gadgets, smartphones, laptops & accessories",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
    },
  });

  const fashion = await prisma.category.create({
    data: {
      name: "Fashion",
      slug: "fashion",
      description: "Trending clothing, shoes & accessories",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
    },
  });

  const homeLiving = await prisma.category.create({
    data: {
      name: "Home & Living",
      slug: "home-living",
      description: "Furniture, decor & essentials",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    },
  });

  const sports = await prisma.category.create({
    data: {
      name: "Sports & Outdoors",
      slug: "sports-outdoors",
      description: "Equipment & gear for every adventure",
      image: "https://images.unsplash.com/photo-1461896836934-bd45ba7b5e93?w=600&h=400&fit=crop",
    },
  });

  const books = await prisma.category.create({
    data: {
      name: "Books",
      slug: "books",
      description: "Bestsellers, textbooks & digital reads",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop",
    },
  });

  const beauty = await prisma.category.create({
    data: {
      name: "Beauty & Health",
      slug: "beauty-health",
      description: "Skincare, makeup & wellness",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
    },
  });

  // Create sample products
  await prisma.product.createMany({
    data: [
      {
        name: "ProMax Ultra Smartphone",
        slug: "promax-ultra-smartphone",
        description: "6.7\" AMOLED display, 200MP camera, 5000mAh battery",
        price: 999.99,
        originalPrice: 1199.99,
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
        brand: "ProMax",
        rating: 4.8,
        reviewCount: 2341,
        stock: 45,
        colors: [{ name: "Midnight Black", hex: "#1a1a2e" }, { name: "Silver", hex: "#c0c0c0" }],
        features: ["6.7\" AMOLED 120Hz", "200MP Camera", "5000mAh Battery"],
        isFeatured: true,
        isNew: true,
        categoryId: electronics.id,
      },
      {
        name: "AirWave Pro Headphones",
        slug: "airwave-pro-headphones",
        description: "Studio-quality audio with adaptive noise cancellation",
        price: 349.99,
        originalPrice: 449.99,
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"],
        brand: "AirWave",
        rating: 4.7,
        reviewCount: 1832,
        stock: 120,
        colors: [{ name: "Black", hex: "#2d2d2d" }, { name: "White", hex: "#f5f5f5" }],
        features: ["ANC", "40-Hour Battery", "Hi-Res Audio"],
        isFeatured: true,
        categoryId: electronics.id,
      },
      {
        name: "Classic Leather Jacket",
        slug: "classic-leather-jacket",
        description: "Premium full-grain leather with satin lining",
        price: 299.99,
        originalPrice: 399.99,
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop"],
        brand: "UrbanEdge",
        rating: 4.6,
        reviewCount: 892,
        stock: 40,
        sizes: ["S", "M", "L", "XL"],
        colors: [{ name: "Black", hex: "#1a1a1a" }, { name: "Brown", hex: "#8b4513" }],
        features: ["Full-Grain Leather", "Satin Lined"],
        isFeatured: true,
        categoryId: fashion.id,
      },
      {
        name: "Premium Running Shoes",
        slug: "premium-running-shoes",
        description: "Responsive foam cushioning with breathable knit upper",
        price: 179.99,
        originalPrice: 219.99,
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"],
        brand: "RunFlex",
        rating: 4.7,
        reviewCount: 2156,
        stock: 150,
        sizes: ["7", "8", "9", "10", "11"],
        colors: [{ name: "Black", hex: "#0d0d0d" }, { name: "Red", hex: "#e63946" }],
        features: ["Responsive Foam", "Breathable Knit"],
        isNew: true,
        categoryId: fashion.id,
      },
      {
        name: "Ergonomic Office Chair",
        slug: "ergonomic-office-chair",
        description: "Adjustable lumbar support, 4D armrests, mesh back",
        price: 599.99,
        originalPrice: 799.99,
        images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=600&fit=crop"],
        brand: "ErgoMax",
        rating: 4.7,
        reviewCount: 1023,
        stock: 25,
        features: ["Lumbar Support", "4D Armrests", "300 lb Capacity"],
        isFeatured: true,
        categoryId: homeLiving.id,
      },
    ],
  });

  // Create users
  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@example.com",
        password: "$2a$10$placeholder_hash_for_password123",
        role: "CUSTOMER",
      },
      {
        name: "Admin User",
        email: "admin@shopnex.com",
        password: "$2a$10$placeholder_hash_for_admin123",
        role: "ADMIN",
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
