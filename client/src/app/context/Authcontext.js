// src/context/AuthContext.js
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 1. Creăm Contextul
// Acesta este "rucsacul" în sine. Inițial e gol.
const AuthContext = createContext(null);

const STORAGE_KEY = "finai:user";

const scheduleMicrotask =
  typeof queueMicrotask === "function"
    ? queueMicrotask
    : (callback) => Promise.resolve().then(callback);

const readStoredUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue);
  } catch (error) {
    console.warn("AuthContext: stored user format invalid, clearing.");
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

// 2. Creăm "Provider-ul" (Furnizorul)
// Aceasta este componenta care VA ȚINE "rucsacul" și îl va oferi copiilor săi.
// Ea va gestiona toată logica.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Starea inițială este identică pe server și client
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = readStoredUser();

    if (storedUser) {
      scheduleMicrotask(() => {
        setUser(storedUser);
        setIsReady(true);
      });
      return;
    }

    scheduleMicrotask(() => {
      setIsReady(true);
    });
  }, []);

  const persistUser = (userData) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }
  };

  const clearUser = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  // --- Funcțiile pe care le oferim ---

  // Funcția de Login (simulată)
  const login = async (email, password) => {
    console.log("Încercare login cu:", email);

    // --- SIMULARE BACKEND ---
    // Aici, în viitor, vei face un fetch() către API-ul tău
    if (email === "test@test.com" && password === "123") {
      const fakeUserData = { id: 1, email: "test@test.com" };
      persistUser(fakeUserData); // 👈 Am salvat user-ul în "rucsac" + localStorage
      router.push("/dashboard"); // Navigăm spre dashboard
    } else {
      // Aruncăm o eroare pe care o vom prinde în Login.js
      throw new Error("Email sau parolă incorectă");
    }
    // --- SFÂRȘIT SIMULARE ---
  };

  // Funcția de Signup (simulată)
  const signup = async (email, password) => {
    console.log("Încercare signup cu:", email);

    // --- SIMULARE BACKEND ---
    // Aici, în viitor, vei face un fetch() POST către /api/register
    const fakeUserData = { id: 2, email: email };
    persistUser(fakeUserData); // 👈 Am salvat noul user în "rucsac" + localStorage
    router.push("/dashboard"); // Navigăm spre dashboard
    // --- SFÂRȘIT SIMULARE ---
  };

  // Funcția de Logout
  const logout = () => {
    clearUser(); // 👈 Golim user-ul din "rucsac" + localStorage
    router.push("/login"); // Navigăm spre login
  };

  // 3. Oferim valorile
  // Aici spunem ce punem efectiv în "rucsac":
  // starea (user) și funcțiile (login, signup, logout)
  const value = {
    user,
    isReady,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 4. Creăm un Hook personalizat (pentru ușurință)
// Acesta e un shortcut. În loc să importăm `useContext` și `AuthContext`
// în fiecare fișier, vom importa doar `useAuth()`.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
