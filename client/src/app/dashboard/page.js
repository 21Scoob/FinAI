// src/app/dashboard/page.js
"use client";

import React, { useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { useRouter } from "next/navigation";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user, logout, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && user === null) {
      router.push("/login");
    }
  }, [user, isReady, router]);

  if (!isReady || user === null) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white">
      <Topbar />
      <main className="flex flex-grow flex-col gap-8 p-6 pb-24 md:p-10">
        {/* Sold curent */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-8 shadow-lg">
          <div className="text-sm uppercase tracking-wide text-zinc-400">
            USD Dollar
          </div>
          <div className="mt-3 text-4xl font-semibold text-white">23.000</div>
          <div className="mt-4 text-sm text-zinc-500">
            Disponibil în contul principal
          </div>
        </div>

        {/* Portofoliu & alocare */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-white">Portofoliu</h2>
            <span className="text-sm text-zinc-500">
              Ultima actualizare: astăzi, 09:45
            </span>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
              <h3 className="text-lg font-semibold text-white">
                Performanță lunară
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Evoluția activelor tale în ultimele 30 de zile.
              </p>
              <div className="mt-6 flex items-baseline gap-2 text-3xl font-semibold text-emerald-400">
                +12.4%
                <span className="text-sm font-normal text-zinc-500">
                  vs luna trecută
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
              <h3 className="text-lg font-semibold text-white">
                Alocare pe clase
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Distribuția investițiilor curente pe categorii.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                <li className="flex items-center justify-between">
                  <span>Acțiuni</span>
                  <span className="font-medium text-white">55%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Obligațiuni</span>
                  <span className="font-medium text-white">28%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Crypto</span>
                  <span className="font-medium text-white">17%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Activitate & obiective */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-white">Activitate</h2>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-lg border border-red-500/70 px-4 py-2 text-sm font-medium text-red-200 transition hover:border-red-400 hover:text-white"
            >
              Logout
            </button>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
              <h3 className="text-lg font-semibold text-white">
                Ultimele tranzacții
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Rezumat al celor mai recente mișcări din cont.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-zinc-300">
                <li className="flex items-center justify-between">
                  <span>Cumpărat TSLA</span>
                  <span className="text-emerald-400">+3.200 USD</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Vândut BTC</span>
                  <span className="text-emerald-400">+1.150 USD</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Retragere cont curent</span>
                  <span className="text-red-400">-500 USD</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
              <h3 className="text-lg font-semibold text-white">
                Obiective 2025
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Urmărește-ți progresul către obiectivele financiare stabilite.
              </p>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-sm text-zinc-300">
                    <span>Fonds de urgență</span>
                    <span className="text-white">70%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-zinc-800">
                    <div className="h-full w-[70%] rounded-full bg-emerald-500"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm text-zinc-300">
                    <span>Avans apartament</span>
                    <span className="text-white">45%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-zinc-800">
                    <div className="h-full w-[45%] rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm text-zinc-300">
                    <span>Portofoliu ETF</span>
                    <span className="text-white">32%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-zinc-800">
                    <div className="h-full w-[32%] rounded-full bg-purple-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
