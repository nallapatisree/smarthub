const CodingQuestion = require("../models/CodingQuestion");
const Performance = require("../models/Performance");

// Admin adds coding question
exports.addQuestion = async (req, res) => {
  try {
    const question = new CodingQuestion(req.body);
    await question.save();
    res.json({ message: "Coding question added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student fetches questions
exports.getQuestions = async (req, res) => {
  const questions = await CodingQuestion.find();
  res.json(questions);
};

// Student submits solution
exports.submitCode = async (req, res) => {
  const { answer, questionId } = req.body;
  const question = await CodingQuestion.findById(questionId);

  let score = answer.trim() === question.expectedOutput.trim() ? 1 : 0;

  let performance = await Performance.findOne({ userId: req.user.id });
  if (!performance) {
    performance = new Performance({ userId: req.user.id });
  }

  performance.codingScore = (performance.codingScore || 0) + score;
  await performance.save();

  res.json({ score, message: "Code evaluated" });
};
