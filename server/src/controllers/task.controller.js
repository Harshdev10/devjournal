const Task = require("../models/Task");

const today = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      userId: req.user.id,
      title: req.body.title,
      date: today(),
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ message: "Failed to create task", error: err.message });
  }
};

exports.getTodayTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id,
      date: today(),
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
