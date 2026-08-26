"use client";

import { User } from "@/lib/api";
import { User as UserIcon, Mail, Shield, Calendar, CheckCircle2 } from "lucide-react";

interface ProfileCardProps {
  user: User | null;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500 text-white text-3xl font-black uppercase shadow-md shadow-orange-500/20">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
            ) : (
              user.name ? user.name.charAt(0) : "U"
            )}
          </div>

          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
            <p className="text-sm text-slate-500 font-medium">{user.email}</p>
            <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold text-orange-700 uppercase">
              {user.role} Account
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Shield className="w-4 h-4 text-orange-500" />
              Role Type
            </div>
            <p className="text-sm font-bold text-slate-800 capitalize">{user.role}</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Mail className="w-4 h-4 text-orange-500" />
              Email Address
            </div>
            <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Calendar className="w-4 h-4 text-orange-500" />
              User ID
            </div>
            <p className="text-xs font-mono text-slate-600 truncate">{user.id}</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Account Status
            </div>
            <p className="text-sm font-bold text-emerald-600">Active & Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
}