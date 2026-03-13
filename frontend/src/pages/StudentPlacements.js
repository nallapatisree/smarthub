import { useEffect, useState, useMemo } from "react";
import { getPlacements, applyPlacement } from "../services/placementApi";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import "./Placements.css";

function StudentPlacements() {
  const [placements, setPlacements] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    getPlacements(token)
      .then(res => {
        setPlacements(res.data);
        setLoading(false);
      })
      .catch(err => {
        setToast("Failed to load placements");
        setLoading(false);
      });
  }, [token, navigate]);

  const apply = async (id) => {
    setApplying(true);
    try {
      await applyPlacement(id, token);
      setAppliedJobs([...appliedJobs, id]);
      setToast("✓ Applied successfully!");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      setToast(err?.response?.data?.message || "Failed to apply");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setApplying(false);
    }
  };

  const filtered = useMemo(() => {
    let result = placements;

    // Apply status filter
    if (filterStatus === "open") {
      result = result.filter(p => p.open);
    } else if (filterStatus === "closed") {
      result = result.filter(p => !p.open);
    } else if (filterStatus === "applied") {
      result = result.filter(p => appliedJobs.includes(p._id));
    }

    // Apply search filter
    if (!query) return result;
    const q = query.toLowerCase();
    return result.filter(p =>
      (p.companyName || "").toLowerCase().includes(q) ||
      (p.eligibility || "").toLowerCase().includes(q) ||
      (p.location || "").toLowerCase().includes(q) ||
      (p.position || "").toLowerCase().includes(q)
    );
  }, [placements, query, filterStatus, appliedJobs]);

  const stats = {
    total: placements.length,
    open: placements.filter(p => p.open).length,
    applied: appliedJobs.length,
    closed: placements.filter(p => !p.open).length
  };

  if (loading) {
    return (
      <div className="placements-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading placement drives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="placements-container">
      {/* Header */}
      <div className="placements-header">
        <div>
          <h1>🎯 Placement Drives</h1>
          <p>Explore and apply to top companies hiring for your profile</p>
        </div>
        <div className="stats-section">
          <div className="stat">
            <span className="label">Total</span>
            <span className="value">{stats.total}</span>
          </div>
          <div className="stat">
            <span className="label">Open</span>
            <span className="value">{stats.open}</span>
          </div>
          <div className="stat">
            <span className="label">Applied</span>
            <span className="value">{stats.applied}</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <input
            className="search-input"
            placeholder="Search by company, role, location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
          {query && (
            <button className="clear-btn" onClick={() => setQuery("")}>✕</button>
          )}
        </div>

        <div className="filter-tabs">
          {[
            { key: "all", label: "All", icon: "📋" },
            { key: "open", label: "Open", icon: "✓" },
            { key: "closed", label: "Closed", icon: "✕" },
            { key: "applied", label: "Applied", icon: "✓" }
          ].map(filter => (
            <button
              key={filter.key}
              className={`filter-tab ${filterStatus === filter.key ? "active" : ""}`}
              onClick={() => setFilterStatus(filter.key)}
            >
              <span className="icon">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Placements Grid */}
      <div className="placements-section">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No placements found</h3>
            <p>{query ? "Try adjusting your search filters" : "Check back later for new opportunities"}</p>
            {query && (
              <button className="btn-clear" onClick={() => setQuery("")}>
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="placements-grid">
            {filtered.map(p => (
              <div
                key={p._id}
                className={`placement-card ${!p.open ? "closed" : ""} ${appliedJobs.includes(p._id) ? "applied" : ""}`}
              >
                {/* Card Header */}
                <div className="card-header">
                  <div className="company-info">
                    <div className="company-icon">🏢</div>
                    <div className="company-details">
                      <h3 className="company-name">{p.companyName}</h3>
                      <p className="position">{p.position || "Multiple Positions"}</p>
                    </div>
                  </div>
                  <div className="card-badge">
                    {appliedJobs.includes(p._id) ? (
                      <span className="badge applied">✓ Applied</span>
                    ) : (
                      <span className={`badge ${p.open ? "open" : "closed"}`}>
                        {p.open ? "● Open" : "● Closed"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="info-item">
                    <span className="label">📍 Location</span>
                    <span className="value">{p.location || "Remote"}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">🎓 Eligibility</span>
                    <span className="value">{p.eligibility || "All Branches"}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">📅 Deadline</span>
                    <span className="value">{new Date(p.date || Date.now()).toLocaleDateString()}</span>
                  </div>

                  {p.description && (
                    <div className="description">
                      <p>{p.description.substring(0, 100)}{p.description.length > 100 ? "..." : ""}</p>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <button
                    className="btn-details"
                    onClick={() => setSelected(p)}
                  >
                    View Details
                  </button>
                  {p.open && !appliedJobs.includes(p._id) && (
                    <button
                      className="btn-apply"
                      onClick={() => apply(p._id)}
                      disabled={applying}
                    >
                      {applying ? "Applying..." : "Apply Now"}
                    </button>
                  )}
                  {appliedJobs.includes(p._id) && (
                    <button className="btn-applied" disabled>
                      ✓ Already Applied
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.companyName || "Job Details"}>
        {selected && (
          <div className="modal-content">
            <div className="modal-section">
              <h4>Position</h4>
              <p className="modal-value">{selected.position || "Multiple Positions"}</p>
            </div>

            <div className="modal-section">
              <h4>Company Description</h4>
              <p className="modal-value">{selected.description || "No additional information available."}</p>
            </div>

            <div className="modal-grid">
              <div className="modal-section">
                <h4>📍 Location</h4>
                <p className="modal-value">{selected.location || "Remote"}</p>
              </div>
              <div className="modal-section">
                <h4>🎓 Eligibility</h4>
                <p className="modal-value">{selected.eligibility || "All Branches"}</p>
              </div>
              <div className="modal-section">
                <h4>💼 Package</h4>
                <p className="modal-value">{selected.package || "Not Specified"}</p>
              </div>
              <div className="modal-section">
                <h4>📅 Deadline</h4>
                <p className="modal-value">{new Date(selected.date || Date.now()).toLocaleString()}</p>
              </div>
            </div>

            <div className="modal-actions">
              {!appliedJobs.includes(selected._id) && selected.open && (
                <button
                  className="btn-apply-modal"
                  onClick={() => {
                    apply(selected._id);
                    setSelected(null);
                  }}
                >
                  Apply to {selected.companyName}
                </button>
              )}
              {appliedJobs.includes(selected._id) && (
                <button className="btn-applied-modal" disabled>
                  ✓ Application Submitted
                </button>
              )}
              {!selected.open && (
                <button className="btn-closed-modal" disabled>
                  ✕ Applications Closed
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.includes("✓") ? "success" : "error"}`}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default StudentPlacements;
