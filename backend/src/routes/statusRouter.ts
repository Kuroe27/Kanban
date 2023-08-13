import express from "express";
import protect from "../middlewares/authMiddleware";
import {
  createStatus,
  deleteStatus,
  getSpecificStatus,
  getStatus,
  updateStatus,
} from "../controllers/statusController";

const statusRouter = express.Router();

statusRouter.post("/", protect, createStatus);
statusRouter.get("/", protect, getStatus);
statusRouter.get("/:id", protect, getSpecificStatus);
statusRouter.delete("/:id", protect, deleteStatus);
statusRouter.put("/:id", protect, updateStatus);
export default statusRouter;
