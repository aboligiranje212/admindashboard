import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Messages = () => {
  const initialMessages = [
    {
      id: 1,
      from: "User1",
      subject: "Order Inquiry",
      body: "I want to know order status.",
      time: "10:30 AM",
      read: false,
    },
    {
      id: 2,
      from: "User2",
      subject: "Support Request",
      body: "I need help with login.",
      time: "9:15 AM",
      read: false,
    },
    {
      id: 3,
      from: "User3",
      subject: "Feedback",
      body: "Great service!",
      time: "Yesterday",
      read: true,
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Filter messages
  const filteredMessages = messages.filter(
    (msg) =>
      msg.from.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject.toLowerCase().includes(search.toLowerCase())
  );

  // Open message
  const openMessage = (msg) => {
    setSelectedMessage(msg);
    setMessages(
      messages.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
    );
  };

  // Delete message
  const deleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 main-content">
        <Navbar />

        <div className="container-fluid p-4">
          <h4 className="mb-3">Messages ({messages.length})</h4>

          {/* Search */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="row">
            {/* Inbox */}
            <div className="col-md-5">
              <div className="card">
                <div className="card-header fw-bold">Inbox</div>
                <ul className="list-group list-group-flush">
                  {filteredMessages.length === 0 && (
                    <li className="list-group-item text-muted">
                      No messages found
                    </li>
                  )}

                  {filteredMessages.map((msg) => (
                    <li
                      key={msg.id}
                      className={`list-group-item d-flex justify-content-between align-items-center 
                        ${!msg.read ? "fw-bold" : ""}`}
                      onClick={() => openMessage(msg)}
                      style={{ cursor: "pointer" }}
                    >
                      <div>
                        {msg.from} <br />
                        <small>{msg.subject}</small>
                      </div>
                      <small className="text-muted">{msg.time}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Message Details */}
            <div className="col-md-7">
              <div className="card h-100">
                <div className="card-header fw-bold">Message Details</div>
                <div className="card-body">
                  {selectedMessage ? (
                    <>
                      <h5>{selectedMessage.subject}</h5>
                      <p className="text-muted">
                        From: <strong>{selectedMessage.from}</strong>
                      </p>
                      <p>{selectedMessage.body}</p>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteMessage(selectedMessage.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <p className="text-muted">Select a message to read</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
