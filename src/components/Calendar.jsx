import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      date: "2025-01-20",
      time: "2:00 PM",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Product Launch",
      date: "2025-01-25",
      time: "10:00 AM",
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Code Review",
      date: "2025-01-10",
      time: "4:00 PM",
      status: "Completed",
    },
    {
      id: 4,
      title: "Design Discussion",
      date: "2025-01-12",
      time: "3:00 PM",
      status: "Completed",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    status: "Upcoming",
  });

  const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545"];

  // Event status count for Pie Chart
  const statusData = [
    {
      name: "Upcoming",
      value: events.filter((e) => e.status === "Upcoming").length,
    },
    {
      name: "Completed",
      value: events.filter((e) => e.status === "Completed").length,
    },
  ];

  // Add new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, { id: events.length + 1, ...newEvent }]);
      setNewEvent({ title: "", date: "", time: "", status: "Upcoming" });
    } else {
      alert("Please fill all fields!");
    }
  };

  // Download all events as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Event Report", 14, 15);
    doc.setFontSize(12);
    doc.text(`Total Events: ${events.length}`, 14, 25);

    const tableColumn = ["ID", "Title", "Date", "Time", "Status"];
    const tableRows = events.map((event) => [
      event.id,
      event.title,
      event.date,
      event.time,
      event.status,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [52, 58, 64] },
    });

    doc.save("event_report.pdf");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 main-content">
        <Navbar />

        <div className="container-fluid p-4">
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">📅 Calendar Dashboard</h4>
            <button className="btn btn-dark btn-sm" onClick={handleDownloadPDF}>
              <i className="bi bi-download me-1"></i> Download Report
            </button>
          </div>

          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card p-3 text-center bg-info text-white shadow-sm rounded-3">
                <h6>Total Events</h6>
                <h4>{events.length}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-center bg-success text-white shadow-sm rounded-3">
                <h6>Upcoming Events</h6>
                <h4>{statusData[0].value}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-center bg-warning text-dark shadow-sm rounded-3">
                <h6>Completed</h6>
                <h4>{statusData[1].value}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-center bg-danger text-white shadow-sm rounded-3">
                <h6>Pending Tasks</h6>
                <h4>
                  {Math.max(statusData[0].value - statusData[1].value, 0)}
                </h4>
              </div>
            </div>
          </div>

          {/* Event Status Pie Chart */}
          <div className="card p-3 mb-4">
            <h6>Event Status Overview</h6>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label={({ name, value }) => `${name} (${value})`}
                  labelLine={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} events`, `${name}`]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Add Event Form */}
          <div className="card p-3 mb-4">
            <h6>Add New Event</h6>
            <form className="row g-3 mt-2" onSubmit={handleAddEvent}>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="time"
                  className="form-control"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2 d-grid">
                <button className="btn btn-primary">Add Event</button>
              </div>
            </form>
          </div>

          {/* Event List */}
          <div className="card p-3">
            <h6>All Events</h6>
            <table className="table table-sm table-striped mt-2">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.title}</td>
                    <td>{event.date}</td>
                    <td>{event.time}</td>
                    <td
                      className={
                        event.status === "Completed"
                          ? "text-success fw-bold"
                          : "text-warning fw-bold"
                      }
                    >
                      {event.status}
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

export default Calendar;
