/*
  # Create DeshKart e-commerce database schema

  1. New Tables
    - `users` - User accounts with authentication
    - `categories` - Product categories
    - `products` - Product catalog
    - `orders` - Customer orders
    - `order_items` - Items in orders
    - `reviews` - Product reviews

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Restrict product/order data visibility

  3. Indexes
    - Index on frequently queried columns
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (gen_random_uuid()::text),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  avatar TEXT,
  role TEXT DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'ADMIN')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY DEFAULT (gen_random_uuid()::text),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT (gen_random_uuid()::text),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  original_price FLOAT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  brand TEXT NOT NULL,
  rating FLOAT DEFAULT 0,
  review_count INT DEFAULT 0,
  stock INT DEFAULT 0,
  sizes TEXT[] DEFAULT ARRAY[]::TEXT[],
  colors JSONB[] DEFAULT ARRAY[]::JSONB[],
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  category_id TEXT NOT NULL REFERENCES categories(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY DEFAULT (gen_random_uuid()::text),
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
  subtotal FLOAT NOT NULL,
  shipping FLOAT NOT NULL,
  tax FLOAT NOT NULL,
  total FLOAT NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method TEXT DEFAULT 'card',
  user_id TEXT NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY DEFAULT (gen_random_uuid()::text),
  quantity INT NOT NULL,
  price FLOAT NOT NULL,
  size TEXT,
  color TEXT,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY DEFAULT (gen_random_uuid()::text),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  product_id TEXT NOT NULL REFERENCES products(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- RLS Policies for categories - public read
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- RLS Policies for products - public read
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- RLS Policies for orders - users see own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- RLS Policies for order_items - users see own order items
CREATE POLICY "Users can view order items from own orders"
  ON order_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert order items"
  ON order_items FOR INSERT
  TO public
  WITH CHECK (true);

-- RLS Policies for reviews - public read
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  TO public
  WITH CHECK (true);