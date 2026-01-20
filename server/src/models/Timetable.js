const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String, // HH:mm
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
