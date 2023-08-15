import express from "express";
import protect from "../middlewares/authMiddleware";
import {
  createTask,
  deleteTask,
  getSpecificTask,
  getTask,
  updateTask,
} from "../controllers/taskController";
const TaskRouter = express.Router();

TaskRouter.route("/").get(protect, getTask).post(protect, createTask);

TaskRouter.route("/:id")
  .delete(protect, deleteTask)
  .put(protect, updateTask)
  .get(protect, getSpecificTask);

export default TaskRouter;
