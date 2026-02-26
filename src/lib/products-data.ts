import type { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets, smartphones, laptops & accessories",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
    productCount: 8,
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    description: "Trending clothing, shoes & accessories for everyone",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
    productCount: 6,
  },
  {
    id: "3",
    name: "Home & Living",
    slug: "home-living",
    description: "Furniture, decor & essentials for your space",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    productCount: 5,
  },
  {
    id: "4",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    description: "Equipment & gear for every adventure",
    image: "https://images.unsplash.com/photo-1461896836934-bd45ba7b5e93?w=600&h=400&fit=crop",
    productCount: 4,
  },
  {
    id: "5",
    name: "Books",
    slug: "books",
    description: "Bestsellers, textbooks & digital reads",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop",
    productCount: 5,
  },
  {
    id: "6",
    name: "Beauty & Health",
    slug: "beauty-health",
    description: "Skincare, makeup & wellness products",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
    productCount: 4,
  },
];

export const products: Product[] = [
  // ── Electronics ──
  {
    id: "prod-001",
    name: "ProMax Ultra Smartphone",
    slug: "promax-ultra-smartphone",
    description:
      "Experience the future with the ProMax Ultra. Featuring a 6.7\" AMOLED display, 200MP camera system, 5000mAh battery, and the latest Snapdragon processor. Water-resistant and built with aerospace-grade titanium.",
    price: 999.99,
    originalPrice: 1199.99,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop",
    ],
    category: "electronics",
    brand: "ProMax",
    rating: 4.8,
    reviewCount: 2341,
    stock: 45,
    colors: [
      { name: "Midnight Black", hex: "#1a1a2e" },
      { name: "Silver Frost", hex: "#c0c0c0" },
      { name: "Ocean Blue", hex: "#0077b6" },
    ],
    features: [
      "6.7\" AMOLED 120Hz Display",
      "200MP Triple Camera System",
      "5000mAh Fast Charging",
      "IP68 Water Resistant",
      "256GB Storage",
    ],
    isFeatured: true,
    isNew: true,
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "prod-002",
    name: "AirWave Pro Headphones",
    slug: "airwave-pro-headphones",
    description:
      "Immerse yourself in pure sound. AirWave Pro delivers studio-quality audio with adaptive noise cancellation, 40-hour battery life, and ultra-comfortable memory foam cushions. Perfect for music lovers and professionals.",
    price: 349.99,
    originalPrice: 449.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
    ],
    category: "electronics",
    brand: "AirWave",
    rating: 4.7,
    reviewCount: 1832,
    stock: 120,
    colors: [
      { name: "Matte Black", hex: "#2d2d2d" },
      { name: "Pearl White", hex: "#f5f5f5" },
      { name: "Rose Gold", hex: "#b76e79" },
    ],
    features: [
      "Adaptive Noise Cancellation",
      "40-Hour Battery Life",
      "Hi-Res Audio Certified",
      "Memory Foam Cushions",
      "Multi-Device Pairing",
    ],
    isFeatured: true,
    createdAt: "2026-01-20T10:00:00Z",
  },
  {
    id: "prod-003",
    name: 'UltraBook Pro 16" Laptop',
    slug: "ultrabook-pro-16-laptop",
    description:
      'Powerhouse performance in a sleek design. The UltraBook Pro features a stunning 16" Retina display, M3 Pro chip, 32GB unified memory, and all-day battery life. Built for creators and developers.',
    price: 2499.99,
    originalPrice: 2799.99,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=600&fit=crop",
    ],
    category: "electronics",
    brand: "UltraBook",
    rating: 4.9,
    reviewCount: 987,
    stock: 20,
    colors: [
      { name: "Space Gray", hex: "#4a4a4a" },
      { name: "Silver", hex: "#d4d4d4" },
    ],
    features: [
      '16" Retina XDR Display',
      "M3 Pro Chip",
      "32GB Unified Memory",
      "1TB SSD Storage",
      "22-Hour Battery Life",
    ],
    isFeatured: true,
    isNew: true,
    createdAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "prod-004",
    name: "SmartWatch Elite",
    slug: "smartwatch-elite",
    description:
      "Your personal health companion. Track fitness, monitor heart rate, blood oxygen, and sleep patterns. With GPS, NFC payments, and a brilliant always-on display.",
    price: 399.99,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop",
    ],
    category: "electronics",
    brand: "SmartTech",
    rating: 4.5,
    reviewCount: 1456,
    stock: 85,
    colors: [
      { name: "Graphite", hex: "#383838" },
      { name: "Gold", hex: "#d4a373" },
      { name: "Blue Aluminum", hex: "#457b9d" },
    ],
    features: [
      "Always-On OLED Display",
      "Heart Rate & SpO2 Monitor",
      "Built-in GPS",
      "NFC Payments",
      "5 ATM Water Resistance",
    ],
    isFeatured: true,
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "prod-005",
    name: "Wireless Charging Pad",
    slug: "wireless-charging-pad",
    description:
      "Fast wireless charging for all your devices. Supports up to 15W fast charge with intelligent temperature control and foreign object detection.",
    price: 49.99,
    originalPrice: 69.99,
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
    ],
    category: "electronics",
    brand: "ChargeTech",
    rating: 4.3,
    reviewCount: 678,
    stock: 300,
    features: [
      "15W Fast Charging",
      "Qi Compatible",
      "LED Indicator",
      "Anti-Slip Surface",
      "Over-Charge Protection",
    ],
    createdAt: "2025-12-15T10:00:00Z",
  },

  // ── Fashion ──
  {
    id: "prod-006",
    name: "Classic Leather Jacket",
    slug: "classic-leather-jacket",
    description:
      "Timeless style meets modern craftsmanship. Made from premium full-grain leather with a satin lining. Features zippered pockets and adjustable waist tabs for the perfect fit.",
    price: 299.99,
    originalPrice: 399.99,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop",
    ],
    category: "fashion",
    brand: "UrbanEdge",
    rating: 4.6,
    reviewCount: 892,
    stock: 40,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Brown", hex: "#8b4513" },
      { name: "Tan", hex: "#d2b48c" },
    ],
    features: [
      "Full-Grain Leather",
      "Satin Lined Interior",
      "YKK Zippers",
      "Adjustable Waist Tabs",
      "Inside Pockets",
    ],
    isFeatured: true,
    createdAt: "2026-01-25T10:00:00Z",
  },
  {
    id: "prod-007",
    name: "Premium Running Shoes",
    slug: "premium-running-shoes",
    description:
      "Engineered for performance. Featuring responsive foam cushioning, breathable knit upper, and a durable rubber outsole. Designed for both road running and cross-training.",
    price: 179.99,
    originalPrice: 219.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
    ],
    category: "fashion",
    brand: "RunFlex",
    rating: 4.7,
    reviewCount: 2156,
    stock: 150,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Core Black", hex: "#0d0d0d" },
      { name: "Cloud White", hex: "#f0f0f0" },
      { name: "Solar Red", hex: "#e63946" },
    ],
    features: [
      "Responsive Foam Cushioning",
      "Breathable Knit Upper",
      "Rubber Outsole",
      "Reflective Details",
      "Lightweight Design",
    ],
    isFeatured: true,
    isNew: true,
    createdAt: "2026-02-10T10:00:00Z",
  },
  {
    id: "prod-008",
    name: "Designer Sunglasses",
    slug: "designer-sunglasses",
    description:
      "Protect your eyes in style. Polarized lenses with 100% UV protection, lightweight titanium frame, and scratch-resistant coating. Comes with a premium leather case.",
    price: 189.99,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    ],
    category: "fashion",
    brand: "VisionCraft",
    rating: 4.4,
    reviewCount: 567,
    stock: 75,
    colors: [
      { name: "Classic Black", hex: "#000000" },
      { name: "Tortoise", hex: "#8b6914" },
      { name: "Navy Blue", hex: "#003153" },
    ],
    features: [
      "Polarized Lenses",
      "100% UV Protection",
      "Titanium Frame",
      "Scratch Resistant",
      "Premium Leather Case",
    ],
    createdAt: "2026-01-05T10:00:00Z",
  },
  {
    id: "prod-009",
    name: "Cashmere Blend Sweater",
    slug: "cashmere-blend-sweater",
    description:
      "Luxurious comfort for everyday wear. This premium cashmere-wool blend sweater features a relaxed fit, ribbed cuffs, and a classic crew neck. Incredibly soft and warm.",
    price: 149.99,
    originalPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cda3a38?w=600&h=600&fit=crop",
    ],
    category: "fashion",
    brand: "CashmereHouse",
    rating: 4.8,
    reviewCount: 423,
    stock: 60,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Heather Gray", hex: "#b0b0b0" },
      { name: "Navy", hex: "#000080" },
      { name: "Cream", hex: "#fffdd0" },
      { name: "Burgundy", hex: "#800020" },
    ],
    features: [
      "70% Cashmere, 30% Wool",
      "Relaxed Fit",
      "Ribbed Cuffs & Hem",
      "Machine Washable",
      "Pill Resistant",
    ],
    createdAt: "2025-11-20T10:00:00Z",
  },

  // ── Home & Living ──
  {
    id: "prod-010",
    name: "Minimalist Desk Lamp",
    slug: "minimalist-desk-lamp",
    description:
      "Illuminate your workspace with elegance. Adjustable LED desk lamp with 5 brightness levels, 3 color temperatures, and a built-in USB charging port. Touch-sensitive controls.",
    price: 89.99,
    originalPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=600&fit=crop",
    ],
    category: "home-living",
    brand: "LumiDesign",
    rating: 4.6,
    reviewCount: 334,
    stock: 90,
    colors: [
      { name: "Matte White", hex: "#f5f5f5" },
      { name: "Matte Black", hex: "#2d2d2d" },
    ],
    features: [
      "5 Brightness Levels",
      "3 Color Temperatures",
      "USB Charging Port",
      "Touch Controls",
      "Memory Function",
    ],
    createdAt: "2026-01-18T10:00:00Z",
  },
  {
    id: "prod-011",
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    description:
      "Work comfortably all day. This ergonomic mesh chair features adjustable lumbar support, 4D armrests, breathable mesh back, and a tilting mechanism. Supports up to 300 lbs.",
    price: 599.99,
    originalPrice: 799.99,
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=600&fit=crop",
    ],
    category: "home-living",
    brand: "ErgoMax",
    rating: 4.7,
    reviewCount: 1023,
    stock: 25,
    colors: [
      { name: "Classic Black", hex: "#1a1a1a" },
      { name: "Gray", hex: "#808080" },
    ],
    features: [
      "Adjustable Lumbar Support",
      "4D Armrests",
      "Breathable Mesh Back",
      "Tilt Lock Mechanism",
      "300 lb Capacity",
    ],
    isFeatured: true,
    createdAt: "2026-02-05T10:00:00Z",
  },
  {
    id: "prod-012",
    name: "Scented Candle Collection",
    slug: "scented-candle-collection",
    description:
      "Transform your home atmosphere. Set of 4 hand-poured soy wax candles featuring lavender, vanilla, sandalwood, and ocean breeze scents. Each candle burns for 45+ hours.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=600&fit=crop",
    ],
    category: "home-living",
    brand: "AromaBliss",
    rating: 4.5,
    reviewCount: 789,
    stock: 200,
    features: [
      "100% Soy Wax",
      "4 Unique Scents",
      "45+ Hour Burn Time Each",
      "Cotton Wick",
      "Reusable Glass Jars",
    ],
    createdAt: "2025-12-20T10:00:00Z",
  },

  // ── Sports & Outdoors ──
  {
    id: "prod-013",
    name: "Carbon Fiber Water Bottle",
    slug: "carbon-fiber-water-bottle",
    description:
      "Stay hydrated anywhere. Premium insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. Made with food-grade stainless steel and a leak-proof cap.",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
    ],
    category: "sports-outdoors",
    brand: "HydroElite",
    rating: 4.6,
    reviewCount: 1567,
    stock: 350,
    colors: [
      { name: "Arctic White", hex: "#ffffff" },
      { name: "Midnight", hex: "#191970" },
      { name: "Forest Green", hex: "#228b22" },
    ],
    features: [
      "24H Cold / 12H Hot",
      "Food-Grade Stainless Steel",
      "Leak-Proof Cap",
      "BPA Free",
      "750ml Capacity",
    ],
    createdAt: "2026-01-12T10:00:00Z",
  },
  {
    id: "prod-014",
    name: "Yoga Mat Premium",
    slug: "yoga-mat-premium",
    description:
      "Elevate your practice. Extra-thick 6mm natural rubber yoga mat with alignment guides. Non-slip on both sides, eco-friendly materials, and includes a carrying strap.",
    price: 79.99,
    originalPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop",
    ],
    category: "sports-outdoors",
    brand: "ZenFlow",
    rating: 4.8,
    reviewCount: 432,
    stock: 110,
    colors: [
      { name: "Sage Green", hex: "#9dc183" },
      { name: "Dusty Rose", hex: "#dcae96" },
      { name: "Charcoal", hex: "#36454f" },
    ],
    features: [
      "6mm Thick Natural Rubber",
      "Alignment Guides",
      "Double-Sided Non-Slip",
      "Eco-Friendly Materials",
      "Carrying Strap Included",
    ],
    isNew: true,
    createdAt: "2026-02-15T10:00:00Z",
  },

  // ── Books ──
  {
    id: "prod-015",
    name: "The Art of Clean Code",
    slug: "the-art-of-clean-code",
    description:
      "Master the craft of writing elegant, maintainable code. This comprehensive guide covers design patterns, refactoring techniques, and best practices used by top tech companies.",
    price: 44.99,
    originalPrice: 59.99,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop",
    ],
    category: "books",
    brand: "TechPress",
    rating: 4.9,
    reviewCount: 2678,
    stock: 500,
    features: [
      "450+ Pages",
      "Real-World Examples",
      "Exercise Problems",
      "Digital Version Included",
      "Updated for 2026",
    ],
    isFeatured: true,
    createdAt: "2026-01-01T10:00:00Z",
  },
  {
    id: "prod-016",
    name: "Mindful Leadership",
    slug: "mindful-leadership",
    description:
      "Discover how mindfulness transforms leadership. Learn proven strategies from Fortune 500 executives who use meditation and emotional intelligence to drive innovation.",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=600&fit=crop",
    ],
    category: "books",
    brand: "InsightBooks",
    rating: 4.4,
    reviewCount: 891,
    stock: 300,
    features: [
      "320 Pages",
      "Case Studies",
      "Actionable Exercises",
      "Audio Version Available",
    ],
    createdAt: "2025-11-15T10:00:00Z",
  },

  // ── Beauty & Health ──
  {
    id: "prod-017",
    name: "Vitamin C Glow Serum",
    slug: "vitamin-c-glow-serum",
    description:
      "Reveal radiant skin. This potent 20% Vitamin C serum with hyaluronic acid and vitamin E brightens, firms, and protects your skin. Dermatologist tested and cruelty-free.",
    price: 34.99,
    originalPrice: 49.99,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    ],
    category: "beauty-health",
    brand: "GlowLab",
    rating: 4.7,
    reviewCount: 3456,
    stock: 250,
    features: [
      "20% Vitamin C",
      "Hyaluronic Acid",
      "Vitamin E & Ferulic Acid",
      "Dermatologist Tested",
      "Cruelty-Free & Vegan",
    ],
    isFeatured: true,
    isNew: true,
    createdAt: "2026-02-20T10:00:00Z",
  },
  {
    id: "prod-018",
    name: "Essential Oil Diffuser",
    slug: "essential-oil-diffuser",
    description:
      "Create a spa-like atmosphere at home. This elegant wood-grain diffuser features 7 LED color modes, whisper-quiet operation, and auto shut-off. Covers up to 300 sq ft.",
    price: 44.99,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
    ],
    category: "beauty-health",
    brand: "AromaZen",
    rating: 4.5,
    reviewCount: 1234,
    stock: 180,
    features: [
      "300ml Capacity",
      "7 LED Color Modes",
      "Whisper Quiet",
      "Auto Shut-Off",
      "Up to 10 Hours Runtime",
    ],
    createdAt: "2025-12-10T10:00:00Z",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function searchProducts(query: string): Product[] {
  const lower = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower) ||
      p.brand.toLowerCase().includes(lower)
  );
}

export function filterAndSortProducts(
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: string;
  }
): Product[] {
  let result = [...products];

  if (filters.search) {
    result = searchProducts(filters.search);
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // featured first
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return result;
}
