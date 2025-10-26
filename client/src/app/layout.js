import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Importă AuthProvider-ul
// (Dacă nu merge '@/', folosește calea relativă: "../context/AuthContext")
import { AuthProvider } from "./context/Authcontext.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FinAI",
  description: "Asistentul tău financiar", // Am actualizat descrierea
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. Îmbracă {children} în AuthProvider */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
