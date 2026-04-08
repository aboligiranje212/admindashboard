import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StatsCard from './StatsCard';
import RevenueOverview from './RevenueOverview';
import SalesByCategory from './SalesByCategory';
import RecentOrders from './RecentOrders';
import ActivityFeed from './ActivityFeed';

const Dashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 main-content">
        <Navbar />
        <div className="container-fluid p-4">
          <h4 className="mb-4">Dashboard Overview</h4>
          <div className="row mb-3">
            <div className="col-md-3"><StatsCard color="bg-primary" title="Total Revenue" value="₹1,03,41,329" percent={13.5} description="vs last month" /></div> 
            <div className="col-md-3"><StatsCard color="bg-info" title="Active Users" value="8,549" percent={3.7} description="vs last month" /></div>
            <div className="col-md-3"><StatsCard color="bg-secondary" title="Total Orders" value="2,847" percent={5.1} description="vs last month" /></div>
            <div className="col-md-3"><StatsCard color="bg-dark" title="Page Views" value="45,892" percent={3.7} description="vs last month" /></div>
          </div>

          <div className="row">
            <div className="col-md-8">
              <RevenueOverview />
              <RecentOrders />
            </div>
            <div className="col-md-4 d-flex flex-column">
              <SalesByCategory />
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;