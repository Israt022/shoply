"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  productApi,
  Product,
  Category,
  categoryApi,
  uploadImageToImgBB,
} from "@/lib/api";
import { Package, Trash2, Eye, Search, BadgePlus, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { useAuth } from "@/lib/AuthContext";

export default function AdminProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await productApi.getAll();
      setProducts((res.data || []).filter((p) => !p.isDeleted));
    } catch (err: any) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await categoryApi.getAll();
      setCategories(res.data || []);
    } catch {
      toast.error("Failed to load categories");
    }
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    categoryId: "",
  });
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // const handleCreate = async () => {
  //   if (!user) {
  //     toast.error("Please login first");
  //     return;
  //   }

  //   if (!formData.title.trim()) {
  //     toast.error("Product title is required");
  //     return;
  //   }

  //   if (!formData.categoryId) {
  //     toast.error("Please select a category");
  //     return;
  //   }

  //   try {
  //     setUploading(true);

  //     let imageUrl = "";

  //     // Upload image to ImgBB
  //     if (imageFile) {
  //       imageUrl = await uploadImageToImgBB(imageFile);
  //     }

  //     // Create product
  //     await productApi.create({
  //       title: formData.title,
  //       description: formData.description,
  //       price: Number(formData.price),
  //       stock: Number(formData.stock),
  //       image: imageUrl,
  //       categoryId: formData.categoryId,
  //       userId: user.id,
  //     });

  //     toast.success("Product created successfully");

  //     setShowForm(false);

  //     setFormData({
  //       title: "",
  //       description: "",
  //       price: 0,
  //       stock: 0,
  //       image: "",
  //       categoryId: "",
  //     });

  //     setImageFile(null);

  //     await fetchProducts();
  //   } catch (err: any) {
  //     toast.error(err.message || "Failed to create product");
  //   } finally {
  //     setUploading(false);
  //   }
  // };
  const handleEdit = (product: Product) => {
    setEditingProduct(product);

    setFormData({
      title: product.title,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      image: product.image || "",
      categoryId: product.categoryId,
    });

    setImageFile(null);
    setShowForm(true);
  };
  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Product title is required");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      setUploading(true);

      let imageUrl = formData.image;

      // New image selected হলে শুধু তখন upload করবে
      if (imageFile) {
        imageUrl = await uploadImageToImgBB(imageFile);
      }

      const productData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: imageUrl,
        categoryId: formData.categoryId,
      };

      if (editingProduct) {
        // UPDATE
        await productApi.update(editingProduct.id, productData);

        toast.success("Product updated successfully");
      } else {
        // CREATE
        await productApi.create({
          ...productData,
          userId: user.id,
        });

        toast.success("Product created successfully");
      }

      setShowForm(false);
      setEditingProduct(null);
      setImageFile(null);

      setFormData({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
        categoryId: "",
      });

      await fetchProducts();
    } catch (err: any) {
      toast.error(err.message || "Operation failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">All Products Management</h1>
          <p className="text-xs text-slate-500 mt-1">Platform overview of all seller products.</p>
        </div>
        <Button className={"bg-orange-500"} onClick={() => setShowForm(true)}>
          <BadgePlus /> Add Product</Button>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-xs outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-2">
          <Package className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-900">No products found</h3>
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
                  <th className="py-4 px-6">Seller ID</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredProducts.map((prod) => (
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
                    <td className="py-4 px-6 font-mono text-[10px] text-slate-500">{prod.userId.slice(0, 8)}...</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        href={`/products/${prod.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleEdit(prod)}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
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
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

            {/* <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add Product
                </h2>
                <p className="text-xs text-slate-500">
                  Create a new product
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div> */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {editingProduct ? "Update Product" : "Add Product"}
              </h2>

              <p className="text-xs text-slate-500">
                {editingProduct
                  ? "Update product information"
                  : "Create a new product"}
              </p>
            </div>

            <div className="space-y-4">

              {/* Title */}
              <input
                type="text"
                placeholder="Product title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500"
              />

              {/* Description */}
              <textarea
                placeholder="Product description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500"
                rows={3}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Product Price ($)
                  </label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                      $
                    </span>

                    <input
                      type="number"
                      min="1"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                      placeholder="Enter product price"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-8 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Set the selling price of this product.
                  </p>
                </div>


                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Stock Quantity
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: Number(e.target.value),
                        })
                      }
                      placeholder="Enter available quantity"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-4 pr-16 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                      units
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Number of items currently available.
                  </p>
                </div>

              </div>

              {/* Category */}
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryId: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Image Upload */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setImageFile(file);
                  }}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />

                {imageFile && (
                  <p className="mt-2 text-xs text-slate-500">
                    Selected: {imageFile.name}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">

                <Button
                  type="button"
                  className="rounded-full border border-gray-200 bg-white px-5 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowForm(false);
                    setImageFile(null);
                    setFormData({
                      title: "",
                      description: "",
                      price: 0,
                      stock: 0,
                      image: "",
                      categoryId: "",
                    });
                  }}
                >
                  Cancel
                </Button>

                <Button
                  className="bg-orange-500 text-white"
                  onClick={handleSubmit}
                  isDisabled={uploading}
                >
                  {uploading
                    ? "Processing..."
                    : editingProduct
                      ? "Update Product"
                      : "Create Product"}
                </Button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
