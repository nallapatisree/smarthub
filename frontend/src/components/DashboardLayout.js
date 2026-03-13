import React from "react";
import Sidebar from "./Sidebar";
import "../App.css";

export default function DashboardLayout({children}){
  return (
    <div className="dashboard-root">
      <Sidebar />
      <div className="dashboard-content">{children}</div>
    </div>
  )
}
