"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { productApi, Product } from "@/lib/api";
import { PlusCircle, Package, Trash2, Edit3, Eye, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

export default function MyProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editPrice, setEditPrice] = useState<string>("");
  const [editStock, setEditStock] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

  const fetchProducts = async () => {
    if (!user) return;
    try {
      const res = await productApi.getAll();
      const sellerProds = (res.data || []).filter((p) => p.userId === user.id && !p.isDeleted);
      setProducts(sellerProds);
    } catch (err: any) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await productApi.delete(id);
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product");
    }
  };

  const handleEditOpen = (prod: Product) => {
    setEditingProduct(prod);
    setEditPrice(prod.price.toString());
    setEditStock(prod.stock.toString());
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const priceNum = parseInt(editPrice, 10);
    const stockNum = parseInt(editStock, 10);

    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Price must be positive");
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    setUpdating(true);
    try {
      await productApi.update(editingProduct.id, {
        price: priceNum,
        stock: stockNum,
      });
      toast.success("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (err: any) {
      toast.error(err.message || "Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Product Inventory</h1>
          <p className="text-xs text-slate-500 mt-1">Manage listings, edit stock levels, or remove items.</p>
        </div>

        <Link
          href="/dashboard/seller/add-product"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:bg-orange-600 transition"
        >
          <PlusCircle className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-3">
          <Package className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-900">No products listed yet</h3>
          <p className="text-xs text-slate-500">Start selling today by publishing your first product!</p>
          <Link
            href="/dashboard/seller/add-product"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2 text-xs font-bold text-white shadow-md"
          >
            <PlusCircle className="w-4 h-4" /> Create Product Listing
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img
                        src={prod.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100"}
                        alt={prod.title}
                        className="h-10 w-10 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900 line-clamp-1">{prod.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono">ID: {prod.id.slice(0, 8)}...</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">${prod.price}</td>
                    <td className="py-4 px-6">{prod.stock} units</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          prod.stock > 0
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {prod.stock > 0 ? "AVAILABLE" : "OUT_OF_STOCK"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        href={`/products/${prod.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleEditOpen(prod)}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition"
                        title="Quick Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Edit Product Stock & Price</h3>
            <p className="text-xs text-slate-500">{editingProduct.title}</p>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="rounded-xl bg-orange-500 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-orange-600 disabled:opacity-50"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
