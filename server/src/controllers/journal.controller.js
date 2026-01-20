const DailyJournal = require("../models/DailyJournal");

exports.getOrCreateJournal = async (req, res) => {
  const { date } = req.params;

  try {
    let journal = await DailyJournal.findOne({
      userId: req.user.id,
      date,
    });

    if (!journal) {
      journal = await DailyJournal.create({
        userId: req.user.id,
        date,
        content: "",
      });
    }

    res.json(journal);
  } catch (err) {
    res.status(500).json({ message: "Failed to load journal" });
  }
};

exports.updateJournal = async (req, res) => {
  try {
    const journal = await DailyJournal.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );

    res.json(journal);
  } catch (err) {
    res.status(500).json({ message: "Failed to save journal" });
  }
};
