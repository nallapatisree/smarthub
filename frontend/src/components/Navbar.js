import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  const token = localStorage.getItem("token");
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to={token ? "/student" : "/"} className="brand">
          SmartLearn
        </Link>

        <nav className="nav">
          <Link to="/student/placements">Placements</Link>
          <Link to="/coding">Practice</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/analytics">Analytics</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
