// src/app/buget/page.js
"use client";

import React from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import BudgetEnvelope from "../components/BugetEnvelope"; // 1. Am importat o componentă nouă

// Date simulate pentru "plicuri"
const mockEnvelopes = [
  {
    icon: "🍔",
    name: "Mâncare",
    allocated: 1000,
    spent: 600,
  },
  {
    icon: "🚌",
    name: "Transport",
    allocated: 300,
    spent: 150,
  },
  {
    icon: "🏠",
    name: "Utilități",
    allocated: 800,
    spent: 800,
  },
  {
    icon: "🎉",
    name: "Distracție",
    allocated: 500,
    spent: 450,
  },
  {
    icon: "🛍️",
    name: "Shopping",
    allocated: 400,
    spent: 120,
  },
];

export default function Buget() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white">
      <Topbar />

      {/* Containerul principal al paginii */}
      <main className="flex-grow p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8">Planul tău lunar</h1>

        {/* --- 1. Secțiunea de Rezumat (Cardurile de sus) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg p-6 shadow-lg">
            <h3 className="text-sm font-medium text-zinc-400">Venit Lunar</h3>
            <p className="text-3xl font-semibold mt-2">5.000 RON</p>
          </div>
          <div className="rounded-lg p-6 shadow-lg">
            <h3 className="text-sm font-medium text-zinc-400">Total Alocat</h3>
            <p className="text-3xl font-semibold mt-2">4.000 RON</p>
          </div>
          <div className="rounded-lg p-6 shadow-lg">
            <h3 className="text-sm font-medium text-zinc-400">
              Obiectiv Economii
            </h3>
            <p className="text-3xl font-semibold mt-2 text-emerald-400">
              1.000 RON
            </p>
          </div>
        </div>

        {/* --- 2. Secțiunea "Plicuri" (Lista de Bugete) --- */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Plicurile tale</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEnvelopes.map((env) => (
              <BudgetEnvelope
                key={env.name}
                icon={env.icon}
                name={env.name}
                allocated={env.allocated}
                spent={env.spent}
              />
            ))}
          </div>
        </div>
      </main>

      {/* --- 3. Butonul Plutitor (Adaugă Plic Nou) --- */}
      <button
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

      <Footer />
    </div>
  );
}
