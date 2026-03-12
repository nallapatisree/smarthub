const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("SmartLearn & PlaceHub Backend is Running");
});

const { protect, authorizeRoles } = require("./middleware/authMiddleware");

app.get("/student-dashboard", protect, authorizeRoles("student"), (req, res) => {
  res.send("Welcome Student Dashboard");
});

app.get("/admin-dashboard", protect, authorizeRoles("admin"), (req, res) => {
  res.send("Welcome Admin Dashboard");
});

app.use("/api/quiz", require("./routes/quizRoutes"));

app.use("/api/placements", require("./routes/placementRoutes"));

app.use("/api/performance", require("./routes/performanceRoutes"));

app.use("/api/coding", require("./routes/codingRoutes"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




const User = require("./models/User");

app.get("/model-test", async (req, res) => {
  const count = await User.countDocuments();
  res.send(`User model working. Users count: ${count}`);
});
