"use client";

import Link from "next/link";
import { useState } from "react";
import { User as UserIcon, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { register } = useAuth();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await register({ name, email, password });
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 px-6 pt-24 pb-12">
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-orange-300/20 blur-[120px]" />
      <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-amber-300/20 blur-[120px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl backdrop-blur">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-900">Create Account</h1>
          <p className="text-sm text-slate-500">
            Join Shoply for an unforgettable shopping experience
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Full Name
            </label>
            <div className="relative">
              <UserIcon size={18} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                required
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-11 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 hover:scale-[1.01] active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-orange-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}