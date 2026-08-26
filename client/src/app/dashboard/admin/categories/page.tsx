"use client";

import { useEffect, useState } from "react";
import { categoryApi, Category } from "@/lib/api";
import { Grid, PlusCircle, FolderPlus, Tag } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      const res = await categoryApi.getAll();
      setCategories(res.data || []);
    } catch (err: any) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSubmitting(true);
    try {
      await categoryApi.create({ name: newCategoryName.trim() });
      toast.success("Category created successfully!");
      setNewCategoryName("");
      fetchCategories();
    } catch (err: any) {
      toast.error(err.message || "Failed to create category");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Manage Categories</h1>
        <p className="text-xs text-slate-500 mt-1">Create and manage product categories for the shop.</p>
      </div>

      {/* Create Form Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FolderPlus className="w-4 h-4 text-orange-500" />
          Add New Category
        </h3>

        <form onSubmit={handleCreateCategory} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Tag className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              required
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category Name (e.g., Electronics, Fashion, Home)"
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:bg-orange-600 transition disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            {submitting ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Active Categories ({categories.length})
        </h3>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center space-y-2">
            <Grid className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-800">No categories created yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <Grid className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">ID: {cat.id}</p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                  Active
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
