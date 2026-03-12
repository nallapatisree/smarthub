const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  quizScore: {
    type: Number,
    default: 0
  },
  codingScore: {
    type: Number,
    default: 0
  },
  attempts: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Performance", performanceSchema);
