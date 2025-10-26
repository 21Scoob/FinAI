"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  return (
    <header className=" w-full h-16 flex items-center justify-between px-4 sm:px-6 text-white">
      {/* Hamburger Menu on Mobile */}
      <div className="flex items-center ml-8 mr-10 ">
        <button
          className="text-lg sm:text-xl font-semibold cursor-pointer"
          onClick={() => router.push("/")}
        >
          FinAI
        </button>
      </div>
      {/*Buget, Cheltuieli, Investitii*/}
      <div className="flex items-center gap-3">
        <button
          className=" p-2 rounded hover:text-gray-300 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </button>
        <button
          className=" p-2 rounded hover:text-gray-300 cursor-pointer"
          onClick={() => router.push("/buget")}
        >
          Buget
        </button>
        <button
          className=" p-2 rounded hover:text-gray-300 cursor-pointer"
          onClick={() => router.push("/cheltuieli")}
        >
          Cheltuieli
        </button>
        <button
          className=" p-2 rounded hover:text-gray-300 cursor-pointer"
          onClick={() => router.push("/investitii")}
        >
          Investitii
        </button>
      </div>
      {/* User Avatar */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded hover:bg-gray-800 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
        <button
          className="p-2 rounded hover:bg-gray-800 cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Signup
        </button>
      </div>
    </header>
  );
}
