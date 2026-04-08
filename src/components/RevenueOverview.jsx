import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueOverview = () => {
  const [view, setView] = useState("monthly");
  const [showRevenue, setShowRevenue] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [showProfit, setShowProfit] = useState(false);

  const chartData = {
    monthly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      revenue: [
        1030000, 1240000, 1410000, 1160000, 1320000, 1490000, 1570000, 1740000,
        1820000, 1980000,
      ],
      expenses: [
        680000, 760000, 890000, 790000, 1000000, 920000, 1040000, 1080000,
        1160000, 1240000,
      ],
    },
    quarterly: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      revenue: [3680000, 3970000, 5130000, 3800000],
      expenses: [2330000, 2710000, 3280000, 2400000],
    },
    yearly: {
      labels: ["2022", "2023", "2024"],
      revenue: [12000000, 15500000, 17800000],
      expenses: [8200000, 10300000, 12100000],
    },
  };

  const current = chartData[view];
  const profit = current.revenue.map((rev, i) => rev - current.expenses[i]);

  const datasets = [];

  if (showRevenue) {
    datasets.push({
      label: "Revenue (₹)",
      data: current.revenue,
      backgroundColor: "rgba(13,110,253,0.7)",
      borderRadius: 6,
    });
  }

  if (showExpenses) {
    datasets.push({
      label: "Expenses (₹)",
      data: current.expenses,
      backgroundColor: "rgba(220,53,69,0.6)",
      borderRadius: 6,
    });
  }

  if (showProfit) {
    datasets.push({
      label: "Profit (₹)",
      data: profit,
      backgroundColor: "rgba(25,135,84,0.7)",
      borderRadius: 6,
    });
  }

  const data = {
    labels: current.labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx) => `₹${ctx.raw.toLocaleString("en-IN")}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value / 100000}L`,
        },
      },
    },
  };

  const totalRevenue = current.revenue.reduce((a, b) => a + b, 0);
  const totalExpenses = current.expenses.reduce((a, b) => a + b, 0);
  const totalProfit = totalRevenue - totalExpenses;

  return (
    <div className="card p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6>Revenue Overview</h6>

        <select
          className="form-select form-select-sm w-auto"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Summary */}
      <div className="row text-center mb-3">
        <div className="col">
          <h6 className="text-primary">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </h6>
          <small>Total Revenue</small>
        </div>
        <div className="col">
          <h6 className="text-danger">
            ₹{totalExpenses.toLocaleString("en-IN")}
          </h6>
          <small>Total Expenses</small>
        </div>
        <div className="col">
          <h6 className="text-success">
            ₹{totalProfit.toLocaleString("en-IN")}
          </h6>
          <small>Total Profit</small>
        </div>
      </div>

      {/* Toggles */}
      <div className="mb-2">
        <label className="me-3">
          <input
            type="checkbox"
            checked={showRevenue}
            onChange={() => setShowRevenue(!showRevenue)}
          />{" "}
          Revenue
        </label>
        <label className="me-3">
          <input
            type="checkbox"
            checked={showExpenses}
            onChange={() => setShowExpenses(!showExpenses)}
          />{" "}
          Expenses
        </label>
        <label>
          <input
            type="checkbox"
            checked={showProfit}
            onChange={() => setShowProfit(!showProfit)}
          />{" "}
          Profit
        </label>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueOverview;
