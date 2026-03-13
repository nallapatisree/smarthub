import { useEffect, useState } from "react";
import { getPlacements } from "../services/placementApi";
import "./Placements.css";

function RecruiterPlacements() {
  const [placements, setPlacements] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getPlacements(token)
      .then(res => setPlacements(res.data))
      .catch(() => alert("Failed to load placements"));
  }, []);

  return (
    <div className="placements-container">
      <h2>Recruiter – Shortlisted Candidates</h2>

      {placements.map(p => (
        <div key={p._id} className="placement-card">
          <h3>{p.companyName}</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>CGPA</th>
              </tr>
            </thead>
            <tbody>
              {p.shortlistedStudents.map(s => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.cgpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default RecruiterPlacements;
