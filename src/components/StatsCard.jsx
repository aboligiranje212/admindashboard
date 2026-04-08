import React from "react";

const StatsCard = ({
  title,
  value,
  percent,
  description,
  color = "bg-primary",
  icon,
  trend = [],
}) => {
  const positive = percent > 0;

  return (
    <div className={`card text-white mb-3 ${color} shadow-sm`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">{title}</h6>
          {icon && <span className="fs-4">{icon}</span>}
        </div>

        <h3>{value}</h3>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <small>
            <span className={positive ? "text-success" : "text-danger"}>
              {positive ? "+" : ""}
              {percent}%
            </span>{" "}
            {description}
          </small>

          {/* Optional Sparkline */}
          {trend.length > 0 && (
            <div className="sparkline">
              <svg width="50" height="20">
                <polyline
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  points={trend.map((v, i) => `${i * 10},${20 - v}`).join(" ")}
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
