"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star, Sparkles } from "lucide-react";
import { categoryApi, productApi, reviewApi, Category, Product, Review } from "@/lib/api";
import ProductCard from "@/component/shared/ProductCard";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, prodRes, revRes] = await Promise.all([
          categoryApi.getAll().catch(() => ({ data: [] })),
          productApi.getAll().catch(() => ({ data: [] })),
          reviewApi.getAll().catch(() => ({ data: [] })),
        ]);
        setCategories(catRes.data || []);
        setProducts(prodRes.data || []);
        setReviews(revRes.data || []);
      } catch (err) {
        console.error("Error loading home page data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-20 space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-slate-50 to-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Hero Left */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100/60 px-4 py-1.5 text-xs font-bold text-orange-700 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen E-Commerce Experience</span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl leading-[1.1]">
                Shop Smarter, Live Better with <span className="text-orange-500">Shoply</span>
              </h1>

              <p className="max-w-xl mx-auto lg:mx-0 text-base text-slate-600 leading-relaxed">
                Discover an unmatched selection of quality products. From trending electronics to everyday fashion, Shoply delivers excellence straight to your doorstep.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/products"
                  className="flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600 hover:scale-105 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Shop All Products
                </Link>
                <Link
                  href="/categories"
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-400"
                >
                  Browse Categories
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-black text-slate-900">10k+</p>
                  <p className="text-xs text-slate-500 font-medium">Products Available</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">99.8%</p>
                  <p className="text-xs text-slate-500 font-medium">Satisfaction Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">24/7</p>
                  <p className="text-xs text-slate-500 font-medium">Fast Support</p>
                </div>
              </div>
            </div>

            {/* Hero Right Image Mock */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80"
                  alt="Shoply Shopping Experience"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="rounded-md bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                    New Arrival
                  </span>
                  <h3 className="text-lg font-bold">Premium Quality Guaranteed</h3>
                  <p className="text-xs text-slate-200">Curated by top sellers world-wide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Props */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Express Delivery</h3>
              <p className="text-xs text-slate-500">Free shipping on orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Secure Payments</h3>
              <p className="text-xs text-slate-500">Protected with standard encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Easy Returns</h3>
              <p className="text-xs text-slate-500">30-day hassle-free money back</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Shop by Category</h2>
            <p className="text-sm text-slate-500 mt-1">Browse our top performing categories</p>
          </div>
          <Link href="/categories" className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Electronics", "Fashion", "Home & Garden", "Books"].map((name) => (
              <Link
                key={name}
                href="/products"
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition hover:border-orange-300 hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-900">{name}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-orange-600">{cat.name}</h3>
                {cat.description && (
                  <p className="mt-1 line-clamp-1 text-[11px] text-slate-400">{cat.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Handpicked items</span>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Featured Products</h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1">
            See All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-3 text-lg font-bold text-slate-900">No products available yet</h3>
            <p className="mt-1 text-sm text-slate-500">Sellers can post products directly from their dashboard!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials / Customer Reviews */}
      {reviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Customer Feedback</span>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">What Our Shoppers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic">"{review.comment || "Great product experience!"}"</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-900">{review.user?.name || "Verified Shopper"}</span>
                  <span>{review.product?.title ? `On ${review.product.title}` : ""}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA Banner */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-amber-600 p-10 md:p-16 text-white text-center md:text-left">
          <div className="relative z-10 max-w-xl space-y-4">
            <h2 className="text-3xl font-black sm:text-4xl">Ready to Start Shopping?</h2>
            <p className="text-sm text-orange-100 leading-relaxed">
              Explore thousands of deals, verify seller ratings, and experience fast delivery today.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-orange-600 shadow-lg transition hover:bg-orange-50 active:scale-95"
            >
              Explore Catalog Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
