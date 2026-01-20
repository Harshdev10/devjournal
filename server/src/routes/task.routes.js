const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createTask,
  getTodayTasks,
  toggleTask,
  deleteTask,
} = require("../controllers/task.controller");

router.get("/today", auth, getTodayTasks);
router.post("/", auth, createTask);
router.patch("/:id", auth, toggleTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
