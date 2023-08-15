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

statusRouter.route("/").post(protect, createStatus).get(protect, getStatus);

statusRouter
  .route("/:id")
  .get(protect, getSpecificStatus)
  .delete(protect, deleteStatus)
  .put(protect, updateStatus);

export default statusRouter;
