import express from "express";
import protect from "../middlewares/authMiddleware";
import {
  createStatus,
  deleteStatus,
  getStatus,
} from "../controllers/statusController";

const statusRouter = express.Router();

statusRouter.post("/", protect, createStatus);
statusRouter.get("/", protect, getStatus);
statusRouter.delete("/:id", protect, deleteStatus);
export default statusRouter;
