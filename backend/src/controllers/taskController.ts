import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Task from "../model/taskModel";
import Status from "../model/statusModel";
import mongoose from "mongoose";

const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskName, status } = req.body;

  if (!taskName || !status) {
    res.status(400);
    throw new Error("Please complete all details");
  }

  // Check if the provided status ID exists in the Status model
  const existingStatus = await Status.findById(status);
  if (!existingStatus) {
    res.status(400);
    throw new Error("Invalid status ID");
  }

  const newTask = await Task.create({
    taskName,
    user: req.user.id,
    status,
  });

  res.status(201).json(newTask);
});

// get tasks
const getTask = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json({ tasks });
});

// get specific task
const getSpecificTask = asyncHandler(async (req: Request, res: Response) => {
  const selectedTask = await Task.findById(req.params.id);
  res.status(200).json(selectedTask);
});

// delete Task
const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  await Task.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Task deleted" });
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { status } = req.body;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400);
    throw new Error("Invalid task ID");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (!mongoose.Types.ObjectId.isValid(status)) {
    res.status(400);
    throw new Error("Invalid status ID");
  }

  const existingStatus = await Status.findById(status);
  if (
    !existingStatus ||
    existingStatus.user.toString() !== userId ||
    !mongoose.Types.ObjectId.isValid(status)
  ) {
    res.status(400);
    throw new Error("Invalid status or status ID");
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

export { createTask, getTask, deleteTask, updateTask, getSpecificTask };
