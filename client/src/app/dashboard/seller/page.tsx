"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import ProfileCard from "@/component/dashboard/ProfileCard";
import Link from "next/link";
import { PlusCircle, Package, ShoppingBag } from "lucide-react";
import { productApi, Product } from "@/lib/api";

export default function SellerDashboardPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadSellerProducts() {
      if (!user) return;
      try {
        const res = await productApi.getAll();
        const sellerProds = (res.data || []).filter((p) => p.userId === user.id);
        setProducts(sellerProds);
      } catch (err) {
        console.error("Failed to load seller products", err);
      } finally {
        setLoading(false);
      }
    }
    loadSellerProducts();
  }, [user]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Seller Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1">Manage your shop, list new items, and track your active inventory.</p>
      </div>

      {/* Seller Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{products.length}</p>
            <p className="text-xs text-slate-500 font-medium">My Active Products</p>
          </div>
        </div>

        <Link
          href="/dashboard/seller/add-product"
          className="rounded-2xl border border-orange-200 bg-orange-50/50 p-6 shadow-sm flex items-center gap-4 hover:bg-orange-100/50 transition group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md group-hover:scale-105 transition">
            <PlusCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Add New Product</h3>
            <p className="text-xs text-slate-500">Post a new item to Shoply</p>
          </div>
        </Link>

        <Link
          href="/dashboard/seller/my-products"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4 hover:border-orange-300 transition group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-orange-500 group-hover:text-white transition">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Manage Inventory</h3>
            <p className="text-xs text-slate-500">Edit or delete product listings</p>
          </div>
        </Link>
      </div>

      <ProfileCard user={user} />
    </div>
  );
}
