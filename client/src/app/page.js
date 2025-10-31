"use client";

import React, { useState } from "react";
import Topbar from "./components/Topbar.js";
import Footer from "./components/Footer.js";
import HeroSection from "./components/Herosection.js";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Starea meniului:", !isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black ">
      <Topbar onMenuClick={toggleMenu} />
      <main className="flex-grow md:p-4 mb-48 mt-10 justify-center items-center">
        <div className="m-12">
          <HeroSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
