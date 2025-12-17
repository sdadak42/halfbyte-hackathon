const router = require("express").Router();
const Note = require("../models/Note");
const Workspace = require("../models/Workspace");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }
});

router.use(authMiddleware);

router.post("/add", upload.single('pdfFile'), async (req, res) => {
  try {
    const { title, content, workspaceId } = req.body;

    if (!title || !workspaceId) {
      return res.status(400).json({ message: "Title and WorkspaceId are required" });
    }

    const workspace = await Workspace.findOne({ workspaceId: workspaceId });
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    if (!workspace.members.includes(req.user.username)) {
      return res.status(403).json({ message: "Not authorized to add notes to this workspace" });
    }

    const newNote = new Note({
      title,
      content,
      workspaceId,
      pdfUrl: req.file ? req.file.path : null,
      createdBy: req.user.username
    });

    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while adding a note.", error: err.message });
  }
});

// GET /api/notes?workspaceId=xxx (query parameter)
router.get("/", async (req, res) => {
  try {
    const { workspaceId } = req.query;

    if (!workspaceId) {
      return res.status(400).json({ message: "workspaceId is required" });
    }

    const workspace = await Workspace.findOne({ workspaceId: workspaceId });
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    if (!workspace.members.includes(req.user.username)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const notes = await Note.find({ workspaceId: workspaceId }).sort('-createdAt');
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/list/:workspaceId", async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await Workspace.findOne({ workspaceId: workspaceId });
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    if (!workspace.members.includes(req.user.username)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const notes = await Note.find({ workspaceId: workspaceId }).sort('-createdAt');
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });

    const workspace = await Workspace.findOne({ workspaceId: note.workspaceId });
    if (workspace && !workspace.members.includes(req.user.username)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error fetching the note.", error: err });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const workspace = await Workspace.findOne({ workspaceId: note.workspaceId });

    const isCreator = note.createdBy === req.user.username;
    const isOwner = workspace && workspace.ownerUsername === req.user.username;

    if (!isCreator && !isOwner) {
      return res.status(403).json({ message: "You can only delete your own notes" });
    }



    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json("Note deleted successfully.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;