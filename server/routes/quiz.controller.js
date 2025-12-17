const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const Workspace = require('../models/Workspace');

exports.createQuiz = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { workspaceId, noteId, title, questions } = req.body;

    if (!workspaceId || !title || !questions || questions.length === 0) {
      return res.status(400).json({
        message: "workspaceId, title ve en az 1 question gerekli"
      });
    }

    for (let q of questions) {
      if (!q.questionText || !q.options || q.options.length < 2 || q.correctAnswer === undefined) {
        return res.status(400).json({
          message: "Her soru questionText, options (min 2) ve correctAnswer içermeli"
        });
      }
      if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
        return res.status(400).json({
          message: "correctAnswer geçerli bir index olmalı"
        });
      }
    }

    const workspace = await Workspace.findOne({ workspaceId: workspaceId });
    if (!workspace) {
      return res.status(404).json({ message: "Workspace bulunamadı" });
    }

    if (!workspace.members.includes(req.user.username)) {
      return res.status(403).json({ message: "Bu alana quiz ekleme yetkiniz yok" });
    }

    const quiz = new Quiz({
      workspaceId, // String
      noteId: noteId || null,
      title,
      questions,
      createdBy: req.user.username
    });

    await quiz.save();

    res.status(201).json({
      message: "Quiz başarıyla oluşturuldu",
      quiz
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllQuizzes = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    if (!workspaceId) {
      return res.status(400).json({ message: "workspaceId gerekli" });
    }

    const workspace = await Workspace.findOne({ workspaceId: workspaceId });
    if (!workspace) {
      return res.status(404).json({ message: "Workspace bulunamadı" });
    }

    // Check membership
    if (!workspace.members.includes(req.user.username)) {
      return res.status(403).json({ message: "Bu verileri görme yetkiniz yok" });
    }

    const quizzes = await Quiz.find({ workspaceId })
      .sort('-createdAt');

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz bulunamadı" });
    }

    // Security check: accessing via workspace
    const workspace = await Workspace.findOne({ workspaceId: quiz.workspaceId });
    if (workspace && !workspace.members.includes(req.user.username)) {
      return res.status(403).json({ message: "Erişim reddedildi" });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/quizzes/:id/submit
exports.submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz bulunamadı" });
    }

    const workspace = await Workspace.findOne({ workspaceId: quiz.workspaceId });
    if (!workspace || !workspace.members.includes(req.user.username)) {
      return res.status(403).json({ message: "Erişim reddedildi" });
    }

    const { answers } = req.body;
    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: "answers array olmalı" });
    }

    if (answers.length !== quiz.questions.length) {
      return res.status(400).json({
        message: `${quiz.questions.length} soru için ${quiz.questions.length} cevap gerekli`
      });
    }

    let score = 0;
    const detailedResults = quiz.questions.map((q, i) => {
      const isCorrect = answers[i] === q.correctAnswer;
      if (isCorrect) score++;
      return {
        questionIndex: i,
        questionText: q.questionText,
        userAnswer: answers[i],
        correctAnswer: q.correctAnswer,
        isCorrect
      };
    });

    const result = new QuizResult({
      quizId: quiz._id,
      username: req.user.username,
      score,
      total: quiz.questions.length
    });
    await result.save();

    const percentage = Math.round((score / quiz.questions.length) * 100);

    res.json({
      score,
      total: quiz.questions.length,
      percentage,
      passed: percentage >= 70,
      detailedResults
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ quizId: req.params.id })
      .sort('-createdAt')
      .limit(50);

    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMyQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find({
      quizId: req.params.id,
      username: req.user.username
    }).sort('-createdAt');

    res.json({
      attempts: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
