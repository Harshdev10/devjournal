const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createNotebook,
  getNotebooks,
  getNotebook,
} = require("../controllers/notebook.controller");

router.post("/", auth, createNotebook);
router.get("/", auth, getNotebooks);
router.get("/:id", auth, getNotebook);
router.delete("/:id", auth, require("../controllers/notebook.controller").deleteNotebook);
router.post("/:id/restore", auth, require("../controllers/notebook.controller").restoreNotebook);

module.exports = router;
