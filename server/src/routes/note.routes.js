const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  restoreNote,
} = require("../controllers/note.controller");

// More specific routes first
router.put("/update/:noteId", auth, updateNote);
router.delete("/:noteId", auth, deleteNote);
router.post("/:noteId/restore", auth, restoreNote);

// Generic routes last
router.post("/:notebookId", auth, createNote);
router.get("/:notebookId", auth, getNotes);

module.exports = router;
