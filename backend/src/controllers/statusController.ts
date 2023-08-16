import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Status from "../model/statusModel";

const createStatus = asyncHandler(async (req: Request, res: Response) => {
  const statusName = req.body;
  if (!statusName) {
    res.status(400);
    throw new Error("Please complete the form");
  }

  const newStatus = await Status.create({
    statusName: req.body.statusName,
    user: req.user.id,
  });

  res.status(200).json(newStatus);
});

const getStatus = asyncHandler(async (req: Request, res: Response) => {
  const status = await Status.find({ user: req.user.id });
  res.status(200).json(status);
});

const getSpecificStatus = asyncHandler(async (req: Request, res: Response) => {
  const status = await Status.findById(req.params.id);
  res.status(200).json(status);
});

const deleteStatus = asyncHandler(async (req: Request, res: Response) => {
  const status = await Status.findById(req.params.id);

  if (!status) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (status.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Status not authorized");
  }

  await Status.deleteOne({ _id: req.params.id });

  res
    .status(200)
    .json({ message: `status ${status.statusName} deleted successfully` });
});

const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const status = await Status.findById(req.params.id);

  if (!status) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (status.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Post not authorized");
  }

  const updateStatus = await Status.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateStatus);
});
export {
  createStatus,
  deleteStatus,
  getSpecificStatus,
  getStatus,
  updateStatus,
};
