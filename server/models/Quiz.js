const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: {
    type: [String],
    validate: v => Array.isArray(v) && v.length >= 2
  },
  correctAnswer: { type: Number, required: true }
});

const quizSchema = new mongoose.Schema({
  workspaceId: {
    type: String,
    required: true,
    ref: 'Workspace'
  },
  noteId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Note',
    default: null
  },
  title: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
  createdBy: {
    type: String, 
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
