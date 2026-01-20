const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      notebookId: req.params.notebookId,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to create note" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      notebookId: req.params.notebookId,
      deleted: { $ne: true },
    }).sort({ updatedAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.noteId,
      req.body,
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to update note" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.noteId },
      { deleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note" });
  }
};

exports.restoreNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.noteId, deleted: true },
      { deleted: false, deletedAt: null },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found or not deleted" });
    res.json({ message: "Note restored" });
  } catch (err) {
    res.status(500).json({ message: "Failed to restore note" });
  }
};

