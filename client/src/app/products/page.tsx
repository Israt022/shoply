"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, RefreshCw, ShoppingBag } from "lucide-react";
// import { productApi, categoryApi, Product, Category } from "@/lib/api";
import { productApi, categoryApi } from "@/lib/api";
import type { Product, Category } from "@/lib/api";
import ProductCard from "@/component/shared/ProductCard";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters state
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  useEffect(() => {
    async function load() {
      try {
        const [prodRes, catRes] = await Promise.all([
          productApi.getAll().catch(() => ({ data: [] })),
          categoryApi.getAll().catch(() => ({ data: [] })),
        ]);
        setProducts(prodRes.data || []);
        setCategories(catRes.data || []);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (
        search.trim() &&
        !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.description?.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      // Category
      if (selectedCategory && p.categoryId !== selectedCategory) {
        return false;
      }
      // Status
      if (statusFilter !== "ALL" && p.status !== statusFilter) {
        return false;
      }
      // Max price
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    });
  }, [products, search, selectedCategory, statusFilter, maxPrice]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setStatusFilter("ALL");
    setMaxPrice(10000);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-black text-slate-900">Explore Products</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse through our expansive collection of items from verified sellers.
          </p>
        </div>

        {/* Filters & Search Controls Bar */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by keyword..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Filters Selects */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-orange-500"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Status Select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="AVAILABLE">Available</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
              <option value="DISCONTINUED">Discontinued</option>
            </select>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span>Showing {filteredProducts.length} of {products.length} products</span>
        </div>

        {/* Grid or Skeleton or Empty */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-3">
            <ShoppingBag className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="text-lg font-bold text-slate-900">No products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search criteria or resetting filters to see available products.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:bg-orange-600"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
              // <div key={product.id} className="rounded-xl bg-white p-5">
              //   {product.title}
              // </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-28 pb-20 max-w-7xl mx-auto px-5">
          <div className="h-12 w-64 bg-slate-200 animate-pulse rounded-xl mb-6" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
