"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import ProductGrid from "@/components/products/product-grid";
import { filterAndSortProducts, categories } from "@/lib/products-data";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  // Sync URL params
  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const url = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.set(key, value);
      });
      const queryString = url.toString();
      router.push(`/products${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    },
    [router]
  );

  useEffect(() => {
    updateURL({
      search: debouncedSearch,
      category: selectedCategory,
      sort: sortBy,
    });
  }, [debouncedSearch, selectedCategory, sortBy, updateURL]);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts({
      search: debouncedSearch,
      category: selectedCategory,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sort: sortBy,
    });
  }, [debouncedSearch, selectedCategory, sortBy, priceRange]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSortBy("");
    setPriceRange([0, 3000]);
  };

  const hasActiveFilters =
    search || selectedCategory || sortBy || priceRange[0] > 0 || priceRange[1] < 3000;

  return (
    <div className="container-custom py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          {selectedCategory
            ? categories.find((c) => c.slug === selectedCategory)?.name || "Products"
            : debouncedSearch
            ? `Results for "${debouncedSearch}"`
            : "All Products"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters — Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-[160px] space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Category
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    !selectedCategory
                      ? "bg-primary text-white"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      selectedCategory === cat.slug
                        ? "bg-primary text-white"
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    {cat.name}{" "}
                    <span className="text-xs opacity-60">
                      ({cat.productCount})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0] || ""}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value) || 0, priceRange[1]])
                  }
                  className="w-full h-10 px-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="text-muted-foreground">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] === 3000 ? "" : priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value) || 3000])
                  }
                  className="w-full h-10 px-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full py-2.5 border border-danger text-danger rounded-xl text-sm font-medium hover:bg-danger/5 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-6 p-4 bg-muted/50 rounded-xl">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            <div className="flex items-center gap-3 ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 pr-8 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
              >
                <option value="">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Active filters chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory("")}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {debouncedSearch && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                  &quot;{debouncedSearch}&quot;
                  <button
                    onClick={() => setSearch("")}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <>
          <div
            className="overlay lg:hidden"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl shadow-2xl p-6 max-h-[70vh] overflow-y-auto lg:hidden animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 px-4 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Mobile categories */}
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm border transition-colors",
                    !selectedCategory
                      ? "bg-primary text-white border-primary"
                      : "border-border hover:border-primary"
                  )}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm border transition-colors",
                      selectedCategory === cat.slug
                        ? "bg-primary text-white border-primary"
                        : "border-border hover:border-primary"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  clearFilters();
                  setShowFilters(false);
                }}
                className="flex-1 py-3 border border-border rounded-xl text-sm font-medium"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 py-3 bg-primary text-white rounded-xl text-sm font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-custom py-8">
          <div className="skeleton h-10 w-48 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton aspect-[3/4] rounded-2xl" />
            ))}
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
