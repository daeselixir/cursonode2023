const express = require("express");
const router = express.Router();

const {
  getAllTaks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTaks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router;
