// src/app/buget/page.js
"use client";

import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import BudgetEnvelope from "../components/BugetEnvelope";
import { useAuth } from "../context/Authcontext";
import { useRouter } from "next/navigation";

export default function Buget() {
  const { user, isReady, logout } = useAuth();
  const router = useRouter();

  // Budget State
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newBudget, setNewBudget] = useState({
    name: "",
    allocated: "",
    icon: "💰",
  });

  // Income State
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [newIncome, setNewIncome] = useState({
    source: "",
    amount: "",
  });

  useEffect(() => {
    if (isReady && user === null) {
      router.push("/login");
    }
  }, [user, isReady, router]);

  const fetchData = React.useCallback(async () => {
    try {
      // 1. Fetch Budgets
      const budgetsRes = await fetch("/api/budgets");
      if (budgetsRes.status === 401) {
        logout();
        return;
      }
      const budgetsData = await budgetsRes.json();
      if (budgetsRes.ok && Array.isArray(budgetsData)) {
        setBudgets(budgetsData);
      } else {
        setBudgets([]);
      }

      // 2. Fetch Transactions (for Income)
      const transRes = await fetch("/api/transactions");
      const transData = await transRes.json();

      if (transRes.ok && Array.isArray(transData)) {
        // Calculate total income for current month
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const income = transData
          .filter((t) => {
            const tDate = new Date(t.date);
            return (
              t.type === "INCOME" &&
              tDate.getMonth() === currentMonth &&
              tDate.getFullYear() === currentYear
            );
          })
          .reduce((acc, t) => acc + t.amount, 0);

        setMonthlyIncome(income);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [logout]);

  useState(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleCreateBudget = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBudget),
      });
      if (res.ok) {
        setShowModal(false);
        setNewBudget({ name: "", allocated: "", icon: "💰" });
        fetchData();
      }
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  const handleCreateIncome = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: newIncome.source,
          amount: newIncome.amount,
          type: "INCOME",
          category: "Salary/Income", // Default category
          date: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setShowIncomeModal(false);
        setNewIncome({ source: "", amount: "" });
        fetchData(); // Refresh data to update "Venit Lunar"
      }
    } catch (error) {
      console.error("Error creating income:", error);
    }
  };

  if (!isReady || user === null || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-black text-white">
        Loading...
      </div>
    );
  }

  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocated, 0);
  const remaining = monthlyIncome - totalAllocated;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white">
      <Topbar />

      <main className="flex-grow p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8">Planul tău lunar</h1>

        {/* --- 1. Secțiunea de Rezumat --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg p-6 shadow-lg bg-zinc-900 border border-zinc-800 relative group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-zinc-400">
                  Venit Lunar
                </h3>
                <p className="text-3xl font-semibold mt-2">
                  {monthlyIncome.toLocaleString()} RON
                </p>
              </div>
              <button
                onClick={() => setShowIncomeModal(true)}
                className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded transition"
              >
                + Adaugă
              </button>
            </div>
          </div>
          <div className="rounded-lg p-6 shadow-lg bg-zinc-900 border border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-400">Total Alocat</h3>
            <p className="text-3xl font-semibold mt-2">
              {totalAllocated.toLocaleString()} RON
            </p>
          </div>
          <div className="rounded-lg p-6 shadow-lg bg-zinc-900 border border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-400">
              Rămas de alocat
            </h3>
            <p
              className={`text-3xl font-semibold mt-2 ${
                remaining >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {remaining.toLocaleString()} RON
            </p>
          </div>
        </div>

        {/* --- 2. Secțiunea "Plicuri" --- */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Plicurile tale</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets.length > 0 ? (
              budgets.map((env) => (
                <BudgetEnvelope
                  key={env.id}
                  icon={env.icon}
                  name={env.name}
                  allocated={env.allocated}
                  spent={env.spent}
                />
              ))
            ) : (
              <p className="text-zinc-500">Nu ai creat niciun plic de buget.</p>
            )}
          </div>
        </div>
      </main>

      {/* --- 3. Butonul Plutitor --- */}
      <button
        onClick={() => setShowModal(true)}
        title="Adaugă un Plic Nou"
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      {/* --- Modal Adăugare Plic --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6 border border-zinc-800 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
              Adaugă Plic Nou
            </h2>
            <form onSubmit={handleCreateBudget} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Nume</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg bg-zinc-800 p-2 text-white border border-zinc-700 focus:border-blue-500 outline-none"
                  value={newBudget.name}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Sumă Alocată
                </label>
                <input
                  type="number"
                  required
                  className="w-full rounded-lg bg-zinc-800 p-2 text-white border border-zinc-700 focus:border-blue-500 outline-none"
                  value={newBudget.allocated}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, allocated: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-zinc-800 p-2 text-white border border-zinc-700 focus:border-blue-500 outline-none"
                  value={newBudget.icon}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, icon: e.target.value })
                  }
                />
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
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                >
                  Salvează
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Modal Adăugare Venit --- */}
      {showIncomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6 border border-zinc-800 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Adaugă Venit</h2>
            <form onSubmit={handleCreateIncome} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Sursă (ex: Salariu)
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg bg-zinc-800 p-2 text-white border border-zinc-700 focus:border-blue-500 outline-none"
                  value={newIncome.source}
                  onChange={(e) =>
                    setNewIncome({ ...newIncome, source: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Sumă</label>
                <input
                  type="number"
                  required
                  className="w-full rounded-lg bg-zinc-800 p-2 text-white border border-zinc-700 focus:border-blue-500 outline-none"
                  value={newIncome.amount}
                  onChange={(e) =>
                    setNewIncome({ ...newIncome, amount: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowIncomeModal(false)}
                  className="px-4 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800"
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  Adaugă
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
