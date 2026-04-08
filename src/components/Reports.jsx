import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import RevenueOverview from "./RevenueOverview";

const Reports = () => {
  const [reportType, setReportType] = useState("sales");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const recentReports = [
    {
      id: 1,
      name: "Sales Report",
      period: "Jan 2024",
      format: "PDF",
      date: "2024-01-16",
    },
    {
      id: 2,
      name: "User Report",
      period: "Jan 2024",
      format: "Excel",
      date: "2024-01-15",
    },
  ];

  const generateReport = () => {
    setLoading(true);
    setSuccessMsg("");

    setTimeout(() => {
      setLoading(false);
      setSuccessMsg("Report generated successfully!");
    }, 1500);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 main-content">
        <Navbar />

        <div className="container-fluid p-4">
          <h4 className="mb-4">Reports</h4>

          {/* Stats */}
          <div className="row mb-4">
            <div className="col-md-3">
              <StatsCard
                color="bg-primary"
                title="Generated Reports"
                value="45"
                percent={10.2}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-success"
                title="Downloads"
                value="1,234"
                percent={15.7}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-warning"
                title="Pending Reports"
                value="6"
                percent={-3.4}
                description="vs last month"
              />
            </div>
          </div>

          {/* Report Generator */}
          <div className="card p-3 mb-4">
            <h6 className="mb-3">Generate Report</h6>

            <div className="row mb-3">
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="sales">Sales Report</option>
                  <option value="users">User Report</option>
                  <option value="revenue">Revenue Report</option>
                </select>
              </div>

              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={generateReport}
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>

            {successMsg && (
              <div className="alert alert-success py-2">{successMsg}</div>
            )}

            <div className="mt-2">
              <button className="btn btn-outline-secondary btn-sm me-2">
                Export PDF
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                Export Excel
              </button>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="card p-3 mb-4">
            <h6>Recent Reports</h6>
            <table className="table table-sm mt-2">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Period</th>
                  <th>Format</th>
                  <th>Date Generated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((r) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td>{r.period}</td>
                    <td>
                      <span className="badge bg-info">{r.format}</span>
                    </td>
                    <td>{r.date}</td>
                    <td>
                      <button className="btn btn-sm btn-success">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Revenue Chart */}
          <RevenueOverview />
        </div>
      </div>
    </div>
  );
};

export default Reports;
