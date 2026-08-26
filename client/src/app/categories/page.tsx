"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { categoryApi, productApi, Category, Product } from "@/lib/api";
import { ShoppingBag, ArrowRight, Grid } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        const [catRes, prodRes] = await Promise.all([
          categoryApi.getAll().catch(() => ({ data: [] })),
          productApi.getAll().catch(() => ({ data: [] })),
        ]);
        setCategories(catRes.data || []);
        setProducts(prodRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getCategoryCount = (categoryId: string) => {
    return products.filter((p) => p.categoryId === categoryId).length;
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-black text-slate-900">Product Categories</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse our catalog organized by product categories
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-3">
            <Grid className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="text-lg font-bold text-slate-900">No categories found</h3>
            <p className="text-xs text-slate-500">Categories created by Admins will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const count = getCategoryCount(category.id);
              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition">
                      <ShoppingBag className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-slate-500">
                    <span>{count} {count === 1 ? "Product" : "Products"}</span>
                    <span className="text-orange-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                      Browse <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
