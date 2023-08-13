import express from "express";
import protect from "../middlewares/authMiddleware";
import { createTask } from "../controllers/taskController";
const TaskRouter = express.Router();

TaskRouter.post("/", protect, createTask);

export default TaskRouter;
