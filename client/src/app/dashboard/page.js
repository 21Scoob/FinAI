// src/app/dashboard/page.js
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { useRouter } from "next/navigation";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user, logout, isReady } = useAuth();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isReady && user === null) {
      router.push("/login");
    }
  }, [user, isReady, router]);

  useEffect(() => {
    if (user) {
      fetch("/api/dashboard")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!isReady || user === null || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white ">
      <Topbar />
      <main className="flex flex-grow flex-col gap-8 p-6 pb-24 md:p-10">
        {/* Sold curent */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-8 shadow-lg">
          <div className="text-sm uppercase tracking-wide text-zinc-400">
            Total Balance
          </div>
          <div className="mt-3 text-4xl font-semibold text-white">
            {data?.balance?.toLocaleString()} RON
          </div>
          <div className="mt-4 text-sm text-zinc-500">
            Disponibil în contul principal
          </div>
        </div>

        {/* Portofoliu & alocare */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-white">Portofoliu</h2>
            <span className="text-sm text-zinc-500">
              Ultima actualizare: azi
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
                +0%
                <span className="text-sm font-normal text-zinc-500">
                  vs luna trecută (Mock)
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
                {data?.investments?.length > 0 ? (
                  data.investments.map((inv) => (
                    <li
                      key={inv.id}
                      className="flex items-center justify-between"
                    >
                      <span>{inv.name}</span>
                      <span className="font-medium text-white">
                        {inv.quantity} units
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-zinc-500">Nu ai investiții încă.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Activitate & obiective */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-white">Activitate</h2>
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
                {data?.recentTransactions?.length > 0 ? (
                  data.recentTransactions.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center justify-between"
                    >
                      <span>{t.description}</span>
                      <span
                        className={
                          t.type === "INCOME"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }
                      >
                        {t.type === "INCOME" ? "+" : "-"}
                        {t.amount} RON
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-zinc-500">Nu ai tranzacții recente.</li>
                )}
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
                {data?.goals?.length > 0 ? (
                  data.goals.map((goal) => (
                    <div key={goal.id}>
                      <div className="flex items-center justify-between text-sm text-zinc-300">
                        <span>{goal.name}</span>
                        <span className="text-white">
                          {Math.round(
                            (goal.currentAmount / goal.targetAmount) * 100
                          )}
                          %
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width: `${Math.min(
                              (goal.currentAmount / goal.targetAmount) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-zinc-500">Nu ai setat obiective.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
