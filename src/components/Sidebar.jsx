import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaUsers, FaBoxOpen, FaCalendarAlt, FaCog, FaBell } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();  // Get current path for active link highlighting

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="bg-dark text-white sidebar p-3">
      <h5 className="mb-4">IndiaLedger</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-1">
          <Link to="/" className={`nav-link text-white ${isActive("/")}`}>
            <FaHome /> Dashboard
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="/analytics"
            className={`nav-link text-white ${isActive("/analytics")}`}
          >
            <FaChartBar /> Analytics
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="/users"
            className={`nav-link text-white ${isActive("/users")}`}
          >
            <FaUsers /> Users
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="/ecommerce"
            className={`nav-link text-white ${isActive("/ecommerce")}`}
          >
            <FaBoxOpen /> E-commerce
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="/inventory"
            className={`nav-link text-white ${isActive("/inventory")}`}
          >
            Inventory
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="/transactions"
            className={`nav-link text-white ${isActive("/transactions")}`}
          >
            Transactions
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="/messages"
            className={`nav-link text-white ${isActive("/messages")}`}
          >
            Messages{" "}
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="/calendar"
            className={`nav-link text-white ${isActive("/calendar")}`}
          >
            <FaCalendarAlt /> Calendar
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="/reports"
            className={`nav-link text-white ${isActive("/reports")}`}
          >
            Reports
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="/settings"
            className={`nav-link text-white ${isActive("/settings")}`}
          >
            <FaCog /> Settings
          </Link>
        </li>
      </ul>
      <div className="mt-auto pt-4  border-top">
        <div className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="profile"
            className="rounded-circle"
            width={20}
            style={{ margin: "9px" }}
          />
          <small>Swati Karche</small> <br />
          <small className="text-muted">Administrator</small>
          <FaBell className="ms-auto" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;