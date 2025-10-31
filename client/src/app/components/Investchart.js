// src/components/Investchart.js
"use client"; // Obligatoriu. Graficele sunt interactive și rulează în browser.

import React from "react";
import dynamic from "next/dynamic";

// 1. Importăm "Chart" în mod dinamic, FĂRĂ SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// 2. Definirea componentei React
export default function Investchart() {
  // 3. Am scos 'series' din 'options' și le-am pus aici.
  // Am adăugat un punct de date (140 și 70) pentru a se potrivi cu cele 7 categorii.
  const series = [
    {
      name: "Acțiuni", // Am schimbat eticheta
      data: [150, 141, 145, 152, 135, 125, 140],
      color: "#1A56DB",
    },
    {
      name: "Obligațiuni", // Am schimbat eticheta
      data: [43, 13, 65, 12, 42, 73, 70],
      color: "#7E3BF2",
    },
  ];

  // 4. Am copiat 'options' și am scos 'series' din el.
  // Am adăugat culori explicite pentru text (labels) și tooltip
  // pentru a fi vizibile pe fundalul tău întunecat.
  const options = {
    xaxis: {
      show: true,
      categories: [
        "01 Feb",
        "02 Feb",
        "03 Feb",
        "04 Feb",
        "05 Feb",
        "06 Feb",
        "07 Feb",
      ],
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          colors: "#9CA3AF", // Culoare explicită (Tailwind gray-400)
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          colors: "#9CA3AF", // Culoare explicită
        },
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    chart: {
      sparkline: {
        enabled: false,
      },
      height: 350, // Am setat o înălțime fixă
      width: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "#9CA3AF", // Culoarea textului general
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      theme: "dark", // Asigură vizibilitatea tooltip-ului
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    legend: {
      show: true, // Am activat legenda să știm ce e fiecare linie
      labels: {
        colors: "#ccc",
      },
    },
    grid: {
      show: false, // Am ascuns grid-ul pentru un look mai curat
    },
  };

  // 5. Returnăm JSX-ul (HTML-ul componentei)
  return (
    <div className="w-full max-w-2xl p-4 rounded-lg shadow-md">
      {/* Poți adăuga un titlu dacă vrei */}
      <h3 className="text-xl font-semibold text-white mb-4">
        Evoluție Investiții
      </h3>

      {/* Graficul */}
      <div>
        <Chart options={options} series={series} type="area" height={350} />
      </div>
    </div>
  );
}
