const Timetable = require("../models/Timetable");

const today = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

exports.addEntry = async (req, res) => {
  try {
    const entry = await Timetable.create({
      userId: req.user.id,
      title: req.body.title,
      time: req.body.time,
      date: today(),
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error("Add timetable entry error:", err);
    res.status(500).json({ message: "Failed to add timetable entry", error: err.message });
  }
};

exports.getTodayTimetable = async (req, res) => {
  try {
    const entries = await Timetable.find({
      userId: req.user.id,
      date: today(),
    }).sort({ time: 1 });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete entry" });
  }
};
