const Performance = require("../models/Performance");

exports.getMyPerformance = async (req, res) => {
  try {
    const performance = await Performance.findOne({
      userId: req.user.id
    });

    if (!performance) {
      return res.json({
        quizScore: 0,
        attempts: 0
      });
    }

    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
