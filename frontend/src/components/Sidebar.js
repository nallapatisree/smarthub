import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function Icon({ children }){
  return (
    <span style={{display:'inline-flex',width:28,height:28,alignItems:'center',justifyContent:'center'}}>{children}</span>
  )
}

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">SmartLearn</div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/student" className="nav-item">
          <Icon>🏠</Icon>
          <span>Home</span>
        </NavLink>
        <NavLink to="/student/placements" className="nav-item">
          <Icon>🎯</Icon>
          <span>Placements</span>
        </NavLink>
        <NavLink to="/coding" className="nav-item">
          <Icon>💻</Icon>
          <span>Practice</span>
        </NavLink>
        <NavLink to="/quiz" className="nav-item">
          <Icon>📝</Icon>
          <span>Quiz</span>
        </NavLink>
        <NavLink to="/analytics" className="nav-item">
          <Icon>📊</Icon>
          <span>Analytics</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom muted">v1.0 • Dashboard</div>
    </aside>
  )
}
