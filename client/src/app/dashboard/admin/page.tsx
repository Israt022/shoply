"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import ProfileCard from "@/component/dashboard/ProfileCard";
import Link from "next/link";
import { Grid, Package, Users, ShieldAlert } from "lucide-react";
import { productApi, categoryApi, authApi } from "@/lib/api";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const [productCount, setProductCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [prodRes, catRes, userRes] = await Promise.all([
          productApi.getAll().catch(() => ({ data: [] })),
          categoryApi.getAll().catch(() => ({ data: [] })),
          authApi.getUsers().catch(() => ({ data: [] })),
        ]);

        setProductCount((prodRes.data || []).length);
        setCategoryCount((catRes.data || []).length);
        setUserCount((userRes.data || []).length);
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Admin Control Panel</h1>
        <p className="text-xs text-slate-500 mt-1">Platform management overview, category creation, and user oversight.</p>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/dashboard/admin/categories"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4 hover:border-orange-300 transition group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition">
            <Grid className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{loading ? "..." : categoryCount}</p>
            <p className="text-xs text-slate-500 font-medium">Categories</p>
          </div>
        </Link>

        <Link
          href="/dashboard/admin/products"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4 hover:border-orange-300 transition group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{loading ? "..." : productCount}</p>
            <p className="text-xs text-slate-500 font-medium">Total Products</p>
          </div>
        </Link>

        <Link
          href="/dashboard/admin/users"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4 hover:border-orange-300 transition group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{loading ? "..." : userCount}</p>
            <p className="text-xs text-slate-500 font-medium">Registered Users</p>
          </div>
        </Link>
      </div>

      <ProfileCard user={user} />
    </div>
  );
}
