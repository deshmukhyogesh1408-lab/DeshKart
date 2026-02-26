import { NextResponse } from "next/server";
import { products, categories, filterAndSortProducts } from "@/lib/products-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filters = {
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    sort: searchParams.get("sort") || undefined,
  };

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;

  const allFiltered = filterAndSortProducts(filters);
  const start = (page - 1) * limit;
  const paginated = allFiltered.slice(start, start + limit);

  return NextResponse.json({
    products: paginated,
    total: allFiltered.length,
    page,
    limit,
    totalPages: Math.ceil(allFiltered.length / limit),
    categories: categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
  });
}
