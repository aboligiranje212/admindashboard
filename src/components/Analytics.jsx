import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import RevenueOverview from "./RevenueOverview";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [dateRange, setDateRange] = useState("last-30-days"); // Simple state for date filter

  // Sample data for new charts
  const trafficTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Visitors",
        data: [1200, 1500, 1800, 1600, 2000, 2200],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13, 110, 253, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const trafficSourcesData = {
    labels: [
      "Organic Search",
      "Direct",
      "Social Media",
      "Paid Ads",
      "Referrals",
    ],
    datasets: [
      {
        data: [40, 25, 15, 10, 10],
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#fd7e14",
          "#dc3545",
          "#6f42c1",
        ],
      },
    ],
  };

  // Sample data for tables
  const topPages = [
    { page: "/dashboard", views: 15420, bounceRate: "25%" },
    { page: "/analytics", views: 12300, bounceRate: "30%" },
    { page: "/users", views: 9800, bounceRate: "20%" },
  ];

  const userSessions = [
    {
      sessionId: "S001",
      user: "Laxmi Rajbhar",
      duration: "5m 32s",
      pagesViewed: 4,
      device: "Desktop",
    },
    {
      sessionId: "S002",
      user: "Srushti Mendhekar",
      duration: "3m 15s",
      pagesViewed: 2,
      device: "Mobile",
    },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 main-content">
        <Navbar />
        <div className="container-fluid p-4">
          <h4 className="mb-4">Analytics</h4>

          {/* Date Range Filter */}
          <div className="mb-4">
            <label className="form-label">Select Date Range:</label>
            <select
              className="form-select w-25"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-90-days">Last 90 Days</option>
            </select>
          </div>

          {/* Key Metrics Section */}
          <h5 className="mb-3">Key Metrics</h5>
          <div className="row mb-4">
            <div className="col-md-3">
              <StatsCard
                color="bg-success"
                title="Conversion Rate"
                value="12.5%"
                percent={2.1}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-warning"
                title="Bounce Rate"
                value="34.2%"
                percent={-1.5}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-danger"
                title="Error Rate"
                value="0.8%"
                percent={-0.3}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-info"
                title="Avg Session"
                value="4m 32s"
                percent={5.7}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-primary"
                title="Total Visitors"
                value="45,678"
                percent={8.4}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-secondary"
                title="New Users"
                value="12,345"
                percent={6.2}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-success"
                title="Page Load Time"
                value="2.3s"
                percent={-0.5}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-warning"
                title="Conversion Funnel"
                value="78%"
                percent={3.1}
                description="completion rate"
              />
            </div>
          </div>

          {/* Traffic Analysis Section */}
          <h5 className="mb-3">Traffic Analysis</h5>
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="card p-3">
                <h6>Traffic Trends</h6>
                <div className="chart-container">
                  <Line data={trafficTrendsData} />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3">
                <h6>Traffic Sources</h6>
                <div className="chart-container">
                  <Doughnut data={trafficSourcesData} />
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Overview (Reused) */}
          <div className="mb-4">
            <RevenueOverview />
          </div>

          {/* User Insights Section */}
          <h5 className="mb-3">User Insights</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="card p-3 mb-3">
                <h6>Top Pages</h6>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th>Views</th>
                      <th>Bounce Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPages.map((page, idx) => (
                      <tr key={idx}>
                        <td>{page.page}</td>
                        <td>{page.views.toLocaleString()}</td>
                        <td>{page.bounceRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-3 mb-3">
                <h6>User Sessions</h6>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Session ID</th>
                      <th>User</th>
                      <th>Duration</th>
                      <th>Pages Viewed</th>
                      <th>Device</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userSessions.map((session, idx) => (
                      <tr key={idx}>
                        <td>{session.sessionId}</td>
                        <td>{session.user}</td>
                        <td>{session.duration}</td>
                        <td>{session.pagesViewed}</td>
                        <td>{session.device}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
