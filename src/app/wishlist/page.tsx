"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products-data";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  // Demo wishlist using featured products
  const wishlistItems = getFeaturedProducts().slice(0, 4);

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground mb-8">
          {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved
        </p>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and shop them later.
            </p>
            <Link
              href="/products"
              className="inline-flex px-6 py-3 bg-primary text-white rounded-xl font-medium"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-card border border-border rounded-xl"
              >
                <Link
                  href={`/products/${item.id}`}
                  className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0"
                >
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.id}`}
                    className="font-semibold hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {item.brand}
                  </p>
                  <p className="text-lg font-bold mt-2">
                    {formatPrice(item.price)}
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/products/${item.id}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </Link>
                  <button className="px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-danger hover:border-danger transition-colors flex items-center gap-1 justify-center">
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
