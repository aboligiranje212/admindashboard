import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatsCard from "./StatsCard";

const Transactions = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const transactions = [
    { id: 1, type: "Sale", amount: 24817, date: "2024-01-15" },
    { id: 2, type: "Refund", amount: -4150, date: "2024-01-14" },
    { id: 3, type: "Sale", amount: 15300, date: "2024-01-13" },
    { id: 4, type: "Refund", amount: -2300, date: "2024-01-12" },
    // Add more for testing pagination
  ];

  const filteredTransactions = transactions.filter(
    (txn) =>
      (filter === "All" || txn.type === filter) &&
      (txn.id.toString().includes(search) ||
        txn.type.toLowerCase().includes(search.toLowerCase()))
  );

  const totalSales = transactions
    .filter((t) => t.type === "Sale")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalRefunds = transactions
    .filter((t) => t.type === "Refund")
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Type,Amount,Date"]
        .concat(
          transactions.map((t) => `${t.id},${t.type},${t.amount},${t.date}`)
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 main-content">
        <Navbar />
        <div className="container-fluid p-4">
          <h4 className="mb-4">Transactions</h4>

          {/* Stats */}
          <div className="row mb-4">
            <div className="col-md-3">
              <StatsCard
                color="bg-success"
                title="Successful Txns"
                value={transactions.filter((t) => t.type === "Sale").length}
                percent={9.3}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-danger"
                title="Failed Txns"
                value={transactions.filter((t) => t.type === "Refund").length}
                percent={-4.2}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-primary"
                title="Total Sales"
                value={`₹${totalSales.toLocaleString("en-IN")}`}
                percent={5.0}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-warning"
                title="Total Refunds"
                value={`₹${totalRefunds.toLocaleString("en-IN")}`}
                percent={-1.5}
                description="vs last month"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <select
                className="form-select form-select-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All</option>
                <option>Sale</option>
                <option>Refund</option>
              </select>
            </div>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search by ID or Type"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-sm btn-outline-success"
                onClick={downloadCSV}
              >
                ⬇️ Export CSV
              </button>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="card p-3 shadow-sm">
            <h6>Transaction History</h6>
            <table className="table table-sm table-hover mt-2">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className={
                      txn.type === "Sale" ? "table-success" : "table-danger"
                    }
                  >
                    <td>{txn.id}</td>
                    <td>{txn.type}</td>
                    <td>
                      {txn.amount.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td>{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
