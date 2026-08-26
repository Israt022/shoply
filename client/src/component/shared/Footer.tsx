"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Mail, Phone, MapPin, Globe, Share2, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) {
    return null;
  }
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-12 text-slate-600">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Logo />
              <div className="leading-tight">
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  Shop<span className="text-orange-500">ly</span>
                </h2>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  Modern E-Commerce
                </p>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Shoply is your ultimate destination for high-quality products across electronics, fashion, home decor, and lifestyle. Discover deals and shop with confidence.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition" aria-label="Support">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products" className="hover:text-orange-600 transition">All Products</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-orange-600 transition">Categories</Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-orange-600 transition">Wishlist</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-600 transition">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-600 transition">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Account</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/login" className="hover:text-orange-600 transition">Login</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-orange-600 transition">Register</Link>
              </li>
              <li>
                <Link href="/dashboard/user" className="hover:text-orange-600 transition">User Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/seller" className="hover:text-orange-600 transition">Seller Center</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>123 Innovation Way, Tech City</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+1 (800) 555-SHOP</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@shoply.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Shoply Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}