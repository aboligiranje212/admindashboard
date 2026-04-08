import React from 'react';

const ActivityFeed = () => {
  const activities = [
    { id: 1, activity: 'New user registered - Kajal Chandele created an account' },
    { id: 2, activity: 'New order received - Order #3847 for ₹1,99,917' },  // Updated to INR
  ];

  return (
    <div className="card p-3">
      <h6>Activity Feed</h6>
      <ul className="list-unstyled">
        {activities.map(act => (
          <li key={act.id} className="mb-2">{act.activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;