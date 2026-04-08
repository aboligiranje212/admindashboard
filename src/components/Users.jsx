import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import { FaEdit, FaTrashAlt, FaUserPlus, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // hide after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`toast ${
        type === "success" ? "bg-success" : "bg-danger"
      } text-white p-2 position-fixed top-0 end-0 m-3`}
      role="alert"
    >
      {message}
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Laxmi Rajbhar",
      email: "laxmirajbhar12@example.com",
      role: "Admin",
      status: "Active",
      joined: "2024-10-05",
    },
    {
      id: 2,
      name: "Srushti Mendhekar",
      email: "srushtimendhekar23@example.com",
      role: "User",
      status: "Inactive",
      joined: "2024-08-19",
    },
    {
      id: 3,
      name: "Nikita Nalkol",
      email: "nikitanalkol34@example.com",
      role: "Moderator",
      status: "Active",
      joined: "2024-09-12",
    },
    {
      id: 4,
      name: "Pratiksha Yadav",
      email: "pratikshayadav234@example.com",
      role: "User",
      status: "Active",
      joined: "2024-11-01",
    },
    {
      id: 5,
      name: "Rahul Sharma",
      email: "rahulsharma56@example.com",
      role: "Admin",
      status: "Active",
      joined: "2024-07-20",
    },
    {
      id: 6,
      name: "Pooja Singh",
      email: "poojasingh78@example.com",
      role: "User",
      status: "Inactive",
      joined: "2024-06-15",
    },
    {
      id: 7,
      name: "Ankit Kumar",
      email: "ankitkumar89@example.com",
      role: "Moderator",
      status: "Active",
      joined: "2024-05-10",
    },
    {
      id: 8,
      name: "Sakshi Patel",
      email: "sakshipatel12@example.com",
      role: "User",
      status: "Active",
      joined: "2024-03-25",
    },
    {
      id: 9,
      name: "Vivek Mehta",
      email: "vivekmehta45@example.com",
      role: "Admin",
      status: "Active",
      joined: "2024-02-14",
    },
    {
      id: 10,
      name: "Ritika Jain",
      email: "ritikajain23@example.com",
      role: "User",
      status: "Inactive",
      joined: "2024-01-30",
    },
  ]);

  const [notifications, setNotifications] = useState([]);
  const addNotification = (message, type = "success") => {
    const id = new Date().getTime();
    setNotifications([...notifications, { id, message, type }]);
  };
  const removeNotification = (id) =>
    setNotifications(notifications.filter((n) => n.id !== id));

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const filteredUsers = users.filter(
    (u) =>
      (filterRole === "All" || u.role === filterRole) &&
      (u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Add/Edit user
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      setUsers(
        users.map((u) =>
          u.id === editUser.id ? { ...formData, id: u.id, joined: u.joined } : u
        )
      );
      setEditUser(null);
    } else {
      const newUser = {
        ...formData,
        id: users.length + 1,
        joined: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
      addNotification(`User "${formData.name}" added successfully`, "success");
    }
    setFormData({ name: "", email: "", role: "User", status: "Active" });
    setShowForm(false);
  };

  // Edit
  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setShowForm(true);
  };

  // Delete
  const handleDelete = (id) => {
    const user = users.find((u) => u.id === id);
    if (window.confirm(`Delete user "${user.name}"?`)) {
      setUsers(users.filter((u) => u.id !== id));
      addNotification(`User "${user.name}" deleted successfully`, "danger");
    }
  };

  // PDF export
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Users Report", 14, 15);
    doc.setFontSize(12);
    doc.text(`Total Users: ${users.length}`, 14, 25);
    const tableColumn = ["ID", "Name", "Email", "Role", "Status", "Joined"];
    const tableRows = users.map((u) => [
      u.id,
      u.name,
      u.email,
      u.role,
      u.status,
      u.joined,
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [52, 58, 64] },
    });
    doc.save("users_report.pdf");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 main-content">
        <Navbar />
        <div className="container-fluid p-4">
          <h4 className="mb-4 fw-bold">Users Management</h4>

          {/* Stats */}
          <div className="row mb-4 g-3">
            <div className="col-md-3">
              <StatsCard
                color="bg-primary"
                title="Total Users"
                value={users.length}
                percent={8.2}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-success"
                title="Active Users"
                value={users.filter((u) => u.status === "Active").length}
                percent={4.5}
                description="vs last month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-warning"
                title="New Users"
                value="5"
                percent={5.6}
                description="this month"
              />
            </div>
            <div className="col-md-3">
              <StatsCard
                color="bg-danger"
                title="Inactive Users"
                value={users.filter((u) => u.status === "Inactive").length}
                percent={-3.1}
                description="vs last month"
              />
            </div>
          </div>

          {/* Search / Filter / Actions */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                style={{ width: "260px" }}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="form-select"
                style={{ width: "180px" }}
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-success d-flex align-items-center gap-2"
                onClick={() => setShowForm(true)}
              >
                <FaUserPlus /> Add User
              </button>
              <button
                className="btn btn-primary d-flex align-items-center gap-2"
                onClick={handleDownloadPDF}
              >
                <FaDownload /> Download PDF
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="card shadow-sm p-3">
            <h6 className="mb-3 fw-semibold">User List</h6>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Date Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td
                        className={
                          u.status === "Active"
                            ? "text-success fw-semibold"
                            : "text-danger fw-semibold"
                        }
                      >
                        {u.status}
                      </td>
                      <td>{u.joined}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(u)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(u.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-3">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add/Edit Modal */}
          {showForm && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {editUser ? "Edit User" : "Add New User"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowForm(false)}
                    ></button>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                          className="form-select"
                          value={formData.role}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                        >
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                          <option value="Moderator">Moderator</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          className="form-select"
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editUser ? "Update User" : "Add User"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {notifications.map((n) => (
            <Toast
              key={n.id}
              message={n.message}
              type={n.type}
              onClose={() => removeNotification(n.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
