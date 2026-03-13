import React, { useState } from "react";

export function Tabs({ children, defaultValue }) {
  const [active, setActive] = useState(defaultValue || "");
  return (
    <div className="ui-tabs">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

export function TabsList({ children, className = "" }) {
  const { active, setActive } = arguments[1] || {};
  return (
    <div className={`ui-tabs-list ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, active, setActive }) {
  return (
    <button
      className={`ui-tabs-trigger ${active === value ? "active" : ""}`}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, active }) {
  if (active !== value) return null;
  return <div className="ui-tabs-content">{children}</div>;
}
