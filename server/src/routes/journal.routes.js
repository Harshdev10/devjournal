const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  getOrCreateJournal,
  updateJournal,
} = require("../controllers/journal.controller");

router.get("/:date", auth, getOrCreateJournal);
router.put("/:id", auth, updateJournal);

module.exports = router;
