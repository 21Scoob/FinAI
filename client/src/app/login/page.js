// src/app/login/page.js (sau unde ai tu fișierul Login.js)
"use client";
import React, { useState } from "react";
import Footer from "../components/Footer.js";
import Link from "next/link"; // Nu uita să imporți Link
import Topbar from "../components/Topbar";
import { useAuth } from "../context/Authcontext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Completează emailul și parola.");
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : null;
      setError(message || "Autentificarea a eșuat.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white">
      <Topbar />
      <main className="flex flex-grow flex-col justify-center items-center p-4 mb-32 mt-8">
        {/* Acesta este cardul principal de login */}
        <div className="w-full max-w-sm bg-zinc-900 rounded-lg p-8 shadow-xl">
          {/* Logo-ul tău */}
          <LogoIcon className="mx-auto h-10 w-auto text-white mb-6" />

          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Sign in
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Secțiunea Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Your email address"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Your password"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <p
                className="text-sm text-red-500 text-center"
                aria-live="polite"
              >
                {error}
              </p>
            )}

            {/* Butonul Continue */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-white text-black font-semibold rounded-md shadow-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
              >
                {isLoading ? "Se conectează..." : "Continue"}
              </button>
            </div>
          </form>

          {/* Separatorul "OR" */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-zinc-700"></div>
            <span className="mx-4 text-zinc-400 text-sm">OR</span>
            <div className="flex-grow border-t border-zinc-700"></div>
          </div>

          {/* Butoanele Social Media */}
          <div className="space-y-4">
            <button
              type="button"
              className=" cursor-pointer w-full flex items-center justify-center gap-3 py-2 px-4 bg-zinc-800 border border-zinc-700 rounded-md text-white hover:bg-zinc-700 transition-colors"
            >
              <GoogleIcon className="h-5 w-5" />
              Continue with Google
            </button>
            <button
              type="button"
              className=" cursor-pointer w-full flex items-center justify-center gap-3 py-2 px-4 bg-zinc-800 border border-zinc-700 rounded-md text-white hover:bg-zinc-700 transition-colors"
            >
              <GitHubIcon className="h-5 w-5" />
              Continue with GitHub
            </button>
            <button
              type="button"
              className=" cursor-pointer w-full flex items-center justify-center gap-3 py-2 px-4 bg-zinc-800 border border-zinc-700 rounded-md text-white hover:bg-zinc-700 transition-colors"
            >
              <AppleIcon className="h-5 w-5" />
              Continue with Apple
            </button>
          </div>

          {/* Link-ul de Sign Up */}
          <p className="text-center mt-8 text-sm text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>

      {/* Footer-ul tău rămâne la bază */}
      <Footer />
    </div>
  );
}

// --- Pictograme SVG (adăugate aici pentru simplitate) ---

function LogoIcon(props) {
  // Acesta e un placeholder; înlocuiește-l cu SVG-ul logo-ului tău
  return (
    <svg fill="none" viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M24 4L4 24l20 20 20-20L24 4Zm0 35.172L8.828 24 24 8.828 39.172 24 24 39.172Z"
      />
    </svg>
  );
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691c-2.213 4.013-3.44 8.636-3.44 13.636s1.227 9.623 3.44 13.636l7.63-5.919C13.205 33.297 12 28.841 12 24s1.205-9.297 1.936-12.364l-7.63-5.945Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-4.819C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-7.63 5.919C8.514 39.636 15.694 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 4.819C39.756 34.909 42 30.021 42 24c0-2.678-.42-5.253-1.187-7.661l-7.013 5.428Z"
      />
    </svg>
  );
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function AppleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.026 15.698c-.52 0-.916.18-1.188.54l-.004.006c-.272.36-.408.84-.408 1.44s.136.96.408 1.44c.272.36.668.54 1.188.54.52 0 .916-.18 1.188-.54.272-.36.408-.84.408-1.44s-.136-.96-.408-1.44c-.272-.36-.668-.54-1.188-.54m2.094-7.242c.048-.528.456-.9.816-.948.024-.012.216-.12.456-.228.312-.132.588-.3.816-.516.204-.192.324-.432.36-.72a.864.864 0 0 0-.252-.828c-.288-.276-.636-.408-1.044-.408-.552 0-.996.168-1.332.504-.336.336-.516.732-.54 1.188-.012.528-.42.888-.78.936-.024.012-.204.12-.432.228-.312.132-.588.3-.816.516-.204.192-.324.432-.36.72.012.504.264.804.756.9.228.048.492.072.792.072.552 0 .996-.168 1.332-.504.336-.336.516-.732.54-1.188m-2.118 7.218c.888.012 1.608-.288 2.16-.876.54-.588.816-1.392.816-2.412 0-1.044-.276-1.884-.828-2.52-.552-.636-1.308-.954-2.268-.954-.864 0-1.584.288-2.16.864-.576.576-.864 1.368-.864 2.376 0 1.008.288 1.812.864 2.412.576.6 1.296.9 2.184.9M12.026 3C10.25 3 8.666 3.864 7.274 5.592c-1.392 1.728-2.088 3.864-2.088 6.408 0 2.28.624 4.2 1.872 5.76.624.78 1.332 1.368 2.124 1.764.792.396 1.56.594 2.304.594.48 0 .912-.072 1.296-.216.384-.144.684-.264.9-.36.216-.096.384-.168.504-.216s.18-.072.18-.072a.56.56 0 0 0 .144-.432c0-.12-.048-.216-.144-.288-.096-.072-.24-.108-.432-.108-.264 0-.576.096-.936.288-.36.192-.684.336-.972.432-.288.096-.54.144-.756.144-.504 0-.96-.144-1.368-.432-.408-.288-.732-.732-.972-1.332-.24-.6-.36-1.356-.36-2.268 0-.912.12-1.668.36-2.268.24-.6.564-1.056.972-1.368.408-.312.864-.468 1.368-.468.216 0 .468.048.756.144.288.096.612.24.972.432.36.192.672.288.936.288.192 0 .336-.036.432-.108.096-.072.144-.168.144-.288a.56.56 0 0 0-.144-.432s-.06-.024-.18-.072c-.12-.048-.288-.12-.504-.216-.216-.096-.516-.216-.9-.36-.384-.144-.816-.216-1.296-.216-.744 0-1.512.198-2.304.594-.792.396-1.5.984-2.124 1.764-1.248 1.56-1.872 3.48-1.872 5.76 0 2.544.696 4.68 2.088 6.408C8.666 20.136 10.25 21 12.026 21s3.378-.864 4.77-2.592c1.392-1.728 2.088-3.864 2.088-6.408 0-2.28-.624-4.2-1.872-5.76C15.8 4.452 14.288 3.588 13.01 3.252c.204-.336.306-.732.306-1.188 0-.552-.18-1.008-.54-1.368-.36-.36-.816-.54-1.368-.54-.552 0-1.008.18-1.368.54-.36.36-.54.816-.54 1.368 0 .456.108.852.324 1.188C12.566 3.084 12.314 3.03 12.026 3" />
    </svg>
  );
}
