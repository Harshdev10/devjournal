const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  addEntry,
  getTodayTimetable,
  deleteEntry,
} = require("../controllers/timetable.controller");

router.get("/today", auth, getTodayTimetable);
router.post("/", auth, addEntry);
router.delete("/:id", auth, deleteEntry);

module.exports = router;
