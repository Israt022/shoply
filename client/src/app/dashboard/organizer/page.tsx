"use client";

import { useAuth } from "@/lib/AuthContext";
import ProfileCard from "@/component/dashboard/ProfileCard";

export default function OrganizerPage() {
  const { user } = useAuth();
  return <ProfileCard user={user} />;
}
