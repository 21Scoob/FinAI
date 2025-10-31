"use client";

import Topbar from "../components/Topbar";

import Footer from "../components/Footer";

import React from "react";

export default function Termeni() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white">
      <Topbar />

      <main className="flex-grow container mx-auto px-6 py-16 md:py-24">
        {/* Container pentru text, centrat și cu lățime maximă pentru lizibilitate */}
        <div className="max-w-4xl mx-auto">
          {/* Antetul paginii */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Termeni și Condiții FinAI
          </h1>
          <p className="text-lg text-zinc-400 mt-4">
            Ultima actualizare: 31 Octombrie 2025
          </p>

          {/* Container pentru secțiunile de text */}
          <div className="prose prose-invert prose-lg max-w-none mt-12 space-y-8 text-zinc-300">
            {/* 1. Acceptarea Termenilor */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                1. Acceptarea Termenilor
              </h2>
              <p>
                Bine ai venit la FinAI! Acești Termeni și Condiții Termenii
                guvernează accesul și utilizarea aplicației noastre web
                Serviciul. Prin accesarea sau utilizarea Serviciului nostru,
                ești de acord să respecți acești Termeni.
              </p>
              <p>
                Dacă nu ești de acord cu acești Termeni, te rugăm să nu
                utilizezi Serviciul.
              </p>
            </section>

            {/* 2. Descrierea Serviciului */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                2. Descrierea Serviciului
              </h2>
              <p>
                FinAI este o platformă de educație financiară care permite
                utilizatorilor să își urmărească veniturile, cheltuielile,
                bugetele și investițiile. Serviciul include și o componentă de
                Inteligență Artificială Asistentul AI care oferă analize și
                sugestii financiare personalizate, bazate pe datele introduse de
                utilizator.
              </p>
            </section>

            {/* 3. Disclaimer Major: Asistentul AI (FOARTE IMPORTANT) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                3. Disclaimer Important: Rolul Asistentului AI
              </h2>

              {/* Am folosit un blockquote pentru a scoate în evidență disclaimer-ul */}
              <blockquote className="border-l-4 border-red-500 bg-zinc-900 p-4 rounded-r-lg">
                <p className="font-semibold text-xl text-white">
                  Asistentul AI NU oferă consultanță financiară profesională.
                </p>
                <p className="mt-2 text-zinc-200">
                  Sugestiile generate de Asistentul AI sunt oferite
                  <strong> strict în scop educațional și informativ</strong>.
                  Acestea sunt generate automat și nu constituie sfaturi de
                  investiții, consiliere juridică sau fiscală.
                </p>
                <p className="mt-2 text-zinc-200">
                  FinAI <strong>nu este responsabil</strong> pentru nicio
                  decizie financiară pe care o iei pe baza sugestiilor
                  Asistentului AI. Orice acțiune este pe propriul tău risc. Îți
                  recomandăm să consulți un consultant financiar acreditat
                  înainte de a lua decizii majore.
                </p>
              </blockquote>
            </section>

            {/* 4. Conturile Utilizatorilor */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                4. Conturile Utilizatorilor
              </h2>
              <ul className="list-disc list-outside pl-6 space-y-2">
                <li>
                  <strong>Eligibilitate:</strong> Pentru a crea un cont, trebuie
                  să ai cel puțin 18 ani.
                </li>
                <li>
                  <strong>Acuratețea Datelor:</strong> Ești de acord să
                  furnizezi informații corecte. Acuratețea sfaturilor AI depinde
                  direct de acuratețea datelor pe care le introduci.
                </li>
                <li>
                  <strong>Securitatea Contului:</strong> Ești responsabil pentru
                  păstrarea confidențialității parolei tale și pentru toate
                  activitățile din contul tău.
                </li>
              </ul>
            </section>

            {/* 5. Reguli de Utilizare */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                5. Reguli de Utilizare
              </h2>
              <p>
                Ești de acord să nu folosești Serviciul pentru niciun scop
                ilegal, fraudulos sau pentru a introduce date false sau
                înșelătoare.
              </p>
            </section>

            {/* 6. Limitarea Răspunderii */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                6. Limitarea Răspunderii
              </h2>
              <p>
                În măsura maximă permisă de lege, FinAI nu va fi răspunzător
                pentru nicio pierdere financiară sau daună care rezultă din
                utilizarea Serviciului sau a informațiilor oferite de Asistentul
                AI.
              </p>
            </section>

            {/* 7. Încetarea */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                7. Încetarea Serviciului
              </h2>
              <p>
                Ne rezervăm dreptul de a suspenda sau șterge contul tău dacă
                încalci acești Termeni. Poți înceta utilizarea serviciului
                oricând prin ștergerea contului tău.
              </p>
            </section>

            {/* 8. Modificări ale Termenilor */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                8. Modificări ale Termenilor
              </h2>
              <p>
                Putem revizui acești Termeni oricând. Continuarea utilizării
                Serviciului după intrarea în vigoare a modificărilor reprezintă
                acceptul tău.
              </p>
            </section>

            {/* 9. Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">9. Contact</h2>
              <p>
                Dacă ai întrebări legate de acești Termeni și Condiții, te rugăm
                să ne contactezi la{" "}
                <a
                  href="mailto:termeni@finai.app"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  termeni@finai.app
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
