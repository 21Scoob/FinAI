"use client";

import React from "react";
import Link from "next/link";
import Topbar from "../components/Topbar";
import Investchart from "../components/Investchart";
import Footer from "../components/Footer";

export default function Investitii() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white">
      <Topbar />
      <main className="flex flex-grow p-10">
        <Investchart />
      </main>
      <Footer />
    </div>
  );
}
