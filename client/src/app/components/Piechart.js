// src/components/Piechart.js
"use client"; // Obligatoriu. Graficele sunt interactive și rulează în browser.

import React from "react"; // Am scos 'useState' de aici, nu mai e nevoie de el
import dynamic from "next/dynamic";

// 1. Importăm "Chart" în mod dinamic
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// 2. Definirea componentei React
export default function Piechart() {
  // 3. Am transformat 'series' într-o constantă.
  // Acestea sunt datele pe care le va afișa graficul.
  const series = [35.1, 23.5, 2.4, 5.4];

  // 4. Opțiunile rămân identice
  const options = {
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
    chart: {
      height: 320,
      width: "100%",
      type: "donut",
      foreColor: "#ccc",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: "Total Cheltuit",
              fontFamily: "Inter, sans-serif",
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
                return "$" + sum.toFixed(2);
              },
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              formatter: function (value) {
                return "$" + value;
              },
            },
          },
          size: "80%",
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: ["Mâncare", "Transport", "Utilități", "Shopping"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: "#ccc",
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value;
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };

  // 5. Am ȘTERS funcția 'handleDeviceChange' de aici.

  // 6. Returnăm JSX-ul (HTML-ul componentei)
  return (
    <div className="w-full max-w-lg p-4 bg-zinc-900 rounded-lg shadow-md">
      {/* 7. Am ȘTERS div-ul 'id="devices"' care conținea butoanele radio. */}

      {/* Chart-ul */}
      <div className="text-black">
        <Chart options={options} series={series} type="donut" height={320} />
      </div>
    </div>
  );
}
