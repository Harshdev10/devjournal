const Notebook = require("../models/Notebook");

exports.createNotebook = async (req, res) => {
  try {
    const notebook = await Notebook.create({
      userId: req.user.id,
      title: req.body.title,
    });

    res.status(201).json(notebook);
  } catch (err) {
    res.status(500).json({ message: "Failed to create notebook" });
  }
};

exports.getNotebooks = async (req, res) => {
  try {
    const notebooks = await Notebook.find({ userId: req.user.id, deleted: { $ne: true } }).sort({
      createdAt: -1,
    });
    res.json(notebooks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notebooks" });
  }
};

exports.deleteNotebook = async (req, res) => {
  try {
    const notebook = await Notebook.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { deleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!notebook) return res.status(404).json({ message: "Notebook not found" });

    // soft-delete child notes
    const Note = require("../models/Note");
    await Note.updateMany({ notebookId: notebook._id }, { deleted: true, deletedAt: new Date() });

    res.json({ message: "Notebook deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete notebook" });
  }
};

exports.restoreNotebook = async (req, res) => {
  try {
    const notebook = await Notebook.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id, deleted: true },
      { deleted: false, deletedAt: null },
      { new: true }
    );

    if (!notebook) return res.status(404).json({ message: "Notebook not found or not deleted" });

    const Note = require("../models/Note");
    await Note.updateMany({ notebookId: notebook._id }, { deleted: false, deletedAt: null });

    res.json({ message: "Notebook restored" });
  } catch (err) {
    res.status(500).json({ message: "Failed to restore notebook" });
  }
};


