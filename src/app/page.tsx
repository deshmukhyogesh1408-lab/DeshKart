"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import ProductGrid from "@/components/products/product-grid";
import { categories, getFeaturedProducts, getNewProducts } from "@/lib/products-data";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
        <div className="container-custom py-12 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                New Arrivals 2026
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
                Discover
                <span className="text-primary"> Premium</span>
                <br />
                Products Online
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Shop the latest trends in electronics, fashion, home decor and
                more. Enjoy free shipping on orders over $100 with our premium
                selection.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/25"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/products?sort=newest"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition-all"
                >
                  New Arrivals
                  <TrendingUp className="w-5 h-5" />
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-border">
                <div>
                  <p className="text-3xl font-bold text-foreground">10K+</p>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">50K+</p>
                  <p className="text-sm text-muted-foreground">
                    Happy Customers
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                    Average Rating
                  </p>
                </div>
              </div>
            </div>

            {/* Hero image collage */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop"
                      alt="Shopping"
                      width={400}
                      height={500}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop"
                      alt="Fashion"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop"
                      alt="Electronics"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=500&fit=crop"
                      alt="Shopping bags"
                      width={400}
                      height={500}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -left-6 bottom-16 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-fade-in border border-border">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    On orders over $100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="border-y border-border bg-muted/50">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                desc: "On orders over $100",
              },
              {
                icon: Shield,
                title: "Secure Payment",
                desc: "100% protected",
              },
              {
                icon: RotateCcw,
                title: "Easy Returns",
                desc: "30-day return policy",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Dedicated help center",
              },
            ].map((badge) => (
              <div
                key={badge.title}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {badge.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="container-custom py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Shop by Category
            </h2>
            <p className="text-muted-foreground mt-1">
              Browse our curated collections
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm">
                  {category.name}
                </h3>
                <p className="text-white/70 text-xs mt-0.5">
                  {category.productCount} products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="bg-muted/30 py-16">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-sm font-medium px-3 py-1 rounded-full mb-3">
                <Star className="w-3.5 h-3.5 fill-current" />
                Featured
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                Top Picks for You
              </h2>
              <p className="text-muted-foreground mt-1">
                Hand-picked products our customers love
              </p>
            </div>
            <Link
              href="/products?sort=rating"
              className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              See All Featured
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section className="container-custom py-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-primary-hover">
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>
          <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 lg:p-16">
            <div>
              <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-4">
                Up to 40% Off
                <br />
                Electronics Sale
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Upgrade your tech game with our biggest sale of the season.
                Premium gadgets at unbeatable prices.
              </p>
              <Link
                href="/products?category=electronics"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors"
              >
                Shop the Sale
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-6xl font-black text-white">40%</p>
                      <p className="text-white/80 font-medium">OFF</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="container-custom pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-success/10 text-success text-sm font-medium px-3 py-1 rounded-full mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              Just In
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              New Arrivals
            </h2>
            <p className="text-muted-foreground mt-1">
              The freshest additions to our collection
            </p>
          </div>
          <Link
            href="/products?sort=newest"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            View All New
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={newProducts} />
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-muted/30 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground mt-1">
              Trusted by thousands of happy shoppers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Verified Buyer",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                text: "Amazing quality products and super fast delivery! The customer service team went above and beyond to help me. Will definitely shop here again.",
                rating: 5,
              },
              {
                name: "Mike Chen",
                role: "Verified Buyer",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                text: "Best online shopping experience I've had. The product descriptions are accurate, prices are competitive, and the return policy is hassle-free.",
                rating: 5,
              },
              {
                name: "Emily Davis",
                role: "Verified Buyer",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                text: "I've been shopping here for months now and I'm always impressed. Great selection, fair prices, and the loyalty rewards program is fantastic!",
                rating: 5,
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-secondary fill-secondary"
                    />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ── */}
      <section className="container-custom py-16">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
            Trusted by top brands
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
          {["ProMax", "AirWave", "UltraBook", "SmartTech", "RunFlex", "GlowLab"].map(
            (brand) => (
              <span
                key={brand}
                className="text-2xl font-bold text-foreground"
              >
                {brand}
              </span>
            )
          )}
        </div>
      </section>
    </div>
  );
}
