import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Users from './components/Users';
import Ecommerce from './components/Ecommerce';
import Inventory from './components/Inventory';
import Transactions from './components/Transactions';
import Messages from './components/Messages';
import Calendar from './components/Calendar';
import Reports from './components/Reports';
import Settings from './components/Settings';

function App() {
  return (
    <Router basename="/admindashboard">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/users" element={<Users />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;