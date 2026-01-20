const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createNote,
  getNotes,
  updateNote,
} = require("../controllers/note.controller");

router.post("/:notebookId", auth, createNote);
router.get("/:notebookId", auth, getNotes);
router.put("/update/:noteId", auth, updateNote);
router.delete("/:noteId", auth, require("../controllers/note.controller").deleteNote);
router.post("/:noteId/restore", auth, require("../controllers/note.controller").restoreNote);

module.exports = router;
