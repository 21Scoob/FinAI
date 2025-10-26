// src/components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-700 bg-black text-gray-400 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
        {/* Partea stângă: Copyright */}
        <div className="mb-4 sm:mb-0">
          <p>© {new Date().getFullYear()} FinAI. Toate drepturile rezervate.</p>
        </div>

        {/* Partea dreaptă: Link-uri */}
        <div className="flex items-center gap-x-6">
          <Link href="/despre" className="hover:text-white transition-colors">
            Despre Noi
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Confidențialitate
          </Link>
          <Link href="/termeni" className="hover:text-white transition-colors">
            Termeni și Condiții
          </Link>
        </div>
      </div>
    </footer>
  );
}
