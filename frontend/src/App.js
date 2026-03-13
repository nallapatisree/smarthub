import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ProtectedRoute from "./services/ProtectedRoute";
import Quiz from "./pages/Quiz";
import StudentPlacements from "./pages/StudentPlacements";
import AdminPlacements from "./pages/AdminPlacements";
import RecruiterPlacements from "./pages/RecruiterPlacements";
import Analytics from "./pages/Analytics";
import CodingPractice from "./pages/CodingPractice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="app-main">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <DashboardLayout>
                <StudentDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute role="student">
              <DashboardLayout>
                <Quiz />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute role="student">
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/coding"
          element={
            <ProtectedRoute role="student">
              <DashboardLayout>
                <CodingPractice />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/placements"
          element={
            <ProtectedRoute role="student">
              <DashboardLayout>
                <StudentPlacements />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/placements"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <AdminPlacements />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Recruiter Routes */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute role="recruiter">
              <DashboardLayout>
                <RecruiterDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/placements"
          element={
            <ProtectedRoute role="recruiter">
              <DashboardLayout>
                <RecruiterPlacements />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
