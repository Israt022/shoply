"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { categoryApi, productApi, Category } from "@/lib/api";
import { PlusCircle, Package, ArrowLeft, Image as ImageIcon, Tag, DollarSign, Layers } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AddProductPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Form State
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await categoryApi.getAll();
        setCategories(res.data || []);
        if (res.data && res.data.length > 0) {
          setCategoryId(res.data[0].id);
        }
      } catch (err: any) {
        toast.error("Failed to load categories");
      } finally {
        setLoadingCats(false);
      }
    }
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to post a product");
      return;
    }

    if (!title || !price || !stock || !categoryId) {
      toast.error("Please fill in all required fields");
      return;
    }

    const priceNum = parseInt(price, 10);
    const stockNum = parseInt(stock, 10);

    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Price must be a positive integer");
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    setSubmitting(true);
    try {
      await productApi.create({
        title,
        description,
        price: priceNum,
        stock: stockNum,
        image: image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        categoryId,
        userId: user.id,
      });

      toast.success("Product created successfully!");
      router.push("/dashboard/seller/my-products");
    } catch (err: any) {
      toast.error(err.message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Add New Product</h1>
          <p className="text-xs text-slate-500 mt-1">Create a new item listing for your shop catalog.</p>
        </div>
        <Link
          href="/dashboard/seller/my-products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> My Products
        </Link>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Tag className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Wireless Noise-Canceling Headphones"
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* Price & Stock Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Price ($) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 99"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Stock Quantity <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Layers className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>
            </div>
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Category <span className="text-rose-500">*</span>
            </label>
            {loadingCats ? (
              <div className="h-11 w-full rounded-xl bg-slate-100 animate-pulse" />
            ) : categories.length === 0 ? (
              <p className="text-xs text-rose-500">No categories found. Ask an Admin to create a category first.</p>
            ) : (
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Image URL
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Leave empty for default high-res product image.</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the product features, specs, and condition..."
              className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || categories.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 disabled:opacity-50"
          >
            <PlusCircle className="w-5 h-5" />
            {submitting ? "Publishing Product..." : "Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
