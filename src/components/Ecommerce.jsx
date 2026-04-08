import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Ecommerce = () => {
  // Dropdown filter state
  const [filter, setFilter] = useState("6M");

  // Chart Data
  const monthlySalesData = [
    { month: "Jan", sales: 1200000 },
    { month: "Feb", sales: 1500000 },
    { month: "Mar", sales: 1300000 },
    { month: "Apr", sales: 1800000 },
    { month: "May", sales: 2200000 },
    { month: "Jun", sales: 2600000 },
  ];

  const yearlySalesData = [
    { month: "2020", sales: 10200000 },
    { month: "2021", sales: 13800000 },
    { month: "2022", sales: 17400000 },
    { month: "2023", sales: 19800000 },
    { month: "2024", sales: 21500000 },
  ];

  const regionData = [
    { name: "North", value: 45 },
    { name: "South", value: 30 },
    { name: "East", value: 15 },
    { name: "West", value: 10 },
  ];

  const barData = [
    { name: "Jan", online: 1400000, offline: 800000 },
    { name: "Feb", online: 1600000, offline: 950000 },
    { name: "Mar", online: 1500000, offline: 850000 },
    { name: "Apr", online: 2000000, offline: 1100000 },
    { name: "May", online: 2300000, offline: 1200000 },
    { name: "Jun", online: 2600000, offline: 1400000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      unitsSold: 320,
      revenue: "₹3,20,000",
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Accessories",
      unitsSold: 280,
      revenue: "₹2,10,000",
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Footwear",
      unitsSold: 200,
      revenue: "₹1,50,000",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      category: "Electronics",
      unitsSold: 180,
      revenue: "₹1,25,000",
    },
  ];

  // PDF Report Generator
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("E-commerce Sales Report", 14, 15);
    doc.setFontSize(12);
    doc.text(`Total Products: ${products.length}`, 14, 25);

    const tableColumn = ["ID", "Product", "Category", "Units Sold", "Revenue"];
    const tableRows = products.map((p) => [
      p.id,
      p.name,
      p.category,
      p.unitsSold,
      p.revenue,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [52, 58, 64] },
    });

    doc.save("ecommerce_report.pdf");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 main-content">
        <Navbar />
        <div className="container-fluid p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">E-commerce Dashboard</h4>
            <div className="d-flex align-items-center">
              <select
                className="form-select form-select-sm me-2"
                style={{ width: "150px" }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="6M">Last 6 Months</option>
                <option value="1Y">Yearly</option>
              </select>
              <button
                className="btn btn-dark btn-sm"
                onClick={handleDownloadPDF}
              >
                <i className="bi bi-download me-1"></i> Download Report
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row mb-3">
            <div className="col-md-3">
              <StatsCard
                color="bg-primary"
                title="Total Sales"
                value="₹74,21,256"
                percent={12.3}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-success"
                title="Products Sold"
                value="3,456"
                percent={7.8}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-warning"
                title="New Customers"
                value="1,052"
                percent={6.1}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-danger"
                title="Refunded Orders"
                value="34"
                percent={-2.4}
                description="vs last month"
              />
            </div>
          </div>

          {/* Sales Overview Line Chart */}
          <div className="card p-3 mb-4">
            <h6>
              {filter === "6M"
                ? "Monthly Sales Overview"
                : "Yearly Sales Overview"}
            </h6>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={filter === "6M" ? monthlySalesData : yearlySalesData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#007bff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Online vs Offline Sales Bar Chart */}
          <div className="card p-3 mb-4">
            <h6>Online vs Offline Sales</h6>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="online" fill="#28a745" name="Online Sales" />
                <Bar dataKey="offline" fill="#ffc107" name="Offline Sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Region-wise Sales */}
          <div className="card p-3 mb-4">
            <h6>Revenue by Region</h6>
            <br />
            <ResponsiveContainer width="100%" height={370}>
              <PieChart>
                <Pie
                  data={regionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                  labelLine={false}
                >
                  {regionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                      onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
                      onMouseLeave={(e) => (e.target.style.opacity = 1)}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [`${value}% share`, name]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products Table */}
          <div className="card p-3">
            <h6>Top Selling Products</h6>
            <table className="table table-sm table-striped mt-2">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.unitsSold}</td>
                    <td>{product.revenue}</td>
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

export default Ecommerce;
