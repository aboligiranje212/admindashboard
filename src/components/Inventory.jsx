import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import React, { useState, useEffect, useRef } from "react";
import StatsCard from "./StatsCard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Inventory = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Laptop", stock: 50, category: "Electronics" },
    { id: 2, name: "T-Shirt", stock: 200, category: "Clothing" },
    { id: 3, name: "Mobile", stock: 25, category: "Electronics" },
    { id: 4, name: "Shoes", stock: 0, category: "Footwear" },
    { id: 5, name: "Charger", stock: 15, category: "Accessories" },
  ]);
const prevItemsRef = useRef(items);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  /* 🔹 STATUS LOGIC */
  const getStatus = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 30) return "Critical";
    if (stock < 70) return "Low Stock";
    return "In Stock";
  };

  useEffect(() => {
    const prevItems = prevItemsRef.current;

    items.forEach((item) => {
      const prevItem = prevItems.find((p) => p.id === item.id);

      if (
        prevItem &&
        prevItem.stock !== item.stock && // stock changed
        item.stock < 70 &&
        item.stock >= 30 // LOW STOCK range
      ) {
        alert(`⚠️ ${item.name} is now LOW on stock!`);
      }
    });

    // update previous items
    prevItemsRef.current = items;
  }, [items]);


  /* 🔹 SEARCH + FILTER */
  const filteredItems = items.filter((item) => {
    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const filterMatch = filter === "All" || getStatus(item.stock) === filter;

    return searchMatch && filterMatch;
  });

  /* 🔹 EDIT STOCK */
  const updateStock = (id, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, stock: Number(value) } : item
      )
    );
  };

  /* 🔹 CATEGORY CHART DATA */
  const stockByCategory = Object.values(
    items.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || {
        category: item.category,
        stock: 0,
      };
      acc[item.category].stock += item.stock;
      return acc;
    }, {})
  );

  /* 🔹 PDF EXPORT */
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Inventory Report", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["ID", "Name", "Category", "Stock", "Status"]],
      body: items.map((i) => [
        i.id,
        i.name,
        i.category,
        i.stock,
        getStatus(i.stock),
      ]),
    });

    doc.save("Inventory_Report.pdf");
  };

  /* 🔹 EXCEL EXPORT */
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      items.map((i) => ({
        ID: i.id,
        Name: i.name,
        Category: i.category,
        Stock: i.stock,
        Status: getStatus(i.stock),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "Inventory.xlsx"
    );
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 main-content">
        <Navbar />

        <div className="container-fluid p-4">
          <h4 className="mb-3">📦 Inventory Management</h4>

          {/* STATS */}
          <div className="row mb-4">
            <div className="col-md-3">
              <StatsCard
                color="bg-primary"
                title="Total Items"
                value={items.length}
                description="All products"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-warning"
                title="Low / Critical"
                value={items.filter((i) => i.stock < 70).length}
                description="Need attention"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-danger"
                title="Out of Stock"
                value={items.filter((i) => i.stock === 0).length}
                description="Immediate restock"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-success"
                title="Categories"
                value={stockByCategory.length}
                description="Product groups"
              />
            </div>
          </div>

          {/* SEARCH / FILTER / EXPORT */}
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Search by name or category"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Critical</option>
                <option>Out of Stock</option>
              </select>
            </div>

            <div className="col-md-5 text-end">
              <button className="btn btn-danger me-2" onClick={downloadPDF}>
                PDF
              </button>
              <button className="btn btn-success" onClick={downloadExcel}>
                Excel
              </button>
            </div>
          </div>

          {/* BAR CHART */}
          <div className="card p-3 mb-4">
            <h6>Stock by Category</h6>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#0d6efd" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* INVENTORY TABLE */}
          <div className="card p-3">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Stock (Editable)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.stock}
                        onChange={(e) => updateStock(item.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          getStatus(item.stock) === "In Stock"
                            ? "bg-success"
                            : getStatus(item.stock) === "Low Stock"
                            ? "bg-warning"
                            : getStatus(item.stock) === "Critical"
                            ? "bg-dark"
                            : "bg-danger"
                        }`}
                      >
                        {getStatus(item.stock)}
                      </span>
                    </td>
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

export default Inventory;
