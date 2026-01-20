// src/app/investitii/page.js
"use client";

import React, { useEffect, useState, useCallback } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/Authcontext";
import { useRouter } from "next/navigation";

export default function Investitii() {
  const { user, isReady, logout } = useAuth();
  const router = useRouter();

  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    type: "ETF",
    amount: "",
    yieldRate: "",
  });

  useEffect(() => {
    if (isReady && user === null) {
      router.push("/login");
    }
  }, [user, isReady, router]);

  const fetchInvestments = useCallback(async () => {
    try {
      const res = await fetch("/api/investments");
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setInvestments(data);
      } else {
        setInvestments([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching investments:", error);
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    if (user) {
      fetchInvestments();
    }
  }, [user, fetchInvestments]);

  const handleCreateInvestment = async (e) => {
    e.preventDefault();
    if (isSaving) return; // Prevent double submit

    setIsSaving(true);
    try {
      const res = await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInvestment),
      });
      if (res.ok) {
        setShowModal(false);
        setNewInvestment({ name: "", type: "ETF", amount: "", yieldRate: "" });
        await fetchInvestments();
      }
    } catch (error) {
      console.error("Error creating investment:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteInvestment = async (id) => {
    if (!confirm("Ești sigur că vrei să ștergi această investiție?")) return;

    try {
      const res = await fetch(`/api/investments?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchInvestments();
      }
    } catch (error) {
      console.error("Error deleting investment:", error);
    }
  };

  if (!isReady || user === null || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-black text-white">
        Loading...
      </div>
    );
  }

  // Calculăm totalurile
  const totalInvested = investments.reduce((acc, inv) => acc + inv.amount, 0);
  const totalCurrentValue = investments.reduce(
    (acc, inv) => acc + inv.currentValue,
    0,
  );
  const totalProfit = totalCurrentValue - totalInvested;
  const overallYield =
    totalInvested > 0 ? ((totalProfit / totalInvested) * 100).toFixed(2) : 0;

  const investmentTypes = [
    "ETF",
    "Acțiuni",
    "Obligațiuni",
    "Crypto",
    "Fond Mutual",
    "Altele",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white">
      <Topbar />

      <main className="flex-grow p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Investițiile Tale</h1>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition"
          >
            + Adaugă Investiție
          </button>
        </div>

        {/* Rezumat Portofoliu */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="rounded-lg p-6 shadow-lg bg-zinc-900 border border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-400">
              Total Investit
            </h3>
            <p className="text-3xl font-semibold mt-2">
              {totalInvested.toLocaleString()} RON
            </p>
          </div>
          <div className="rounded-lg p-6 shadow-lg bg-zinc-900 border border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-400">
              Valoare Curentă
            </h3>
            <p className="text-3xl font-semibold mt-2 text-blue-400">
              {totalCurrentValue.toLocaleString()} RON
            </p>
          </div>
          <div className="rounded-lg p-6 shadow-lg bg-zinc-900 border border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-400">
              Profit/Pierdere
            </h3>
            <p
              className={`text-3xl font-semibold mt-2 ${
                totalProfit >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {totalProfit >= 0 ? "+" : ""}
              {totalProfit.toLocaleString()} RON
            </p>
          </div>
          <div className="rounded-lg p-6 shadow-lg bg-zinc-900 border border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-400">
              Randament Total
            </h3>
            <p
              className={`text-3xl font-semibold mt-2 ${
                overallYield >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {overallYield >= 0 ? "+" : ""}
              {overallYield}%
            </p>
          </div>
        </div>

        {/* Lista Investițiilor */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-lg backdrop-blur">
          <h2 className="text-xl font-semibold mb-6">Portofoliu</h2>
          {investments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                    <th className="pb-4">Nume</th>
                    <th className="pb-4">Tip</th>
                    <th className="pb-4 text-right">Sumă Investită</th>
                    <th className="pb-4 text-right">Randament</th>
                    <th className="pb-4 text-right">Valoare Curentă</th>
                    <th className="pb-4 text-right">Profit</th>
                    <th className="pb-4 text-right">Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition"
                    >
                      <td className="py-4 font-medium">{inv.name}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
                          {inv.type}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {inv.amount.toLocaleString()} RON
                      </td>
                      <td className="py-4 text-right text-blue-400">
                        {inv.yieldRate}%/an
                      </td>
                      <td className="py-4 text-right font-medium">
                        {inv.currentValue.toLocaleString()} RON
                      </td>
                      <td
                        className={`py-4 text-right font-medium ${
                          inv.profit >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {inv.profit >= 0 ? "+" : ""}
                        {inv.profit.toLocaleString()} RON
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleDeleteInvestment(inv.id)}
                          className="px-3 py-1 text-sm bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded transition"
                        >
                          Șterge
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-zinc-500 text-center py-8">
              Nu ai adăugat nicio investiție încă. Apasă butonul de mai sus
              pentru a începe!
            </p>
          )}
        </div>
      </main>

      {/* Modal Adăugare Investiție */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6 border border-zinc-800 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
              Adaugă Investiție
            </h2>
            <form onSubmit={handleCreateInvestment} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Nume Investiție
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: S&P 500 ETF"
                  className="w-full rounded-lg bg-zinc-800 p-2 text-white border border-zinc-700 focus:border-emerald-500 outline-none"
                  value={newInvestment.name}
                  onChange={(e) =>
                    setNewInvestment({ ...newInvestment, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Tip</label>
                <select
                  className="w-full rounded-lg bg-zinc-800 p-2 text-white border border-zinc-700 focus:border-emerald-500 outline-none"
                  value={newInvestment.type}
                  onChange={(e) =>
                    setNewInvestment({ ...newInvestment, type: e.target.value })
                  }
                >
                  {investmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Sumă Investită (RON)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="ex: 5000"
                  className="w-full rounded-lg bg-zinc-800 p-2 text-white border border-zinc-700 focus:border-emerald-500 outline-none"
                  value={newInvestment.amount}
                  onChange={(e) =>
                    setNewInvestment({
                      ...newInvestment,
                      amount: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Randament Anual Estimat (%)
                </label>
                <input
                  type="number"
                  required
                  step="0.1"
                  placeholder="ex: 8"
                  className="w-full rounded-lg bg-zinc-800 p-2 text-white border border-zinc-700 focus:border-emerald-500 outline-none"
                  value={newInvestment.yieldRate}
                  onChange={(e) =>
                    setNewInvestment({
                      ...newInvestment,
                      yieldRate: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-zinc-500 mt-1">
                  De exemplu: 8 pentru un randament de 8% pe an
                </p>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800"
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Se salvează..." : "Salvează"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
