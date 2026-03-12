const Quiz = require("../models/Quiz");
const Performance = require("../models/Performance");

// ADMIN: Add Quiz Question
exports.addQuizQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, topic, difficulty } = req.body;

    const quiz = new Quiz({
      question,
      options,
      correctAnswer,
      topic,
      difficulty
    });

    await quiz.save();
    res.status(201).json({ message: "Quiz question added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STUDENT: Get Quiz Questions
exports.getQuizQuestions = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select("-correctAnswer");
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STUDENT: Submit Quiz
exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; 
    const quizzes = await Quiz.find();

    let score = 0;
    quizzes.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        score++;
      }
    });

    let performance = await Performance.findOne({ userId: req.user.id });

    if (!performance) {
      performance = new Performance({
        userId: req.user.id,
        quizScore: score,
        attempts: 1
      });
    } else {
      performance.quizScore = score;
      performance.attempts += 1;
    }

    await performance.save();

    res.json({
      message: "Quiz submitted successfully",
      score
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

