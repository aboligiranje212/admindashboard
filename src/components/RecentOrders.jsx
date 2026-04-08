import React, { useState } from "react";

const RecentOrders = () => {
  const initialOrders = [
    {
      orderId: "#3847",
      customer: "Laxmi Rajbhar",
      product: 'MacBook Pro 16"',
      amount: "₹1,99,917",
      status: "completed",
      date: "2024-01-15",
    },
    {
      orderId: "#3848",
      customer: "Srushti Mendhekar",
      product: "iPhone 15 Pro",
      amount: "₹1,00,067",
      status: "pending",
      date: "2024-01-15",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Status styling
  const statusBadge = (status) => {
    switch (status) {
      case "completed":
        return "badge bg-success";
      case "pending":
        return "badge bg-warning text-dark";
      default:
        return "badge bg-secondary";
    }
  };

  // Filter + search logic
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.orderId.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || o.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Delete order
  const deleteOrder = (id) => {
    setOrders(orders.filter((o) => o.orderId !== id));
    setSelectedOrder(null);
  };

  return (
    <div className="card p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6>Recent Orders ({orders.length})</h6>
      </div>

      {/* Search & Filter */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select form-select-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <table className="table table-sm table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No orders found
              </td>
            </tr>
          )}

          {filteredOrders.map((o) => (
            <tr key={o.orderId}>
              <td>{o.orderId}</td>
              <td>{o.customer}</td>
              <td>{o.product}</td>
              <td>{o.amount}</td>
              <td>
                <span className={statusBadge(o.status)}>{o.status}</span>
              </td>
              <td>{o.date}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-1"
                  onClick={() => setSelectedOrder(o)}
                >
                  View
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteOrder(o.orderId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Details */}
      {selectedOrder && (
        <div className="alert alert-light border mt-3">
          <h6>Order Details</h6>
          <p>
            <strong>Order ID:</strong> {selectedOrder.orderId}
          </p>
          <p>
            <strong>Customer:</strong> {selectedOrder.customer}
          </p>
          <p>
            <strong>Product:</strong> {selectedOrder.product}
          </p>
          <p>
            <strong>Amount:</strong> {selectedOrder.amount}
          </p>
          <p>
            <strong>Status:</strong> {selectedOrder.status}
          </p>
          <p>
            <strong>Date:</strong> {selectedOrder.date}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
