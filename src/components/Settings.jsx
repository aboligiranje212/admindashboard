import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./theme.css"
const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  // 🧠 Apply theme globally when it changes
  useEffect(() => {
    document.body.className = ""; // Clear all existing themes
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const handleSave = (e) => {
    e.preventDefault();
    alert("✅ Settings saved successfully!");
  };

  const handleSendTestNotification = () => {
    alert("📩 Test notification sent!");
  };

  const handleBackupDownload = () => {
    alert("💾 System backup downloaded!");
  };

  const handleManageSessions = () => {
    alert("🧑‍💻 Opening active sessions...");
  };

  const handleReset = () => {
    setTheme("light");
    setLanguage("English");
    setNotifications(true);
    setTwoFA(false);
    alert("🔄 Settings reset to default!");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 main-content">
        <Navbar />

        <div className="container-fluid p-4">
          <h4 className="mb-4">⚙️ Settings Panel</h4>

          {/* Account Settings */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="mb-3 text-primary">👤 Account Settings</h5>
            <form onSubmit={handleSave}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Admin Name"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="admin@example.com"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Profile Picture</label>
                  <input type="file" className="form-control" />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="submit" className="btn btn-primary">
                  💾 Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Preferences */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="mb-3 text-success">🎨 Preferences</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Theme</label>
                <select
                  className="form-select"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="blue">Blue</option>
                </select>
                <small className="text-muted">
                  Preview: <span className="fw-bold">{theme} mode</span>
                </small>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Language</label>
                <select
                  className="form-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>

              <div className="col-md-4 mb-3 d-flex align-items-center">
                <div className="form-check form-switch mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <label className="form-check-label">
                    Enable Notifications
                  </label>
                </div>
              </div>
            </div>

            {notifications && (
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleSendTestNotification}
                >
                  Send Test Notification
                </button>
              </div>
            )}
          </div>

          {/* Security */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="mb-3 text-danger">🔐 Security Settings</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={twoFA}
                    onChange={() => setTwoFA(!twoFA)}
                  />
                  <label className="form-check-label">
                    Enable Two-Factor Authentication (2FA)
                  </label>
                </div>
              </div>
              <div className="col-md-6 mb-3 d-flex justify-content-end">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleManageSessions}
                >
                  Manage Active Sessions
                </button>
              </div>
            </div>
          </div>

          {/* Backup */}
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3 text-info">💾 System Backup & Export</h5>
            <p>You can export or download your configuration data here.</p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-dark"
                onClick={handleBackupDownload}
              >
                ⬇️ Download Backup
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => alert("📤 Data exported successfully!")}
              >
                Export Data (CSV)
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="card p-3 mt-4 shadow-sm">
            <h6 className="text-muted">Live Preview Summary</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <strong>Theme:</strong> {theme}
              </li>
              <li>
                <strong>Language:</strong> {language}
              </li>
              <li>
                <strong>Notifications:</strong>{" "}
                {notifications ? "Enabled ✅" : "Disabled ❌"}
              </li>
              <li>
                <strong>2FA:</strong> {twoFA ? "Enabled 🔐" : "Disabled 🚫"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
