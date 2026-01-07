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
  // Funcția de Login (reală)
  const login = async (email, password) => {
    console.log("Încercare login cu:", email);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Email sau parolă incorectă");
    }

    // Salvăm user-ul în context/localStorage
    persistUser(data);
    router.push("/dashboard");
  };

  // Funcția de Signup (simulată)
  const signup = async (username, email, password) => {
    console.log("Se apelează API-ul de signup pentru:", email);

    // 1. Apelăm API-ul de backend pe care l-am creat
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // 3. Dacă serverul dă o eroare (ex: email-ul există)
      // Aruncăm o eroare pe care o va prinde 'catch'-ul din Signup.js
      throw new Error(data.error || "A apărut o eroare la înregistrare");
    }

    // 4. SUCCES! Serverul a creat contul și ne-a dat datele noului user
    // Salvăm user-ul în context/localStorage
    persistUser(data);

    // 5. Navigăm utilizatorul către dashboard
    router.push("/dashboard");
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
