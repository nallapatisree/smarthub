import { useEffect, useState } from "react";
import { createPlacement, getPlacements, shortlistStudent } from "../services/placementApi";
import "./Placements.css";

function AdminPlacements() {
  const [companyName, setCompanyName] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [placements, setPlacements] = useState([]);
  const token = localStorage.getItem("token");

  const loadPlacements = () => {
    getPlacements(token).then(res => setPlacements(res.data));
  };

  useEffect(() => {
    loadPlacements();
  }, []);

  const create = () => {
    createPlacement({ companyName, eligibility }, token)
      .then(() => {
        alert("Placement drive created");
        setCompanyName("");
        setEligibility("");
        loadPlacements();
      })
      .catch(() => alert("Error creating placement"));
  };

  const shortlist = (pid, sid) => {
    shortlistStudent(pid, sid, token)
      .then(() => alert("Student shortlisted"))
      .catch(() => alert("Error shortlisting"));
  };

  return (
    <div className="placements-container">
      <h2>Admin – Placement Management</h2>

      <div className="placement-card">
        <h3>Create Placement Drive</h3>
        <input
          placeholder="Company Name"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />
        <input
          placeholder="Eligibility"
          value={eligibility}
          onChange={e => setEligibility(e.target.value)}
        />
        <button className="apply-btn" onClick={create}>
          Create
        </button>
      </div>

      {placements.map(p => (
        <div key={p._id} className="placement-card">
          <h3>{p.companyName}</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>CGPA</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {p.appliedStudents.map(s => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.cgpa}</td>
                  <td>
                    <button className="apply-btn" onClick={() => shortlist(p._id, s._id)}>
                      Shortlist
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AdminPlacements;
