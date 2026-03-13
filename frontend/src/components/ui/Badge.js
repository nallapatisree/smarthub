import React from "react";

export function Badge({ children, className = "" }) {
  return <span className={`ui-badge ${className}`}>{children}</span>;
}
