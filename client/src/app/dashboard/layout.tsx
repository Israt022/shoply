"use client";

import { useAuth } from "@/lib/AuthContext";
import DashboardSidebar from "@/component/dashboard/DashboardSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="border-b border-slate-200 bg-white px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Dashboard</h2>
            <p className="text-xs text-slate-500">Welcome back, {user.name}!</p>
          </div>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 uppercase">
            {user.role} Role
          </span>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}