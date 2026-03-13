import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./CodingPractice.css";

function CodingPractice() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [filter, setFilter] = useState("all");
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/coding", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setQuestions(res.data);
        if (res.data.length > 0) {
          setSelected(res.data[0]);
          setCode("");
          setOutput("");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load questions:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleSelectQuestion = (question) => {
    setSelected(question);
    setCode("");
    setOutput("");
    setResult(null);
  };

  const submitCode = async () => {
    if (!selected || !code.trim()) {
      alert("Please write some code first!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await API.post(
        "/coding/submit",
        { questionId: selected._id, answer: code },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setResult({
        success: true,
        score: res.data.score,
        message: res.data.message || "Code submitted successfully!"
      });

      if (res.data.score && !completedQuestions.includes(selected._id)) {
        setCompletedQuestions([...completedQuestions, selected._id]);
      }
    } catch (err) {
      setResult({
        success: false,
        message: err.response?.data?.message || "Submission failed"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const clearCode = () => {
    setCode("");
    setOutput("");
    setResult(null);
  };

  const getDifficultyColor = (diff) => {
    const levels = { easy: "#10b981", medium: "#f59e0b", hard: "#ef4444" };
    return levels[diff?.toLowerCase()] || "#6b7280";
  };

  const filteredQuestions = filter === "all" 
    ? questions 
    : filter === "completed" 
    ? questions.filter(q => completedQuestions.includes(q._id))
    : questions.filter(q => !completedQuestions.includes(q._id));

  if (loading) {
    return (
      <div className="coding-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading coding challenges...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="coding-container">
        <div className="empty-state">
          <h3>📝 No Coding Challenges Available</h3>
          <p>Check back later for new practice problems!</p>
          <button className="btn-primary" onClick={() => navigate("/student")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="coding-container">
      <div className="coding-header">
        <div>
          <h1>💻 Coding Practice</h1>
          <p>Sharpen your coding skills with hands-on challenges</p>
        </div>
        <div className="stats">
          <span className="stat-badge">
            Completed: <strong>{completedQuestions.length}/{questions.length}</strong>
          </span>
        </div>
      </div>

      <div className="coding-wrapper">
        {/* Left Panel - Questions List */}
        <aside className="questions-panel">
          <div className="panel-header">
            <h3>Challenges</h3>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
              <option value="all">All ({questions.length})</option>
              <option value="pending">Pending ({questions.length - completedQuestions.length})</option>
              <option value="completed">Completed ({completedQuestions.length})</option>
            </select>
          </div>

          <div className="questions-list">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q._id}
                className={`question-item ${selected?._id === q._id ? "active" : ""} ${completedQuestions.includes(q._id) ? "completed" : ""}`}
                onClick={() => handleSelectQuestion(q)}
              >
                <div className="question-item-header">
                  <span className="q-number">{idx + 1}</span>
                  <span className="q-title">{q.title}</span>
                  {completedQuestions.includes(q._id) && <span className="checkmark">✓</span>}
                </div>
                <div className="question-item-meta">
                  <span className="difficulty" style={{ color: getDifficultyColor(q.difficulty) }}>
                    {q.difficulty || "Medium"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Panel - Editor and Details */}
        <main className="editor-panel">
          {selected ? (
            <>
              {/* Question Details */}
              <div className="details-section">
                <div className="details-header">
                  <h2>{selected.title}</h2>
                  <span className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(selected.difficulty) }}>
                    {selected.difficulty || "Medium"}
                  </span>
                </div>

                <div className="description-box">
                  <h4>Problem Statement</h4>
                  <p>{selected.description}</p>
                </div>

                {selected.examples && (
                  <div className="examples-box">
                    <h4>Example</h4>
                    <pre>{selected.examples}</pre>
                  </div>
                )}

                {selected.constraints && (
                  <div className="constraints-box">
                    <h4>Constraints</h4>
                    <p>{selected.constraints}</p>
                  </div>
                )}
              </div>

              {/* Code Editor */}
              <div className="editor-section">
                <div className="editor-header">
                  <h4>Your Solution</h4>
                  <div className="editor-actions">
                    <button className="btn-secondary" onClick={clearCode} disabled={submitting}>
                      Clear
                    </button>
                  </div>
                </div>

                <textarea
                  className="code-editor"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here..."
                  disabled={submitting}
                />
              </div>

              {/* Result Section */}
              {result && (
                <div className={`result-box ${result.success ? "success" : "error"}`}>
                  <h4>{result.success ? "✓ Success!" : "✗ Failed"}</h4>
                  <p>{result.message}</p>
                  {result.score && <p className="score">Score: <strong>{result.score}</strong></p>}
                </div>
              )}

              {/* Submit Button */}
              <div className="submit-section">
                <button
                  className="btn-primary"
                  onClick={submitCode}
                  disabled={submitting || !code.trim()}
                >
                  {submitting ? "Submitting..." : "Submit Solution"}
                </button>
              </div>
            </>
          ) : (
            <div className="empty-message">
              <p>Select a challenge to begin</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CodingPractice;
