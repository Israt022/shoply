"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star, CheckCircle, XCircle } from "lucide-react";
import { wishlistApi } from "@/lib/api";
import type { Product } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  isWishlistedInitial?: boolean;
  onWishlistToggle?: () => void;
}

export default function ProductCard({
  product,
  isWishlistedInitial = false,
  onWishlistToggle,
}: ProductCardProps) {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState<boolean>(isWishlistedInitial);
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to save items to your wishlist!");
      return;
    }

    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        // Find wishlist item or toggle off
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        await wishlistApi.add({ userId: user.id, productId: product.id });
        setIsWishlisted(true);
        toast.success("Added to wishlist!");
      }
      if (onWishlistToggle) onWishlistToggle();
    } catch (err: any) {
      toast.error(err.message || "Failed to update wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  const isAvailable = product.status === "AVAILABLE" && product.stock > 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Pill */}
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-800 backdrop-blur-md shadow-sm">
            {product.category.name}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          disabled={wishlistLoading}
          aria-label="Wishlist"
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition shadow-md backdrop-blur-md ${isWishlisted
            ? "bg-red-500 text-white"
            : "bg-white/90 text-slate-700 hover:bg-white hover:text-red-500"
            }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${isAvailable ? "text-emerald-600" : "text-rose-500"
              }`}
          >
            {isAvailable ? (
              <>
                <CheckCircle className="w-3 h-3" /> In Stock ({product.stock})
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3" /> Out of Stock
              </>
            )}
          </span>
        </div>

        <Link href={`/products/${product.id}`} className="group-hover:text-orange-600 transition">
          <h3 className="line-clamp-1 text-base font-bold text-slate-900">{product.title}</h3>
        </Link>

        <p className="mt-1 line-clamp-2 text-xs text-slate-500 leading-relaxed flex-1">
          {product.description || "No description available for this product."}
        </p>

        {/* Price & Action */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400 font-medium">Price</p>
            <p className="text-lg font-black text-slate-900">
              ${product.price.toLocaleString()}
            </p>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-1.5 rounded-xl bg-orange-50 px-3.5 py-2 text-xs font-bold text-orange-600 transition hover:bg-orange-500 hover:text-white"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
