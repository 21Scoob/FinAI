// src/components/BudgetEnvelope.js
"use client";

import React from "react";
import Link from "next/link";
import Router from "next/router";

export default function BudgetEnvelope({ icon, name, allocated, spent }) {
  const remaining = allocated - spent;
  const progressPercent = (spent / allocated) * 100;

  // Stabilește culoarea textului "rămas"
  let remainingColor = "text-emerald-400"; // Verde (OK)
  if (progressPercent > 75 && progressPercent < 100) {
    remainingColor = "text-yellow-400"; // Galben (Atenție)
  } else if (progressPercent >= 100) {
    remainingColor = "text-red-400"; // Roșu (Depășit)
  }

  return (
    <div className=" rounded-lg p-5 shadow-lg flex flex-col justify-between">
      {/* Partea de sus: Nume și Iconiță */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="text-lg font-semibold">{name}</span>
        </div>
        <button className="text-zinc-500 hover:text-white">...</button>
      </div>

      {/* Partea de mijloc: Suma rămasă */}
      <div className="my-2">
        <p className={`text-3xl font-bold ${remainingColor}`}>
          {remaining < 0 ? `-${Math.abs(remaining)}` : remaining} RON{" "}
          <span className="text-lg">rămași</span>
        </p>
        <p className="text-sm text-zinc-400 mt-1">
          din {allocated} RON alocați
        </p>
      </div>

      {/* Partea de jos: Bara de progres */}
      <div className="mt-4">
        <div className="w-full bg-zinc-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              remainingColor === "text-red-400" ? "bg-red-500" : "bg-blue-600"
            }`}
            style={{ width: `${Math.min(progressPercent, 100)}%` }} // Limitează la 100%
          ></div>
        </div>
      </div>
    </div>
  );
}
