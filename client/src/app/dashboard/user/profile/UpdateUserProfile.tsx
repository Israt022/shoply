"use client";

import { useAuth } from "@/lib/AuthContext";

export default function UpdateUserProfile() {
  const { user } = useAuth();
  if (!user) return null;
  return null;
}