"use client";

import { useAuth } from "@/lib/AuthContext";
import ProfileCard from "@/component/dashboard/ProfileCard";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export default function UserDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">User Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1">Manage your account profile and quick actions.</p>
      </div>

      <ProfileCard user={user} />

      {/* Quick Action Links */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/wishlist"
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">My Wishlist</h3>
            <p className="text-xs text-slate-500">View and manage saved items</p>
          </div>
        </Link>

        <Link
          href="/products"
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Explore Catalog</h3>
            <p className="text-xs text-slate-500">Browse all available products</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
