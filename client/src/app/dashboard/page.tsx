"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else {
        const role = user.role.toLowerCase();
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "seller") {
          router.push("/dashboard/seller");
        } else {
          router.push("/dashboard/user");
        }
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
    </div>
  );
}
