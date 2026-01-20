const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createNotebook,
  getNotebooks,
} = require("../controllers/notebook.controller");

router.post("/", auth, createNotebook);
router.get("/", auth, getNotebooks);
router.delete("/:id", auth, require("../controllers/notebook.controller").deleteNotebook);
router.post("/:id/restore", auth, require("../controllers/notebook.controller").restoreNotebook);

module.exports = router;
