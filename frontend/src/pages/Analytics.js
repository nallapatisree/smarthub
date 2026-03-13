import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/Badge";
import API from "../services/api";
import "./Analytics.css";

function Analytics() {
  const [data, setData] = useState({
    name: "Student",
    quizScore: 75,
    attempts: 12,
    problemsSolved: 8,
    placementsApplied: 3,
    shortlisted: 1,
    cgpa: 8.5,
    topicsProgress: {
      dataStructures: 65,
      algorithms: 72,
      systemDesign: 45,
      codingPractice: 80,
      webDevelopment: 58,
      databases: 62
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setData(prev => ({
          ...prev,
          name: res.data.name,
          cgpa: res.data.cgpa || 8.5
        }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const readinessLevel = data.quizScore >= 70 ? "Placement Ready" : data.quizScore >= 50 ? "Average" : "Needs Improvement";
  const readinessColor = data.quizScore >= 70 ? "#10b981" : data.quizScore >= 50 ? "#f59e0b" : "#ef4444";

  const stats = [
    { title: "Quiz Score", value: `${data.quizScore}%`, icon: "📝", color: "#4f46e5" },
    { title: "Problems Solved", value: data.problemsSolved, icon: "💻", color: "#06b6d4" },
    { title: "Placements Applied", value: data.placementsApplied, icon: "🎯", color: "#8b5cf6" },
    { title: "Shortlisted", value: data.shortlisted, icon: "⭐", color: "#f59e0b" },
    { title: "CGPA", value: `${data.cgpa}/10`, icon: "🎓", color: "#10b981" },
    { title: "Quiz Attempts", value: data.attempts, icon: "📈", color: "#ec4899" }
  ];

  const avgProgress = Math.round(
    Object.values(data.topicsProgress).reduce((a, b) => a + b) / Object.keys(data.topicsProgress).length
  );

  const recommendations = [
    { text: "Focus on System Design - 45% completion", priority: "high" },
    { text: "Practice more coding problems daily", priority: "medium" },
    { text: "Join upcoming placement drives", priority: "high" },
    { text: "Review data structures concepts", priority: "medium" }
  ];

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="spinner"></div>
        <p>Loading your analytics...</p>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div>
          <h1>📊 Performance Analytics</h1>
          <p>Welcome back, <strong>{data.name}</strong>! Here's your learning progress.</p>
        </div>
        <div className="readiness-card" style={{ borderColor: readinessColor }}>
          <div className="readiness-indicator" style={{ backgroundColor: readinessColor }}></div>
          <div className="readiness-info">
            <p className="readiness-label">Placement Ready</p>
            <p className="readiness-status">{readinessLevel}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-title">{stat.title}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="analytics-grid">
        {/* Learning Progress Section */}
        <div className="analytics-section full-width">
          <div className="section-header">
            <h2>📚 Learning Progress</h2>
            <span className="avg-progress">Overall: <strong>{avgProgress}%</strong></span>
          </div>

          <div className="topics-grid">
            {Object.entries(data.topicsProgress).map(([topic, progress]) => (
              <div key={topic} className="topic-card">
                <div className="topic-header">
                  <h4>{topic.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <span className="progress-value">{progress}%</span>
                </div>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
                <p className="topic-status">
                  {progress >= 80 ? "✓ Mastered" : progress >= 60 ? "Good progress" : progress >= 40 ? "Fair progress" : "Needs work"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="analytics-section">
          <div className="section-header">
            <h2>🎯 Performance Summary</h2>
          </div>

          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Average Score</span>
              <span className="summary-value">{data.quizScore}%</span>
              <Progress value={data.quizScore} />
            </div>

            <div className="summary-item">
              <span className="summary-label">Success Rate</span>
              <span className="summary-value">{Math.round((data.shortlisted / data.placementsApplied) * 100) || 0}%</span>
              <Progress value={Math.round((data.shortlisted / data.placementsApplied) * 100) || 0} />
            </div>

            <div className="summary-item">
              <span className="summary-label">Coding Proficiency</span>
              <span className="summary-value">{data.topicsProgress.codingPractice}%</span>
              <Progress value={data.topicsProgress.codingPractice} />
            </div>

            <div className="summary-item">
              <span className="summary-label">Academic CGPA</span>
              <span className="summary-value">{data.cgpa}/10</span>
              <Progress value={(data.cgpa / 10) * 100} />
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="analytics-section">
          <div className="section-header">
            <h2>💡 Recommendations</h2>
          </div>

          <div className="recommendations-list">
            {recommendations.map((rec, idx) => (
              <div key={idx} className={`recommendation-item priority-${rec.priority}`}>
                <span className="priority-dot"></span>
                <p>{rec.text}</p>
              </div>
            ))}
          </div>

          <div className="action-items">
            <a href="#" className="action-link">
              📖 Study Resources →
            </a>
            <a href="#" className="action-link">
              🎯 View Job Matches →
            </a>
          </div>
        </div>

        {/* Goals & Milestones */}
        <div className="analytics-section">
          <div className="section-header">
            <h2>🏆 Goals</h2>
          </div>

          <div className="goals-list">
            <div className="goal-item completed">
              <input type="checkbox" checked readOnly />
              <span>Solve 10+ coding problems</span>
            </div>
            <div className="goal-item completed">
              <input type="checkbox" checked readOnly />
              <span>Score 70+ in quizzes</span>
            </div>
            <div className="goal-item">
              <input type="checkbox" readOnly />
              <span>Master System Design (Progress: {data.topicsProgress.systemDesign}%)</span>
            </div>
            <div className="goal-item">
              <input type="checkbox" readOnly />
              <span>Get selected in 3+ placement drives</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
