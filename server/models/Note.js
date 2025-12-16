const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  pdfUrl: { type: String },
  workspaceId: {
    type: String,
    required: true,
    ref: 'Workspace'
  },
  createdBy: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);