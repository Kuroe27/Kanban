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

TaskRouter.post("/", protect, createTask);
TaskRouter.get("/", protect, getTask);
TaskRouter.delete("/:id", protect, deleteTask);
TaskRouter.put("/:id", protect, updateTask);
TaskRouter.get("/:id", protect, getSpecificTask);
export default TaskRouter;
