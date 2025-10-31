"use client";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function Confidențialitate() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-white">
      <Topbar />
      <main className="flex flex-grow flex-col gap-8 p-6 pb-24 md:p-10">
        {/* Container pentru text, centrat și cu lățime maximă pentru lizibilitate */}
        <div className="max-w-4xl mx-auto">
          {/* Antetul paginii */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Politică de Confidențialitate FinAI
          </h1>
          <p className="text-lg text-zinc-400 mt-4">
            Ultima actualizare: 31 Octombrie 2025
          </p>

          {/* Container pentru secțiunile de text */}
          <div className="prose prose-invert prose-lg max-w-none mt-12 space-y-8 text-zinc-300">
            {/* 1. Introducere */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                1. Introducere
              </h2>
              <p>
                Bun venit la FinAI! Misiunea noastră este de a îmbunătăți
                educația financiară prin tehnologie. Această Politică de
                Confidențialitate explică ce informații colectăm, cum le folosim
                și cum le protejăm atunci când folosești aplicația noastră web
                Serviciul.
              </p>
              <p>
                Prin utilizarea Serviciului nostru, ești de acord cu colectarea
                și utilizarea informațiilor în conformitate cu această politică.
                Pentru noi, încrederea ta este fundamentală.
              </p>
            </section>

            {/* 2. Informațiile pe care le Colectăm */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                2. Informațiile pe care le Colectăm
              </h2>

              <h3 className="text-xl font-medium text-white pt-2">
                A. Informații pe care ni le oferi direct:
              </h3>
              <ul className="list-disc list-outside pl-6 space-y-2">
                <li>
                  <strong>Date de Cont:</strong> Când îți creezi un cont,
                  colectăm adresa ta de e-mail și parola (pe care o stocăm
                  întotdeauna într-un format criptat/hashed).
                </li>
                <li>
                  <strong>Date Financiare Personale:</strong> Acestea sunt
                  datele pe care le introduci manual în aplicație pentru a
                  beneficia de serviciile noastre. Acestea includ: Venituri,
                  Cheltuieli, Bugete și Investiții.
                </li>
              </ul>

              <h3 className="text-xl font-medium text-white pt-2">
                B. Informații pe care le colectăm automat:
              </h3>
              <ul className="list-disc list-outside pl-6 space-y-2">
                <li>
                  <strong>Date de Utilizare:</strong> Colectăm informații
                  anonime despre cum interacționezi cu aplicația (ex: ce funcții
                  folosești). Acest lucru ne ajută să înțelegem ce este util și
                  ce trebuie îmbunătățit.
                </li>
                <li>
                  <strong>Cookies și Stocare Locală:</strong> Folosim stocarea
                  locală (`localStorage`) din browser-ul tău pentru a te menține
                  conectat (a gestiona sesiunea de autentificare).
                </li>
              </ul>
            </section>

            {/* 3. Cum Folosim Informațiile Tale */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                3. Cum Folosim Informațiile Tale
              </h2>
              <p>Folosim datele tale în următoarele scopuri:</p>
              <ul className="list-disc list-outside pl-6 space-y-2">
                <li>
                  <strong>Pentru a-ți oferi Serviciul:</strong> Acesta este
                  scopul principal. Folosim datele tale financiare pentru a-ți
                  afișa graficele, a-ți urmări bugetele și a-ți arăta istoricul
                  tranzacțiilor.
                </li>
                <li>
                  <strong>Pentru a genera Recomandări AI Personalizate:</strong>{" "}
                  Datele tale financiare (venituri, cheltuieli, investiții) sunt
                  trimise securizat către un serviciu API terț de Inteligență
                  Artificială pentru a-ți oferi sfaturi. Furnizorii noștri sunt
                  obligați contractual să NU își antreneze modelele pe datele
                  tale. Noi NU trimitem informații de identificare personală
                  (cum ar fi e-mailul tău) împreună cu aceste date.
                </li>
                <li>
                  <strong>Pentru a ne îmbunătăți Serviciul:</strong> Analizăm
                  datele de utilizare agregate și anonimizate pentru a repara
                  erori și a dezvolta funcții noi.
                </li>
              </ul>
            </section>

            {/* 4. Cum Îți Protejăm Datele (Securitate) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                4. Cum Îți Protejăm Datele (Securitate)
              </h2>
              <p>
                Luăm securitatea în serios. Implementăm măsuri standard în
                industrie pentru a-ți proteja datele:
              </p>
              <ul className="list-disc list-outside pl-6 space-y-2">
                <li>
                  <strong>Criptarea:</strong> Conexiunea ta la serverul nostru
                  este criptată folosind SSL (HTTPS).
                </li>
                <li>
                  <strong>Parole:</strong> Parola ta nu este stocată niciodată
                  în text clar. Folosim algoritmi moderni de hashing.
                </li>
                <li>
                  <strong>Baza de Date:</strong> Datele tale financiare sunt
                  stocate într-o bază de date securizată (PostgreSQL) protejată
                  de acces neautorizat.
                </li>
              </ul>
            </section>

            {/* 5. Cu cine Partajăm Datele Tale */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                5. Cu cine Partajăm Datele Tale
              </h2>
              <p>
                <strong>
                  Simplu spus: Noi NU vindem datele tale personale.
                </strong>
              </p>
              <p>
                Partajăm date doar cu furnizori de servicii care ne ajută să
                operăm (ex: furnizorul de API pentru AI, serviciul de găzduire a
                bazei de date), care sunt obligați contractual să le protejeze.
              </p>
            </section>

            {/* 6. Drepturile Tale (Controlul tău) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                6. Drepturile Tale (Controlul tău)
              </h2>
              <ul className="list-disc list-outside pl-6 space-y-2">
                <li>
                  <strong>Acces și Corectare:</strong> Poți vedea și edita
                  oricând datele tale financiare direct din dashboard.
                </li>
                <li>
                  <strong>Ștergere:</strong> Poți șterge contul tău oricând. La
                  ștergerea contului, toate datele tale personale și financiare
                  sunt șterse permanent din sistemele noastre.
                </li>
              </ul>
            </section>

            {/* 7. Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">7. Contact</h2>
              <p>
                Dacă ai întrebări legate de această Politică de
                Confidențialitate, te rugăm să ne contactezi la{" "}
                <a
                  href="mailto:privacy@finai.app"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  privacy@finai.app
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
