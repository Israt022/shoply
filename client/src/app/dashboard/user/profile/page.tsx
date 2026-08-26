"use client";

import ProfileCard from "@/component/dashboard/ProfileCard";
import { useAuth } from "@/lib/AuthContext";

export default function UserProfilePage() {
  const { user } = useAuth();
  return <ProfileCard user={user} />;
}