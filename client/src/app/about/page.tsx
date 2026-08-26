import Link from "next/link";
import { ShieldCheck, Sparkles, ShoppingBag, Users, Award, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100/60 px-4 py-1 text-xs font-bold text-orange-700">
            <Sparkles className="w-3.5 h-3.5" /> About Shoply
          </span>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">
            Empowering Modern E-Commerce
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Shoply connects buyers and verified sellers on a transparent, modern platform designed for seamless shopping experiences.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm space-y-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 mx-auto">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Curated Marketplace</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every seller and product is vetted to guarantee top-notch quality and authentic customer satisfaction.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm space-y-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Secure Transactions</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We prioritize data privacy and encrypted order fulfillment so you can shop with 100% peace of mind.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm space-y-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 mx-auto">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Customer Centric</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              From instant wishlist syncing to real ratings and reviews, Shoply puts the customer experience first.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-slate-900 p-10 text-white text-center space-y-4">
          <h2 className="text-2xl font-black">Join Thousands of Happy Shoppers</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Discover trending items, save your favorites, or start selling your own products on Shoply.
          </p>
          <div>
            <Link
              href="/products"
              className="inline-block rounded-xl bg-orange-500 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-orange-600"
            >
              Start Shopping Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}