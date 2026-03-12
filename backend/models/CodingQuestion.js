const mongoose = require("mongoose");

const codingQuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  topic: String,
  examples: String,
  constraints: String,
  expectedOutput: String,
  testCases: [{
    input: String,
    output: String
  }],
  hints: [String],
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CodingQuestion", codingQuestionSchema);
