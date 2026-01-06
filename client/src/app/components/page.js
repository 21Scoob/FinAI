"use client";

import React from "react";
import Link from "next/link";
import Topbar from "../components/Topbar";
import Piechart from "../components/Piechart";
import Footer from "../components/Footer";

export default function Cheltuieli() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white">
      <Topbar />
      <main className="flex flex-grow flex-col gap-8 p-6 pb-24 md:p-10">
        <Piechart />
      </main>
      <Footer />
    </div>
  );
}
