"use client";

import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 md:py-32  text-white">
      {/* Titlul principal (H1) - mare și îngroșat */}
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
        Controlează-ți viitorul financiar cu FinAI
      </h1>

      {/* Sub-titlu (Descrierea) - mai mic, culoare mai gri */}
      <p className="mt-6 text-lg sm:text-xl max-w-2xl text-gray-300">
        Platforma ta inteligentă pentru a-ți urmări cheltuielile, planifica
        bugetul și primi sfaturi de investiții bazate pe inteligență
        artificială. Preia controlul.
      </p>

      {/* Butoanele Call to Action (CTA) */}
      <div className="mt-10 flex items-center justify-center gap-x-6">
        {/* Butonul principal (Primary) */}
        <Link
          href="/signup"
          className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Începe acum (Gratuit)
        </Link>

        {/* Butonul secundar (Secundary) - poate un link "Află mai multe" */}
        <Link
          href="/despre" // Poți crea pagina asta mai târziu
          className="text-sm font-semibold leading-6 text-gray-100 hover:text-gray-300"
        >
          Află mai multe <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
