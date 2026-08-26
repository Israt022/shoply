"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, Heart, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "@/lib/AuthContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <Logo />
          <div className="leading-tight">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Shop<span className="text-orange-500">ly</span>
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Modern E-Commerce
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-semibold transition-all duration-200 ${
                  active ? "text-orange-600" : "text-slate-700 hover:text-orange-600"
                }`}
              >
                {item.name}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-orange-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Buttons / Auth User Menu */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="p-2.5 rounded-full text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition"
          >
            <Heart className="w-5 h-5" />
          </Link>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-orange-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 active:scale-95"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 p-1.5 pr-4 text-left transition hover:bg-slate-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-sm uppercase">
                  {user.name ? user.name.charAt(0) : "U"}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                  <p className="text-[10px] font-medium text-orange-600 capitalize leading-tight">
                    {user.role}
                  </p>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href={`/dashboard/${user.role.toLowerCase()}`}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Heart className="w-4 h-4" />
                      My Wishlist
                    </Link>
                  </div>
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2.5 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-6 py-6 backdrop-blur-xl lg:hidden">
          <div className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
                    active
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {!user ? (
            <div className="mt-6 space-y-3">
              <Link
                href="/login"
                className="block w-full rounded-xl border border-slate-200 py-3 text-center font-semibold text-slate-700 hover:border-orange-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block w-full rounded-xl bg-orange-500 py-3 text-center font-semibold text-white hover:bg-orange-600"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-3 pt-4 border-t border-slate-100">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-bold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
                <span className="mt-2 inline-block rounded-md bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700 uppercase">
                  {user.role}
                </span>
              </div>
              <Link
                href={`/dashboard/${user.role.toLowerCase()}`}
                className="block rounded-xl border border-orange-500 py-3 text-center font-semibold text-orange-600 hover:bg-orange-50"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={() => logout()}
                className="w-full rounded-xl border border-red-200 py-3 font-semibold text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}