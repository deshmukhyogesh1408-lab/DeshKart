"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  Check,
} from "lucide-react";
import { getProductById, getProductsByCategory } from "@/lib/products-data";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import ProductGrid from "@/components/products/product-grid";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();

  const product = getProductById(params.id as string);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? calculateDiscount(product.price, product.originalPrice)
    : 0;

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      size: selectedSize || undefined,
      color: product.colors?.[selectedColor]?.name || undefined,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/products"
          className="hover:text-foreground transition-colors"
        >
          Products
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-foreground transition-colors capitalize"
        >
          {product.category.replace("-", " & ")}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">
          {product.name}
        </span>
      </nav>

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      {/* Product detail */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Image gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-danger text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                -{discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-4 right-4 bg-success text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                NEW
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                    selectedImage === i
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <div className="mb-4">
            <p className="text-sm text-primary font-medium uppercase tracking-wider mb-1">
              {product.brand}
            </p>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.floor(product.rating)
                        ? "text-secondary fill-secondary"
                        : "text-border"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-semibold text-success bg-success/10 px-2 py-0.5 rounded">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">
                Color:{" "}
                <span className="font-normal text-muted-foreground">
                  {product.colors[selectedColor].name}
                </span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all relative",
                      selectedColor === i
                        ? "border-primary scale-110 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  >
                    {selectedColor === i && (
                      <Check
                        className={cn(
                          "w-4 h-4 absolute inset-0 m-auto",
                          color.hex === "#ffffff" || color.hex === "#f5f5f5" || color.hex === "#f0f0f0"
                            ? "text-foreground"
                            : "text-white"
                        )}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[48px] h-11 px-3 rounded-xl border-2 text-sm font-medium transition-all",
                      selectedSize === size
                        ? "border-primary bg-primary text-white"
                        : "border-border hover:border-primary text-foreground"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-3">Quantity</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stock} available
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.sizes && product.sizes.length > 0 && !selectedSize}
              className={cn(
                "flex-1 h-13 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-sm",
                addedToCart
                  ? "bg-success text-white"
                  : "bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25",
                product.sizes &&
                  product.sizes.length > 0 &&
                  !selectedSize &&
                  "opacity-50 cursor-not-allowed"
              )}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart — {formatPrice(product.price * quantity)}
                </>
              )}
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={cn(
                "w-13 h-13 rounded-xl border-2 flex items-center justify-center transition-all",
                isWishlisted
                  ? "border-danger bg-danger/5 text-danger"
                  : "border-border hover:border-danger hover:text-danger"
              )}
              aria-label="Add to wishlist"
            >
              <Heart
                className={cn("w-5 h-5", isWishlisted && "fill-current")}
              />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-muted/50 rounded-xl">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Over $100" },
              { icon: Shield, label: "Secure Payment", sub: "256-bit SSL" },
              { icon: RotateCcw, label: "Easy Returns", sub: "30 days" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center text-center gap-1"
              >
                <badge.icon className="w-5 h-5 text-primary" />
                <p className="text-xs font-semibold">{badge.label}</p>
                <p className="text-[10px] text-muted-foreground">
                  {badge.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border pt-12">
          <ProductGrid
            products={relatedProducts}
            title="You May Also Like"
            subtitle="Similar products from this category"
          />
        </section>
      )}
    </div>
  );
}
