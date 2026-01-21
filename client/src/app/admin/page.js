"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { useRouter } from "next/navigation";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function AdminPage() {
  const { user, isReady } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isReady) {
      if (!user || user.role !== "ADMIN") {
        router.push("/dashboard");
        return;
      }
      fetchUsers();
    }
  }, [user, isReady, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (
      !confirm(
        "Sigur vrei să ștergi acest utilizator? Această acțiune este ireversibilă.",
      )
    )
      return;

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      alert("Eroare la ștergere: " + err.message);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      const updatedUser = await res.json();
      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, role: updatedUser.role } : u,
        ),
      );
    } catch (err) {
      alert("Eroare la actualizare rol: " + err.message);
    }
  };

  if (!isReady || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      <Topbar />
      <main className="flex-grow p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8">
          Admin Dashboard - Utilizatori
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-900 text-zinc-200 uppercase">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-zinc-950/50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-900/50 transition">
                  <td className="px-6 py-4">{u.id}</td>
                  <td className="px-6 py-4 font-medium text-white">
                    {u.username}
                  </td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-400 hover:text-red-300 hover:underline disabled:opacity-50"
                      disabled={u.id === user.id} // Nu te poți șterge pe tine
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
