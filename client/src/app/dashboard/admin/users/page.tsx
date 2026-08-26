"use client";

import { useEffect, useState } from "react";
import { authApi, User } from "@/lib/api";
import { Users, UserCheck, Search, Mail, Shield } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await authApi.getUsers();
        setUsers(res.data || []);
      } catch (err: any) {
        toast.error("Failed to load registered users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Registered Users</h1>
          <p className="text-xs text-slate-500 mt-1">View registered platform users, roles, and emails.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-xs outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 rounded-2xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-2">
          <Users className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-900">No users found</h3>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">User ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-xs uppercase">
                        {u.name ? u.name.charAt(0) : "U"}
                      </div>
                      <span className="font-bold text-slate-900">{u.name}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">{u.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          u.role === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : u.role === "Seller"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[10px] text-slate-400">{u.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
