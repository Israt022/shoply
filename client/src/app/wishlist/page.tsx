"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { wishlistApi, Wishlist } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import ProductCard from "@/component/shared/ProductCard";
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWishlist = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const res = await wishlistApi.getByUserId(user.id);
      setWishlists(res.data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const handleRemove = async (wishlistId: string) => {
    try {
      await wishlistApi.remove(wishlistId);
      toast.success("Item removed from wishlist");
      setWishlists((prev) => prev.filter((item) => item.id !== wishlistId));
    } catch (err: any) {
      toast.error(err.message || "Failed to remove item");
    }
  };

  if (!user) {
    return (
      <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-md px-5 text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Your Wishlist</h2>
          <p className="text-sm text-slate-500">
            Please log in to your Shoply account to view and save your favorite items.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 hover:bg-orange-600"
            >
              Login to View Wishlist
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900">My Wishlist</h1>
            <p className="text-sm text-slate-500 mt-1">
              Items you've saved for later ({wishlists.length})
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : wishlists.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-3">
            <Heart className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="text-lg font-bold text-slate-900">Your wishlist is empty</h3>
            <p className="text-xs text-slate-500">
              Explore our products and tap the heart icon to save items here!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:bg-orange-600"
            >
              <ShoppingBag className="w-4 h-4" /> Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlists.map((item) => {
              if (!item.product) return null;
              return (
                <div key={item.id} className="relative group">
                  <ProductCard
                    product={item.product}
                    isWishlistedInitial={true}
                    onWishlistToggle={() => fetchWishlist()}
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove from Saved
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
