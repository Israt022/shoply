"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
  CheckCircle,
  XCircle,
  ArrowLeft,
  User as UserIcon,
  MessageSquare,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import { productApi, reviewApi, wishlistApi, Product, Review } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  // Review Form state
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>("");
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    async function loadProductData() {
      try {
        const prodRes = await productApi.getById(id);
        setProduct(prodRes.data);

        // Fetch product reviews
        const revRes = await reviewApi.getAll().catch(() => ({ data: [] }));
        const prodReviews = (revRes.data || []).filter((r) => r.productId === id);
        setReviews(prodReviews);

        // Fetch user wishlist if logged in
        if (user) {
          const wishRes = await wishlistApi.getByUserId(user.id).catch(() => ({ data: [] }));
          const exists = (wishRes.data || []).some((w) => w.productId === id);
          setIsWishlisted(exists);
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    }

    loadProductData();
  }, [id, user]);

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error("Please login to save this item to your wishlist!");
      return;
    }
    if (!product) return;

    try {
      if (isWishlisted) {
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        await wishlistApi.add({ userId: user.id, productId: product.id });
        setIsWishlisted(true);
        toast.success("Added to wishlist!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update wishlist");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to leave a review!");
      return;
    }
    if (!product) return;

    setSubmittingReview(true);
    try {
      const res = await reviewApi.create({
        rating: newRating,
        comment: newComment,
        userId: user.id,
        productId: product.id,
      });

      toast.success("Review posted successfully!");
      setNewComment("");
      setNewRating(5);

      // Refresh reviews list
      const revRes = await reviewApi.getAll();
      const updatedReviews = (revRes.data || []).filter((r) => r.productId === id);
      setReviews(updatedReviews);
    } catch (err: any) {
      toast.error(err.message || "Failed to post review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-32 bg-slate-200 rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-slate-200 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-slate-200 rounded-md" />
              <div className="h-6 w-1/4 bg-slate-200 rounded-md" />
              <div className="h-32 bg-slate-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-5 lg:px-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-slate-500 text-sm">The product you are looking for might have been deleted or relocated.</p>
        <Link href="/products" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-md">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>
    );
  }

  const isAvailable = product.status === "AVAILABLE" && product.stock > 0;
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        {/* Main Product Container */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left: Product Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lg">
            <img
              src={
                product.image ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
              }
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
            {product.category && (
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-slate-800 shadow-md backdrop-blur">
                {product.category.name}
              </span>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(Number(avgRating))
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span>{avgRating} ({reviews.length} reviews)</span>
              </div>

              <h1 className="text-3xl font-black text-slate-900 leading-tight">{product.title}</h1>

              <div className="flex items-center gap-3 pt-1">
                <span className="text-3xl font-black text-slate-900">
                  ${product.price.toLocaleString()}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                    isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {isAvailable ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" /> In Stock ({product.stock})
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" /> Out of Stock
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {product.description || "No description provided for this product."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={handleWishlistToggle}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border py-4 text-sm font-bold shadow-md transition ${
                  isWishlisted
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-slate-200 bg-white text-slate-800 hover:border-red-300 hover:text-red-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Seller & Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-center">
              <div className="rounded-xl bg-white p-3 border border-slate-200/80">
                <Truck className="w-5 h-5 mx-auto text-orange-500 mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Fast Shipping</p>
                <p className="text-[10px] text-slate-400">2-4 business days</p>
              </div>
              <div className="rounded-xl bg-white p-3 border border-slate-200/80">
                <Shield className="w-5 h-5 mx-auto text-orange-500 mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Authentic</p>
                <p className="text-[10px] text-slate-400">100% Guaranteed</p>
              </div>
              <div className="rounded-xl bg-white p-3 border border-slate-200/80">
                <RotateCcw className="w-5 h-5 mx-auto text-orange-500 mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Easy Returns</p>
                <p className="text-[10px] text-slate-400">30-day window</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="pt-8 border-t border-slate-200 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Customer Reviews</h2>
              <p className="text-xs text-slate-500 mt-1">Real ratings and feedback from shoppers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Review Form */}
            <div className="lg:col-span-1 space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">Write a Review</h3>

              {user ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                      Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Your Comment
                    </label>
                    <textarea
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts about this product..."
                      required
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="w-full rounded-xl bg-orange-500 py-3 text-xs font-bold text-white shadow-md hover:bg-orange-600 transition disabled:opacity-50"
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-600">Please login to write a review for this product.</p>
                  <Link
                    href="/login"
                    className="inline-block rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-sm"
                  >
                    Login to Review
                  </Link>
                </div>
              )}
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-4">
              {reviews.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center space-y-2">
                  <Star className="w-8 h-8 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">No reviews yet</h4>
                  <p className="text-xs text-slate-500">Be the first to review this product!</p>
                </div>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-700 font-bold text-xs">
                          {rev.user?.name ? rev.user.name.charAt(0) : "U"}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{rev.user?.name || "Shopper"}</p>
                          <p className="text-[10px] text-slate-400">
                            {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : "Recent"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pl-10">
                      {rev.comment || "No comment left."}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
