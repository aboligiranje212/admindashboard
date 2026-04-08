import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(PieController, ArcElement, Tooltip, Legend);

const SalesByCategory = () => {
  const [view, setView] = useState("monthly");

  const salesData = {
    monthly: {
      labels: ["Electronics", "Clothing", "Books", "Other"],
      values: [45, 30, 15, 10],
    },
    yearly: {
      labels: ["Electronics", "Clothing", "Books", "Other"],
      values: [50, 25, 15, 10],
    },
  };

  const colors = ["#0d6efd", "#6f42c1", "#198754", "#fd7e14"];
  const current = salesData[view];
  const totalSales = current.values.reduce((a, b) => a + b, 0);

  const data = {
    labels: current.labels,
    datasets: [
      {
        data: current.values,
        backgroundColor: colors,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw}%`,
        },
      },
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="card p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6>Sales by Category</h6>
        <select
          className="form-select form-select-sm w-auto"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>

      {/* Total Sales */}
      <div className="text-center mt-2">
        <small className="text-muted">Total Distribution: {totalSales}%</small>
      </div>

      {/* Category Breakdown */}
      <ul className="list-unstyled mt-3">
        {current.labels.map((label, index) => (
          <li
            key={label}
            className="d-flex justify-content-between align-items-center mb-1"
          >
            <span>
              <span
                className="badge me-2"
                style={{ backgroundColor: colors[index] }}
              >
                &nbsp;
              </span>
              {label}
            </span>
            <strong>{current.values[index]}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesByCategory;
