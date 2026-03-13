import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/quiz", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setQuestions(res.data);
        setAnswers(new Array(res.data.length).fill(""));
        setTimeLeft(res.data.length * 60);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || "Failed to load quiz");
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, submitted]);

  const handleSelect = (qIndex, option) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = async () => {
    const unanswered = answers.filter(a => a === "").length;
    if (unanswered > 0) {
      const confirm = window.confirm(`${unanswered} questions are unanswered. Submit anyway?`);
      if (!confirm) return;
    }

    setSubmitted(true);
    try {
      const res = await API.post(
        "/quiz/submit",
        { answers },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      setScore(res.data.score);
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
      setSubmitted(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const answeredCount = answers.filter(a => a !== "").length;
  const progressPercentage = (answeredCount / questions.length) * 100;

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="error-box">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button className="submit-btn" onClick={() => navigate("/student")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (score !== null) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-container">
        <div className="score-card success">
          <div className="score-animation">🎉</div>
          <h2>Quiz Completed!</h2>
          <div className="score-display">
            <div className="score-large">{score}/{questions.length}</div>
            <div className="score-percentage">{percentage}%</div>
          </div>
          <p className="score-message">
            {percentage >= 80 ? "Excellent! 🌟" : percentage >= 60 ? "Good job! 👍" : "Keep practicing! 💪"}
          </p>
          <button
            className="submit-btn"
            onClick={() => navigate("/student")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="empty-state">
          <h3>📝 No Quiz Available</h3>
          <p>Check back later for new quizzes!</p>
          <button className="submit-btn" onClick={() => navigate("/student")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="header-left">
          <h1>Quiz Assessment</h1>
          <p className="quiz-title">{currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="header-right">
          <div className={`timer ${timeLeft < 60 ? "warning" : ""}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="quiz-progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <p className="progress-text">Answered: {answeredCount}/{questions.length}</p>

      <div className="quiz-content">
        <div className="quiz-main">
          <div className="quiz-card main">
            <div className="question-number">Question {currentQuestion + 1}</div>
            <h3 className="question-text">{q.question}</h3>

            <div className="options-container">
              {q.options.map((opt, i) => (
                <label key={i} className={`option-item ${answers[currentQuestion] === opt ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name={`q-${currentQuestion}`}
                    checked={answers[currentQuestion] === opt}
                    onChange={() => handleSelect(currentQuestion, opt)}
                  />
                  <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="option-text">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="quiz-navigation">
            <button
              className="nav-btn"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button className="submit-btn" onClick={submitQuiz}>
                Submit Quiz
              </button>
            ) : (
              <button className="nav-btn" onClick={handleNext}>
                Next →
              </button>
            )}
          </div>
        </div>

        <aside className="quiz-sidebar">
          <div className="sidebar-card">
            <h4>Question Navigator</h4>
            <div className="questions-grid">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  className={`question-btn ${idx === currentQuestion ? "current" : ""} ${answers[idx] !== "" ? "answered" : ""}`}
                  onClick={() => setCurrentQuestion(idx)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <h4>Summary</h4>
            <p><strong>Total:</strong> {questions.length}</p>
            <p><strong>Answered:</strong> {answeredCount}</p>
            <p><strong>Unanswered:</strong> {questions.length - answeredCount}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Quiz;
