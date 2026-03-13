import React from "react";

export function Progress({ value, className = "" }) {
  return (
    <div className={`ui-progress ${className}`}>
      <div className="ui-progress-bar" style={{ width: `${value}%` }} />
    </div>
  );
}
