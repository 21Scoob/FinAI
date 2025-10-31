"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const goTo = (path) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const mainLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Buget", href: "/buget" },
    { label: "Cheltuieli", href: "/cheltuieli" },
    { label: "Investiții", href: "/investitii" },
  ];

  return (
    <>
      <header className="flex  w-full items-center justify-between p-4 sm:px-6 text-white">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 md:hidden"
            aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-1 h-0.5 w-full bg-white transition-all ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-full bg-white transition-opacity ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-full bg-white transition-all ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
          <button
            className="cursor-pointer text-lg font-semibold sm:text-xl sm:ml-8 mr-10"
            onClick={() => goTo("/")}
          >
            FinAI
          </button>
        </div>

        <nav className="hidden items-center gap-3 md:flex">
          {mainLinks.map((link) => (
            <button
              key={link.href}
              className="cursor-pointer rounded p-2 hover:text-gray-300"
              onClick={() => goTo(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer rounded p-2 
                       transition-all duration-300 ease-in-out 
                       hover:bg-gray-800 
                       hover:shadow-lg hover:shadow-white/10"
            onClick={() => goTo("/login")}
          >
            Login
          </button>
          <button
            className="cursor-pointer rounded p-2 
                      transition-all duration-300 ease-in-out 
                       hover:bg-gray-800 
                       hover:shadow-lg hover:shadow-white/10"
            onClick={() => goTo("/signup")}
          >
            Signup
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 text-white md:hidden">
          <div className="flex items-center p-4 justify-between">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Închide meniul"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative block h-5 w-5">
                <span className="absolute left-0 top-2.5 h-0.5 w-full rotate-45 bg-white" />
                <span className="absolute left-0 top-2.5 h-0.5 w-full -rotate-45 bg-white" />
              </span>
            </button>
          </div>

          <div className="mt-4 flex flex-col items-start p-4 gap-8 text-3xl font-medium">
            <button
              className="hover:text-gray-300"
              onClick={() => goTo("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="hover:text-gray-300"
              onClick={() => goTo("/buget")}
            >
              Buget
            </button>
            <button
              className="hover:text-gray-300"
              onClick={() => goTo("/cheltuieli")}
            >
              Cheltuieli
            </button>
            <button
              className="hover:text-gray-300"
              onClick={() => goTo("/investitii")}
            >
              Investiții
            </button>

            <div className="mt-6 flex w-full flex-col gap-4 text-lg">
              <button
                className="w-full rounded-lg border border-white/20 px-4 py-2 text-left hover:border-white/40"
                onClick={() => goTo("/login")}
              >
                Login
              </button>
              <button
                className="w-full rounded-lg border border-white/20 px-4 py-2 text-left hover:border-white/40"
                onClick={() => goTo("/signup")}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
