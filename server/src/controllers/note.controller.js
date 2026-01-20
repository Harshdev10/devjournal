const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      notebookId: req.params.notebookId,
      userId: req.user.id,
    });
    res.status(201).json(note);
  } catch (err) {
    console.error("Create note error:", err);
    res.status(500).json({ message: "Failed to create note", error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      notebookId: req.params.notebookId,
      userId: req.user.id,
      deleted: { $ne: true },
    }).sort({ updatedAt: -1 });

    res.json(notes);
  } catch (err) {
    console.error("Get notes error:", err);
    res.status(500).json({ message: "Failed to fetch notes", error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    // First check if the note exists and belongs to this user
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: Note does not belong to user" });
    }

    // Update the note
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.noteId,
      {
        title: req.body.title,
        content: req.body.content,
      },
      { new: true }
    );
    
    console.log("Note updated successfully:", updatedNote);
    res.json(updatedNote);
  } catch (err) {
    console.error("Update note error:", err);
    res.status(500).json({ message: "Failed to update note", error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedNote = await Note.findOneAndUpdate(
      { _id: req.params.noteId },
      { deleted: true, deletedAt: new Date() },
      { new: true }
    );
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Delete note error:", err);
    res.status(500).json({ message: "Failed to delete note", error: err.message });
  }
};

exports.restoreNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const restoredNote = await Note.findOneAndUpdate(
      { _id: req.params.noteId, deleted: true },
      { deleted: false, deletedAt: null },
      { new: true }
    );
    if (!restoredNote) return res.status(404).json({ message: "Note not found or not deleted" });
    res.json({ message: "Note restored" });
  } catch (err) {
    console.error("Restore note error:", err);
    res.status(500).json({ message: "Failed to restore note", error: err.message });
  }
};

