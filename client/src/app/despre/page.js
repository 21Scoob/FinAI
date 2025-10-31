// src/app/despre/page.js
"use client";

import React from "react";
import Topbar from "../components/Topbar"; // Am folosit alias-ul @/
import Footer from "../components/Footer"; // Am folosit alias-ul @/
import Image from "next/image";

export default function Despre() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white">
      <Topbar />

      {/* Am modificat <main> pentru a se potrivi unui layout de pagină completă */}
      <main className="flex-grow container mx-auto px-6 py-16 md:py-24">
        {/* Container principal cu 2 coloane */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* --- Coloana Stânga: Text --- */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-indigo-400">
              Misiunea Noastră
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Modelează-ți Destinul Financiar, Fără Efort
            </h1>
            <p className="text-lg text-gray-300 mt-4">
              Construiește-ți viitorul financiar prin setarea unor obiective
              clare, automatizarea finanțelor și investiții înțelepte. Cu
              obiceiuri disciplinate și decizii informate, îți poți contura un
              viitor prosper. FinAI este aici pentru a te ghida.
            </p>
          </div>

          {/* --- Coloana Dreapta: Imagine + Carduri Statisici --- */}
          <div className="flex flex-col gap-8">
            {/* Imaginea */}
            <div className="relative w-full aspect-video rounded-lg shadow-xl overflow-hidden">
              <Image
                src="/image.png"
                alt="Oameni care discuta"
                // 2. Adaugă prop-ul 'fill'
                fill
                // 3. Pune clasa 'object-cover' aici
                className="object-cover"
              />
            </div>
            {/* Secțiunea de statistici */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card Stat 1 (Adaptat pentru FinAI) */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                <p className="text-3xl font-semibold text-indigo-400">
                  Educație
                </p>
                <p className="mt-2 text-zinc-300">
                  Misiunea noastră este de a crește nivelul de inteligență
                  financiară din țară.
                </p>
              </div>

              {/* Card Stat 2 (Adaptat pentru FinAI) */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                <p className="text-3xl font-semibold text-indigo-400">
                  Securitate
                </p>
                <p className="mt-2 text-zinc-300">
                  Datele tale sunt criptate și 100% private. Nu le vindem
                  niciodată.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
