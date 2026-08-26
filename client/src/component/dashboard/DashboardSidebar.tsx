"use client";

import Link from "next/link";
import Logo from "../shared/Logo";
import { User as UserIcon, PlusCircle, Package, Heart, Grid, Users, LogOut, Home } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const role = (user?.role || "User").toLowerCase();

  const sellerNavLinks = [
    { icon: UserIcon, href: "/dashboard/seller", label: "Seller Profile" },
    { icon: PlusCircle, href: "/dashboard/seller/add-product", label: "Add Product" },
    { icon: Package, href: "/dashboard/seller/my-products", label: "My Products" },
  ];

  const userNavLinks = [
    { icon: UserIcon, href: "/dashboard/user", label: "User Profile" },
    { icon: Heart, href: "/wishlist", label: "My Wishlist" },
  ];

  const adminNavLinks = [
    { icon: UserIcon, href: "/dashboard/admin", label: "Admin Overview" },
    { icon: Grid, href: "/dashboard/admin/categories", label: "Manage Categories" },
    { icon: Package, href: "/dashboard/admin/products", label: "All Products" },
    { icon: Users, href: "/dashboard/admin/users", label: "Registered Users" },
  ];

  let navItems = userNavLinks;
  if (role === "seller" || role === "organizer") {
    navItems = sellerNavLinks;
  } else if (role === "admin") {
    navItems = adminNavLinks;
  }

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white p-5 flex flex-col justify-between min-h-screen">
      <div className="space-y-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <div className="leading-tight">
            <h1 className="text-xl font-black text-slate-900">
              Shop<span className="text-orange-500">ly</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Dashboard
            </p>
          </div>
        </Link>

        {/* Back to Home Link */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition"
        >
          <Home className="w-4 h-4" /> Back to Store
        </Link>

        {/* User Card */}
        {user && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-bold text-xs uppercase">
              {user.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
              <span className="inline-block rounded bg-orange-100 px-1.5 py-0.5 text-[9px] font-extrabold text-orange-700 uppercase">
                {user.role}
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                  active
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-slate-600 hover:bg-slate-50 hover:text-orange-600"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}